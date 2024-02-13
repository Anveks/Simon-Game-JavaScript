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

    if (this.app.playersSequence.length === +this.app.colorsNumber) {
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
    this.colorBlocks = [];
    
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

      console.log(randomNum);
      console.log(this.colorBlocks);

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
    this.turn.classList.add('slide-in-bottom');
    setTimeout(() =>     this.turn.classList.remove('slide-in-bottom'), 100)
    // this.turn.classList.remove('slide-in-bottom');
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




