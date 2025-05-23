//Selección de los elementos del Document Object Model (DOM) de la página web.
const operationElement = document.getElementById('operation');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit-answer');
const resultElement = document.getElementById('result');
const additionBtn = document.getElementById('addition-btn');
const subtractionBtn = document.getElementById('subtraction-btn');
const multiplicationBtn = document.getElementById('multiplication-btn');
const divisionBtn = document.getElementById('division-btn');
const scoreElement = document.getElementById('score');

//Declaración de variables a utilizar en el proceso
let currentOperation = '';
let num1;
let num2;
let currentAnswer;
let score = 0;

// Esta función genera una nueva pregunta matemática basada en el tipo de operación especificado.
function generateQuestion(type) {
    num1 = Math.floor(Math.random() * 10) + 1; // Números del 1 al 10
    num2 = Math.floor(Math.random() * 10) + 1;

// La estructura 'switch' se utiliza para ejecutar diferentes bloques de código, dependiendo del valor de la variable 'type'.
    switch (type) {
        case 'addition':
            currentOperation = `${num1} + ${num2} = ?`;
            currentAnswer = num1 + num2;
            break;
        case 'subtraction':
            // Asegurar que el resultado no sea negativo
            if (num1 < num2) {
                [num1, num2] = [num2, num1];
            }
            currentOperation = `${num1} - ${num2} = ?`;
            currentAnswer = num1 - num2;
            break;
        case 'multiplication':
            currentOperation = `${num1} x ${num2} = ?`;
            currentAnswer = num1 * num2;
            break;
        case 'division':
            // Asegurar una división entera
            currentAnswer = num1;
            num1 = num1 * num2;
            currentOperation = `${num1} ÷ ${num2} = ?`;
            break;
        default:
            break;
    }
    operationElement.textContent = currentOperation;
    answerInput.value = '';
    resultElement.textContent = '';
    resultElement.className = ''; // Limpiar clases de resultado anteriores
}

// Función para generar un mensaje de error más específico
function generateErrorMessage(userAnswer, correctAnswer, operation) {
    let message = '¡Incorrecto!';
    switch (operation) {
        case 'addition':
            message += ` La suma de los números era ${correctAnswer}. Tú respondiste ${userAnswer}.`;
            break;
        case 'subtraction':
            message += ` La diferencia de los números era ${correctAnswer}. Tú respondiste ${userAnswer}.`;
            break;
        case 'multiplication':
            message += ` El producto de los números era ${correctAnswer}. Tú respondiste ${userAnswer}.`;
            break;
        case 'division':
            message += ` El cociente de los números era ${correctAnswer}. Tú respondiste ${userAnswer}.`;
            break;
        default:
            message += ` La respuesta correcta era ${correctAnswer}. Tú respondiste ${userAnswer}.`;
            break;
    }
    return message;
}

// Función para verificar la respuesta
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    const operationType = getCurrentOperationType();

    if (!isNaN(userAnswer)) {
        if (userAnswer === currentAnswer) {
            resultElement.textContent = `¡Correcto! El resultado es ${currentAnswer}`;
            resultElement.className = 'correct'; // Añadir clase para color verde
            score++;
            scoreElement.textContent = `Puntuación: ${score}`;
        }else {
            resultElement.textContent = generateErrorMessage(userAnswer, currentAnswer, operationType);
            resultElement.className = 'incorrect'; // Añadir clase para color rojo
        }
        answerInput.value = ''; // Limpiar el input después de comprobar
    }else {
        resultElement.textContent = 'Por favor, introduce un número.';
        resultElement.className = 'warning'; // O alguna clase de advertencia
    }
}

//función del botón sumar
additionBtn.addEventListener('click', () => {
    generateQuestion('addition');
    setActiveButton(additionBtn);
});

//función del botón restar
subtractionBtn.addEventListener('click', () => {
    generateQuestion('subtraction');
    setActiveButton(subtractionBtn);
});

//función del botón multiplicar
multiplicationBtn.addEventListener('click', () => {
    generateQuestion('multiplication');
    setActiveButton(multiplicationBtn);
});

//función del botón dividir
divisionBtn.addEventListener('click', () => {
    generateQuestion('division');
    setActiveButton(divisionBtn);
});

//selección del tipo de operación
function getCurrentOperationType() {
    if (currentOperation.includes('+')) return 'addition';
    if (currentOperation.includes('-')) return 'subtraction';
    if (currentOperation.includes('x')) return 'multiplication';
    if (currentOperation.includes('÷')) return 'division';
    return '';
}

//función para resaltar el estado visual de los botones
function setActiveButton(button) {
    const buttons = document.querySelectorAll('#controls button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// Evento para el botón "Comprobar"
submitButton.addEventListener('click', checkAnswer);

// Permitir que se presione "Enter" para comprobar la respuesta
answerInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// Generar la primera pregunta al cargar la página (suma por defecto)
generateQuestion('addition');
setActiveButton(additionBtn);


//Cambia el color del background
document.addEventListener('DOMContentLoaded', function() {
    const cambiarColorBtn = document.getElementById('cambiarColorBtn');
    const body = document.body;
    const colores = ['aquamarine', 'blueviolet','brown', 'cadetblue', 'crimson', 'darkblue', 'darkcyan', 'darkred', 'goldenrod', 'grey', 'paleturquoise','skyblue', 'springgreen', 'teal','violet']; // Array de colores

    cambiarColorBtn.addEventListener('click', function() {
        const indiceAleatorio = Math.floor(Math.random() * colores.length);
        const colorAleatorio = colores[indiceAleatorio];
        body.style.backgroundColor = colorAleatorio;
    });
});