const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', inputButton));
let buttonId;
let prevTotal;
let total;

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function operate(operator,a,b) {
	switch (operator) {
		case 'add':
			return add(a, b);
			break;
		case 'subtract':
			return subtract(a, b);
			break;
		case 'multiply':
			return multiply(a, b);
			break;
		case 'divide':
			return divide(a, b);
			break;
	}
}

function inputButton(e) {
	buttonId = this.id;
	isNaN(buttonId) ? setOperatorInput() : setNumInput();
}

function setOperatorInput() {
	console.log('this is a operator input');
}

function setNumInput() {
	console.log('this is a number input');
}