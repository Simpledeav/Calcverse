/**
 * CalcVerse Unit Conversion Engine
 * Comprehensive unit conversion tables and functions for all measurement categories.
 */
const UnitEngine = {
  /**
   * Conversion factors relative to a base unit for each category.
   * Base units: meter (length), gram (mass), celsius (temp), m² (area), liter (volume),
   * m/s (speed), pascal (pressure), joule (energy), watt (power), bit (storage), degree (angle)
   */
  CATEGORIES: {
    length: {
      base: 'meter',
      units: {
        millimeter: { factor: 0.001, symbol: 'mm' },
        centimeter: { factor: 0.01, symbol: 'cm' },
        meter: { factor: 1, symbol: 'm' },
        kilometer: { factor: 1000, symbol: 'km' },
        inch: { factor: 0.0254, symbol: 'in' },
        foot: { factor: 0.3048, symbol: 'ft' },
        yard: { factor: 0.9144, symbol: 'yd' },
        mile: { factor: 1609.344, symbol: 'mi' },
        nautical_mile: { factor: 1852, symbol: 'nmi' },
        micrometer: { factor: 0.000001, symbol: 'µm' },
        nanometer: { factor: 1e-9, symbol: 'nm' },
        angstrom: { factor: 1e-10, symbol: 'Å' },
        chain: { factor: 20.1168, symbol: 'ch' },
        furlong: { factor: 201.168, symbol: 'fur' },
        light_year: { factor: 9.461e15, symbol: 'ly' },
      },
    },
    mass: {
      base: 'gram',
      units: {
        milligram: { factor: 0.001, symbol: 'mg' },
        gram: { factor: 1, symbol: 'g' },
        kilogram: { factor: 1000, symbol: 'kg' },
        tonne: { factor: 1000000, symbol: 't' },
        ounce: { factor: 28.3495, symbol: 'oz' },
        pound: { factor: 453.592, symbol: 'lb' },
        stone: { factor: 6350.29, symbol: 'st' },
        us_ton: { factor: 907185, symbol: 'US ton' },
        imperial_ton: { factor: 1016046, symbol: 'imp ton' },
        carat: { factor: 0.2, symbol: 'ct' },
      },
    },
    temperature: {
      base: 'kelvin',
      units: {
        celsius: { factor: null, symbol: '°C', convert: { toBase: (v) => v + 273.15, fromBase: (v) => v - 273.15 } },
        fahrenheit: { factor: null, symbol: '°F', convert: { toBase: (v) => (v + 459.67) * 5 / 9, fromBase: (v) => v * 9 / 5 - 459.67 } },
        kelvin: { factor: null, symbol: 'K', convert: { toBase: (v) => v, fromBase: (v) => v } },
        rankine: { factor: null, symbol: '°R', convert: { toBase: (v) => v * 5 / 9, fromBase: (v) => v * 9 / 5 } },
      },
    },
    area: {
      base: 'sq_meter',
      units: {
        sq_millimeter: { factor: 0.000001, symbol: 'mm²' },
        sq_centimeter: { factor: 0.0001, symbol: 'cm²' },
        sq_meter: { factor: 1, symbol: 'm²' },
        sq_kilometer: { factor: 1000000, symbol: 'km²' },
        sq_inch: { factor: 0.00064516, symbol: 'in²' },
        sq_foot: { factor: 0.092903, symbol: 'ft²' },
        sq_yard: { factor: 0.836127, symbol: 'yd²' },
        sq_mile: { factor: 2589988.11, symbol: 'mi²' },
        acre: { factor: 4046.86, symbol: 'ac' },
        hectare: { factor: 10000, symbol: 'ha' },
      },
    },
    volume: {
      base: 'liter',
      units: {
        milliliter: { factor: 0.001, symbol: 'mL' },
        liter: { factor: 1, symbol: 'L' },
        cubic_meter: { factor: 1000, symbol: 'm³' },
        teaspoon_us: { factor: 0.00492892, symbol: 'tsp' },
        tablespoon_us: { factor: 0.0147868, symbol: 'tbsp' },
        fluid_ounce_us: { factor: 0.0295735, symbol: 'fl oz' },
        cup_us: { factor: 0.236588, symbol: 'cup' },
        pint_us: { factor: 0.473176, symbol: 'pt' },
        quart_us: { factor: 0.946353, symbol: 'qt' },
        gallon_us: { factor: 3.78541, symbol: 'gal' },
        gallon_imperial: { factor: 4.54609, symbol: 'imp gal' },
        cubic_inch: { factor: 0.0163871, symbol: 'in³' },
        cubic_foot: { factor: 28.3168, symbol: 'ft³' },
      },
    },
    speed: {
      base: 'mps',
      units: {
        mps: { factor: 1, symbol: 'm/s' },
        kmph: { factor: 0.277778, symbol: 'km/h' },
        mph: { factor: 0.44704, symbol: 'mph' },
        knot: { factor: 0.514444, symbol: 'kn' },
        fps: { factor: 0.3048, symbol: 'ft/s' },
        mach: { factor: 343, symbol: 'Mach' },
        speed_of_light: { factor: 299792458, symbol: 'c' },
      },
    },
    pressure: {
      base: 'pascal',
      units: {
        pascal: { factor: 1, symbol: 'Pa' },
        kilopascal: { factor: 1000, symbol: 'kPa' },
        bar: { factor: 100000, symbol: 'bar' },
        psi: { factor: 6894.76, symbol: 'psi' },
        atm: { factor: 101325, symbol: 'atm' },
        torr: { factor: 133.322, symbol: 'Torr' },
        mmhg: { factor: 133.322, symbol: 'mmHg' },
        inhg: { factor: 3386.39, symbol: 'inHg' },
      },
    },
    energy: {
      base: 'joule',
      units: {
        joule: { factor: 1, symbol: 'J' },
        kilojoule: { factor: 1000, symbol: 'kJ' },
        calorie: { factor: 4.184, symbol: 'cal' },
        kilocalorie: { factor: 4184, symbol: 'kcal' },
        watt_hour: { factor: 3600, symbol: 'Wh' },
        kilowatt_hour: { factor: 3600000, symbol: 'kWh' },
        electronvolt: { factor: 1.602e-19, symbol: 'eV' },
        btu: { factor: 1055.06, symbol: 'BTU' },
        foot_pound: { factor: 1.35582, symbol: 'ft·lb' },
      },
    },
    power: {
      base: 'watt',
      units: {
        watt: { factor: 1, symbol: 'W' },
        kilowatt: { factor: 1000, symbol: 'kW' },
        megawatt: { factor: 1000000, symbol: 'MW' },
        horsepower: { factor: 745.7, symbol: 'hp' },
        btu_per_hour: { factor: 0.293071, symbol: 'BTU/h' },
        dbm: { factor: null, symbol: 'dBm', convert: { toBase: (v) => Math.pow(10, v / 10) / 1000, fromBase: (v) => 10 * Math.log10(v * 1000) } },
      },
    },
    storage: {
      base: 'bit',
      units: {
        bit: { factor: 1, symbol: 'b' },
        byte: { factor: 8, symbol: 'B' },
        kilobit: { factor: 1000, symbol: 'kb' },
        kilobyte: { factor: 8000, symbol: 'KB' },
        kibibyte: { factor: 8192, symbol: 'KiB' },
        megabit: { factor: 1000000, symbol: 'Mb' },
        megabyte: { factor: 8000000, symbol: 'MB' },
        mebibyte: { factor: 8388608, symbol: 'MiB' },
        gigabit: { factor: 1e9, symbol: 'Gb' },
        gigabyte: { factor: 8e9, symbol: 'GB' },
        gibibyte: { factor: 8589934592, symbol: 'GiB' },
        terabit: { factor: 1e12, symbol: 'Tb' },
        terabyte: { factor: 8e12, symbol: 'TB' },
        tebibyte: { factor: 8.796e12, symbol: 'TiB' },
        petabyte: { factor: 8e15, symbol: 'PB' },
      },
    },
    angle: {
      base: 'degree',
      units: {
        degree: { factor: 1, symbol: '°' },
        radian: { factor: 57.2958, symbol: 'rad' },
        gradian: { factor: 0.9, symbol: 'grad' },
        arcminute: { factor: 1 / 60, symbol: "'" },
        arcsecond: { factor: 1 / 3600, symbol: '"' },
      },
    },
    fuel_economy: {
      base: 'lp100km',
      // Special case: conversion requires formula
      units: {
        lp100km: { factor: null, symbol: 'L/100km', convert: { toBase: (v) => v, fromBase: (v) => v } },
        mpg_us: { factor: null, symbol: 'MPG (US)', convert: { toBase: (v) => 235.214 / v, fromBase: (v) => 235.214 / v } },
        mpg_imperial: { factor: null, symbol: 'MPG (IMP)', convert: { toBase: (v) => 282.481 / v, fromBase: (v) => 282.481 / v } },
        kmpl: { factor: null, symbol: 'km/L', convert: { toBase: (v) => 100 / v, fromBase: (v) => 100 / v } },
      },
    },
  },

  /**
   * Get all category names.
   * @returns {string[]}
   */
  getCategories() {
    return Object.keys(this.CATEGORIES);
  },

  /**
   * Get units for a category.
   * @param {string} category
   * @returns {Array<{id: string, name: string, symbol: string}>}
   */
  getCategoryUnits(category) {
    const cat = this.CATEGORIES[category];
    if (!cat) return [];
    return Object.entries(cat.units).map(([id, info]) => ({
      id,
      name: id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      symbol: info.symbol,
    }));
  },

  /**
   * Convert a value from one unit to another.
   * @param {number} value - The value to convert
   * @param {string} fromUnit - Source unit ID
   * @param {string} toUnit - Target unit ID
   * @param {string} category - Measurement category
   * @returns {number} Converted value
   */
  convert(value, fromUnit, toUnit, category) {
    const cat = this.CATEGORIES[category];
    if (!cat) throw new Error(`Unknown category: ${category}`);

    const from = cat.units[fromUnit];
    const to = cat.units[toUnit];
    if (!from || !to) throw new Error('Unknown unit');

    // Handle special conversions (temperature, fuel economy, dBm)
    if (from.convert && to.convert) {
      const baseValue = from.convert.toBase(value);
      return to.convert.fromBase(baseValue);
    }

    // Standard multiplicative conversion
    let baseValue;
    if (from.convert) {
      baseValue = from.convert.toBase(value);
    } else {
      baseValue = value * (from.factor || 1);
    }

    if (to.convert) {
      return to.convert.fromBase(baseValue);
    }
    return baseValue / (to.factor || 1);
  },

  /**
   * Format a converted value with appropriate precision.
   * @param {number} value
   * @param {number} [maxDecimals=6]
   * @returns {string}
   */
  formatValue(value, maxDecimals = 6) {
    if (value === null || value === undefined || isNaN(value)) return '—';
    if (!isFinite(value)) return '∞';

    // Very large or small → scientific notation
    if (Math.abs(value) > 1e12 || (Math.abs(value) < 1e-6 && value !== 0)) {
      return value.toExponential(4);
    }

    // Normal number
    const rounded = parseFloat(value.toFixed(maxDecimals));
    return rounded.toLocaleString('en-US', {
      maximumFractionDigits: maxDecimals,
    });
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UnitEngine };
}
