let OPERATION = [];
let OPERATOR = '';
let UPPERDISPLAY = '';
let RESULT = 0;

function startCalc() {
    let buttons = Array.from(document.querySelectorAll('button'));
    buttons.forEach(b => b.addEventListener('click', function() {btnClick(b)}))
}

function btnClick(b) {

    if(b.getAttribute("class") == 'number') {
        number(parseFloat(b.innerText));
    } else if (b.getAttribute("class") == 'operator') {
        operator(b.innerText);
    }else if (b.getAttribute("class") == 'equal') {
         operate();
    }else if (b.getAttribute("id") == 'clear') {
        clear();
    }else if (b.getAttribute("id") == 'reset') {
        reset();
    }else if (b.getAttribute("id") == 'decimal') {
        decimalPoint();
    }
}

function decimalPoint() {
    let lowerDisplay = document.querySelector('#lower_display');

    if (lowerDisplay.innerText.length == 0) {
        lowerDisplay.innerText = '0.';
    } else if (!isNaN(lowerDisplay.innerText)) {
        lowerDisplay.innerText += '.';
    }
    
}

function number(num) {

    let lowerDisplay = document.querySelector('#lower_display');
    lowerDisplay.innerText += num;

}

function operator(operator) {
    
    let lowerDisplay = document.querySelector('#lower_display');
    
    if (lowerDisplay.innerText.length >= 0) {
        if (lowerDisplay.innerText.length == 0) {
            OPERATION[OPERATION.length - 1] = operator;
        } else {
            OPERATION.push(lowerDisplay.innerText, operator);
        }
        
        clear();
        topDisplay();
    } 
}

function lowDisplay(num) {
    let bottomDisplay = document.querySelector('#lower_display');
    bottomDisplay.innerText = OPERATION[OPERATION.length - 1];
}

function topDisplay() {
    let topDisplay = document.querySelector('#upper_display');   
    UPPERDISPLAY = '';
    OPERATION.forEach(ops => UPPERDISPLAY += ' ' + ops);
    topDisplay.innerText = UPPERDISPLAY;
}

function clear() {
    let bottomDisplay = document.querySelector('#lower_display');
    bottomDisplay.innerText = '';
}

function reset() {
    let bottomDisplay = document.querySelector('#lower_display');
    let topDisplay = document.querySelector('#upper_display');
    bottomDisplay.innerText = '';
    topDisplay.innerText = '';
    OPERATION = [];
    OPERATOR = '';
    UPPERDISPLAY = '';
    RESULT = 0;
}

function operate() {

    let num1Index = 0;
    let num2Index = 0;
    let opIndex = 0;
    let op = '';
    let result = 0;
    let bottomDisplay = document.querySelector('#lower_display');

    if (OPERATION.length == 0 || OPERATION.length == 1) {
        return;
    } else if (isNaN(OPERATION[OPERATION.length - 1])) {
        if (bottomDisplay.innerText.length == 0) {
            OPERATION.splice(OPERATION.length - 1);
        } else {
            OPERATION.push(bottomDisplay.innerText);
            topDisplay();
        }
    }

    while (OPERATION.length != 1) {

        if (OPERATION.indexOf('*') > 0) {
            opIndex = OPERATION.indexOf('*');
            op = 'multiply'
        } else if (OPERATION.indexOf('/') > 0) {
            opIndex = OPERATION.indexOf('/');
            op = 'divide'
        } else if (OPERATION.indexOf('+') > 0) {
            opIndex = OPERATION.indexOf('+');
            op = 'plus'
        } else if (OPERATION.indexOf('-') > 0) {
            opIndex = OPERATION.indexOf('-');
            op = 'minus'
        }

        num1Index = opIndex - 1;
        num2Index = opIndex + 1;
        result = calculations(num1Index, num2Index, op);

        OPERATION[opIndex] = result.toFixed(1);
        OPERATION.splice(num2Index,1);
        OPERATION.splice(num1Index,1);

    }
 
    bottomDisplay.innerText = OPERATION[0];
    OPERATION = [];
}

function calculations(num1, num2, op) {

    if (op == 'multiply') {
        return parseFloat(OPERATION[num1]) * parseFloat(OPERATION[num2]);
    } else if (op == 'divide') {
        if (parseInt(OPERATION[num2]) == 0) {
            alert('Division by zero is not allowed.');
            OPERATION = [];
        }
        return parseFloat(OPERATION[num1]) / parseFloat(OPERATION[num2]);
    } else if (op == 'plus') {
        return parseFloat(OPERATION[num1]) + parseFloat(OPERATION[num2]);
    } if (op == 'minus') {
        return parseFloat(OPERATION[num1]) - parseFloat(OPERATION[num2]);
    }
}

startCalc();