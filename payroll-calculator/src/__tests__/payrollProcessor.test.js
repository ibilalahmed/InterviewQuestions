const {calculateHours,  toCents,
  toDollars,
processEmployee} = require("../payrollProcessor");

describe('calculateHours', () => {
  it('should correctly calculate hours for a simple duration', () => {
    const start = '2022-02-18 10:00:00';
    const end = '2022-02-18 12:30:00';
    expect(calculateHours(start, end)).toBe(2.5);
  });
});

describe('Individual Punch Processing', () => {
  const jobRates = new Map([
    ["Hospital - Painter", { rate: 31.25, benefitsRate: 1.00 }],
    ["Hospital - Laborer", { rate: 20.00, benefitsRate: 0.50 }],
    ["Shop - Laborer", { rate: 16.25, benefitsRate: 1.25 }]
  ]);

  test('processes regular time punch correctly', () => {
    // Testing single 8-hour punch at Hospital - Painter
    const result = processEmployee({
      employee: "TestEmployee",
      timePunch: [{
        job: "Hospital - Painter",
        start: "2022-02-18 09:00:00",
        end: "2022-02-18 17:00:00" // 8 hours
      }]
    }, jobRates);

    expect(result.regular).toBe('8.0000');
    expect(result.overtime).toBe('0.0000');
    expect(result.doubletime).toBe('0.0000');
    expect(result.wageTotal).toBe('250.0000'); // 8 * $31.25
    expect(result.benefitTotal).toBe('8.0000'); // 8 * $1.00
  });

  test('processes overtime punch correctly', () => {
    // Testing when entire punch should be overtime
    const result = processEmployee({
      employee: "TestEmployee",
      timePunch: [
        // First get to 42 hours
        {
          job: "Hospital - Painter",
          start: "2022-02-18 09:00:00",
          end: "2022-02-18 19:00:00" // 10 hours for 5 days = 50 hours
        },
        {
          job: "Hospital - Painter",
          start: "2022-02-19 09:00:00",
          end: "2022-02-19 19:00:00"
        },
        {
          job: "Hospital - Painter",
          start: "2022-02-20 09:00:00",
          end: "2022-02-20 19:00:00"
        },
        {
          job: "Hospital - Painter",
          start: "2022-02-21 09:00:00",
          end: "2022-02-21 19:00:00"
        },
        {
          job: "Hospital - Painter",
          start: "2022-02-22 09:00:00",
          end: "2022-02-22 19:00:00"
        }
      ]
    }, jobRates);

    // Should have 40 regular, 8 overtime, 2 doubletime
    expect(result.regular).toBe('40.0000');
    expect(result.overtime).toBe('8.0000');
    expect(result.doubletime).toBe('2.0000');
    
    // Wage calculation:
    // Regular: 40 * $31.25 = $1,250.00
    // Overtime: 8 * $31.25 * 1.5 = $375.00
    // Doubletime: 2 * $31.25 * 2 = $125.00
    // Total: $1,750.00
    expect(result.wageTotal).toBe('1750.0000');
    
    // Benefits: 50 hours * $1.00 = $50.00
    expect(result.benefitTotal).toBe('50.0000');
  });

  test('processes mixed job rates correctly', () => {
    const result = processEmployee({
      employee: "TestEmployee",
      timePunch: [
        // Morning: Hospital - Painter
        {
          job: "Hospital - Painter",
          start: "2022-02-18 09:00:00",
          end: "2022-02-18 12:00:00" // 3 hours
        },
        // Afternoon: Hospital - Laborer
        {
          job: "Hospital - Laborer",
          start: "2022-02-18 13:00:00",
          end: "2022-02-18 17:00:00" // 4 hours
        }
      ]
    }, jobRates);

    // All regular time
    expect(result.regular).toBe('7.0000');
    expect(result.overtime).toBe('0.0000');
    expect(result.doubletime).toBe('0.0000');
    
    // Wage calculation:
    // Painter: 3 * $31.25 = $93.75
    // Laborer: 4 * $20.00 = $80.00
    // Total: $173.75
    expect(result.wageTotal).toBe('173.7500');
    
    // Benefits:
    // Painter: 3 * $1.00 = $3.00
    // Laborer: 4 * $0.50 = $2.00
    // Total: $5.00
    expect(result.benefitTotal).toBe('5.0000');
  });
});

