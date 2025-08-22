const fs = require("fs");
const path = require("path");

function main() {
    const dataPath = path.join(__dirname, "..", "data", "input.json" );
    const rawData = fs.readFileSync(dataPath, "utf-8");

    const payrollData = JSON.parse(rawData);

    console.log(payrollData)
};

main();