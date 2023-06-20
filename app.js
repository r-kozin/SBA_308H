class Spaceship {
  //spaceship class
  constructor(hull, firepower, accuracy, shield = 0, turn = false) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    this.shield = shield;
    this.turn = turn;
  }
  attack(target) {
    //attack the target
    if (this.turn === true) {
      //double check it is your turn
      console.log("%c Attacking target...", "color: white;");
      if (Math.random() < this.accuracy) {
        //random hit/miss based on accuracy
        console.log(
          "%c Target hit! ",
          "font-weight: bold; background: maroon; border: 1px solid grey; color: red;"
        );
        target.hull = target.hull - this.firepower; //take off HP from hit target
        if (target.hull <= 0) {
          //if the target was destroyed
          console.log(
            "%c Target destroyed! ",
            "font-weight: bold; background: green; border: 1px solid grey; color: lime;"
          );
          alienFactory.ships.shift(); //remove the destroyed ship from the ship list
          if (alienFactory.ships.length > 0) {
            //if there are ships left to attack
            let continueAttack = "";
            while (continueAttack !== "yes" || continueAttack !== "no") {
              //only accept "yes" or "no" in prompt, otherwise keep showing prompt
              continueAttack = window.prompt(
                `Would you like to continue attacking the remaining ${alienFactory.ships.length} ship(s) or retreat? Enter "yes" to attack or "no" to retreat.`
              );
              if (continueAttack === "yes") {
                if (superLaser.checked === true) {
                  this.targetedAttack();
                  break;
                } else {
                  this.attack(target); //start attack again on first ship in index(now that we have removed the destroyed ship)
                  break;
                }
              } else if (continueAttack === "no") {
                if (superLaser.checked === true) {
                  console.log(
                    `%cYou have successfully retreated. ${alienFactory.ships.length} enemy ships still lurk at the edge of space...`,
                    "background: purple; color: plum;"
                  ); //display remaining targets and end attack sequence
                  this.turn = false;
                  break;
                } else {
                  console.log(
                    `%cYou have successfully retreated. ${alienFactory.ships.length} enemy ships still lurk at the edge of space...`,
                    "background: purple; color: plum;"
                  ); //display remaining targets and end attack sequence
                  this.turn = false;
                  break;
                }
              }
            }
          } else {
            console.log(
              "%cYou have destroyed all the enemy ships! Good game! ",
              "font-weight: bold; background: green; border: 1px solid grey; color: black;"
            );
          } //game over win
        } else {
          console.log(
            `%c Alien has ${target.hull} HP remaining `,
            "font-style: italic; background: azure; border: 1px solid grey; color: black;"
          ); //log new target HP
          console.log(
            "%c Target not destroyed, prepare for counter attack!",
            "color: orange;"
          );
          this.turn = false;
          target.turn = true;
          target.counterAttack(this); //begin counterAttack
        }
      } else {
        console.log("%c Target missed!", "color: orange;");
        this.turn = false;
        target.turn = true;
        target.counterAttack(this); //begin counterAttack
      }
    } else {
      console.log("Error, not your turn!"); //error if not your turn
    }
  }
  counterAttack(target) {
    this.attack(target); //restart attack process against (passing in) whoever was on the attack during the last run
  }
  targetedAttack() {
    console.log("targetedAttack started!");
    let targetShip = -1;
    while (targetShip < 1 || targetShip > alienFactory.ships.length) {
      //only accept available ships in prompt, otherwise keep showing prompt
      targetShip = window.prompt(
        `Which ship would you like to attack? (Pick a number between 1 and ${alienFactory.ships.length})`
      );
    }
    this.attack(alienFactory.ships[targetShip - 1]);
  }
}

