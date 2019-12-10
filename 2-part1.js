const program = [
    1, 12, 2, 3,
    1, 1, 2, 3,
    1, 3, 4, 3,
    1, 5, 0, 3,
    2, 1, 10, 19,
    1, 6, 19, 23,
    1, 13, 23, 27,
    1, 6, 27, 31,
    1, 31, 10, 35,
    1, 35, 6, 39,
    1, 39, 13, 43,
    2, 10, 43, 47,
    1, 47, 6, 51,
    2, 6, 51, 55,
    1, 5, 55, 59,
    2, 13, 59, 63,
    2, 63, 9, 67,
    1, 5, 67, 71,
    2, 13, 71, 75,
    1, 75, 5, 79,
    1, 10, 79, 83,
    2, 6, 83, 87,
    2, 13, 87, 91,
    1, 9, 91, 95,
    1, 9, 95, 99,
    2, 99, 9, 103,
    1, 5, 103, 107,
    2, 9, 107, 111,
    1, 5, 111, 115,
    1, 115, 2, 119,
    1, 9, 119, 0,
    99, 2, 0, 14,
    0
];

function execute() {
    let operatorFunction;

    function addition(first, second) {
        return first + second;
    }

    function multiply(first, second) {
        return first * second;
    }

    for (let i = 0; i <= program.length - 4; i = i + 4) {
        let optCode = program[i];

        if (optCode === 99) {
            console.log('Halt program. First value: ', program[0]);
            break;
        } else if (optCode === 1) {
            operatorFunction = addition;
        } else if (optCode === 2) {
            operatorFunction = multiply;
        }

        program[program[i + 3]] = operatorFunction(program[program[i + 1]], program[program[i + 2]]);
    }
}

execute();