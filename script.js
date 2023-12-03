
const startBtn = document.querySelector(".btn-start");

const sequence = [];
const playersSequence = [];
const gameCont = document.querySelector(".game-cont");
let colorsNumber = document.querySelector(".diff").value; // we take the value from the difficulty option

for (let i = 0; i < colorsNumber; i++) { // generate the color blocks according to the difficulty
  const color = document.createElement("div");
  color.classList.add("color-cont");
  color.classList.add(`n${i}`);
  color.setAttribute("disabled", true);
  gameCont.appendChild(color);
};

let timeout = colorsNumber; // set the timeot stop the same as the color blocks number

function handlePlayersTurn(index) {
  playersSequence.push(index);
  console.log(playersSequence + "🔥");

  document.querySelector(`.n${index}`).classList.add("active");
  setTimeout(() => { 
    document.querySelector(`.n${index}`).classList.remove("active");
   }, 800);

  if (playersSequence.length === 4) console.log("Player sequence is: " + playersSequence); // TEST

  // CHECKING WINNER 🎉
  if (playersSequence.length === 4) {
    if (JSON.stringify(playersSequence) === JSON.stringify(sequence)) {
      document.querySelector(".score").innerHTML++;

      document.querySelectorAll(".color-cont").forEach((elem, index) => {
        elem.removeEventListener("click", () => handlePlayersTurn(index));
      });

    } else {
      alert("Oops, the sequence is wrong! Better luck next time.");
      document.querySelector(".score").innerHTML = 0;
      sequence.length = 0; // resetting the arrs
      playersSequence.length = 0;
      timeout = colorsNumber;
    }
  }
}

// START GAME:
startBtn.addEventListener("click", () => {

  sequence.length = 0; // resetting the arrs
  playersSequence.length = 0;
  timeout = colorsNumber;

  const interval = setInterval(() => {
    if (timeout === 0) {
      clearInterval(interval);
    } else {
      timeout -= 1;
  
      const currentNumber = Math.trunc(Math.random() * colorsNumber);
      sequence.push(currentNumber); // remember the sequence 
      const currentElem = document.querySelector(`.n${currentNumber}`);
      currentElem.classList.add("active");

      if (sequence.length === 4) {
        console.log("Random sequence is: " + sequence); // TEST
        
        // only after the computer has ended it's turn, the colors become clickable for the player:
        document.querySelectorAll(".color-cont").forEach((elem, index) => {
          elem.addEventListener("click", () => handlePlayersTurn(index));
        });
      }
  
      setTimeout(() => { 
        currentElem.classList.remove("active");
       }, 800);
    };
  }, 1000);
  
});

console.log(document.querySelector(".score").innerHTML); // score elem

// number string boolean undefined null symbol bigint