class Alien_Ship extends Spaceship {
  //alienship class extends Spaceship, has slightly different attack method for different messages to be displayed
  constructor(hull, firepower, accuracy, turn = false) {
    super(hull, firepower, accuracy, turn);
  }
  attack(target) {
    if (this.turn === true) {
      if (shieldsEnabled.checked === true) {
        //check if shields are enabled
        target.shield = 0; // reset shield
        target.shield = getRandomStats(1, 5); //randomize shield (0-5)
        console.log(
          `%c Shields holding at ${target.shield} `,
          "font-weight: bold; background: #6F00FF; border: 1px solid grey; color: white;"
        );
        if (Math.random() < this.accuracy) {
          //if shot is accurate enough
          console.log("%c You have been hit!", "color: red;");
          target.shield = target.shield - this.firepower; // hit shields first
          if (target.shield < 0) {
            //if shield destroyed past 0, pass along rest of damage to hull
            console.log(
              `%c Your shields have been destroyed `,
              "font-weight: bold; background: #7CB9E8; border: 1px solid grey; color: black;"
            );
            target.hull = target.hull + target.shield;
          }
          if (target.shield >= 0) {
            //if shields at or above 0, they withstood attack and no damage passed to hull
            console.log(
              `%c Your shields withstood the attack `,
              "font-weight: bold; background: #7CB9E8; border: 1px solid grey; color: black;"
            );
          }
          console.log(
            `%c You have ${target.hull} HP remaining `,
            "font-weight: bold; background: azure; border: 1px solid grey; color: black;"
          );
          if (target.hull <= 0) {
            console.log(
              "%c You have been destroyed! Game over!",
              "font-weight: bold; background: maroon; border: 1px solid grey; color: white;"
            );
          } else {
            console.log("You have not been destroyed, prepare to attack!");
            this.turn = false;
            target.turn = true;
            target.counterAttack(this);
          }
        } else {
          console.log(
            "%cThe aliens missed! Shot was not accurate enough!",
            "color:orange"
          );
          this.turn = false;
          target.turn = true;
          target.counterAttack(this);
        }
      } else {
        if (Math.random() < this.accuracy) {
          console.log("%c You have been hit!", "color: red;");
          target.hull = target.hull - this.firepower;
          console.log(
            `%c You have ${target.hull} HP remaining `,
            "font-weight: bold; background: azure; border: 1px solid grey; color: black;"
          );
          if (target.hull <= 0) {
            console.log(
              "%c You have been destroyed! Game over!",
              "font-weight: bold; background: maroon; border: 1px solid grey; color: white;"
            );
          } else {
            console.log("You have not been destroyed, prepare to attack!");
            this.turn = false;
            target.turn = true;
            target.counterAttack(this);
          }
        } else {
          console.log(
            "%cThe aliens missed! Shot was not accurate enough!",
            "color:orange"
          );
          this.turn = false;
          target.turn = true;
          target.counterAttack(this);
        }
      }
    } else {
      console.log("Error, not your turn!");
    }
  }
}
class ShipFactory {
  constructor(maker) {
    this.maker = maker;
    this.ships = [];
  }
  generateShip() {
    const newShip = new Alien_Ship(
      getRandomStats(3, 6),
      getRandomStats(2, 4),
      getRandomStats(6, 8) / 10
    );
    this.ships.push(newShip);
  }
  findTome(index) {
    return this.ships[index];
  }
}
const startButton = document.querySelector("#start-game");
const randomEnemiesBox = document.querySelector("#random-enemies");
const superLaser = document.querySelector("#superLaser");
const shieldsEnabled = document.querySelector("#shields-button");
const USS_Assembly = new Spaceship(20, 5, 0.7);
const alienFactory = new ShipFactory("Alien");

//Declare variables for start button, alien factory, and USS Assembly

function createAlienShips(num) {
  //function to create the alien ships from the alien factory
  for (let i = 0; i < num; i++) {
    //loop 6 times
    alienFactory.generateShip(); //generate the alien ship
  }
}

//generate 6 alien ships

console.log(USS_Assembly);
console.log(alienFactory);
//log to make sure everything is working

function getRandomStats(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
//function to generate stats for ships

startButton.addEventListener("click", startGame);

function startGame() {
  // window.alert('Game Starting...')
  let numOfEnemies = 6;
  console.log("%c Game starting...", "font-size: 25px");
  if (shieldsEnabled.checked === true) {
    USS_Assembly.shield = getRandomStats(0, 5);
    // console.log(USS_Assembly.shield);
    if (superLaser.checked === true) {
      if (randomEnemiesBox.checked === true) {
        numOfEnemies = getRandomStats(6, 10);
        console.log(
          "%c Randomizing number of enemies...",
          "background: black; color: white; border: 1px solid gray;"
        );
        console.log(numOfEnemies);
      }
      createAlienShips(numOfEnemies);
      USS_Assembly.turn = true;
      USS_Assembly.targetedAttack();
    } else {
      if (randomEnemiesBox.checked === true) {
        numOfEnemies = getRandomStats(6, 10);
        console.log(
          "%c Randomizing number of enemies...",
          "background: black; color: white; border: 1px solid gray;"
        );
        console.log(numOfEnemies);
      }
      createAlienShips(numOfEnemies);
      USS_Assembly.turn = true;
      USS_Assembly.attack(alienFactory.ships[0]);
    }
  } else {
    if (superLaser.checked === true) {
      if (randomEnemiesBox.checked === true) {
        numOfEnemies = getRandomStats(6, 10);
        console.log(
          "%c Randomizing number of enemies...",
          "background: black; color: white; border: 1px solid gray;"
        );
        console.log(numOfEnemies);
      }
      createAlienShips(numOfEnemies);
      USS_Assembly.turn = true;
      USS_Assembly.targetedAttack();
    } else {
      if (randomEnemiesBox.checked === true) {
        numOfEnemies = getRandomStats(6, 10);
        console.log(
          "%c Randomizing number of enemies...",
          "background: black; color: white; border: 1px solid gray;"
        );
        console.log(numOfEnemies);
      }
      createAlienShips(numOfEnemies);
      USS_Assembly.turn = true;
      USS_Assembly.attack(alienFactory.ships[0]);
    }
  }
}
