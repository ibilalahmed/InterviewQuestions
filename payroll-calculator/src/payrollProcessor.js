// Constants
const OVERTIME_THRESHOLD = 40;
const DOUBLE_TIME_THREASHOLD = 48;
const OVERTIME_RATE = 1.5;
const DOUBLETIME_RATE = 2.0;


// Calculates number of hours between two data strs
function calculateHours(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (endDate - startDate) / (1000 * 60 * 60); // returns after converting diff from ms to hrs
}



module.exports = {
    calculateHours,
}