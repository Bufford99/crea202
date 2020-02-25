/**
 * Bufford Brian Sta Maria
 * CREA 202, Spring 2020
 */

// global variables
const playerOne = {
  name: "Bob",
  score: 0,
  hand: []
};

const playerTwo = {
  name: "Jane",
  score: 0,
  hand: []
};

function rollDices() {

  // reset player hands
  playerOne.hand = [];
  playerTwo.hand = [];

  // rolling the dice
  for(let i = 0; i < 5; i++) {
    playerOne.hand.push(Math.ceil(Math.random() * 6));
    playerTwo.hand.push(Math.ceil(Math.random() * 6));
  }

  // sort for easier iteration
  playerOne.hand.sort();
  playerTwo.hand.sort();

  // get scores for both players
  getScores(playerOne);
  getScores(playerTwo);
}

/**
 * @param player - whichever player we are calculating the score of
 */
function getScores(player) {

  // temporary helper variables for output
  let scoreValue;
  let comboName;

  // counts number of dice number occurrences
  const counters = {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0
  };

  player.hand.forEach(dice => {
      if (dice === 1) {
          counters.one++;
      }
      else if (dice === 2) {
          counters.two++;
      }
      else if (dice === 3) {
          counters.three++;
      }
      else if (dice === 4) {
          counters.four++;
      }
      else if (dice === 5) {
          counters.five++;
      }
      else {
          counters.six++;
      }
  });

  // calculate combo and score
  if (counters.one === 5 || counters.two === 5 || counters.three === 5
          || counters.four === 5 || counters.five === 5 || counters.six === 5)
      {
          comboName = "YAHTZEE!";
          scoreValue = 100;
      }
  else if ((player.hand.toString() === "1,2,3,4,5") || (player.hand.toString() === "2,3,4,5,6"))
      {
          comboName = "Straight";
          scoreValue = 100;
      }
  else if (counters.one === 4 || counters.two === 4 || counters.three === 4
          || counters.four === 4 || counters.five === 4 || counters.six === 4)
      {
          comboName = "Four of a Kind";
          scoreValue = 75;
      }
  else if (counters.one === 3 || counters.two === 3 || counters.three === 3
          || counters.four === 3 || counters.five === 3 || counters.six === 3)
      {
          comboName = "Three of a Kind";
          scoreValue = 50;
      }
  else {
      comboName = "Chance";
      scoreValue = player.hand.reduce((total, currentVal) => {
          return total + currentVal;
      });
  }

  // update player's score
  player.score += scoreValue;

  // output results
  console.log(`${player.name} rolled: ${player.hand}`);
  console.log(`${player.name} scored ${comboName}: ${scoreValue} points`);
  console.log(`${player.name} current total score: ${player.score} points`);
}

function announceWinner() {
  console.log("===== FINAL SCORE =====");
  console.log(`${playerOne.name} scored: ${playerOne.score} points`);
  console.log(`${playerTwo.name} scored: ${playerTwo.score} points`);

  if (playerOne.score > playerTwo.score) {
    console.log(`${playerOne.name} is the winner!`);
  }
  else if (playerOne.score < playerTwo.score) {
    console.log(`${playerTwo.name} is the winner!`);
  }
  else {
    console.log("It is a tie!");
  }
}

// driver program
function main() {

  console.log(`Today's Yahtzee match-up is: ${playerOne.name} vs. ${playerTwo.name}`);

  for(let i = 1; i <= 10; i++) {
    console.log(`===== Round ${i} =====`);

    rollDices();
  }

  announceWinner();
}

// run the program
main();