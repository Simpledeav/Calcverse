/**
 * CalcVerse — FinanceEngine Unit Tests
 * Tests loan formulas, interest calculations, ROI, margins, break-even, and formatters.
 */

const { FinanceEngine } = require('../assets/js/engines/finance-engine');

// =============================================================================
// emi() — Equated Monthly Installment
// =============================================================================
describe('FinanceEngine.emi()', () => {
  test('$100,000 at 5% for 30 years (360 months) ≈ $536.82/month', () => {
    const result = FinanceEngine.emi(100000, 5, 360);
    expect(result).toBeCloseTo(536.82, 1);
  });

  test('$200,000 at 6.5% for 30 years (360 months) ≈ $1,264.14/month', () => {
    const result = FinanceEngine.emi(200000, 6.5, 360);
    expect(result).toBeCloseTo(1264.14, 1);
  });

  test('handles 0% interest: principal / term', () => {
    const result = FinanceEngine.emi(12000, 0, 12);
    expect(result).toBeCloseTo(1000, 2);
  });    test('handles short term: $5,000 at 10% for 3 months', () => {
      const result = FinanceEngine.emi(5000, 10, 3);
      // Formula: P * r * (1+r)^n / ((1+r)^n - 1)
      // r = 10/100/12 ≈ 0.00833, n = 3
      expect(result).toBeCloseTo(1694.52, 1);
    });

    test('emi formula verified against known values', () => {
      // $10,000 at 6% for 12 months ≈ $860.66
      expect(FinanceEngine.emi(10000, 6, 12)).toBeCloseTo(860.66, 1);
      // $50,000 at 4.5% for 60 months ≈ $932.15
      expect(FinanceEngine.emi(50000, 4.5, 60)).toBeCloseTo(932.15, 1);
    });

  test('returns 0 for zero principal', () => {
    expect(FinanceEngine.emi(0, 5, 12)).toBe(0);
  });

  test('returns 0 for zero term', () => {
    expect(FinanceEngine.emi(10000, 5, 0)).toBe(0);
  });
});

// =============================================================================
// totalInterest() — Total Interest Over Loan Term
// =============================================================================
describe('FinanceEngine.totalInterest()', () => {
  test('$100,000 at 5% for 30 years', () => {
    const interest = FinanceEngine.totalInterest(100000, 5, 360);
    // Total payment = 536.82 * 360 = 193,255.20, interest = 93,255.20
    expect(interest).toBeGreaterThan(90000);
    expect(interest).toBeLessThan(95000);
  });

  test('0% interest = 0 total interest', () => {
    expect(FinanceEngine.totalInterest(10000, 0, 12)).toBeCloseTo(0, 1);
  });
});

// =============================================================================
// amortizationSchedule() — Client-side Amortization
// =============================================================================
describe('FinanceEngine.amortizationSchedule()', () => {
  const schedule = FinanceEngine.amortizationSchedule(10000, 6, 12);

  test('returns correct number of rows', () => {
    expect(schedule.length).toBe(12);
  });

  test('first month has more interest than last month', () => {
    expect(schedule[0].interest).toBeGreaterThan(schedule[11].interest);
  });

  test('balance decreases each month', () => {
    for (let i = 1; i < schedule.length; i++) {
      expect(schedule[i].balance).toBeLessThanOrEqual(schedule[i - 1].balance);
    }
  });

  test('final balance is zero', () => {
    expect(schedule[schedule.length - 1].balance).toBe(0);
  });

  test('each row has required fields', () => {
    schedule.forEach(row => {
      expect(row).toHaveProperty('month');
      expect(row).toHaveProperty('payment');
      expect(row).toHaveProperty('principal');
      expect(row).toHaveProperty('interest');
      expect(row).toHaveProperty('balance');
    });
  });
});

// =============================================================================
// simpleInterest() & simpleMaturity()
// =============================================================================
describe('FinanceEngine.simpleInterest()', () => {
  test('$10,000 at 5% for 3 years = $1,500 interest', () => {
    expect(FinanceEngine.simpleInterest(10000, 5, 3)).toBeCloseTo(1500);
  });

  test('zero principal = zero interest', () => {
    expect(FinanceEngine.simpleInterest(0, 5, 3)).toBe(0);
  });

  test('zero rate = zero interest', () => {
    expect(FinanceEngine.simpleInterest(10000, 0, 3)).toBe(0);
  });
});

