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
	if (numB === null) {
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
	if (numB !== null) {
		if (buttonId === 'operate' && numB === undefined) {return};

		if (buttonId === 'operate') {
			operate(prevOperator, numA, numB);
			return;
		} else if (numB === undefined) {
			prevDisplay.textContent = numA + buttonContent;
			mainDisplay.textContent = '';
			prevOperator = buttonId;
			return;
		} else {
		operate(prevOperator, numA, numB);
		prevDisplay.textContent = numA + buttonContent;
		mainDisplay.textContent = '';
		numB = undefined;
		prevOperator = buttonId;
		}
	} else {
		if (buttonId === 'operate') {return};
		prevDisplay.textContent = numA + buttonContent;
		mainDisplay.textContent = '';
		prevOperator = buttonId;
		numB = undefined;
	};
}

function setNewExpression() {
	numB = numA
	prevDisplay.textContent = numB + buttonContent;
	mainDisplay.textContent = '';
	prevOperator = buttonId;
}

function operate(operator,a,b) {
	switch (operator) {
		case 'add':
			numA = a + b;;
			numB = null;
			prevDisplay.textContent = `${numA}`;
			mainDisplay.textContent = '';
			break;
		case 'subtract':
			numA = a - b;
			numB = null;
			prevDisplay.textContent = `${numA}`;
			mainDisplay.textContent = '';
			break;
		case 'multiply':
			numA = a * b;
			numB = null;
			prevDisplay.textContent = `${numA}`;
			mainDisplay.textContent = '';
			break;
		case 'divide':
			if (b == 0) {
				alert('You just destroyed the world by dividing by 0 and creating a singularity!');
			}
			numA = a / b;
			numB = null;
			prevDisplay.textContent = `${numA}`;
			mainDisplay.textContent = '';
			break;
	};
}