const puzzleInput = require('./7-puzzleInput');

function addition(first, second) {
    return first + second;
}

function multiply(first, second) {
    return first * second;
}

function getNewAmpState(state, input) {
    if (!state.running) {
        return state;
    }

    let memory = state.memory;
    let phaseSetting = state.phaseSetting;

    let i = state.currentPos;
    while (i <= memory.length) {
        const valueString = memory[i].toString();
        const optCode = valueString.length === 1 ? Number(valueString) : Number(valueString.slice(-2));

        if (optCode === 99) {
            return {
                memory: memory,
                currentPos: i,
                phaseSetting: phaseSetting,
                lastOutput: state.lastOutput,
                running: false
            }
        }

        const firstParamMode = Number(valueString.slice(-3, -2));
        const secondParamMode = Number(valueString.slice(-4, -3));
        const value1 = firstParamMode === 0 ? memory[memory[i + 1]] : memory[i + 1];
        const value2 = secondParamMode === 0 ? memory[memory[i + 2]] : memory[i + 2];

        if (optCode === 1) {
            memory[memory[i + 3]] = addition(value1, value2);
            i = i + 4;
            continue;
        }

        if (optCode === 2) {
            memory[memory[i + 3]] = multiply(value1, value2);
            i = i + 4;
            continue;
        }

        if (optCode === 3) {
            memory[memory[i + 1]] = phaseSetting ? phaseSetting : input;
            phaseSetting = null;
            i = i + 2;
            continue;
        }

        if (optCode === 4) {
            i = i + 2;
            return {
                memory: memory,
                currentPos: i,
                phaseSetting: phaseSetting,
                lastOutput: value1,
                running: true
            }
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

    for (let a = 5; a < 10; a++) {
        for (let b = 5; b < 10; b++) {
            for (let c = 5; c < 10; c++) {
                for (let d = 5; d < 10; d++) {
                    for (let e = 5; e < 10; e++) {
                        allCombinations.push([a, b, c, d, e]);
                    }
                }
            }
        }
    }

    /** Return all possible combinations (so combinations with duplicate numbers are filtered out) */
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
    let a, b, c, d, e;
    let stateAmpA, stateAmpB, stateAmpC, stateAmpD, stateAmpE;

    for (let i = 0; i < phaseSettingCombinations.length; i++) {
        [a, b, c, d, e] = phaseSettingCombinations[i];
        stateAmpA = {memory: program, currentPos: 0, phaseSetting: a, lastOutput: null, running: true};
        stateAmpB = {memory: program, currentPos: 0, phaseSetting: b, lastOutput: null, running: true};
        stateAmpC = {memory: program, currentPos: 0, phaseSetting: c, lastOutput: null, running: true};
        stateAmpD = {memory: program, currentPos: 0, phaseSetting: d, lastOutput: null, running: true};
        stateAmpE = {memory: program, currentPos: 0, phaseSetting: e, lastOutput: null, running: true};

        while (stateAmpE.running) {
            stateAmpA = getNewAmpState(stateAmpA, stateAmpE.lastOutput ? stateAmpE.lastOutput : 0);
            stateAmpB = getNewAmpState(stateAmpB, stateAmpA.lastOutput);
            stateAmpC = getNewAmpState(stateAmpC, stateAmpB.lastOutput);
            stateAmpD = getNewAmpState(stateAmpD, stateAmpC.lastOutput);
            stateAmpE = getNewAmpState(stateAmpE, stateAmpD.lastOutput);
        }

        highestOutput = (stateAmpE.lastOutput > highestOutput) ? stateAmpE.lastOutput : highestOutput;
    }

    console.log('Highest output', highestOutput);
}

execute(puzzleInput);