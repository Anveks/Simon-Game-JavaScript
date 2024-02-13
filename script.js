// COLOR BLOCK CLASS
class ColorBlock {
  constructor(app) {
    this.app = app;
    this.isActive = false;
    this.element = document.createElement("div");
    this.element.classList.add("color-block");
    this.element.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick() {
    const index = this.app.colorBlocks.indexOf(this);
    this.app.playersSequence.push(index);
    this.toggleActive();

    if (this.app.playersSequence.length === this.app.colorsNumber) {
      console.log(this.app.playersSequence);
      console.log(this.app.computerSequence);

      this.app.checkSequence(this.app.playersSequence, this.app.computerSequence);
    }
  }

  toggleActive() {
    this.element.classList.toggle("active");
    setTimeout(() => this.element.classList.toggle("active"), 1000);
  }
}

// APP CLASS
class App {
  computerSequence = [];
  playersSequence = [];
  difficulty = document.querySelector(".diff");
  colorsNumber;
  startBtn = document.querySelector(".btn-start");
  score = document.querySelector(".score");
  turn = document.querySelector(".turn");

  constructor() {
    this.colorBlocks = [];
    this.gameCont = document.querySelector(".game-cont");

    this.startBtn.addEventListener('click', this.startGame.bind(this));
    this.renderColorBlocks();

    this.difficulty.addEventListener('change', this.renderColorBlocks.bind(this));
  }

  renderColorBlocks() {
    this.gameCont.innerHTML = "";
    this.colorsNumber = this.difficulty.value;
    console.log(this.colorsNumber);
    
    for (let i = 0; i < this.colorsNumber; i++) {
      const colorBlock = new ColorBlock(this);
      this.gameCont.insertAdjacentElement("beforeend", colorBlock.element);
      this.colorBlocks.push(colorBlock);
    }
  }

  startGame() {
    this.computersTurn();
  }

  computersTurn() {
    this.turn.innerHTML = "🤖 Computer's turn."
    this.toggleTurn();

    this.computerSequence = [];
    this.playersSequence = []; // Clear player's sequence
    this.toggleInterface(); // deactivate the interface while it is computer's turn

    for (let i = 0; i < this.colorsNumber; i++) {
      const randomNum = Math.floor(Math.random() * this.colorsNumber);
      setTimeout(() => {
        this.colorBlocks[randomNum].toggleActive();
      }, i * 1200);
      this.computerSequence.push(randomNum); 
    }

    setTimeout(() => {
      this.toggleInterface();
      this.turn.innerHTML = "🙂 Player's turn."
      this.toggleTurn();
      console.log(this.computerSequence);
    }, 1200 * this.colorsNumber);
  }

  toggleInterface() {
    this.gameCont.classList.toggle("unclickable");
  }

  toggleTurn() {
    this.turn.classList.add('bump');
    this.turn.classList.remove('bump');
  }

  checkSequence(player, computer) {
    if (player.toString() === computer.toString()) {
      this.turn.innerHTML = "Correct! 🎉"
      this.score.innerHTML = +this.score.innerHTML + 1;
      setTimeout(() => this.computersTurn(), 2000);
    } else {
      this.turn.innerHTML = "Better luck next time! ❌";
      this.score.innerHTML = 0;
    }
  }
}

const app = new App();


// let timeout = colorsNumber; // set the timeot stop the same as the color blocks number

// function handlePlayersTurn(index) {
//   playersSequence.push(index);
//   console.log(playersSequence + "🔥");

//   document.querySelector(`.n${index}`).classList.add("active");
//   setTimeout(() => { 
//     document.querySelector(`.n${index}`).classList.remove("active");
//    }, 800);

//   if (playersSequence.length === 4) console.log("Player sequence is: " + playersSequence); // TEST

//   // CHECKING WINNER 🎉
//   if (playersSequence.length === 4) {
//     if (JSON.stringify(playersSequence) === JSON.stringify(sequence)) {
//       document.querySelector(".score").innerHTML++;

//       document.querySelectorAll(".color-cont").forEach((elem, index) => {
//         elem.removeEventListener("click", () => handlePlayersTurn(index));
//       });

//     } else {
//       alert("Oops, the sequence is wrong! Better luck next time.");
//       document.querySelector(".score").innerHTML = 0;
//       sequence.length = 0; // resetting the arrs
//       playersSequence.length = 0;
//       timeout = colorsNumber;
//     }
//   }
// }

// // START GAME:
// startBtn.addEventListener("click", () => {

//   sequence.length = 0; // resetting the arrs
//   playersSequence.length = 0;
//   timeout = colorsNumber;

//   const interval = setInterval(() => {
//     if (timeout === 0) {
//       clearInterval(interval);
//     } else {
//       timeout -= 1;
  
//       const currentNumber = Math.trunc(Math.random() * colorsNumber);
//       sequence.push(currentNumber); // remember the sequence 
//       const currentElem = document.querySelector(`.n${currentNumber}`);
//       currentElem.classList.add("active");

//       if (sequence.length === 4) {
//         console.log("Random sequence is: " + sequence); // TEST
        
//         // only after the computer has ended it's turn, the colors become clickable for the player:
//         document.querySelectorAll(".color-cont").forEach((elem, index) => {
//           elem.addEventListener("click", () => handlePlayersTurn(index));
//           elem.removeEventListener('click', handlePlayersTurn)
//         });
//       }
  
//       setTimeout(() => { 
//         currentElem.classList.remove("active");
//        }, 800);
//     };
//   }, 1000);
  
// });

// console.log(document.querySelector(".score").innerHTML); // score elem

// number string boolean undefined null symbol bigint



