class Calculator {

    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }
    clear(){
        this.currentOperand= '';
        this.previousOperand= '';
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes ('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){

        if(this.currentOperand  === '' && this.previousOperand !== '') {
            this.operation = operation;
            this.updateDisplay();
            return;
        }
        if(this.currentOperand === null) return;
        
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(curr)) return;

        switch (this.operation){
            case '+': 
                computation = prev + curr;
                break;
            case '-': 
                computation = prev - curr;
                break;
            case '*': 
                computation = prev * curr;
                break;
            case '÷': 
                computation = prev / curr;
                break;
            default:
                return
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplay(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
       
        let integerDisplay;

        if(isNaN(integerDigits)){
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0});

        }
        if((decimalDigits) != null){
            return `${integerDisplay}.${decimalDigits}`;
        }
        else {
            return integerDisplay;
        }
    }
    updateDisplay(){
        this.currentOperandText.innerText = this.getDisplay(this.currentOperand);

        if(this.operation != null){
            this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
        }
        else{
            this.previousOperandText.innerText = '';
        }

    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]')
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandText = document.querySelector('[data-previous]');
const currentOperandText = document.querySelector('[data-current]');


const calculator = new Calculator(previousOperandText, currentOperandText);


numberButtons.forEach((button) => {
    button.addEventListener("click" , () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operatorButtons.forEach((button) => {
    button.addEventListener("click" , () =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})


equalsButton.addEventListener("click" , button =>{
    calculator.compute();
    calculator.updateDisplay();

})

allClearButton.addEventListener("click" , button =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click" , button =>{
    calculator.delete();
    calculator.updateDisplay();
})