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
	if (buttonId == 'decimal') {setNumInput();return;};
	isNaN(buttonId) ? setOperatorInput() : setNumInput();
}

function setNumInput() {
	if (buttonId == 'decimal') {
		mainDisplay.textContent += '.';
		return;
	}

	if (numB === null || isNaN(numA)) {
			numA = buttonId;
			mainDisplay.textContent += `${numA}`;
			numA = parseFloat(mainDisplay.textContent);
	} else {
			numB = buttonId;
			mainDisplay.textContent += `${numB}`;
			numB = parseFloat(mainDisplay.textContent);
	}
}

function setOperatorInput() {
	if (numA === null && numB === null) {return}

	switch (buttonId) {
		case 'clear':
			numA = null;
			numB = null;
			operatorType = '';
			prevOperator = '';
			mainDisplay.textContent = '';
			prevDisplay.textContent = '';
			return;

		case 'delete':
			if (prevDisplay.textContent == '') {
				a = String(mainDisplay.textContent).replace(/.$/, '');
				mainDisplay.textContent = a;
				numA = parseFloat(a);
				if (isNaN(numA)) {numB= null};
				return;
			} else if ((mainDisplay.textContent == '') && (String(prevDisplay.textContent).match(/(\+|\*|\^|-|%)$/g))) {
				a = String(prevDisplay.textContent).replace(/.$/, '');
				prevDisplay.textContent = a;
				prevOperator = null;
				return;
			} else if (mainDisplay.textContent == '') {
				a = String(prevDisplay.textContent).replace(/.$/,'');
				prevDisplay.textContent = a;
				numA = parseFloat(a);
				return;
			} else {
				a = String(mainDisplay.textContent).replace(/.$/, '');
				mainDisplay.textContent = a;
				numB = parseFloat(a);
				if (isNaN(numB)) {numB = undefined};
				return;
			};

		case 'parity':
			if ((mainDisplay.textContent == '' && prevDisplay.textContent == '') || 
				((String(prevDisplay.textContent).match(/(\+|\*|\^|-|%)$/g)) && mainDisplay.textContent == '')) {
					return;
				} else if (prevDisplay.textContent == '') {
					numA = -numA;
					mainDisplay.textContent = numA;
					return;
				} else if (mainDisplay.textContent == '') { 
					numA = -numA;
					prevDisplay.textContent = numA;
					return;
				} else if ((String(prevDisplay.textContent).match(/(\+|\*|\^|-|%)$/g)) && mainDisplay.textContent != '') {
					numB = -numB;
					mainDisplay.textContent = numB;
					return;
				} else {
					numB = -numB;
					mainDisplay.textContent = numB;
					return;
				}
	};
	if (numB !== null) {
		if (buttonId === 'operate' && numB === undefined) {return};
		if (prevOperator == null) {
			prevOperator = '';
			setOperatorInput();
		};

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

function operate(operator,a,b) {
	switch (operator) {
		case 'add':
			numA = a + b;
			setDisplay();
			break;
		case 'subtract':
			numA = a - b;
			setDisplay();
			break;
		case 'multiply':
			numA = a * b;
			setDisplay();
			break;
		case 'divide':
			if (b == 0) {
				alert('You just destroyed the world by dividing by 0 and creating a singularity!');
			}
			numA = a / b;
			setDisplay();
			break;
		case 'power':
			numA = Math.pow(a, b);
			setDisplay();
		case 'parity':
			numA = -numA;
	};
}

function setDisplay() {
	numB = null;
	prevDisplay.textContent = `${numA}`;
	mainDisplay.textContent = '';
}