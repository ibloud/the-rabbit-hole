const root = document.querySelector("#game");

function addBlock(className, text) {
  const el = document.createElement("div");
  el.className = className;
  el.textContent = text;
  root.append(el);
  return el;
}

function renderChoices(story) {
  const choices = story.currentChoices || [];
  if (!choices.length) {
    if (!story.canContinue) {
      addBlock("ending", "The story has reached its end.");
    }
    return;
  }

  const list = document.createElement("div");
  list.className = "choices";
  list.setAttribute("aria-label", "Story choices");

  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.innerHTML = `<small>CHOICE 0${index + 1}</small>`;
    const label = document.createElement("span");
    label.textContent = choice.text;
    button.append(label);
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

  renderChoices(story);
  root.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function loadStory() {
  const response = await fetch("ink/rabbit-hole.json");
  if (!response.ok) throw new Error(`Unable to load compiled Ink story: ${response.status}`);
  const json = await response.text();
  return new window.inkjs.Story(json);
}

loadStory()
  .then(advance)
  .catch((error) => {
    root.replaceChildren();
    addBlock("error", `Ink build error: ${error.message}`);
  });
