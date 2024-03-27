

// Importing the 'readline' module to handle input from the command line
const readline = require("readline");

// Creating an interface for input/output using 'readline'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Prompting the user to enter the student's mark
rl.question("Enter the student's mark (between 0 and 100): ", (mark) => {
    // Convert input to a number
    mark = parseInt(mark);

    // Check if the input is a valid number
    if (isNaN(mark) || mark < 0 || mark > 100) {
        console.log("Invalid input. Please enter a number between 0 and 100.");
    } else {
        // If the input is valid, call the getGrade function to determine the grade
        console.log(getGrade(mark));
    }
    
    // Close the interface
    rl.close();
});

// Function to determine the grade based on the marks
function getGrade(marks){
    if (marks > 79) {
        return 'A';
    } else if (marks >= 60 && marks <= 79) {
        return 'B';
    } else if (marks >= 50 && marks <= 59) {
        return 'C';
    } else if (marks >= 40 && marks <= 49) {
        return 'D';
    } else {
        return 'E';
    }
}
