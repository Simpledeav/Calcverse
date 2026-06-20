/**
 * CalcVerse Date Engine
 * Date and time calculations: age, date difference, time zones, and more.
 */
const DateEngine = {
  /**
   * Calculate age from birth date.
   * @param {Date|string} birthDate
   * @param {Date} [referenceDate=new Date()]
   * @returns {{ years: number, months: number, days: number, totalDays: number, nextBirthday: Date, dayOfWeek: string }}
   */
  age(birthDate, referenceDate = new Date()) {
    const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
    const ref = referenceDate;

    let years = ref.getFullYear() - birth.getFullYear();
    let months = ref.getMonth() - birth.getMonth();
    let days = ref.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Get days in previous month
      const prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((ref - birth) / (1000 * 60 * 60 * 24));

    // Next birthday
    const nextBirthday = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < ref) {
      nextBirthday.setFullYear(ref.getFullYear() + 1);
    }

    const daysUntilBirthday = Math.ceil((nextBirthday - ref) / (1000 * 60 * 60 * 24));

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = dayNames[birth.getDay()];

    return {
      years,
      months,
      days,
      totalDays,
      nextBirthday,
      daysUntilBirthday,
      dayOfWeek,
      hours: totalDays * 24,
      minutes: totalDays * 24 * 60,
    };
  },

  /**
   * Calculate difference between two dates.
   * @param {Date|string} startDate
   * @param {Date|string} endDate
   * @returns {{ totalDays: number, weeks: number, months: number, years: number, workingDays: number, weekends: number, hours: number }}
   */
  dateDifference(startDate, endDate) {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

    const diffMs = Math.abs(end - start);
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    // Approximate months
    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months += end.getMonth() - start.getMonth();
    if (end.getDate() < start.getDate()) months--;

    const years = Math.floor(months / 12);
    months = months % 12;

    // Working days (Monday-Friday)
    let workingDays = 0;
    let current = new Date(start);
    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) workingDays++;
      current.setDate(current.getDate() + 1);
    }

    const weekends = totalDays - workingDays;

    return {
      totalDays,
      weeks: Math.floor(totalDays / 7),
      remainingDays: totalDays % 7,
      months: Math.abs(months),
      years: Math.abs(years),
      workingDays,
      weekends,
      hours: totalDays * 24,
      minutes: totalDays * 24 * 60,
      seconds: totalDays * 24 * 60 * 60,
      isPast: end < start,
    };
  },

  /**
   * Format a date for display.
   * @param {Date} date
   * @param {string} [format='medium'] - 'short' | 'medium' | 'long' | 'full'
   * @returns {string}
   */
  formatDate(date, format = 'medium') {
    const options = {
      short: { month: 'numeric', day: 'numeric', year: '2-digit' },
      medium: { month: 'short', day: 'numeric', year: 'numeric' },
      long: { month: 'long', day: 'numeric', year: 'numeric' },
      full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
    };
    return date.toLocaleDateString('en-US', options[format] || options.medium);
  },

  /**
   * Time zone offset data (simplified).
   */
  TIMEZONES: [
    { id: 'UTC', name: 'UTC', offset: 0, label: 'UTC +0' },
    { id: 'GMT', name: 'London (GMT/BST)', offset: 0, label: 'GMT +0' },
    { id: 'EST', name: 'Eastern (US)', offset: -5, label: 'EST (UTC-5)' },
    { id: 'CST', name: 'Central (US)', offset: -6, label: 'CST (UTC-6)' },
    { id: 'MST', name: 'Mountain (US)', offset: -7, label: 'MST (UTC-7)' },
    { id: 'PST', name: 'Pacific (US)', offset: -8, label: 'PST (UTC-8)' },
    { id: 'AKST', name: 'Alaska', offset: -9, label: 'AKST (UTC-9)' },
    { id: 'HST', name: 'Hawaii', offset: -10, label: 'HST (UTC-10)' },
    { id: 'CET', name: 'Central Europe', offset: 1, label: 'CET (UTC+1)' },
    { id: 'EET', name: 'Eastern Europe', offset: 2, label: 'EET (UTC+2)' },
    { id: 'IST', name: 'India', offset: 5.5, label: 'IST (UTC+5:30)' },
    { id: 'CST_ASIA', name: 'China', offset: 8, label: 'CST (UTC+8)' },
    { id: 'JST', name: 'Japan', offset: 9, label: 'JST (UTC+9)' },
    { id: 'AEST', name: 'Australia Eastern', offset: 10, label: 'AEST (UTC+10)' },
    { id: 'NZST', name: 'New Zealand', offset: 12, label: 'NZST (UTC+12)' },
    { id: 'BRT', name: 'Brasilia', offset: -3, label: 'BRT (UTC-3)' },
    { id: 'ART', name: 'Argentina', offset: -3, label: 'ART (UTC-3)' },
    { id: 'AST', name: 'Atlantic', offset: -4, label: 'AST (UTC-4)' },
    { id: 'NST', name: 'Newfoundland', offset: -3.5, label: 'NST (UTC-3:30)' },
    { id: 'WAT', name: 'West Africa', offset: 1, label: 'WAT (UTC+1)' },
    { id: 'CAT', name: 'Central Africa', offset: 2, label: 'CAT (UTC+2)' },
    { id: 'EAT', name: 'East Africa', offset: 3, label: 'EAT (UTC+3)' },
    { id: 'MSK', name: 'Moscow', offset: 3, label: 'MSK (UTC+3)' },
    { id: 'GST', name: 'Gulf', offset: 4, label: 'GST (UTC+4)' },
    { id: 'PKT', name: 'Pakistan', offset: 5, label: 'PKT (UTC+5)' },
    { id: 'BST', name: 'Bangladesh', offset: 6, label: 'BST (UTC+6)' },
    { id: 'ICT', name: 'Indochina', offset: 7, label: 'ICT (UTC+7)' },
    { id: 'AWST', name: 'Australia Western', offset: 8, label: 'AWST (UTC+8)' },
    { id: 'KST', name: 'Korea', offset: 9, label: 'KST (UTC+9)' },
    { id: 'ACST', name: 'Australia Central', offset: 9.5, label: 'ACST (UTC+9:30)' },
    { id: 'AEDT', name: 'Australia Eastern (DST)', offset: 11, label: 'AEDT (UTC+11)' },
  ],

  /**
   * Get time at a different timezone.
   * @param {Date} sourceDate
   * @param {number} sourceOffset - Source timezone offset in hours
   * @param {number} targetOffset - Target timezone offset in hours
   * @returns {{ time: Date, formatted: string }}
   */
  convertTimezone(sourceDate, sourceOffset, targetOffset) {
    const utcMs = sourceDate.getTime() + sourceDate.getTimezoneOffset() * 60000;
    const targetUtcOffset = targetOffset * 3600000;
    const sourceUtcOffset = sourceOffset * 3600000;
    const targetTime = new Date(utcMs + targetUtcOffset - sourceUtcOffset);

    return {
      time: targetTime,
      formatted: targetTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    };
  },

  /**
   * Check if a year is a leap year.
   * @param {number} year
   * @returns {boolean}
   */
  isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },

  /**
   * Calculate day of the year.
   * @param {Date} date
   * @returns {number}
   */
  dayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  },

  /**
   * Calculate week number (ISO).
   * @param {Date} date
   * @returns {number}
   */
  weekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DateEngine };
}
