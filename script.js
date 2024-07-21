let previousDisplay = document.querySelector('.previous');
let currentDisplay = document.querySelector('.current');
let clear = document.querySelector('#clear-btn');
let equals = document.querySelector('.equal');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let decimal = document.querySelector('.decimal');
let backspace = document.querySelector('#backspace');
let negate = document.querySelector('#negate');
let percentage = document.querySelector('#percentile');

let currentValue = ''
let previousValue = ''
let operator = ''
let resultDisplayed = false;

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        if(resultDisplayed) {
            currentValue = '';
            resultDisplayed= false;
        }
        handleNumber(e.target.textContent)  
        currentDisplay.textContent= currentValue
    });
});

operators.forEach((op) => op.addEventListener("click", function(e){
    handleOperator(e.target.textContent)
}))

backspace.addEventListener('click', function() {

    if (currentValue !== '') {
        currentValue = currentValue.slice(0, -1);
        currentDisplay.textContent = currentValue;
    }
})

negate.addEventListener('click', function() {
    if (currentValue.startsWith('-')) {
        currentValue = currentValue.slice(1);
    } else {
        currentValue = '-' + currentValue;
    }
    currentDisplay.textContent = currentValue;
});



function handleNumber(num){
    if(currentValue.length <= 5){
        currentValue += num; 
    }
}

function handleOperator(op){
    if (previousValue !== '' && currentValue !== '') {
        calculate();
        operator = op;
        previousDisplay.textContent = previousValue + ' ' + operator;
        currentDisplay.textContent = '';
        resultDisplayed = true;
    } else if (currentValue !== '') {
        operator = op;
        previousValue = currentValue;
        currentValue = '';
        previousDisplay.textContent = previousValue + ' ' + operator;
    }
}

clear.addEventListener("click", function(){
    previousValue = '';
    currentValue = '';
    operator = '';
    previousDisplay.textContent = currentValue;
    currentDisplay.textContent = currentValue;
    resultDisplayed =false;
})
decimal.addEventListener("click", function(){
    addDecimal();
})


function calculate() {
    currentValue = Number(currentValue);
    previousValue = Number(previousValue);

    if(operator === "+"){
        previousValue += currentValue;
    } else if(operator === "-"){
        previousValue -= currentValue;
    } else if(operator === "x"){
        previousValue *= currentValue;
    } else if( operator === "/") {
        previousValue /= currentValue;
    }else {
        previousValue = (previousValue * currentValue)/100
    }
    previousValue = previousValue.toString();
    currentValue = ''
}

equals.addEventListener("click", function(){
    if(currentValue != '' && previousValue != ''){
        calculate()
        previousDisplay.textContent = '';
     currentDisplay.textContent = previousValue;
     currentValue = previousValue;
     previousValue = '';
     operator = ''
     resultDisplayed= true
    }
})

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += '.';
    }
}