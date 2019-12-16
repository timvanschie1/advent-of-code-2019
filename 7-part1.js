const puzzleInput = require('./7-puzzleInput');

function getAmplifierOutput(firstInput, secondInput, program) {
    let input = firstInput;
    let memory = [...program];

    function addition(first, second) {
        return first + second;
    }

    function multiply(first, second) {
        return first * second;
    }

    let i = 0;
    while (i <= memory.length) {
        const valueString = memory[i].toString();
        const optCode = valueString.length === 1 ? Number(valueString) : Number(valueString.slice(-2));

        if (optCode === 99) {
            console.log('Halt program');
            return;
        }

        if (optCode === 3) {
            memory[memory[i + 1]] = input;
            console.log('Inputted', input);
            input = secondInput;
            i = i + 2;
            continue;
        }

        const firstParamMode = Number(valueString.slice(-3, -2));
        const secondParamMode = Number(valueString.slice(-4, -3));
        const value1 = firstParamMode === 0 ? memory[memory[i + 1]] : memory[i + 1];
        const value2 = secondParamMode === 0 ? memory[memory[i + 2]] : memory[i + 2];

        if (optCode === 1) {
            memory[memory[i + 3]] = addition(value1, value2);
            i = i + 4;
        }

        if (optCode === 2) {
            memory[memory[i + 3]] = multiply(value1, value2);
            i = i + 4;
        }

        if (optCode === 4) {
            return value1;
        }

        if (optCode === 5) {
            i = (value1 !== 0) ? value2 : i + 3;
            continue;
        }

        if (optCode === 6) {
            i = (value1 === 0) ? value2 : i + 3;
            continue;
        }

        if (optCode === 7) {
            memory[memory[i + 3]] = (value1 < value2) ? 1 : 0;
            i = i + 4;
            continue;
        }

        if (optCode === 8) {
            memory[memory[i + 3]] = (value1 === value2) ? 1 : 0;
            i = i + 4;
        }
    }
}

function getAllPhaseSettingCombinations() {
    let allCombinations = [];

    for (let a = 0; a < 5; a++) {
        for (let b = 0; b < 5; b++) {
            for (let c = 0; c < 5; c++) {
                for (let d = 0; d < 5; d++) {
                    for (let e = 0; e < 5; e++) {
                        allCombinations.push([a, b, c, d, e]);
                    }
                }
            }
        }
    }

    return allCombinations.filter(combination => {
        for (let i = 0; i < combination.length; i++) {
            let copy = [...combination];
            delete copy[i];
            if (copy.includes(combination[i])) {
                return false;
            }
        }
        return true;
    });
}

function execute(program) {
    const phaseSettingCombinations = getAllPhaseSettingCombinations();
    let highestOutput = 0;

    for (let i = 0; i < phaseSettingCombinations.length; i++) {
        let [a, b, c, d, e] = phaseSettingCombinations[i];
        const amplifierAOutput = getAmplifierOutput(a, 0, program);
        const amplifierBOutput = getAmplifierOutput(b, amplifierAOutput, program);
        const amplifierCOutput = getAmplifierOutput(c, amplifierBOutput, program);
        const amplifierDOutput = getAmplifierOutput(d, amplifierCOutput, program);
        const amplifierEOutput = getAmplifierOutput(e, amplifierDOutput, program);
        highestOutput = (amplifierEOutput > highestOutput) ? amplifierEOutput : highestOutput;
    }

    console.log(highestOutput);
}

execute(puzzleInput);