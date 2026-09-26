import assert from 'node:assert/strict';
import fs from 'node:fs';
import { Story } from 'inkjs';

const compiled = fs.readFileSync('dist/ink/rabbit-hole.json', 'utf8').replace(/^\uFEFF/, '');
const routes = [
  { entry: 0, room: 'seven-sins', exits: [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 0]] },
  { entry: 1, room: 'sick-boi', exits: [[0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, 1]] },
  { entry: 2, room: 'money-game-pt-3', exits: [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 0]] },
];

function advance(story) {
  while (story.canContinue) story.Continue();
  return story.currentChoices.map(choice => choice.text);
}

function choose(story, index) {
  assert.ok(story.currentChoices[index], `Choice ${index} is missing`);
  story.ChooseChoiceIndex(index);
  return advance(story);
}

for (const route of routes) {
  for (const path of route.exits) {
    const story = new Story(compiled);
    assert.equal(advance(story).length, 3, 'Corridor must offer three rooms');
    assert.equal(choose(story, route.entry).length, 2);
    assert.equal(story.variablesState.$('room'), route.room);
    assert.equal(choose(story, path[0]).length, 2);
    const choices = choose(story, path[1]);
    assert.ok(choices.length > path[2], 'Room must have a usable exit');
    choose(story, path[2]);
    assert.equal(story.variablesState.$('room'), route.entry === 1 && path[2] === 0 ? 'money-game-pt-3' : 'selector');
    assert.ok(story.currentChoices.length >= 2, 'Story must continue after exit');
  }
}
console.log('Compiled story routes passed.');
