"strict";

// GET Necessary Elements

const bill = document.querySelector("#bill");
const numberOfPeople = document.querySelector("#number-of-people");
const tips = document.querySelectorAll(".tip");
const costumTip = document.querySelector("#costum-tip");
const displayTip = document.querySelector("#tip-amount");
const displayTotal = document.querySelector("#total-amount");
const reset = document.querySelector("#reset");
const errorMsg = document.querySelector(".error-msg");

//Decleare Necessary Variables

let billAmount,
  peopleAmount,
  tipAmount,
  currentTip = null;

//ADD NECEESERY EVENT LISTNERES

//Event listener for bill amount

bill.addEventListener("input", () => {
  try {
    billAmount = Number(bill.value);
    calculate(billAmount, peopleAmount, tipAmount);
  } catch {
    console.log("error");
  }
});

//Event listener for costum tip amount
costumTip.addEventListener("input", () => {
  try {
    try {
      tipAmount = Number(costumTip.value);
    } catch {
      console.log("error");
    }
    if (currentTip) currentTip.classList.toggle("selected");
    currentTip = null;
    calculate(billAmount, peopleAmount, tipAmount);
  } catch {
    console.log("error");
  }
});

//Event listener for number of people

numberOfPeople.addEventListener("input", () => {
  try {
    peopleAmount = Number(numberOfPeople.value);
    peopleAmount === 0
      ? (errorMsg.style.display = "block")
      : (errorMsg.style.display = "none");
    calculate(billAmount, peopleAmount, tipAmount);
  } catch {
    console.log("error");
  }
});

//Event listener for available tip amounts

for (let tip of tips) {
  tip.addEventListener("click", (e) => {
    if (currentTip) currentTip.classList.toggle("selected");
    currentTip = tip;
    currentTip.classList.toggle("selected");
    tipAmount = Number(currentTip.textContent.slice(0, -1));
    costumTip.value = "";
    calculate(billAmount, peopleAmount, tipAmount);
  });
}

//Event listener for reset button

reset.addEventListener("click", () => {
  billAmount = null;
  peopleAmount = null;
  tipAmount = null;
  bill.value = "";
  numberOfPeople.value = "";
  costumTip.value = "";
  if (currentTip) currentTip.classList.toggle("selected");
  currentTip = null;
  displayTip.textContent = "$0.00";
  displayTotal.textContent = "$0.00";
  errorMsg.style.display = "none";
  if (reset.classList.length === 2) reset.classList.toggle("selected");
});

//calulate function

function calculate(bill, people, tip) {
  if (people && bill && tip) {
    console.log(bill, people, tip);
    let tipAmount = Number(((bill * (tip / 100)) / people).toFixed(2));
    let total = ((tipAmount * people + bill) / people).toFixed(2);
    displayTip.textContent = "$" + tipAmount;
    displayTotal.textContent = "$" + total;
    if (reset.classList.length === 1) reset.classList.toggle("selected");
  }
  return 0;
}
