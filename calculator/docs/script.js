const DISPLAY = document.querySelector('.display');

let displayArray_top = [];
let displayArray_bottom = [];

window.onload = () => {
    keypadInit(); 
}

function keypadInit(){
    let keys = ['%', '+/-', 'C', 'DEL',
                '1', '2', '3', '/',
                '4', '5', '6', '*', 
                '7', '8', '9', '-',
                '.', '0', '=', '+',
                ]; 
    let keypadSection = document.querySelector('.keypad'); 
    for(let key of keys){
        let button = document.createElement('button'); 
        button.innerHTML = key; 
        button.id = key;
        button.className = 'key';  
        button.addEventListener('click', getValue); 
        keypadSection.appendChild(button); 
    }   
}

function getValue(event){
    let value = event.target.textContent; 
    let temp;
    switch(value){
        case 'DEL': // delete one character at a time
            temp = displayArray_bottom.join(' ');
            temp = temp.substr(0, temp.length - 1) // exclude the last character entered 
                       .trim() // trim() for removing the trailing whitespace after an entire number or an operator is deleted               
                       .split(' '); 
            displayArray_bottom = [...temp];
            break;
        case 'C':
            displayArray_top = [];
            displayArray_bottom = [];
            break;
        case '.':
            break;
        case '+/-':
            break; 
        case '%':
            break; 
        case '+':
        case '-':
        case '*':
        case '/':
            if(!displayArray_bottom.length) break; // if no data is entered
            if(isNaN(+displayArray_bottom.slice(-1))) break; // last input was non-numeric 
            displayArray_bottom.push(value);
            break;
        case '=':
            if(!displayArray_bottom.length) break; // if no data is entered
            if(isNaN(+displayArray_bottom.slice(-1))) break; // last input was non-numeric

            while(displayArray_bottom.length > 1){ // only till there is only one number left i.e. the final result
               
                let num1 = +displayArray_bottom.shift(); 
                let op = displayArray_bottom.shift(); 
                let num2 = +displayArray_bottom.shift(); 
                
                displayArray_bottom.unshift(operator(num1, num2, op)); // place the result back
            }

            displayArray_top[0] = displayArray_bottom.shift();  

            break;    
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':  
            temp = '';
            if(Number.isInteger(+displayArray_bottom.slice(-1)) && displayArray_bottom.length){ // if the last element was also a number (i.e. previous character was not an operator) 
                                                                                  // && it is NOT the first digit to be entered (otherwise undefined is popped out)
                temp = displayArray_bottom.pop(); 
            }
            temp += value; // build the number 
            displayArray_bottom.push(temp); 
            break;
    }   
    setDisplay(); 
}

function setDisplay(){
    document.querySelector('.display .display__bottom').textContent = displayArray_bottom.join(' '); 
    document.querySelector('.display .display__top').textContent = displayArray_top;
    console.log(displayArray_top, displayArray_bottom);
}

function add(a, b){
    return a + b; 
}
function subtract(a, b){
    return a - b; 
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return Number.parseFloat(a / b).toFixed(3); 
}

function operator(a, b, op){
    switch(op){
        case '+': 
            return add(a, b); 

        case '-': 
            return subtract(a, b); 
            
        case '*': 
            return multiply(a, b); 

        case '/': 
            return divide(a, b); 
    }
}

