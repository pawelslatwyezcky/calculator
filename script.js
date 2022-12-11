const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitngNextValue = false;

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

function sendNumberValue(number) {
    if (awaitngNextValue) {
        calculatorDisplay.textContent = number;
        awaitngNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent =  displayValue === '0'? number : displayValue + number;
    }
}

function addDecimal() {
    // If operator pressed - dont add decimal
    if(awaitngNextValue) return; 
    // If no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent =  `${calculatorDisplay.textContent}.`;
    }
}

function resetAll() {
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitngNextValue = false;
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if(awaitngNextValue && operatorValue) {
        operatorValue = operator;
        return
    }; 
    // assign first value if no
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        console.log(firstValue, operatorValue, currentValue)
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    };
    awaitngNextValue = true;
    operatorValue = operator;
}

// Add Even Listenters

inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        // 
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        // 
        inputBtn.addEventListener('click', addDecimal);
    }
});

clearBtn.addEventListener('click', resetAll);