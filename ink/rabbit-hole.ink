VAR room = "selector"
VAR sins_fragment = false
VAR sick_fragment = false
VAR money_fragment = false

-> start

=== start ===
# Rabbit Hole
You find a corridor with three doors and a note pinned between them.

The note is written in three different inks. The last line is the same in all three hands:

*If you want the answer, stop looking for a single door.*

The corridor hums with the faint sound of a record playing somewhere below the floor.

-> room_select

=== room_select ===
~ room = "selector"
# Choose a room
The three doors have changed since you arrived. One is marked with a mirror. One has a record pressed into the wood. One has numbers scratched into the handle.

+ [Enter SEVEN SINS] -> seven_sins
+ [Enter SICK BOI] -> sick_boi
+ [Enter MONEY GAME PT. 3] -> money_game

=== seven_sins ===
~ room = "seven-sins"
# SEVEN SINS
The room is almost empty. A mirror hangs where a window should be, and beneath it someone has written seven words you cannot quite read.

A song is playing from a speaker with its grille removed. You recognize enough of it to know that the room is not asking you to identify the song. It is asking you to decide what you are willing to call evidence.

+ [Stand before the mirror] -> seven_mirror
+ [Read the words beneath the mirror] -> seven_words

=== seven_mirror ===
~ room = "seven-sins"
The mirror shows you entering the room a few seconds after you remember doing it.

Then it shows the room empty.

Then it shows the room full of people who are not there.

A sentence appears in the condensation:

*Every story chooses what to leave outside the frame.*

+ [Wipe the sentence away]
    The glass clears. For a moment you feel relieved. Then you realize you have erased the only instruction you were given.
    ~ sins_fragment = true
    -> seven_afterimage
+ [Leave it untouched]
    You step back. The sentence remains. You do not know whether that makes it more trustworthy or less.
    ~ sins_fragment = true
    -> seven_afterimage

=== seven_words ===
~ room = "seven-sins"
You trace the seven words with one finger:

**witness / appetite / guilt / image / money / silence / choice**

The final word is carved deeper than the others.

When you touch it, the speaker cuts out.

In the silence, you hear a voice from the other side of the wall:

"You can describe a contradiction without solving it."

+ [Take the list with you]
    You fold the paper into your pocket. It feels heavier than paper should.
    ~ sins_fragment = true
    -> seven_afterimage
+ [Leave the list behind]
    You leave it exactly where you found it. The room keeps its evidence.
    ~ sins_fragment = true
    -> seven_afterimage

=== seven_afterimage ===
~ room = "seven-sins"
The mirror is blank now.

For the first time, you notice a second door reflected in it. There is no second door in the room.

Its handle is marked with a single word: **OWN**.

You reach for it, but the reflection reaches first.

The corridor returns.

+ [Return to the three doors] -> room_select

=== sick_boi ===
~ room = "sick-boi"
# SICK BOI
The second room smells like dust and warm electronics. A record spins on a turntable with no needle.

Beside it sits a contract. Every line is blacked out except two:

**WHO MADE THIS?**

**WHO GETS TO DECIDE WHAT IT MEANS?**

+ [Examine the record] -> sick_record
+ [Read the surviving lines of the contract] -> sick_contract

=== sick_record ===
~ room = "sick-boi"
The record keeps spinning even after you touch the turntable.

On the label, someone has written:

*An artifact can leave its maker's hands without becoming nobody's story.*

You turn the record over. The other side is blank except for a date.

+ [Keep listening]
    A hidden voice emerges beneath the music. It does not tell you who is right. It asks who benefits when authorship becomes invisible.
    ~ sick_fragment = true
    -> sick_choice
+ [Stop the record]
    The room goes quiet. Without the sound, the contract suddenly looks less like law and more like a question.
    ~ sick_fragment = true
    -> sick_choice

=== sick_contract ===
~ room = "sick-boi"
The surviving lines are written in different handwriting.

The first hand asks who made the thing.
The second asks who controls the thing.
A third, almost hidden beneath the black ink, asks who gets paid when everyone else stops looking.

You find a signature at the bottom. It has been crossed out, but the pressure of the pen remains in the paper.

+ [Photograph the contract]
    You keep the image, not the paper. The distinction matters.
    ~ sick_fragment = true
    -> sick_choice
+ [Put the contract back]
    You refuse to turn evidence into possession.
    ~ sick_fragment = true
    -> sick_choice

=== sick_choice ===
~ room = "sick-boi"
The turntable stops.

A small green light comes on beneath it. The light projects one sentence onto the wall:

*Support can be voluntary. Ownership can be complicated. Do not confuse the two.*

The sentence disappears before you can photograph it.

+ [Follow the green light] -> money_game
+ [Return to the corridor] -> room_select

=== money_game ===
~ room = "money-game-pt-3"
# MONEY GAME PT. 3
The third room is a table under a single light.

Three columns are written in chalk:

**VALUE / PRICE / COST**

Someone has drawn a line through the word *price* and then drawn it back again.

A ledger lies open beside a set of dice. The first page contains no numbers, only names.

+ [Read the ledger] -> money_ledger
+ [Roll the dice] -> money_dice

=== money_ledger ===
~ room = "money-game-pt-3"
Every transaction is recorded without explanation.

A payment becomes a line.
A line becomes a total.
A total becomes proof that something happened.

But the ledger never records what someone thought they were buying.

At the bottom of the page you find three blank fields:

**WHO BENEFITED?**
**WHO DECIDED?**
**WHO COULD WALK AWAY?**

+ [Fill in the first field]
    You write a name. The ink spreads until the name becomes a stain.
    ~ money_fragment = true
    -> money_consequence
+ [Leave the fields blank]
    You close the ledger. Some questions become dishonest when the answer is forced.
    ~ money_fragment = true
    -> money_consequence

=== money_dice ===
~ room = "money-game-pt-3"
The dice land on three numbers.

Nothing happens.

Then the room changes around them.

The table gets longer. The light moves farther away. The ledger is now on the other side of the room.

You understand the trick: the game did not change the numbers. It changed the distance between the player and the consequence.

+ [Cross the room]
    You leave the dice behind and take the ledger instead.
    ~ money_fragment = true
    -> money_consequence
+ [Roll again]
    The dice stop moving before they leave your hand.
    ~ money_fragment = true
    -> money_consequence

=== money_consequence ===
~ room = "money-game-pt-3"
The three chalk columns are gone.

In their place is one sentence:

*Value is not the same thing as price. But price still changes what people can do.*

You hear the corridor behind you.

If you have been through all three rooms, the sound is different now: not a record, not a machine, but three voices speaking at once.

+ [Return to the corridor] -> room_select
