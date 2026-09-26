const root = document.querySelector("#game");
const CACHE_BUST = "20260926-1";
const rooms = ["seven-sins.json", "sick-boi.json", "money-game-pt-3.json"];

let roomData = new Map();

function addBlock(className, text) {
  const el = document.createElement("div");
  el.className = className;
  el.textContent = text;
  root.append(el);
  return el;
}

async function loadRooms() {
  const entries = await Promise.all(rooms.map(async (file) => {
    const response = await fetch(`content/rooms/${file}?v=${CACHE_BUST}`);
    if (!response.ok) throw new Error(`Unable to load room data: ${file}`);
    return response.json();
  }));
  roomData = new Map(entries.map((room) => [room.id, room]));
}

function appendExternalLink(parent, href, label) {
  const link = document.createElement("a");
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  parent.append(link);
}

function renderRoomMedia(room) {
  if (!room) return;

  const media = document.createElement("div");
  media.className = "room-media";

  if (room.video) {
    const frame = document.createElement("iframe");
    frame.src = room.video.replace("www.youtube.com/embed/", "www.youtube-nocookie.com/embed/") + "?rel=0&modestbranding=1&playsinline=1";
    frame.title = `${room.title} — official video`;
    frame.loading = "eager";
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    media.append(frame);

    const watch = document.createElement("a");
    watch.className = "video-link";
    watch.href = room.video.replace("/embed/", "/watch?v=");
    watch.target = "_blank";
    watch.rel = "noopener noreferrer";
    watch.textContent = "OPEN VIDEO ON YOUTUBE ↗";
    media.append(watch);
  }

  if (room.contentNote) {
    const note = document.createElement("p");
    note.className = "media-note";
    note.textContent = room.contentNote;
    media.append(note);
  }

  const links = document.createElement("div");
  links.className = "room-links";

  if (room.links?.appleMusic) appendExternalLink(links, room.links.appleMusic, "APPLE MUSIC ↗");
  if (room.links?.directRelease?.url) appendExternalLink(links, room.links.directRelease.url, room.links.directRelease.label || "DIRECT RELEASE ↗");
  if (room.links?.officialWebsite?.url) appendExternalLink(links, room.links.officialWebsite.url, room.links.officialWebsite.label || "OFFICIAL WEBSITE ↗");

  if (room.links?.optionalMerch?.url) {
    const merch = document.createElement("a");
    merch.href = room.links.optionalMerch.url;
    merch.textContent = room.links.optionalMerch.label || "OPTIONAL SUPPORT / OFFICIAL REN MERCH ↗";
    links.append(merch);
  }

  media.append(links);
  root.append(media);
}

function renderRoomCard(room) {
  const card = document.createElement("section");
  card.className = "room-card";

  const label = document.createElement("div");
  label.className = "room-label";
  label.textContent = "ROOM / " + room.id.toUpperCase();
  card.append(label);

  const title = document.createElement("h2");
  title.textContent = room.title;
  card.append(title);

  const description = document.createElement("p");
  description.textContent = room.description;
  card.append(description);

  return card;
}

function renderRoomForStory(story) {
  const roomId = story.variablesState["room"];
  if (!roomId || roomId === "selector") return;

  const room = roomData.get(roomId);
  if (!room) return;

  root.append(renderRoomCard(room));
  renderRoomMedia(room);
}

function renderChoices(story) {
  const choices = story.currentChoices || [];
  if (!choices.length) {
    if (!story.canContinue) addBlock("ending", "The thread ends here.");
    return;
  }

  const list = document.createElement("div");
  list.className = "choices";
  list.setAttribute("aria-label", "Story choices");

  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    const number = document.createElement("small");
    number.textContent = `CHOICE ${String(index + 1).padStart(2, "0")}`;
    const label = document.createElement("span");
    label.textContent = choice.text;
    button.append(number, label);
    button.addEventListener("click", () => {
      story.ChooseChoiceIndex(index);
      advance(story);
    });
    list.append(button);
  });

  root.append(list);
}

function advance(story) {
  root.replaceChildren();

  while (story.canContinue) {
    const text = story.Continue().trim();
    if (text) addBlock("story-line", text);
  }

  renderRoomForStory(story);
  renderChoices(story);
  root.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function loadStory() {
  const response = await fetch(`ink/rabbit-hole.json?v=${CACHE_BUST}`);
  if (!response.ok) throw new Error(`Unable to load compiled Ink story: ${response.status}`);
  return new window.inkjs.Story(await response.text());
}

Promise.all([loadRooms(), loadStory()])
  .then(([, story]) => advance(story))
  .catch((error) => {
    root.replaceChildren();
    addBlock("error", `Rabbit Hole build error: ${error.message}`);
  });
