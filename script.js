let previousDisplay = document.querySelector('.previous');
let currentDisplay = document.querySelector('.current');
let clear = document.querySelector('#clear-btn');
let equals = document.querySelector('.equal');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let decimal = document.querySelector('.decimal');

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
        //currentDisplay        .textContent = currentValue;
}))


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
    } else{
        previousValue /= currentValue;
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