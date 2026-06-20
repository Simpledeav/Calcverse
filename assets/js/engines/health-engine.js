/**
 * CalcVerse Health Engine
 * Health and fitness metric formulas: BMI, BMR, TDEE, body fat, and more.
 */
const HealthEngine = {
  // ===== BMI =====

  /**
   * Calculate Body Mass Index (metric).
   * @param {number} weightKg - Weight in kilograms
   * @param {number} heightCm - Height in centimeters
   * @returns {number}
   */
  bmiMetric(weightKg, heightCm) {
    if (heightCm <= 0) return 0;
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
  },

  /**
   * Calculate BMI (imperial).
   * @param {number} weightLbs - Weight in pounds
   * @param {number} heightIn - Height in inches
   * @returns {number}
   */
  bmiImperial(weightLbs, heightIn) {
    if (heightIn <= 0) return 0;
    return (weightLbs / (heightIn * heightIn)) * 703;
  },

  /**
   * Get BMI category label.
   * @param {number} bmi
   * @returns {{label: string, color: string, range: string}}
   */
  bmiCategory(bmi) {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500', range: '< 18.5' };
    if (bmi < 25) return { label: 'Normal', color: 'text-primary', range: '18.5 - 24.9' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500', range: '25 - 29.9' };
    if (bmi < 35) return { label: 'Obese (Class I)', color: 'text-orange-500', range: '30 - 34.9' };
    if (bmi < 40) return { label: 'Obese (Class II)', color: 'text-red-500', range: '35 - 39.9' };
    return { label: 'Obese (Class III)', color: 'text-red-600', range: '40+' };
  },

  // ===== BMR =====

  /**
   * Calculate BMR using Mifflin-St Jeor equation.
   * @param {'male'|'female'} sex
   * @param {number} weightKg
   * @param {number} heightCm
   * @param {number} age - Age in years
   * @returns {number} BMR in kcal/day
   */
  bmrMifflin(sex, weightKg, heightCm, age) {
    const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
    return sex === 'male' ? base + 5 : base - 161;
  },

  /**
   * Calculate BMR using Harris-Benedict equation.
   * @param {'male'|'female'} sex
   * @param {number} weightKg
   * @param {number} heightCm
   * @param {number} age
   * @returns {number}
   */
  bmrHarrisBenedict(sex, weightKg, heightCm, age) {
    if (sex === 'male') {
      return 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
    }
    return 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
  },

  // ===== TDEE =====

  /**
   * Activity level multipliers.
   */
  ACTIVITY_LEVELS: [
    { id: 'sedentary', label: 'Sedentary', multiplier: 1.2, description: 'Little or no exercise' },
    { id: 'light', label: 'Lightly Active', multiplier: 1.375, description: 'Light exercise 1-3 days/week' },
    { id: 'moderate', label: 'Moderately Active', multiplier: 1.55, description: 'Moderate exercise 3-5 days/week' },
    { id: 'active', label: 'Very Active', multiplier: 1.725, description: 'Hard exercise 6-7 days/week' },
    { id: 'extra', label: 'Extra Active', multiplier: 1.9, description: 'Very hard exercise, physical job' },
  ],

  /**
   * Calculate Total Daily Energy Expenditure.
   * @param {number} bmr
   * @param {number} activityMultiplier
   * @returns {number}
   */
  tdee(bmr, activityMultiplier) {
    return bmr * activityMultiplier;
  },

  /**
   * Calculate calorie targets for different goals.
   * @param {number} tdee
   * @returns {{cut: number, maintain: number, bulk: number}}
   */
  calorieTargets(tdee) {
    return {
      cut: Math.round(tdee - 500),
      maintain: Math.round(tdee),
      bulk: Math.round(tdee + 500),
    };
  },

  // ===== Body Fat (US Navy Method) =====

  /**
   * Calculate body fat percentage using US Navy method.
   * @param {'male'|'female'} sex
   * @param {number} neckCm - Neck circumference in cm
   * @param {number} waistCm - Waist circumference in cm
   * @param {number} heightCm - Height in cm
   * @param {number} [hipCm] - Hip circumference in cm (required for female)
   * @returns {number}
   */
  bodyFatPercentage(sex, neckCm, waistCm, heightCm, hipCm) {
    if (sex === 'male') {
      return 86.010 * Math.log10(waistCm - neckCm) - 70.041 * Math.log10(heightCm) + 36.76;
    }
    if (!hipCm) return 0;
    return 163.205 * Math.log10(waistCm + hipCm - neckCm) - 97.684 * Math.log10(heightCm) - 78.387;
  },

  /**
   * Get body fat category.
   * @param {'male'|'female'} sex
   * @param {number} percentage
   * @returns {{label: string, color: string}}
   */
  bodyFatCategory(sex, percentage) {
    if (sex === 'male') {
      if (percentage < 6) return { label: 'Essential Fat', color: 'text-blue-400' };
      if (percentage < 14) return { label: 'Athlete', color: 'text-primary' };
      if (percentage < 18) return { label: 'Fitness', color: 'text-green-500' };
      if (percentage < 25) return { label: 'Average', color: 'text-yellow-500' };
      return { label: 'Obese', color: 'text-red-500' };
    }
    if (percentage < 14) return { label: 'Essential Fat', color: 'text-blue-400' };
    if (percentage < 21) return { label: 'Athlete', color: 'text-primary' };
    if (percentage < 25) return { label: 'Fitness', color: 'text-green-500' };
    if (percentage < 32) return { label: 'Average', color: 'text-yellow-500' };
    return { label: 'Obese', color: 'text-red-500' };
  },

  // ===== Ideal Weight =====

  /**
   * Calculate ideal weight using Devine formula.
   * @param {'male'|'female'} sex
   * @param {number} heightCm
   * @returns {number} Ideal weight in kg
   */
  idealWeightDevine(sex, heightCm) {
    const heightIn = heightCm / 2.54;
    const baseInches = 60; // 5 feet
    const excessInches = Math.max(0, heightIn - baseInches);
    if (sex === 'male') {
      return 50 + 2.3 * excessInches;
    }
    return 45.5 + 2.3 * excessInches;
  },

  /**
   * Calculate ideal weight using Robinson formula.
   * @param {'male'|'female'} sex
   * @param {number} heightCm
   * @returns {number}
   */
  idealWeightRobinson(sex, heightCm) {
    const heightIn = heightCm / 2.54;
    const baseInches = 60;
    const excessInches = Math.max(0, heightIn - baseInches);
    if (sex === 'male') {
      return 52 + 1.9 * excessInches;
    }
    return 49 + 1.7 * excessInches;
  },

  // ===== Calorie Burn =====

  /**
   * MET values for common activities.
   */
  MET_VALUES: {
    'running': 9.8, 'jogging': 7.0, 'walking': 3.5, 'cycling': 7.5,
    'swimming': 8.0, 'hiking': 6.0, 'yoga': 3.0, 'weightlifting': 5.0,
    'hiit': 12.0, 'dancing': 6.0, 'jump_rope': 10.0, 'rowing': 7.0,
    'elliptical': 5.5, 'stair_climbing': 8.0, 'pilates': 3.5, 'boxing': 8.0,
    'soccer': 7.0, 'basketball': 6.5, 'tennis': 7.0, 'golf': 4.0,
  },

  /**
   * Calculate calories burned during an activity.
   * @param {number} met - MET value
   * @param {number} weightKg
   * @param {number} durationMin - Duration in minutes
   * @returns {number} Calories burned
   */
  caloriesBurned(met, weightKg, durationMin) {
    return met * weightKg * (durationMin / 60);
  },

  // ===== Water Intake =====

  /**
   * Calculate daily water intake recommendation.
   * @param {number} weightKg
   * @param {number} [activityLevel=1] - 0 (sedentary) to 3 (very active)
   * @param {string} [climate='temperate'] - 'temperate' | 'hot' | 'humid'
   * @returns {{liters: number, glasses: number}}
   */
  dailyWaterIntake(weightKg, activityLevel = 1, climate = 'temperate') {
    let base = weightKg * 0.033;
    const activityBonus = activityLevel * 0.35;
    const climateMultiplier = climate === 'hot' ? 1.2 : climate === 'humid' ? 1.15 : 1.0;
    const total = (base + activityBonus) * climateMultiplier;
    return {
      liters: Math.round(total * 10) / 10,
      glasses: Math.round(total / 0.24),
    };
  },

  // ===== Heart Rate =====

  /**
   * Calculate maximum heart rate.
   * @param {number} age
   * @returns {number}
   */
  maxHeartRate(age) {
    return 220 - age;
  },

  /**
   * Calculate heart rate zones.
   * @param {number} age
   * @returns {Array<{name: string, min: number, max: number, color: string}>}
   */
  heartRateZones(age) {
    const max = this.maxHeartRate(age);
    return [
      { name: 'Rest', min: 0, max: Math.round(max * 0.5), color: 'bg-gray-400' },
      { name: 'Fat Burn', min: Math.round(max * 0.5), max: Math.round(max * 0.6), color: 'bg-blue-500' },
      { name: 'Cardio', min: Math.round(max * 0.6), max: Math.round(max * 0.7), color: 'bg-green-500' },
      { name: 'Vigorous', min: Math.round(max * 0.7), max: Math.round(max * 0.85), color: 'bg-orange-500' },
      { name: 'Peak', min: Math.round(max * 0.85), max: max, color: 'bg-red-500' },
    ];
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HealthEngine };
}
