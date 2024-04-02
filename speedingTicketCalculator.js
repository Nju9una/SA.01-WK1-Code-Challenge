
// Importing 'readline' module to handle input from the command line
const readline = require("readline");

// Creating interface for input/output using 'readline'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Main function
function main() {
    // Prompting user to enter the car's speed
    rl.question("Enter the car's speed (in km/h): ", (speedInput) => {
        // Checking if the input is a valid number
        if (!isNumeric(speedInput)) {
            // If the input is not a valid number, show error message
            console.log("Invalid input, please enter a valid number.");
        } else {
            // Convert the input to a number
            let speed = +speedInput;
            // Calculating demerit points
            const demeritPoints = calculateDemeritPoints(speed);
            // Checking license status based on demerit points
            const licenseStatus = checkLicenseStatus(demeritPoints);
            // Output the result
            console.log(licenseStatus);
        }
        // Close the interface
        rl.close();
    });
}

// Function to check if a value is numeric
function isNumeric(value) {
    return /^\d+$/.test(value);
}

// Function for calculating demerit points based on speed
function calculateDemeritPoints(speed) {
    const speedLimit = 70;
    const kmPerDemeritPoint = 5;

    // If-else for speed limit
    if (speed <= speedLimit) {
        return "Ok";
    } else {
        // Calculating the number of demerit points
        const excessSpeed = speed - speedLimit;
        const demeritPoints = Math.floor(excessSpeed / kmPerDemeritPoint);
        return demeritPoints;
    }
}

// Function for determining if license is suspended based on demerit points
function checkLicenseStatus(demeritPoints) {
    const maxDemeritPoints = 12;

    if (demeritPoints > maxDemeritPoints) {
        return "License suspended";
    } else {
        return `Points: ${demeritPoints}`;
    }
}

// Call the main function to start the program
main();
