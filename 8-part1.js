const puzzleInputString = require('./8-puzzleInput');
const puzzleInputArray = puzzleInputString.split("");

function getLayers(pictureCode) {
    let layers = [];
    let newLayer = [];

    for (let i = 1; i <= pictureCode.length; i++) {
        newLayer.push(pictureCode[i]);
        if (i % 150 === 0) {
            layers.push(newLayer);
            newLayer = [];
        }
    }

    return layers;
}

function getLayerWithFewestZeros(layers) {
    let fewestZeros = null;
    let layerWithFewestZeros = null;

    layers.forEach(layer => {
        const numberOfZeros = layer.filter(digit => digit === '0').length;

        if (fewestZeros && numberOfZeros > fewestZeros) {
            return;
        }

        fewestZeros = numberOfZeros;
        layerWithFewestZeros = layer;
    });

    return layerWithFewestZeros;
}

function getNumberOfOnesMultipliedByNumberOfTwos(layer) {
    const numberOfOnes = layer.filter(digit => digit === '1').length;
    const numberOfTwos = layer.filter(digit => digit === '2').length;
    return numberOfOnes * numberOfTwos;
}

function execute(pictureCode) {
    const layers = getLayers(pictureCode);
    const layerWithFewestZeros = getLayerWithFewestZeros(layers);
    console.log(getNumberOfOnesMultipliedByNumberOfTwos(layerWithFewestZeros));
}

execute(puzzleInputArray);