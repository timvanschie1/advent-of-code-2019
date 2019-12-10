const program = [
    1, 0, 0, 3,
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

function tryCombination(noun, verb) {
    let memory = [...program];
    memory[1] = noun;
    memory[2] = verb;

    let operatorFunction;

    function addition(first, second) {
        return first + second;
    }

    function multiply(first, second) {
        return first * second;
    }

    for (let i = 0; i <= memory.length - 4; i = i + 4) {
        let optCode = memory[i];

        if (optCode === 99) {
            if (memory[0] === 19690720) {
                console.log('Halt program. Output is 19690720. Noun: ', noun, 'Verb: ', verb);
                return false;
            }
            break;
        } else if (optCode === 1) {
            operatorFunction = addition;
        } else if (optCode === 2) {
            operatorFunction = multiply;
        } else {
            break;
        }

        memory[memory[i + 3]] = operatorFunction(memory[memory[i + 1]], memory[memory[i + 2]]);
    }

    return true;
}

function execute () {
    let noun = 1;
    let verb = 1;
    let keepTrying = true;
    const maximum = 1000;

    while (keepTrying) {
        keepTrying = tryCombination(noun, verb);

        noun++;

        if (noun === maximum) {
            noun = 1;
            verb++;

            if (verb === maximum) {
                keepTrying = false;
            }
        }
    }
}

execute();