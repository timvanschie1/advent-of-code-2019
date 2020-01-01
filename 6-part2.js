const puzzleInput = require('./6-puzzleInput');
// const program = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L', 'K)YOU', 'I)SAN'];

function createNewPath(currentNewPath, cleanMap) {
    for (let i = 0; i < cleanMap.length; i++) {
        let [orbitted, orbitting] = cleanMap[i];

        if (orbitting === currentNewPath[0]) {
            return createNewPath([orbitted].concat(currentNewPath), cleanMap);
        }
    }

    return currentNewPath;
}

function getFirstCommonObject(path1, path2) {
    const reversePath1 = [...path1].reverse();
    return reversePath1.find(obj => path2.includes(obj));
}

function getMinimumOrbitalTransfers(paths) {
    const myPath = paths.find(path => path.includes('YOU'));
    const santasPath = paths.find(path => path.includes('SAN'));
    const firstCommonObject = getFirstCommonObject(myPath, santasPath);
    const myPathToCommonObject = myPath.splice(myPath.indexOf(firstCommonObject));
    const santasPathToCommonObject = santasPath.splice(santasPath.indexOf(firstCommonObject));

    /**
     * -2 since Santa and myself are not included ("Between the objects they are orbiting")
     * -1 since the common object should not be counted twice
     * -1 since it's about the transfers BETWEEN and not the objects itself
     * */
    return (myPathToCommonObject.length + santasPathToCommonObject.length - 2 - 1 - 1);
}

function execute(rawPuzzleInput) {
    const cleanMap = rawPuzzleInput.map(item => item.split(')'));
    const paths = cleanMap.map(couple => createNewPath(couple, cleanMap));
    const minimumOrbitalTransfers = getMinimumOrbitalTransfers(paths);
    console.log(minimumOrbitalTransfers);
}

execute(puzzleInput);