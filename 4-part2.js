let numberOfPasswords = 0;
for (let i = 246515; i <= 739105; i++) {
    if (!hasTwoAdjecentIdenticalDigitsNotPartOfLargerMatchingGroup(i)) {
        continue;
    }

    if (!doesNotDecrease(i)) {
        continue;
    }

    numberOfPasswords++;
}

console.log(numberOfPasswords);

function hasTwoAdjecentIdenticalDigitsNotPartOfLargerMatchingGroup(number) {
    const digitArray = Array.from(String(number), Number);
    let twoIdentical = false;

    for (let i = 0; i < digitArray.length; i++) {
        if (digitArray[i - 2] === digitArray[i - 1] && digitArray[i - 1] === digitArray[i]) {
            continue;
        }

        if (digitArray[i] === digitArray[i + 1]) {
            continue;
        }

        if (digitArray[i - 1] === digitArray[i]) {
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