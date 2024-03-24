//Function for calculating the net salary
function calculateNetSalary(basicSalary, benefits) {
    //Constants for the NHIF deduction and rates
    const nhifDeductionThresholds = [6000, 8000, 12000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000, 100000];
    const nhifDeductionRates = [150, 300, 400, 500, 600, 750, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700];
    //Constants for the PAYE rates
    const payeThresholds = [24000, 32334, 500000, 800000];
    const payeRates = [0.1, 0.25, 0.3, 0.325, 0.35];
    //Constants for NSSF contribution limits and rates
    const nssfTier1Limit = 7000;
    const nssfTier2Limit = 36000;
    const nssfRate = 0.06;
    //Calculating the gross salary
    const grossSalary = basicSalary + benefits;
    //Calculating the NHIF deductions
    let nhifDeduction = 0;
    for (let i = 0; i < nhifDeductionThresholds.length; i++) {
        if (grossSalary <= nhifDeductionThresholds[i]) {
            nhifDeduction = nhifDeductionRates[i];
            break;
        }
    }
    //Calculation of the PAYE deduction
    let payeDeduction = 0;
    let annualTaxablePay = grossSalary * 12;
    for (let i = 0; i < payeThresholds.length; i++) {
        if (annualTaxablePay <= payeThresholds[i]) {
            payeDeduction = annualTaxablePay * payeRates[i] / 12;
            break;
        }
    }
    //Calculation of the NSSF deduction
    let nssfDeduction = 0;
    if (basicSalary <= nssfTier1Limit) {
        nssfDeduction = basicSalary * nssfRate;
    } else if (basicSalary <= nssfTier2Limit) {
        nssfDeduction = nssfTier1Limit * nssfRate + (basicSalary - nssfTier1Limit) * nssfRate;
    } else {
        nssfDeduction = nssfTier1Limit * nssfRate + (nssfTier2Limit - nssfTier1Limit) * nssfRate;
    }
    //Calculating the net salary
    const netSalary = grossSalary - (nhifDeduction + payeDeduction + nssfDeduction);
    //Returning of the net salary
    return netSalary;
}