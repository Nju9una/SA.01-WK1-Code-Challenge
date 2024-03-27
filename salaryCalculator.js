const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Define tax rates
const TAX_RATES = [
    { lowerBound: 0, upperBound: 24000, rate: 0.1 },
    { lowerBound: 24001, upperBound: 32333, rate: 0.25 },
    { lowerBound: 32334, upperBound: 500000, rate: 0.3 },
    { lowerBound: 500001, upperBound: 800000, rate: 0.325 },
    { lowerBound: 800001, upperBound: Infinity, rate: 0.35 }
];

// Define NHIF rates
const NHIF_RATES = [
    { lowerBound: 0, upperBound: 5999, contribution: 150 },
    { lowerBound: 6000, upperBound: 7999, contribution: 300 },
    { lowerBound: 8000, upperBound: 11999, contribution: 400 },
    { lowerBound: 12000, upperBound: 14999, contribution: 500 },
    { lowerBound: 15000, upperBound: 19999, contribution: 600 },
    { lowerBound: 20000, upperBound: 24999, contribution: 750 },
    { lowerBound: 25000, upperBound: 29999, contribution: 850 },
    { lowerBound: 30000, upperBound: 34999, contribution: 900 },
    { lowerBound: 35000, upperBound: 39999, contribution: 950 },
    { lowerBound: 40000, upperBound: 44999, contribution: 1000 },
    { lowerBound: 45000, upperBound: 49999, contribution: 1100 },
    { lowerBound: 50000, upperBound: 59999, contribution: 1200 },
    { lowerBound: 60000, upperBound: 69999, contribution: 1300 },
    { lowerBound: 70000, upperBound: 79999, contribution: 1400 },
    { lowerBound: 80000, upperBound: 89999, contribution: 1500 },
    { lowerBound: 90000, upperBound: 99999, contribution: 1600 },
    { lowerBound: 100000, upperBound: Infinity, contribution: 1700 }
];

// Define NSSF tiers
const NSSF_TIERS = [
    { lowerBound: 0, upperBound: 7000, rate: 0.06 },
    { lowerBound: 7001, upperBound: 36000, rate: 0.06 }
];

// Function to calculate NHIF contribution based on gross pay
const calculateNHIFContribution = grossPay => {
    const bracket = NHIF_RATES.find(bracket => grossPay >= bracket.lowerBound && grossPay <= bracket.upperBound);
    return bracket ? bracket.contribution : 0;
};


// Function to calculate NSSF contribution based on pensionable pay
const calculateNSSFContribution = pensionablePay => {
    let tierIContribution = 0, tierIIContribution = 0;
    for (const tier of NSSF_TIERS) {
        if (pensionablePay >= tier.lowerBound && pensionablePay <= tier.upperBound) {
            tierIContribution = pensionablePay * tier.rate;
            break;
        } else if (pensionablePay > tier.upperBound) {
            tierIContribution = tier.upperBound * tier.rate;
            tierIIContribution = (pensionablePay - tier.upperBound) * tier.rate;
        }
    }
    return { tierI: tierIContribution, tierII: tierIIContribution };
};

// Function to calculate PAYE (tax) based on income
const calculatePAYE = income => {
    let tax = 0;
    for (const bracket of TAX_RATES) {
        if (income > bracket.upperBound) {
            tax += (bracket.upperBound - bracket.lowerBound + 1) * bracket.rate;
        } else {
            tax += (income - bracket.lowerBound + 1) * bracket.rate;
            break;
        }
    }
    return tax;
};

// Function to calculate net salary
const calculateNetSalary = (basicSalary, benefits) => {
    const grossSalary = basicSalary + benefits;
    const PAYE = calculatePAYE(grossSalary);
    const NHIF = calculateNHIFContribution(grossSalary);
    const NSSF = calculateNSSFContribution(basicSalary);
    const totalDeductions = PAYE + NHIF + NSSF.tierI + NSSF.tierII;
    const netSalary = grossSalary - totalDeductions;
    return { grossSalary, PAYE, NHIF, NSSF, netSalary };
};

// Function to start the salary calculation
const startSalaryCalculation = () => {
    rl.question("Enter basic salary (in Ksh): ", basicSalary => {
        rl.question("Enter benefits (in Ksh): ", benefits => {
            basicSalary = parseFloat(basicSalary);
            benefits = parseFloat(benefits);
            if (isNaN(basicSalary) || isNaN(benefits)) {
                console.log("Invalid input. Please enter valid numbers.");
                rl.close();
            } else {
                const result = calculateNetSalary(basicSalary, benefits);
                console.log("Gross Salary:", result.grossSalary);
                console.log("PAYE:", result.PAYE);
                console.log("NHIF:", result.NHIF);
                console.log("NSSF Tier I:", result.NSSF.tierI);
                console.log("NSSF Tier II:", result.NSSF.tierII);
                console.log("Net Salary:", result.netSalary);
                rl.close();
            }
        });
    });
};

// Start salary calculation
startSalaryCalculation();
