VAR room = "seven-sins"

-> start

=== start ===
# Rabbit Hole
Three doors. Three records. Nothing here is a dead end unless you choose to leave it there.

-> room_select

=== room_select ===
# Choose a room
The Rabbit Hole is a set of connected rooms. Enter one, inspect what is there, then decide whether to go deeper or come back.

+ [SEVEN SINS — enter the room] -> seven_sins
+ [SICK BOI — enter the room] -> sick_boi
+ [MONEY GAME PT. 3 — enter the room] -> money_game

=== seven_sins ===
# SEVEN SINS
The room is quiet enough that the first thing you notice is the threshold.

+ [Inspect the threshold] 
  The threshold is not a doorway so much as a warning: once you decide to look, the room starts keeping track.
  + [Look closer] The clue is deliberately incomplete. You have to carry the missing piece with you.
  + [Step back] You can leave the room without closing the question.
  -> room_select
+ [Inspect the mirror]
  The mirror gives you the wrong answer first.
  + [Ask what changed] The reflection changes when you stop looking for yourself in it.
  + [Leave it alone] Some evidence is more useful when it remains unresolved.
  -> room_select

=== sick_boi ===
# SICK BOI
A record sits in the middle of the room. It is evidence, but evidence is not ownership.

+ [Inspect the record]
  The record separates the artifact from the person who made it.
  + [Follow the authorship thread] Who made something and who controls it are different questions.
  + [Put the record back] The archive remains, even when you refuse to claim it.
  -> room_select
+ [Inspect the door]
  The door is marked as a boundary rather than an invitation.
  + [Test the boundary] A boundary tells you where the room ends.
  + [Walk away] Respecting a boundary is also an action.
  -> room_select

=== money_game ===
# MONEY GAME PT. 3
The table is already in play. The numbers look precise. The consequences are not.

+ [Inspect the board]
  The board changes when the conditions change.
  + [Read the shift] A change in position is information, not an instruction.
  + [Look underneath] The visible move is only one layer of the game.
  -> room_select
+ [Inspect the ledger]
  The ledger remembers transactions without explaining why they happened.
  + [Trace the change] A measurable shift can be followed back to a choice.
  + [Close the ledger] Not every record needs to become a decision.
  -> room_select
