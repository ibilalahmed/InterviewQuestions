const fs = require("fs");
const path = require("path");

const { calculatePayroll } = require("./payrollProcessor");

function main() {
  try {
    // Load input data
    const dataPath = path.join(__dirname, "..", "data", "input.json");
    const rawData = fs.readFileSync(dataPath, "utf8");

    // Parse JSON data
    const payrollData = JSON.parse(rawData);

    // Calculate payroll
    const result = calculatePayroll(payrollData);

    // Output results
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error processing payroll data:", error.message);

    process.exit(1);
  }
}

// Execute main function
main();