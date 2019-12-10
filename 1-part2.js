const modules = [76412, 107084, 96893, 108787, 87847, 53066, 92555, 72252, 57849, 123574, 67069, 58632, 109718, 122184, 60273, 52e3, 89580, 71136, 125374, 80152, 121585, 80364, 115488, 86085, 61801, 117097, 59173, 104942, 95577, 67520, 68789, 52730, 136467, 61983, 76331, 61011, 111344, 63195, 118059, 60350, 111411, 56735, 135243, 111349, 65351, 100903, 137425, 56546, 144701, 80579, 95856, 59233, 146183, 111387, 127567, 60299, 147816, 76228, 69638, 114686, 99165, 68430, 73581, 122031, 58266, 112586, 111777, 87739, 113443, 135985, 142160, 101406, 144988, 146834, 129820, 98419, 65139, 118612, 51200, 141152, 83108, 87512, 79604, 70865, 141351, 98538, 61771, 106689, 58624, 118163, 81467, 109525, 51464, 102151, 74952, 55968, 128086, 127116, 117615, 139056];

function getRequiredFuel(mass) {
    return Math.floor(mass / 3) - 2;
}

const result = modules.reduce((total, moduleMass) => {
    let latestFuel = getRequiredFuel(moduleMass);
    let fuelForModule = latestFuel;

    while (latestFuel >= 9) {
        latestFuel = getRequiredFuel(latestFuel);
        fuelForModule = fuelForModule + latestFuel;
    }

    return total + fuelForModule;
}, 0);

console.log(result);