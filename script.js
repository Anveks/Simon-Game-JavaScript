
const startBtn = document.querySelector(".btn-start");

const sequence = [];
const playersSequence = [];
const gameCont = document.querySelector(".game-cont");
let colorsNumber = document.querySelector(".diff").value;

for (let i = 0; i < colorsNumber; i++) {
  const color = document.createElement("div");
  color.classList.add("color-cont");
  color.classList.add(`n${i}`);
  color.setAttribute("disabled", true);
  gameCont.appendChild(color);
};

let timeout = colorsNumber;

startBtn.addEventListener("click", () => {

  const interval = setInterval(() => {
    if (timeout === 0) {
      clearInterval(interval)
    } else {
      timeout -= 1;
  
      const currentNumber = Math.trunc(Math.random() * colorsNumber);
      sequence.push(currentNumber); // remember the sequence 
      const currentElem = document.querySelector(`.n${currentNumber}`);
      currentElem.classList.add("active");
  
      setTimeout(() => { 
        currentElem.classList.remove("active");
       }, 800);
    };
  }, 1000);
  
  console.log(sequence);

});

document.querySelectorAll(".color-cont").forEach((elem, index) => {
  elem.setAttribute("disabled", false);
  elem.addEventListener("click", () => {
    playersSequence.push(index);

    document.querySelector(`.n${index}`).classList.add("active");
    setTimeout(() => { 
      document.querySelector(`.n${index}`).classList.remove("active");
     }, 800);

    console.log(playersSequence);
  });
});


