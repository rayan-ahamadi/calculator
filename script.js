let a = 0;
let b = 0;
let listButtons = ["AC","+/-","%","/","7","8","9","x","4","5","6","-","1","2","3","+","0",".","="];
const buttonContainer = document.querySelector('.calculator .content .buttons');
const displayResult = document.querySelector('.calculator .content .display .display-result output');
const displayOperation = document.querySelector('.calculator .content .display .display-operation output');


for(let button in listButtons){
    let buttonElement = document.createElement('button');
    buttonElement.textContent = listButtons[button];
    buttonElement.classList.add('button');
    buttonElement.style["font-size"] = "23px"
    buttonElement.style["border-radius"] = "50%"
    buttonElement.style["border"] = "3px solid #333"
    buttonElement.style["cursor"] = "pointer"
    buttonElement.style[":hover"] = "background-color: #333"
    if(listButtons[button] === "AC"){
        buttonElement.addEventListener("click",() => {
            displayOperation.textContent = ''
            displayResult.textContent = ''    
        }
        )

    }else if(!(listButtons[button] === "=")){
        buttonElement.addEventListener('click',() => {
            displayOperation.textContent += listButtons[button];
        })
    }else{
        buttonElement.addEventListener("click", () => {
            let operator = getOperator(displayOperation.textContent)
            let a = getOperandA(displayOperation.textContent);
            let b = getOperandB(displayOperation.textContent);
            displayResult.textContent = `${operate(operator,a,b)}`
        })
    }
    if((listButtons[button] === "+") || (listButtons[button] === "-") || (listButtons[button] === "x") || (listButtons[button] === "/")){
        buttonElement.addEventListener("click", () => {
             if((displayResult.textContent === "") == false && getOccurenceOperator(displayOperation.textContent) === 1){
                 let getNewOperand = displayResult.textContent
                 displayResult.textContent = ""
                 //Nouvelle opération
                 displayOperation.textContent = `${getNewOperand}${listButtons[button]}`
             }
            if(getOccurenceOperator(displayOperation.textContent) > 1){
                let newOperation = displayOperation.textContent.slice(0,-1)
                displayOperation.textContent = newOperation
                let operator = getOperator(displayOperation.textContent)
                let a = getOperandA(displayOperation.textContent);
                let b = getOperandB(displayOperation.textContent);
                displayResult.textContent = `${operate(operator,a,b)}`
                displayOperation.textContent = `${displayResult.textContent}${listButtons[button]}`
            }
 
        })    
     
     }
    buttonContainer.appendChild(buttonElement);
}

function addition(a,b){
    return a+b;
}

function subtraction(a,b){
    return a-b;
}

function multiplication(a,b){
    return a*b;
}

function division(a,b){
    return a/b;
}

function operate(operator,a,b){
    switch(operator){
        case '+':
            return addition(a,b);
        case '-':
            return subtraction(a,b);
        case 'x':
            return multiplication(a,b);
        case '/':
            return division(a,b);
    }
}

function getOperator(str){
    if(str.includes("+")){
        return "+"
    }else if(str.includes("x")) {
        return "x"
    }else if(str.includes("/")) {
        return "/"
    }else if(str.includes("-")){
        return "-"
    }
}

function getOccurenceOperator(str){
    let array = str.split('')
    let nbOcc = 0;
    for(let i = 0; i<array.length;i++){
        if(array[i] === "+" ||array[i] === "x" ||array[i] === "-" ||array[i] === "/" ){
            nbOcc++
        }
    }
    return nbOcc
}

function getOperandA(str){
    // retirer l'opérateur et la deuxième opérande de la string
    return parseInt(str.substr(0,str.indexOf(getOperator(str))))
}

function getOperandB(str){
    // retirer l'opérateur ("+1") et la première opérande de la string
    return parseInt(str.substr(str.indexOf(getOperator(str)) +1))
}

function isNotNumber(char){
    if((char.charCodeAt(0)) < 48 && (char.charCodeAt(0)) > 57){
        return true
    }
    return false
}
