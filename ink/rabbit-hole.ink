VAR room = "seven-sins"

-> start

=== start ===
# Rabbit Hole
A portable three-room narrative prototype.

-> room_select

=== room_select ===
Choose a room.
+ [Seven Sins] -> seven_sins
+ [Sick Boi] -> sick_boi
+ [Money Game Pt. 3] -> money_game

=== seven_sins ===
The room waits for a choice.
+ [Inspect the threshold] The opening clue becomes visible.
+ [Inspect the mirror] What you notice changes what becomes visible next.
-> room_select

=== sick_boi ===
The record carries a history, but history is not the same thing as consent.
+ [Inspect the record] Authorship becomes the question.
+ [Inspect the door] A boundary becomes the answer.
-> room_select

=== money_game ===
The event changes conditions. The player still has to decide where to commit influence.
+ [Inspect the board] A strategic opportunity appears.
+ [Inspect the ledger] A measurable shift is recorded.
-> room_select