describe('FinanceEngine.simpleMaturity()', () => {
  test('$10,000 at 5% for 3 years = $11,500', () => {
    expect(FinanceEngine.simpleMaturity(10000, 5, 3)).toBeCloseTo(11500);
  });
});

// =============================================================================
// compoundInterest() — Compound Interest with Optional Contributions
// =============================================================================
describe('FinanceEngine.compoundInterest()', () => {
  test('$10,000 at 5% compounded annually for 10 years ≈ $16,288.95', () => {
    const result = FinanceEngine.compoundInterest(10000, 5, 1, 10);
    expect(result).toBeCloseTo(16288.95, 1);
  });

  test('$10,000 at 5% compounded monthly for 10 years ≈ $16,470.09', () => {
    const result = FinanceEngine.compoundInterest(10000, 5, 12, 10);
    expect(result).toBeCloseTo(16470.09, 1);
  });

  test('$10,000 at 5% compounded daily for 10 years ≈ $16,486.65', () => {
    const result = FinanceEngine.compoundInterest(10000, 5, 365, 10);
    expect(result).toBeCloseTo(16486.64, 1);
  });

  test('with monthly contributions: $500/month at 7% for 30 years', () => {
    const result = FinanceEngine.compoundInterest(0, 7, 12, 30, 500);
    expect(result).toBeGreaterThan(500000);
    expect(result).toBeLessThan(650000);
  });

  test('zero principal and contributions = zero', () => {
    expect(FinanceEngine.compoundInterest(0, 5, 12, 10)).toBe(0);
  });
});

// =============================================================================
// growthTable() — Year-by-Year Growth Data
// =============================================================================
describe('FinanceEngine.growthTable()', () => {
  const table = FinanceEngine.growthTable(10000, 8, 12, 5, 200);

  test('returns correct number of years', () => {
    expect(table.length).toBe(5);
  });

  test('balance increases each year', () => {
    for (let i = 1; i < table.length; i++) {
      expect(table[i].balance).toBeGreaterThan(table[i - 1].balance);
    }
  });

  test('year 1 has balance > principal + contributions', () => {
    expect(table[0].balance).toBeGreaterThan(10000 + 200 * 12);
  });

  test('each row has required fields', () => {
    table.forEach(row => {
      expect(row).toHaveProperty('year');
      expect(row).toHaveProperty('balance');
      expect(row).toHaveProperty('contributions');
      expect(row).toHaveProperty('interest');
    });
  });
});

// =============================================================================
// roi() & annualizedRoi()
// =============================================================================
describe('FinanceEngine.roi()', () => {
  test('$1,000 to $1,500 = 50% ROI', () => {
    expect(FinanceEngine.roi(1000, 1500)).toBeCloseTo(50);
  });

  test('$1,000 to $800 = -20% ROI', () => {
    expect(FinanceEngine.roi(1000, 800)).toBeCloseTo(-20);
  });

  test('no change = 0% ROI', () => {
    expect(FinanceEngine.roi(1000, 1000)).toBeCloseTo(0);
  });

  test('handles zero initial value', () => {
    expect(FinanceEngine.roi(0, 500)).toBe(0);
  });
});

describe('FinanceEngine.annualizedRoi()', () => {
  test('$1,000 to $2,000 over 5 years ≈ 14.87%', () => {
    expect(FinanceEngine.annualizedRoi(1000, 2000, 5)).toBeCloseTo(14.87, 1);
  });

  test('handles zero initial value', () => {
    expect(FinanceEngine.annualizedRoi(0, 500, 5)).toBe(0);
  });

  test('handles zero years', () => {
    expect(FinanceEngine.annualizedRoi(1000, 1500, 0)).toBe(0);
  });
});

