/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: sokoban
@author: meronemo
@tags: []
@addedOn: 2024-07-26
*/

const player = "p"
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
....00000000....
...00......0....
...0........0...
..00..0..0..0...
..0.........0...
..0...0.0..00...
..0...000..0....
..00......0.....
...000..000.....
....0000.0......
.....0...0......
.....0...0......
.....0...0......
..0000...00000..
................` ],
  [ box, bitmap`
................
.99999999999999.
.9.....99.....9.
.9.....99.....9.
.9..9..99..9..9.
.9.....99.....9.
.9.....99.....9.
.99999999999999.
.99999999999999.
.9.....99.....9.
.9.....99.....9.
.9..9..99..9..9.
.9.....99.....9.
.9.....99.....9.
.99999999999999.
................` ],
  [ goal, bitmap`
................
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
................` ],
  [ wall, bitmap`
................
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
................` ]
);

setSolids([player, box, wall]);

let level = 0;
const levels = [
  map`
p.wg
.bw.
....
....`,
  map`
p.....
.b.wg.
...w..
......
.wwb..
.....g`,
  
];

setMap(levels[level]);

setPushables({
  [ player ]: [ box ],
  [ box ]: [ player, box ]
});

let pull = 0;

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) setMap(currentLevel);
});

onInput("k", () => {
  if (pull) {
    pull = 0;
    clearText();
  } else {
    pull = 1;
    addText("pulling..", {y: 1, color: color`6`});
  }
});

afterInput(() => {
  const numberCovered = tilesWith(goal, box).length;
  const targetNumber = tilesWith(goal).length;

  if (numberCovered === targetNumber) {
      level += 1;
      const currentLevel = levels[level];
      if (currentLevel !== undefined) setMap(currentLevel);
      else addText("you win!", { y: 4, color: color`3` });
  }
});