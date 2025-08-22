// Constants
const OVERTIME_THRESHOLD = 40;
const DOUBLE_TIME_THRESHOLD = 48;
const OVERTIME_MULTIPLIER = 1.5;
const DOUBLE_TIME_MULTIPLIER = 2.0;


// Calculates the duration in hours between two date strings.
function calculateHours(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return (endDate - startDate) / (1000 * 60 * 60);
}

// Processes a single employee's time punches to calculate their total compensation.

function processEmployee(employee, jobRates) {
  let totalHoursWorked = 0;
  const result = {
    employee: employee.employee,
    regular: 0,
    overtime: 0,
    doubletime: 0,
    wageTotal: 0,
    benefitTotal: 0,
  };

  for (const punch of employee.timePunch) {
    const jobInfo = jobRates.get(punch.job);
    if (!jobInfo) {
      continue;
    }

    const hoursForPunch = calculateHours(punch.start, punch.end);
    result.benefitTotal += hoursForPunch * jobInfo.benefitsRate;

    let remainingHoursInPunch = hoursForPunch;

    // 1. Allocate hours to Regular time
    if (totalHoursWorked < OVERTIME_THRESHOLD) {
      const regularHoursToAdd = Math.min(
        remainingHoursInPunch,
        OVERTIME_THRESHOLD - totalHoursWorked,
      );
      result.regular += regularHoursToAdd;
      result.wageTotal += regularHoursToAdd * jobInfo.rate;
      totalHoursWorked += regularHoursToAdd; 
      remainingHoursInPunch -= regularHoursToAdd;
    }

    // Allocate hours to OT
    if (remainingHoursInPunch > 0 && totalHoursWorked < DOUBLE_TIME_THRESHOLD) {
      const overtimeHoursToAdd = Math.min(
        remainingHoursInPunch,
        DOUBLE_TIME_THRESHOLD - totalHoursWorked,
      );
      result.overtime += overtimeHoursToAdd;
      result.wageTotal += overtimeHoursToAdd * jobInfo.rate * OVERTIME_MULTIPLIER;
      totalHoursWorked += overtimeHoursToAdd; 
      remainingHoursInPunch -= overtimeHoursToAdd;
    }

    // Allocate remaining hours to DT
    if (remainingHoursInPunch > 0) {
      result.doubletime += remainingHoursInPunch;
      result.wageTotal += remainingHoursInPunch * jobInfo.rate * DOUBLE_TIME_MULTIPLIER;
      totalHoursWorked += remainingHoursInPunch;
    }
  }

  // Format final numbers to strings with 4 decimal places
  Object.keys(result).forEach((key) => {
    if (key !== 'employee' && typeof result[key] === 'number') {
      result[key] = result[key].toFixed(4);
    }
  });

  return result;
}

// Makes the payroll calculation for all employees.
function calculatePayroll(payrollData) {
  const jobRates = new Map(
    payrollData.jobMeta.map((job) => [job.job, { rate: job.rate, benefitsRate: job.benefitsRate }]),
  );

  const finalResults = {};
  for (const employee of payrollData.employeeData) {
    finalResults[employee.employee] = processEmployee(employee, jobRates);
  }

  return finalResults;
}

module.exports = {
  calculatePayroll,
  processEmployee,
  calculateHours,
};