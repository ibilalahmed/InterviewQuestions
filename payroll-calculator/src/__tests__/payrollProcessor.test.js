const {calculateHours} = require("../payrollProcessor");

describe('calculateHours', () => {
  it('should correctly calculate hours for a simple duration', () => {
    const start = '2022-02-18 10:00:00';
    const end = '2022-02-18 12:30:00';
    expect(calculateHours(start, end)).toBe(2.5);
  });
});
