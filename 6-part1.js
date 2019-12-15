const puzzleInput = require('./6-puzzleInput');

function createNewPath(currentNewPath, cleanMap) {
    for (let i = 0; i < cleanMap.length; i++) {
        let [orbitted, orbitting] = cleanMap[i];

        if (orbitting === currentNewPath[0]) {
            return createNewPath([orbitted].concat(currentNewPath), cleanMap);
        }
    }

    return currentNewPath;
}

function getNumberOfOrbits(paths) {
    return paths.reduce((total, path) => {
        return total + (path.length - 1);
    }, 0);
}

function execute(rawPuzzleInput) {
    const cleanMap = rawPuzzleInput.map(item => item.split(')'));
    const paths = cleanMap.map(couple => createNewPath(couple, cleanMap));
    console.log(getNumberOfOrbits(paths));
}

execute(puzzleInput);