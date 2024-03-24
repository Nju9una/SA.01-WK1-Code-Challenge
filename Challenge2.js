//Main function
function main() {
    //Prompting the user to enter the car's speed
    let speedInput = prompt("Enter the car's speed (in km/h):");

    //Checking if the input is a valid number
    if (!isNumeric(speedInput)) {
        // If the input is not a valid number, show error message
        alert("Invalid input,please enter a valid number.");
    } else {
        // Convert the input to a number
        let speed = +speedInput;
        // Calculating demerit points
        const demeritPoints = calculateDemeritPoints(speed);
        // Checking license status based on demerit points
        const licenseStatus = checkLicenseStatus(demeritPoints);
        // Output the result
        alert(licenseStatus);
    }
}
//Function for calculating demerit points based on speed
function calculateDemeritPoints(speed) {
    const speedLimit = 70;
    const kmPerDemeritPoint = 5;
//If-else for speed limit
    if (speed <= speedLimit) {
        return 0;
    } else {
        //Calculating the number of demerit points
        const excessSpeed = speed - speedLimit;
        const demeritPoints = Math.floor(excessSpeed / kmPerDemeritPoint);
        return demeritPoints;
    }
}
//Function for determining if license is suspended based on demerit points
function checkLicenseStatus(demeritPoints) {
    const maxDemeritPoints = 12;

    if (demeritPoints > maxDemeritPoints) {
        return "License suspended";
    } else {
        return `Points: ${demeritPoints}`;
    }
}

//calling the main function
main();
