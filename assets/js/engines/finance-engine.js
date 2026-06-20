/**
 * CalcVerse Finance Engine
 * Financial formulas for loans, mortgages, interest, ROI, and more.
 */
const FinanceEngine = {
  // ===== Loan / EMI =====

  /**
   * Calculate EMI (Equated Monthly Installment).
   * @param {number} principal - Loan amount
   * @param {number} annualRate - Annual interest rate in percent
   * @param {number} termMonths - Loan term in months
   * @returns {number} Monthly payment
   */
  emi(principal, annualRate, termMonths) {
    if (principal <= 0 || termMonths <= 0) return 0;
    const r = annualRate / 100 / 12;
    if (r === 0) return principal / termMonths;
    return principal * r * Math.pow(1 + r, termMonths) / (Math.pow(1 + r, termMonths) - 1);
  },

  /**
   * Calculate total interest over loan term.
   * @param {number} principal
   * @param {number} annualRate
   * @param {number} termMonths
   * @returns {number}
   */
  totalInterest(principal, annualRate, termMonths) {
    const payment = this.emi(principal, annualRate, termMonths);
    return payment * termMonths - principal;
  },

  /**
   * Generate amortization schedule (client-side, simplified).
   * @param {number} principal
   * @param {number} annualRate
   * @param {number} termMonths
   * @returns {Array<{month: number, payment: number, principal: number, interest: number, balance: number}>}
   */
  amortizationSchedule(principal, annualRate, termMonths) {
    const r = annualRate / 100 / 12;
    const payment = this.emi(principal, annualRate, termMonths);
    const rows = [];
    let balance = principal;

    for (let month = 1; month <= termMonths && balance > 0; month++) {
      const interest = balance * r;
      const principalPmt = payment - interest;
      balance = Math.max(0, balance - principalPmt);
      rows.push({
        month,
        payment: Math.round(payment * 100) / 100,
        principal: Math.round(principalPmt * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        balance: Math.round(balance * 100) / 100,
      });
    }
    return rows;
  },

  // ===== Simple Interest =====

  /**
   * Calculate simple interest.
   * @param {number} principal
   * @param {number} rate - Annual rate in percent
   * @param {number} time - Time in years
   * @returns {number}
   */
  simpleInterest(principal, rate, time) {
    return principal * rate * time / 100;
  },

  /**
   * Calculate maturity amount with simple interest.
   * @param {number} principal
   * @param {number} rate
   * @param {number} time
   * @returns {number}
   */
  simpleMaturity(principal, rate, time) {
    return principal + this.simpleInterest(principal, rate, time);
  },

  // ===== Compound Interest =====

  /**
   * Calculate compound interest.
   * @param {number} principal - Initial amount
   * @param {number} annualRate - Annual rate in percent
   * @param {number} timesPerYear - Compounding frequency
   * @param {number} years - Time in years
   * @param {number} [monthlyContrib=0] - Additional monthly contribution
   * @returns {number} Final amount
   */
  compoundInterest(principal, annualRate, timesPerYear, years, monthlyContrib = 0) {
    const r = annualRate / 100;
    const n = timesPerYear;
    const t = years;

    // Compound interest on principal
    const principalGrowth = principal * Math.pow(1 + r / n, n * t);

    // Future value of monthly contributions
    if (monthlyContrib > 0) {
      const ratePerPeriod = r / n;
      const totalPeriods = n * t;
      const contribPerPeriod = monthlyContrib;
      // Assuming contributions at end of each period
      const contribGrowth = contribPerPeriod * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);
      return principalGrowth + contribGrowth;
    }

    return principalGrowth;
  },

  /**
   * Generate year-by-year growth data.
   * @param {number} principal
   * @param {number} annualRate
   * @param {number} timesPerYear
   * @param {number} years
   * @param {number} monthlyContrib
   * @returns {Array<{year: number, balance: number, contributions: number, interest: number}>}
   */
  growthTable(principal, annualRate, timesPerYear, years, monthlyContrib = 0) {
    const data = [];
    let runningBalance = principal;
    let totalContributions = principal;
    const r = annualRate / 100;

    for (let year = 1; year <= years; year++) {
      // Calculate balance at end of year
      const yearlyRate = r;
      const yearlyContrib = monthlyContrib * 12;

      // Compound for one year
      runningBalance = runningBalance * (1 + yearlyRate) + yearlyContrib * (1 + yearlyRate / 2);
      totalContributions += yearlyContrib;

      data.push({
        year,
        balance: Math.round(runningBalance * 100) / 100,
        contributions: Math.round(totalContributions * 100) / 100,
        interest: Math.round((runningBalance - totalContributions) * 100) / 100,
      });
    }
    return data;
  },

  // ===== ROI =====

  /**
   * Calculate Return on Investment.
   * @param {number} initialValue
   * @param {number} finalValue
   * @returns {number} ROI as percentage
   */
  roi(initialValue, finalValue) {
    if (initialValue === 0) return 0;
    return ((finalValue - initialValue) / initialValue) * 100;
  },

  /**
   * Calculate annualized ROI.
   * @param {number} initialValue
   * @param {number} finalValue
   * @param {number} years
   * @returns {number}
   */
  annualizedRoi(initialValue, finalValue, years) {
    if (initialValue === 0 || years <= 0) return 0;
    const totalReturn = finalValue / initialValue;
    return (Math.pow(totalReturn, 1 / years) - 1) * 100;
  },

  // ===== Profit Margin =====

  /**
   * Calculate profit margin.
   * @param {number} revenue
   * @param {number} cost
   * @returns {number} Margin as percentage
   */
  profitMargin(revenue, cost) {
    if (revenue === 0) return 0;
    return ((revenue - cost) / revenue) * 100;
  },

  /**
   * Calculate markup percentage.
   * @param {number} cost
   * @param {number} sellingPrice
   * @returns {number}
   */
  markup(cost, sellingPrice) {
    if (cost === 0) return 0;
    return ((sellingPrice - cost) / cost) * 100;
  },

  /**
   * Convert margin to markup.
   * @param {number} marginPercent
   * @returns {number}
   */
  marginToMarkup(marginPercent) {
    if (marginPercent >= 100) return Infinity;
    return (marginPercent / (100 - marginPercent)) * 100;
  },

  /**
   * Convert markup to margin.
   * @param {number} markupPercent
   * @returns {number}
   */
  markupToMargin(markupPercent) {
    return (markupPercent / (100 + markupPercent)) * 100;
  },

  // ===== Break-Even =====

  /**
   * Calculate break-even point in units.
   * @param {number} fixedCosts
   * @param {number} pricePerUnit
   * @param {number} variableCostPerUnit
   * @returns {number}
   */
  breakEvenUnits(fixedCosts, pricePerUnit, variableCostPerUnit) {
    const contribution = pricePerUnit - variableCostPerUnit;
    if (contribution <= 0) return Infinity;
    return Math.ceil(fixedCosts / contribution);
  },

  /**
   * Calculate break-even revenue.
   * @param {number} fixedCosts
   * @param {number} pricePerUnit
   * @param {number} variableCostPerUnit
   * @returns {number}
   */
  breakEvenRevenue(fixedCosts, pricePerUnit, variableCostPerUnit) {
    const units = this.breakEvenUnits(fixedCosts, pricePerUnit, variableCostPerUnit);
    return units * pricePerUnit;
  },

  // ===== Currency formatting =====

  /**
   * Format a number as currency.
   * @param {number} amount
   * @param {string} [currency='$']
   * @returns {string}
   */
  formatCurrency(amount, currency = '$') {
    if (amount === null || amount === undefined || isNaN(amount)) return `${currency}0.00`;
    const formatted = Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return amount < 0 ? `-${currency}${formatted}` : `${currency}${formatted}`;
  },

  /**
   * Format a percentage.
   * @param {number} value
   * @param {number} [decimals=2]
   * @returns {string}
   */
  formatPercent(value, decimals = 2) {
    return `${value.toFixed(decimals)}%`;
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FinanceEngine };
}
