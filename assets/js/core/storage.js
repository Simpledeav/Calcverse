/**
 * CalcVerse Storage System
 * Manages calculation history, favorites, and recently used calculators via localStorage.
 */
const CalcStorage = {
  _prefix: 'cv:',

  /**
   * Get all keys with the CalcVerse prefix.
   * @returns {string[]}
   */
  _keys() {
    return Object.keys(localStorage).filter(k => k.startsWith(this._prefix));
  },

  /**
   * Get a namespaced key.
   * @param {string} key
   * @returns {string}
   */
  _key(key) {
    return `${this._prefix}${key}`;
  },

  /**
   * Get parsed JSON from storage.
   * @param {string} key
   * @param {*} fallback
   * @returns {*}
   */
  _get(key, fallback = null) {
    try {
      const data = localStorage.getItem(this._key(key));
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  },

  /**
   * Set JSON data in storage.
   * @param {string} key
   * @param {*} value
   */
  _set(key, value) {
    try {
      localStorage.setItem(this._key(key), JSON.stringify(value));
    } catch (e) {
      console.warn('CalcStorage: Failed to save', key, e);
    }
  },

  // ===== History =====

  MAX_HISTORY: 50,

  /**
   * Add a calculation to history.
   * @param {string} calcId - Calculator ID (e.g., 'math-basic')
   * @param {Object} entry - { expression, result, timestamp }
   */
  addHistory(calcId, { expression, result, timestamp = Date.now() }) {
    const key = `history:${calcId}`;
    const history = this._get(key, []);
    history.unshift({ expression, result, timestamp });
    if (history.length > this.MAX_HISTORY) {
      history.length = this.MAX_HISTORY;
    }
    this._set(key, history);
    return history;
  },

  /**
   * Get history for a calculator.
   * @param {string} calcId
   * @returns {Array}
   */
  getHistory(calcId) {
    return this._get(`history:${calcId}`, []);
  },

  /**
   * Clear history for a calculator.
   * @param {string} calcId
   */
  clearHistory(calcId) {
    this._set(`history:${calcId}`, []);
  },

  /**
   * Clear all history across all calculators.
   */
  clearAllHistory() {
    this._keys().forEach(k => {
      if (k.startsWith(this._key('history:'))) {
        localStorage.removeItem(k);
      }
    });
  },

  // ===== Favorites =====

  /**
   * Add a calculator to favorites.
   * @param {string} calcId
   */
  addFavorite(calcId) {
    const favorites = this.getFavorites();
    if (!favorites.includes(calcId)) {
      favorites.push(calcId);
      this._set('favorites', favorites);
    }
    document.dispatchEvent(new CustomEvent('cv:favorites-update', { detail: { favorites } }));
  },

  /**
   * Remove a calculator from favorites.
   * @param {string} calcId
   */
  removeFavorite(calcId) {
    const favorites = this.getFavorites().filter(id => id !== calcId);
    this._set('favorites', favorites);
    document.dispatchEvent(new CustomEvent('cv:favorites-update', { detail: { favorites } }));
  },

  /**
   * Get all favorite calculator IDs.
   * @returns {string[]}
   */
  getFavorites() {
    return this._get('favorites', []);
  },

  /**
   * Check if a calculator is favorited.
   * @param {string} calcId
   * @returns {boolean}
   */
  isFavorite(calcId) {
    return this.getFavorites().includes(calcId);
  },

  /**
   * Toggle favorite status.
   * @param {string} calcId
   * @returns {boolean} New favorite status
   */
  toggleFavorite(calcId) {
    if (this.isFavorite(calcId)) {
      this.removeFavorite(calcId);
      return false;
    } else {
      this.addFavorite(calcId);
      return true;
    }
  },

  // ===== Recent =====

  MAX_RECENT: 10,

  /**
   * Record a calculator visit.
   * @param {string} calcId
   * @param {string} calcName
   */
  recordVisit(calcId, calcName) {
    const recent = this.getRecent();
    const filtered = recent.filter(r => r.id !== calcId);
    filtered.unshift({ id: calcId, name: calcName, timestamp: Date.now() });
    if (filtered.length > this.MAX_RECENT) {
      filtered.length = this.MAX_RECENT;
    }
    this._set('recent', filtered);
    document.dispatchEvent(new CustomEvent('cv:recent-update', { detail: { recent: filtered } }));
  },

  /**
   * Get recently used calculators.
   * @returns {Array<{id: string, name: string, timestamp: number}>}
   */
  getRecent() {
    return this._get('recent', []);
  },

  // ===== User Preferences =====

  /**
   * Save a user preference.
   * @param {string} key
   * @param {*} value
   */
  setPreference(key, value) {
    this._set(`pref:${key}`, value);
  },

  /**
   * Get a user preference.
   * @param {string} key
   * @param {*} fallback
   * @returns {*}
   */
  getPreference(key, fallback = null) {
    return this._get(`pref:${key}`, fallback);
  },

  // ===== Export =====

  /**
   * Export all CalcVerse data as JSON.
   * @returns {Object}
   */
  exportData() {
    const data = {};
    this._keys().forEach(k => {
      const shortKey = k.replace(this._prefix, '');
      data[shortKey] = this._get(shortKey);
    });
    return data;
  },

  /**
   * Import CalcVerse data from JSON.
   * @param {Object} data
   */
  importData(data) {
    Object.entries(data).forEach(([key, value]) => {
      this._set(key, value);
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CalcStorage };
}
