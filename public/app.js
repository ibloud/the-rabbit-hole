const root = document.querySelector("#game");
const CACHE_BUST = "20260925-7";
const rooms = [
  "seven-sins.json",
  "sick-boi.json",
  "money-game-pt-3.json"
];

let roomData = new Map();

function addBlock(className, text) {
  const el = document.createElement("div");
  el.className = className;
  el.textContent = text;
  root.append(el);
  return el;
}

async function loadRooms() {
  const entries = await Promise.all(
    rooms.map(async (file) => {
      const response = await fetch(`content/rooms/${file}?v=${CACHE_BUST}`);
      if (!response.ok) throw new Error(`Unable to load room data: ${file}`);
      return response.json();
    })
  );
  roomData = new Map(entries.map((room) => [room.id, room]));
}

function renderRoomMedia(room) {
  if (!room || (!room.video && !room.background && !room.audio)) return;

  const media = document.createElement("div");
  media.className = "room-media";

  if (room.video) {
    if (room.video.includes("youtube.com/embed/")) {
      const frame = document.createElement("iframe");
      frame.src = room.video.replace("www.youtube.com/embed/", "www.youtube-nocookie.com/embed/") + "?rel=0&modestbranding=1&playsinline=1";
      frame.title = `${room.title} video`;
      frame.loading = "lazy";
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
    } else {
      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.src = room.video;
      video.setAttribute("aria-label", `${room.title} video`);
      media.append(video);
    }
  }

  if (room.background && !room.video) {
    const image = document.createElement("img");
    image.src = room.background;
    image.alt = `${room.title} room`;
    media.append(image);
  }

  if (room.audio) {
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = room.audio;
    audio.setAttribute("aria-label", `${room.title} audio`);
    media.append(audio);
  }

  const links = document.createElement("div");
  links.className = "room-links";
  if (room.links?.appleMusic) {
    const apple = document.createElement("a");
    apple.href = room.links.appleMusic;
    apple.target = "_blank";
    apple.rel = "noopener noreferrer";
    apple.textContent = "APPLE MUSIC ↗";
    links.append(apple);
  }
  if (room.links?.directRelease?.url) {
    const release = document.createElement("a");
    release.href = room.links.directRelease.url;
    release.target = "_blank";
    release.rel = "noopener noreferrer";
    release.textContent = room.links.directRelease.label || "DIRECT RELEASE ↗";
    links.append(release);
  }
  if (room.links?.officialWebsite?.url) {
    const official = document.createElement("a");
    official.href = room.links.officialWebsite.url;
    official.target = "_blank";
    official.rel = "noopener noreferrer";
    official.textContent = room.links.officialWebsite.label || "OFFICIAL WEBSITE ↗";
    links.append(official);
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

  const note = document.createElement("p");
  note.className = "media-note";
  note.textContent = room.video
    ? "VIDEO / PUBLIC EMBED"
    : "MEDIA SLOT OPEN — NO VIDEO ATTACHED";
  card.append(note);

  return card;
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
    number.textContent = `CHOICE 0${index + 1}`;
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

    const match = text.match(/SEVEN SINS|SICK BOI|MONEY GAME PT\. 3/);
    if (match) {
      const room = [...roomData.values()].find((item) => item.title.toUpperCase() === match[0]);
      if (room) {
        root.append(renderRoomCard(room));
        renderRoomMedia(room);
      }
    }
  }

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