// =============================================================================
// profitMargin() & Markup Functions
// =============================================================================
describe('FinanceEngine.profitMargin()', () => {
  test('$200 revenue, $150 cost = 25% margin', () => {
    expect(FinanceEngine.profitMargin(200, 150)).toBeCloseTo(25);
  });

  test('zero revenue = 0 margin', () => {
    expect(FinanceEngine.profitMargin(0, 100)).toBe(0);
  });

  test('negative profit = negative margin', () => {
    expect(FinanceEngine.profitMargin(100, 150)).toBeCloseTo(-50);
  });
});

describe('FinanceEngine.markup()', () => {
  test('$100 cost, $150 selling price = 50% markup', () => {
    expect(FinanceEngine.markup(100, 150)).toBeCloseTo(50);
  });

  test('zero cost = 0 markup', () => {
    expect(FinanceEngine.markup(0, 100)).toBe(0);
  });
});

describe('FinanceEngine.marginToMarkup()', () => {
  test('25% margin ≈ 33.33% markup', () => {
    expect(FinanceEngine.marginToMarkup(25)).toBeCloseTo(33.33, 1);
  });

  test('50% margin = 100% markup', () => {
    expect(FinanceEngine.marginToMarkup(50)).toBeCloseTo(100, 1);
  });
});

describe('FinanceEngine.markupToMargin()', () => {
  test('50% markup ≈ 33.33% margin', () => {
    expect(FinanceEngine.markupToMargin(50)).toBeCloseTo(33.33, 1);
  });

  test('100% markup = 50% margin', () => {
    expect(FinanceEngine.markupToMargin(100)).toBeCloseTo(50, 1);
  });
});

// =============================================================================
// breakEvenUnits() & breakEvenRevenue()
// =============================================================================
describe('FinanceEngine.breakEvenUnits()', () => {
  test('$10,000 fixed, $50 price, $30 variable cost = 500 units', () => {
    expect(FinanceEngine.breakEvenUnits(10000, 50, 30)).toBe(500);
  });

  test('price <= variable cost returns Infinity', () => {
    expect(FinanceEngine.breakEvenUnits(10000, 30, 30)).toBe(Infinity);
    expect(FinanceEngine.breakEvenUnits(10000, 25, 30)).toBe(Infinity);
  });

  test('simple case: $100 fixed, $20 price, $10 cost = 10 units', () => {
    expect(FinanceEngine.breakEvenUnits(100, 20, 10)).toBe(10);
  });
});

describe('FinanceEngine.breakEvenRevenue()', () => {
  test('matches units × price', () => {
    const units = FinanceEngine.breakEvenUnits(10000, 50, 30);
    expect(FinanceEngine.breakEvenRevenue(10000, 50, 30)).toBe(units * 50);
  });
});

// =============================================================================
// formatCurrency() & formatPercent()
// =============================================================================
describe('FinanceEngine.formatCurrency()', () => {
  test('formats positive amount with $ prefix', () => {
    expect(FinanceEngine.formatCurrency(1234.5)).toBe('$1,234.50');
  });

  test('formats negative amount with -$ prefix', () => {
    expect(FinanceEngine.formatCurrency(-500)).toBe('-$500.00');
  });

  test('formats zero', () => {
    expect(FinanceEngine.formatCurrency(0)).toBe('$0.00');
  });

  test('handles null', () => {
    expect(FinanceEngine.formatCurrency(null)).toBe('$0.00');
  });

  test('handles NaN', () => {
    expect(FinanceEngine.formatCurrency(NaN)).toBe('$0.00');
  });

  test('uses custom currency symbol', () => {
    expect(FinanceEngine.formatCurrency(100, '€')).toBe('€100.00');
  });
});

describe('FinanceEngine.formatPercent()', () => {
  test('formats 25.5%', () => {
    expect(FinanceEngine.formatPercent(25.5)).toBe('25.50%');
  });

  test('formats with custom decimals', () => {
    expect(FinanceEngine.formatPercent(33.3333, 1)).toBe('33.3%');
  });

  test('formats zero percent', () => {
    expect(FinanceEngine.formatPercent(0)).toBe('0.00%');
  });
});
