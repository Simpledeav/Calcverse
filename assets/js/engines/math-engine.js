/**
 * CalcVerse Math Engine
 * Expression parser and evaluator using the shunting-yard algorithm.
 * Safe alternative to eval() — handles arithmetic, scientific functions, and constants.
 */
const MathEngine = {
  /**
   * Evaluate a mathematical expression string.
   * @param {string} expression - Math expression (e.g., "2 + 3 * 4")
   * @returns {{ result: number, error: string|null }}
   */
  evaluate(expression) {
    try {
      const tokens = this._tokenize(expression);
      const rpn = this._shuntingYard(tokens);
      const result = this._evaluateRPN(rpn);
      return { result, error: null };
    } catch (e) {
      return { result: null, error: e.message || 'Invalid expression' };
    }
  },

  /**
   * Tokenize an expression string.
   * @param {string} expr
   * @returns {Array<{type: string, value: string|number}>}
   */
  _tokenize(expr) {
    const tokens = [];
    let i = 0;
    const chars = expr.replace(/\s+/g, '');

    while (i < chars.length) {
      const ch = chars[i];

      // Numbers (including decimals and negative)
      if (/[\d.]/.test(ch) || (ch === '-' && (tokens.length === 0 || tokens[tokens.length - 1].type === 'op' || tokens[tokens.length - 1].value === '('))) {
        let num = '';
        if (ch === '-' && (tokens.length === 0 || tokens[tokens.length - 1].type === 'op' || tokens[tokens.length - 1].value === '(')) {
          num = '-';
          i++;
        }
        while (i < chars.length && /[\d.eE]/.test(chars[i])) {
          num += chars[i];
          if ((chars[i] === 'e' || chars[i] === 'E') && i + 1 < chars.length && (chars[i + 1] === '-' || chars[i + 1] === '+')) {
            i++;
            num += chars[i];
          }
          i++;
        }
        tokens.push({ type: 'num', value: parseFloat(num) });
        continue;
      }

      // Functions
      if (/[a-zA-Zα-ωΑ-Ω]/.test(ch)) {
        let func = '';
        while (i < chars.length && /[a-zA-Zα-ωΑ-Ω]/.test(chars[i])) {
          func += chars[i];
          i++;
        }
        const funcLower = func.toLowerCase();
        const constants = { pi: Math.PI, π: Math.PI, e: Math.E, phi: 1.618033988749895 };
        if (constants[funcLower] !== undefined) {
          tokens.push({ type: 'num', value: constants[funcLower] });
        } else {
          tokens.push({ type: 'func', value: funcLower });
        }
        continue;
      }

      // Operators
      if ('+-×÷*/^%√!'.includes(ch)) {
        tokens.push({ type: 'op', value: ch });
        i++;
        continue;
      }

      // Parentheses
      if (ch === '(' || ch === ')') {
        tokens.push({ type: ch === '(' ? 'lparen' : 'rparen', value: ch });
        i++;
        continue;
      }

      // Modulus operator
      if (ch === '%') {
        tokens.push({ type: 'op', value: '%' });
        i++;
        continue;
      }

      throw new Error(`Unexpected character: '${ch}'`);
    }

    return tokens;
  },

  /**
   * Shunting-yard algorithm to convert infix to RPN.
   * @param {Array} tokens
   * @returns {Array}
   */
  _shuntingYard(tokens) {
    const precedence = { '+': 2, '−': 2, '-': 2, '×': 3, '*': 3, '÷': 3, '/': 3, '%': 3, '^': 4, '√': 4, '!': 5 };
    const associativity = { '+': 'L', '−': 'L', '-': 'L', '×': 'L', '*': 'L', '÷': 'L', '/': 'L', '%': 'L', '^': 'R', '√': 'R', '!': 'L' };
    const output = [];
    const stack = [];

    for (const token of tokens) {
      if (token.type === 'num') {
        output.push(token);
      } else if (token.type === 'func') {
        stack.push(token);
      } else if (token.type === 'op') {
        while (
          stack.length > 0 &&
          stack[stack.length - 1].type === 'op' &&
          ((associativity[token.value] === 'L' && precedence[token.value] <= precedence[stack[stack.length - 1].value]) ||
            (associativity[token.value] === 'R' && precedence[token.value] < precedence[stack[stack.length - 1].value]))
        ) {
          output.push(stack.pop());
        }
        stack.push(token);
      } else if (token.type === 'lparen') {
        stack.push(token);
      } else if (token.type === 'rparen') {
        while (stack.length > 0 && stack[stack.length - 1].type !== 'lparen') {
          output.push(stack.pop());
        }
        if (stack.length > 0 && stack[stack.length - 1].type === 'lparen') {
          stack.pop(); // Discard lparen
        }
        // If function is before lparen, pop it
        if (stack.length > 0 && stack[stack.length - 1].type === 'func') {
          output.push(stack.pop());
        }
      }
    }

    while (stack.length > 0) {
      const op = stack.pop();
      if (op.type === 'lparen' || op.type === 'rparen') {
        throw new Error('Mismatched parentheses');
      }
      output.push(op);
    }

    return output;
  },

  /**
   * Evaluate an RPN expression.
   * @param {Array} rpn
   * @returns {number}
   */
  _evaluateRPN(rpn) {
    const stack = [];

    for (const token of rpn) {
      if (token.type === 'num') {
        stack.push(token.value);
      } else if (token.type === 'op') {
        const b = stack.pop();
        const a = token.value === '!' ? null : stack.pop();

        switch (token.value) {
          case '+': stack.push(a + b); break;
          case '−':
          case '-': stack.push(a - b); break;
          case '×':
          case '*': stack.push(a * b); break;
          case '÷':
          case '/':
            if (b === 0) throw new Error('Division by zero');
            stack.push(a / b);
            break;
          case '%': stack.push(a % b); break;
          case '^': stack.push(Math.pow(a, b)); break;
          case '√': stack.push(Math.sqrt(b)); break;
          case '!':
            if (b < 0 || !Number.isInteger(b)) throw new Error('Factorial requires non-negative integer');
            stack.push(this._factorial(b));
            break;
          default: throw new Error(`Unknown operator: ${token.value}`);
        }
      } else if (token.type === 'func') {
        const a = stack.pop();
        switch (token.value) {
          case 'sin': stack.push(Math.sin(a)); break;
          case 'cos': stack.push(Math.cos(a)); break;
          case 'tan': stack.push(Math.tan(a)); break;
          case 'asin':
          case 'arcsin': stack.push(Math.asin(a)); break;
          case 'acos':
          case 'arccos': stack.push(Math.acos(a)); break;
          case 'atan':
          case 'arctan': stack.push(Math.atan(a)); break;
          case 'log': stack.push(Math.log10(a)); break;
          case 'ln': stack.push(Math.log(a)); break;
          case 'sqrt': stack.push(Math.sqrt(a)); break;
          case 'cbrt': stack.push(Math.cbrt(a)); break;
          case 'abs': stack.push(Math.abs(a)); break;
          case 'ceil': stack.push(Math.ceil(a)); break;
          case 'floor': stack.push(Math.floor(a)); break;
          case 'round': stack.push(Math.round(a)); break;
          case 'exp': stack.push(Math.exp(a)); break;
          case 'sinh': stack.push(Math.sinh(a)); break;
          case 'cosh': stack.push(Math.cosh(a)); break;
          case 'tanh': stack.push(Math.tanh(a)); break;
          default: throw new Error(`Unknown function: ${token.value}`);
        }
      }
    }

    if (stack.length !== 1) {
      throw new Error('Invalid expression');
    }

    const result = stack[0];
    if (!isFinite(result)) throw new Error('Result is not finite');
    return result;
  },

  /**
   * Compute factorial recursively.
   * @param {number} n
   * @returns {number}
   */
  _factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  },

  /**
   * Format a number for display.
   * @param {number} num
   * @param {number} [maxDecimals=10]
   * @returns {string}
   */
  formatNumber(num, maxDecimals = 10) {
    if (num === null || num === undefined || isNaN(num)) return 'Error';
    if (!isFinite(num)) return '∞';

    // Handle very large/small numbers
    if (Math.abs(num) > 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
      return num.toExponential(6);
    }

    // Format with appropriate decimals
    const str = num.toFixed(maxDecimals);
    // Remove trailing zeros
    const trimmed = parseFloat(str).toString();
    return trimmed;
  },

  /**
   * Create a number for display with commas.
   * @param {number} num
   * @returns {string}
   */
  formatWithCommas(num) {
    if (num === null || num === undefined || isNaN(num)) return 'Error';
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  },

  // ===== Calculator-specific helpers =====

  /**
   * Calculate percentage.
   * @param {number} value
   * @param {number} total
   * @returns {number}
   */
  percentage(value, total) {
    if (total === 0) return 0;
    return (value / total) * 100;
  },

  /**
   * Calculate percentage of a value.
   * @param {number} percent
   * @param {number} value
   * @returns {number}
   */
  percentOf(percent, value) {
    return (percent / 100) * value;
  },

  /**
   * Calculate percentage change.
   * @param {number} oldVal
   * @param {number} newVal
   * @returns {number}
   */
  percentChange(oldVal, newVal) {
    if (oldVal === 0) return 0;
    return ((newVal - oldVal) / oldVal) * 100;
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MathEngine };
}
