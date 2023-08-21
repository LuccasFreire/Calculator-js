const previousOperationText = document.querySelector("#previous-operations");
const currentOperationText = document.querySelector("#current-operations");
const buttons = document.querySelectorAll("#buttons button");
console.log(2313);

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperator = "";
  }

  addDigit(digit) {
    if (currentOperationText.innerText.includes(".") && digit === ".") {
      return;
    }
    this.currentOperator = digit;
    this.updateScreen();
  }
  processOperator(operator) {
    if (currentOperationText.innerText === "" && operator !== "C") {
      if (previousOperationText.innerText !== "") {
        this.changeOperation(operator);
      }
      return;
    }

    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operator) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operator, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operator, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operator, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operator, current, previous);
        break;
      case "CE":
        this.processClearEverything();
        break;
      case "C":
        this.processClearAll();
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "=":
        this.processEquals();
        break;
      default:
        return;
    }
  }

  processDelOperator() {
    this.currentOperationText.innerText = currentOperationText.innerText.slice(
      0,
      -1
    );
  }
  processClearEverything() {
    this.currentOperationText.innerText = "";
  }

  changeOperation() {
    const mathOperations = ["*", "/", "+", "-"];

    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }
  processClearAll() {
    currentOperationText.innerText = "";
    previousOperationText.innerText = "";
  }
  processEquals() {
    let operation = this.previousOperationText.innerText.split(" ")[1];
    this.processOperator(operation);
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperator;
    } else {
      if (previous === 0) {
        operationValue = current;
      }
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperator(value);
    }
  });
});
