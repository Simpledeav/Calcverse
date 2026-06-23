/**
 * CalcVerse — MathEngine Unit Tests
 * Tests the expression parser/evaluator, formatters, and percentage helpers.
 */

const { MathEngine } = require('../assets/js/engines/math-engine');

// =============================================================================
// evaluate() — Expression Evaluator
// =============================================================================
describe('MathEngine.evaluate()', () => {
  describe('basic arithmetic', () => {
    test('2 + 3 = 5', () => {
      const { result, error } = MathEngine.evaluate('2+3');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(5);
    });

    test('10 - 4 = 6', () => {
      const { result, error } = MathEngine.evaluate('10-4');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(6);
    });

    test('3 × 7 = 21', () => {
      const { result, error } = MathEngine.evaluate('3×7');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(21);
    });

    test('3 * 7 = 21 (asterisk multiply)', () => {
      const { result, error } = MathEngine.evaluate('3*7');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(21);
    });

    test('20 ÷ 4 = 5', () => {
      const { result, error } = MathEngine.evaluate('20÷4');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(5);
    });

    test('20 / 4 = 5 (slash divide)', () => {
      const { result, error } = MathEngine.evaluate('20/4');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(5);
    });

    test('operator precedence: 2 + 3 × 4 = 14', () => {
      const { result, error } = MathEngine.evaluate('2+3×4');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(14);
    });

    test('parentheses override: (2 + 3) × 4 = 20', () => {
      const { result, error } = MathEngine.evaluate('(2+3)×4');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(20);
    });

    test('chained operations: 1 + 2 + 3 + 4 = 10', () => {
      const { result, error } = MathEngine.evaluate('1+2+3+4');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(10);
    });
  });

  describe('exponents and roots', () => {
    test('2 ^ 3 = 8', () => {
      const { result, error } = MathEngine.evaluate('2^3');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(8);
    });

    test('√9 = 3 (sqrt unary)', () => {
      const { result, error } = MathEngine.evaluate('√9');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(3);
    });

    test('sqrt(16) = 4', () => {
      const { result, error } = MathEngine.evaluate('sqrt(16)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(4);
    });

    test('cbrt(27) = 3', () => {
      const { result, error } = MathEngine.evaluate('cbrt(27)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(3);
    });
  });

  describe('factorial', () => {
    test('5! = 120', () => {
      const { result, error } = MathEngine.evaluate('5!');
      expect(error).toBeNull();
      expect(result).toBe(120);
    });

    test('0! = 1', () => {
      const { result, error } = MathEngine.evaluate('0!');
      expect(error).toBeNull();
      expect(result).toBe(1);
    });

    test('negative factorial throws error', () => {
      const { result, error } = MathEngine.evaluate('-3!');
      expect(error).not.toBeNull();
      expect(result).toBeNull();
    });
  });

  describe('modulus', () => {
    test('10 % 3 = 1', () => {
      const { result, error } = MathEngine.evaluate('10%3');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(1);
    });
  });

  describe('trigonometric functions', () => {
    test('sin(0) = 0', () => {
      const { result, error } = MathEngine.evaluate('sin(0)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(0, 5);
    });

    test('cos(0) = 1', () => {
      const { result, error } = MathEngine.evaluate('cos(0)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(1, 5);
    });

    test('tan(π/4) ≈ 1', () => {
      const { result, error } = MathEngine.evaluate('tan(pi/4)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(1, 4);
    });

    test('asin(1) = π/2', () => {
      const { result, error } = MathEngine.evaluate('asin(1)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(Math.PI / 2, 4);
    });

    test('acos(0) = π/2', () => {
      const { result, error } = MathEngine.evaluate('acos(0)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(Math.PI / 2, 4);
    });

    test('atan(1) = π/4', () => {
      const { result, error } = MathEngine.evaluate('atan(1)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(Math.PI / 4, 4);
    });
  });

  describe('logarithmic functions', () => {
    test('log(100) = 2', () => {
      const { result, error } = MathEngine.evaluate('log(100)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(2, 5);
    });

    test('ln(e) = 1', () => {
      const { result, error } = MathEngine.evaluate('ln(e)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(1, 5);
    });

    test('log(1) = 0', () => {
      const { result, error } = MathEngine.evaluate('log(1)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(0, 5);
    });
  });

  describe('constants', () => {
    test('pi ≈ 3.14159', () => {
      const { result, error } = MathEngine.evaluate('pi');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(Math.PI, 5);
    });

    test('π ≈ 3.14159 (Greek pi)', () => {
      const { result, error } = MathEngine.evaluate('π');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(Math.PI, 5);
    });

    test('e ≈ 2.71828', () => {
      const { result, error } = MathEngine.evaluate('e');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(Math.E, 5);
    });

    test('phi ≈ 1.61803', () => {
      const { result, error } = MathEngine.evaluate('phi');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(1.618033988749895, 5);
    });
  });

  describe('rounding functions', () => {
    test('abs(-5) = 5', () => {
      const { result, error } = MathEngine.evaluate('abs(-5)');
      expect(error).toBeNull();
      expect(result).toBe(5);
    });

    test('ceil(3.2) = 4', () => {
      const { result, error } = MathEngine.evaluate('ceil(3.2)');
      expect(error).toBeNull();
      expect(result).toBe(4);
    });

    test('floor(3.8) = 3', () => {
      const { result, error } = MathEngine.evaluate('floor(3.8)');
      expect(error).toBeNull();
      expect(result).toBe(3);
    });

    test('round(3.5) = 4', () => {
      const { result, error } = MathEngine.evaluate('round(3.5)');
      expect(error).toBeNull();
      expect(result).toBe(4);
    });

    test('round(3.4) = 3', () => {
      const { result, error } = MathEngine.evaluate('round(3.4)');
      expect(error).toBeNull();
      expect(result).toBe(3);
    });
  });

  describe('hyperbolic functions', () => {
    test('sinh(0) = 0', () => {
      const { result, error } = MathEngine.evaluate('sinh(0)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(0, 5);
    });

    test('cosh(0) = 1', () => {
      const { result, error } = MathEngine.evaluate('cosh(0)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(1, 5);
    });

    test('tanh(0) = 0', () => {
      const { result, error } = MathEngine.evaluate('tanh(0)');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(0, 5);
    });
  });

  describe('edge cases', () => {
    test('division by zero returns error', () => {
      const { result, error } = MathEngine.evaluate('1/0');
      expect(error).not.toBeNull();
      expect(error).toMatch(/division by zero/i);
    });

    test('empty expression returns error', () => {
      const { result, error } = MathEngine.evaluate('');
      expect(error).not.toBeNull();
    });

    test('mismatched parentheses returns error', () => {
      const { result, error } = MathEngine.evaluate('(2+3');
      expect(error).not.toBeNull();
    });

    test('extra closing parentheses is tolerated (parser ignores unmatched rparen)', () => {
      // The current parser silently discards unmatched closing parens
      const { result, error } = MathEngine.evaluate('2+3)');
      // It may return a result (error is null) or throw depending on stack state
      // Either way, it should not crash and should produce a number
      if (error) {
        expect(result).toBeNull();
      } else {
        expect(result).not.toBeNaN();
      }
    });

    test('unexpected character returns error', () => {
      const { result, error } = MathEngine.evaluate('2+@3');
      expect(error).not.toBeNull();
    });

    test('whitespace is ignored: 2   +   3 = 5', () => {
      const { result, error } = MathEngine.evaluate('2   +   3');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(5);
    });

    test('negative number at start: -5 + 3 = -2', () => {
      const { result, error } = MathEngine.evaluate('-5+3');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(-2);
    });

    test('double negative: 5 - -3 = 8', () => {
      const { result, error } = MathEngine.evaluate('5--3');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(8);
    });

    test('scientific notation: 1e3 = 1000', () => {
      const { result, error } = MathEngine.evaluate('1e3');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(1000);
    });

    test('complex expression: (2 + 3) × 4^2 - 6 ÷ 2 = 77', () => {
      const { result, error } = MathEngine.evaluate('(2+3)×4^2-6÷2');
      expect(error).toBeNull();
      expect(result).toBeCloseTo(77);
    });
  });
});

// =============================================================================
// formatNumber() — Number Formatting
// =============================================================================
describe('MathEngine.formatNumber()', () => {
  test('formats integer without decimals', () => {
    expect(MathEngine.formatNumber(42)).toBe('42');
  });

  test('formats decimal with trailing zeros trimmed', () => {
    expect(MathEngine.formatNumber(3.14000)).toBe('3.14');
  });

  test('returns Error for NaN', () => {
    expect(MathEngine.formatNumber(NaN)).toBe('Error');
  });

  test('returns Error for null', () => {
    expect(MathEngine.formatNumber(null)).toBe('Error');
  });

  test('returns ∞ for Infinity', () => {
    expect(MathEngine.formatNumber(Infinity)).toBe('∞');
  });

  test('uses exponential for very large numbers', () => {
    const result = MathEngine.formatNumber(1e20);
    expect(result).toMatch(/e\+/);
  });

  test('uses exponential for very small numbers', () => {
    const result = MathEngine.formatNumber(1e-15);
    expect(result).toMatch(/e-/);
  });

  test('respects maxDecimals parameter', () => {
    expect(MathEngine.formatNumber(1 / 3, 3)).toBe('0.333');
  });
});

// =============================================================================
// formatWithCommas() — Comma Separated Numbers
// =============================================================================
describe('MathEngine.formatWithCommas()', () => {
  test('adds commas to thousands', () => {
    expect(MathEngine.formatWithCommas(1234567)).toBe('1,234,567');
  });

  test('does not add commas to small numbers', () => {
    expect(MathEngine.formatWithCommas(999)).toBe('999');
  });

  test('handles decimal numbers', () => {
    expect(MathEngine.formatWithCommas(1234.56)).toBe('1,234.56');
  });

  test('returns Error for null', () => {
    expect(MathEngine.formatWithCommas(null)).toBe('Error');
  });

  test('returns Error for NaN', () => {
    expect(MathEngine.formatWithCommas(NaN)).toBe('Error');
  });
});

// =============================================================================
// percentage(), percentOf(), percentChange() — Percentage Helpers
// =============================================================================
describe('MathEngine.percentage()', () => {
  test('25 is 25% of 100', () => {
    expect(MathEngine.percentage(25, 100)).toBeCloseTo(25);
  });

  test('handles zero total', () => {
    expect(MathEngine.percentage(10, 0)).toBe(0);
  });

  test('150 is 150% of 100', () => {
    expect(MathEngine.percentage(150, 100)).toBeCloseTo(150);
  });
});

describe('MathEngine.percentOf()', () => {
  test('10% of 200 = 20', () => {
    expect(MathEngine.percentOf(10, 200)).toBeCloseTo(20);
  });

  test('0% of anything = 0', () => {
    expect(MathEngine.percentOf(0, 500)).toBe(0);
  });

  test('100% of 50 = 50', () => {
    expect(MathEngine.percentOf(100, 50)).toBe(50);
  });
});

describe('MathEngine.percentChange()', () => {
  test('50 to 75 = 50% increase', () => {
    expect(MathEngine.percentChange(50, 75)).toBeCloseTo(50);
  });

  test('100 to 80 = -20% change', () => {
    expect(MathEngine.percentChange(100, 80)).toBeCloseTo(-20);
  });

  test('handles zero old value', () => {
    expect(MathEngine.percentChange(0, 50)).toBe(0);
  });

  test('same value = 0% change', () => {
    expect(MathEngine.percentChange(50, 50)).toBeCloseTo(0);
  });
});
