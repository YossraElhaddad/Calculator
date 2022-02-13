let result = document.querySelector('.result');
let input = "";
let textInput = [];
let operatorInput = [];
const buttons = document.querySelectorAll('button');

function add(num1, num2) {
    return (num1 + num2);
}

function subtract(num1, num2) {
    return (num1 - num2);
}

function multiply(num1, num2) {
    return (num1 * num2);
}

function divide(num1, num2) {
    if (num2 == 0)
        return "Error";
    else
        return (num1 / num2);
}

function operate(operator, num1, num2) {
    let result = 0;
    num1 = +num1;
    num2 = +num2;
    if (operator === "+")
        result = add(num1, num2);
    else if (operator === "-")
        result = subtract(num1, num2);
    else if (operator === "*")
        result = multiply(num1, num2);
    else
        result = divide(num1, num2);
    return result;

}

function clear() {
    input = "";
    result.textContent = "";
    textInput = [];
    operatorInput = [];
}

buttons.forEach((button) => {

    button.addEventListener('click', () => {

        if (button.className === "clear")
            clear();


        else if (button.className === "positive-negative") {
            if (result.textContent) {
                result.textContent = "" + (- +(result.textContent));
                input = result.textContent;
            }

        } else if (button.className === "percentage") {
            if (result.textContent) {
                result.textContent = "" + (+(result.textContent) * 0.01);
                input = result.textContent;
            }
        } else if (button.className === "number") {
            input += button.textContent;
            result.textContent = input;

        } else if (button.className === "operator") {
            //evaluate only two operands at a time
            if (operatorInput.length < 2 && textInput.length < 2) {
                let operator = button.textContent;
                textInput.push(result.textContent);
                operatorInput.push(operator);
                input = "";

                if (textInput.length == 2 && operatorInput.length == 2) {
                    input = operate(operatorInput[0], textInput[0], textInput[1]).toFixed(3).toString();

                    if (!Number.isInteger(input))
                        input = input.toFixed();
                    input = input.toString();

                    textInput = [];

                    if (operatorInput[1] === "=")
                        operatorInput = [];
                    else {
                        operatorInput.shift();
                        textInput.push(input);
                    }

                    result.textContent = input;
                    input = "";
                }
            }

        }

    });
});