console.clear();

let currentValue = "";
let previousValue = "";
let lastDisplay = "";
let currentOp = "";

const clear = document.querySelector(".clear");
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const decimal = document.querySelector(".decimal");
const equal = document.querySelector(".equal");
const minus = document.querySelector(".minus");
const display = document.querySelector(".display");
const currentDisplay = document.querySelector(".current-display");
const previousDisplay = document.querySelector(".previous-display");
const errorMessage = document.querySelector(".error-message");

function add() {
  let firstNum = parseFloat(previousValue);
  let secondNum = parseFloat(currentValue);
  let result = firstNum + secondNum;
  return result;
}
function subtract() {
  let firstNum = parseFloat(previousValue);
  let secondNum = parseFloat(currentValue);
  let result = firstNum - secondNum;
  return result;
}
function multiply() {
  let firstNum = parseFloat(previousValue);
  let secondNum = parseFloat(currentValue);
  let result = firstNum * secondNum;
  return result;
}
function divide() {
  if (currentValue === "0") {
    errorMessage.style.display = "flex";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 5000);
    clearDisplay();
    return;
  }

  let firstNum = parseFloat(previousValue);
  let secondNum = parseFloat(currentValue);
  let result = firstNum / secondNum;
  return result;
}

errorMessage.addEventListener("click", () => {
  errorMessage.style.display = "none";
});
number.forEach((num) => {
  num.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(num) {
  if (currentValue.length <= 9) {
    currentValue += num;
  }
  currentDisplay.innerHTML = currentValue;
}

operator.forEach((op) => {
  op.addEventListener("click", (e) => {
    // if (!currentDisplay.innerHTML === "" && !previousDisplay.innerHTML === "") {
    // }
    handleOperator(e.target.textContent);

    // previousDisplay.innerHTML = previousValue + currentOp;
    // currentDisplay.innerHTML = currentValue;
  });
});

function handleOperator(op) {
  if (currentValue !== "" && previousValue !== "") {
    getResult();
  }
  currentOp = op;
  previousValue = currentValue;
  currentValue = "";
  previousDisplay.innerHTML = previousValue + currentOp;
  currentDisplay.innerHTML = currentValue;
}

function handleMinus() {
  if (currentValue === "") {
    currentValue = "-";
    currentDisplay.innerHTML = currentValue;
  } else handleOperator("-");
}
function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
    currentDisplay.innerHTML = currentValue;
  }
}

function clearDisplay() {
  currentValue = "";
  previousValue = "";
  lastDisplay = "";
  currentOp = "";
  currentDisplay.innerHTML = "";
  previousDisplay.innerHTML = "";
}

function getResult() {
  if (currentValue === "") {
    return;
  }
  if (currentOp == "+") {
    currentDisplay.innerHTML = add(previousValue, currentValue).toFixed(2);
    if (currentDisplay.innerHTML.includes(".00")) {
      currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -3);
    }
  }
  if (currentOp == "-") {
    currentDisplay.innerHTML = subtract(previousValue, currentValue).toFixed(2);
    if (currentDisplay.innerHTML.includes(".00")) {
      currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -3);
    }
  }
  if (currentOp == "x") {
    currentDisplay.innerHTML = multiply(previousValue, currentValue).toFixed(2);
    if (currentDisplay.innerHTML.includes(".00")) {
      currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -3);
    }
  }
  if (currentOp == "/") {
    currentDisplay.innerHTML = divide(previousValue, currentValue).toFixed(2);
    if (currentDisplay.innerHTML.includes(".00")) {
      currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -3);
    }
  }

  previousDisplay.innerHTML = "";
  currentValue = currentDisplay.innerHTML;
}

document.addEventListener("keydown", (event) => {
  event.key >= "0" && event.key <= "9"
    ? handleNumber(event.key)
    : event.key === "Escape" || event.key == "Delete"
    ? clearDisplay()
    : event.key === "Enter"
    ? getResult()
    : event.key === "+"
    ? handleOperator("+")
    : event.key === "-"
    ? handleMinus()
    : event.key === "*"
    ? handleOperator("*")
    : event.key === "/"
    ? handleOperator("/")
    : event.key === "."
    ? addDecimal()
    : null;
});
