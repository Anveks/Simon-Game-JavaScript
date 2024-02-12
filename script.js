
class App {

  computerSequence = [];
  playersSequence = [];
  colorsNumber = document.querySelector(".diff").value;
  startBtn = document.querySelector(".btn-start");

  constructor(){
    this.colorBlocks = [];
    this.gameCont = document.querySelector(".game-cont");

    this.startBtn.addEventListener('click', this.startGame.bind(this));
    this.renderColorBlocks();
  };

  renderColorBlocks(){
    for (let i = 0; i < this.colorsNumber; i++) {
      const colorBlock = new ColorBlock();
      this.gameCont.insertAdjacentElement("beforeend", colorBlock.element);
      this.colorBlocks.push(colorBlock);
    };
  };

  startGame() {
    this.computersTurn();
  };

  computersTurn() {
    this.computerSequence = [];

    const computerClick = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });  

    for (let i = 0; i < this.colorsNumber; i++) {
      const randomNum = Math.floor(Math.random() * 4);
      setTimeout(() => {
        this.colorBlocks[randomNum].element.dispatchEvent(computerClick);
      }, i * 1200); // delay each block's activation by i seconds
      this.computerSequence.push(randomNum);
    }
  }

}

class ColorBlock {
  constructor(){
    this.isActive = false; // Whether the block is active or not
    this.element = document.createElement("div"); // The HTML element representing the block
    this.element.classList.add("color-block");
    this.element.addEventListener("click", this.toggleActive.bind(this)); // Bind click event handler
  }

  toggleActive() {
    this.element.classList.toggle("active");
    setTimeout(() =>  this.element.classList.toggle("active"), 1000);
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



