const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', inputButton));

let buttonId = '';
let numA = null;
let numB = null;
let operatorType = '';
let prevOperator = '';
let mainDisplay = document.querySelector('#mainDisplay');
let prevDisplay = document.querySelector('#prevDisplay');

function inputButton(e) {
	buttonId = this.id;
	buttonContent = this.textContent;
	isNaN(buttonId) ? setOperatorInput() : setNumInput();
}

function setNumInput() {
	if (numB == null) {
			numA = buttonId;
			mainDisplay.textContent += `${numA}`;
			numA = parseInt(mainDisplay.textContent);
	} else {
			numB = buttonId;
			mainDisplay.textContent += `${numB}`;
			numB = parseInt(mainDisplay.textContent);
	}
}

function setOperatorInput() {
	if (numB != null) {
		if (buttonId == 'operate') {
			operate(prevOperator, numA, numB);
		} else {
		operate(buttonId, numA, numB);
		numB = numA
		prevDisplay.textContent = numB + buttonContent;
		mainDisplay.textContent = '';
		}
	} else {
		switch (buttonId) {
			case 'clear':
				console.log('CLEAR ALL');
				break;
			case 'delete':
				console.log('DELETE');
				break;
			case 'power':
				console.log('POWER');
				break;
			case 'parity':
				console.log('PARITY');
				break;
			case 'divide':
				console.log('DIVIDE');
				break;
			case 'multiply':
				console.log('MULTIPLY');
				break;
			case 'subtract':
				console.log('SUBTRACT');
				break;
			case 'add':
			console.log('passed');
				numB = numA
			    prevDisplay.textContent = numB + '+';
			    mainDisplay.textContent = '';
			    prevOperator = 'add';
				break;
			case 'operate':
				return operate(operatorType, numA, numB);
		};
	};
}

function operate(operator,a,b) {
	switch (operator) {
		case 'add':
			numA = add(numA, numB);
			numB = null;
			prevDisplay.textContent = `${numA}`;
			mainDisplay.textContent = '';
		case 'subtract':
			return subtract(a, b);
		case 'multiply':
			return multiply(a, b);
		case 'divide':
			return divide(a, b);
	};
}

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