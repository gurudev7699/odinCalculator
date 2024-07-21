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

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        handleNumber(e.target.textContent)  
        currentDisplay.textContent= currentValue
    });
});

operators.forEach((op) => op.addEventListener("click", function(e){
    handleOperator(e.target.textContent)
    if(!opInput) {
        previousDisplay.textContent = previousValue + " " + operator;
        currentDisplay.textContent = currentValue;
    }else {
        currentDisplay.textContent = Number(previousDisplay) + Number(currentDisplay)
    }
 
    
}))


function handleNumber(num){
    if(currentValue.length <= 5){
        currentValue += num; 
    }
}

function handleOperator(op){
    operator =op;
    previousValue = currentValue;
    currentValue = '';
}

clear.addEventListener("click", function(){
    previousValue = '';
    currentValue = '';
    operator = '';
    previousDisplay.textContent = currentValue;
    currentDisplay.textContent = currentValue;
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
    currentValue = previousValue.toString();
}

equals.addEventListener("click", function(){
    if(currentValue != '' && previousValue != ''){
        calculate()
        previousDisplay.textContent = '';
        if(previousValue.length <= 5){
            currentDisplay.textContent = previousValue;
        } else{
            currentDisplay.textContent = previousValue.slice(0,5) + "...";
        }
    }
})