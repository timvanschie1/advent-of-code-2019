let numberOfPasswords = 0;
for (let i = 246515; i <= 739105; i++) {
    if (!hasTwoAdjecentIdenticalDigits(i)) {
        continue;
    }

    if (!doesNotDecrease(i)) {
        continue;
    }

    numberOfPasswords++;
}

console.log(numberOfPasswords);

function hasTwoAdjecentIdenticalDigits(number) {
    const arrayOfDigits = Array.from(String(number), Number);
    let twoIdentical = false;

    for (let i = 0; i < arrayOfDigits.length; i++) {
        if (arrayOfDigits[i - 1] === arrayOfDigits[i]) {
            twoIdentical = true;
            break;
        }
    }

    return twoIdentical;
}

function doesNotDecrease(number) {
    const arrayOfDigits = Array.from(String(number), Number);
    let neverDecreases = true;

    for (let i = 0; i < arrayOfDigits.length; i++) {
        if (arrayOfDigits[i - 1] > arrayOfDigits[i]) {
            neverDecreases = false;
            break;
        }
    }

    return neverDecreases;
}