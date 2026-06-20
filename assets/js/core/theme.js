/**
 * CalcVerse Theme Engine
 * Handles dark/light mode with system preference detection and localStorage persistence.
 */
class ThemeEngine {
  constructor() {
    this.current = localStorage.getItem('cv-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this._apply(this.current);
    this._listenSystem();
  }

  /**
   * Toggle between dark and light mode.
   * @returns {string} The new theme ('dark' | 'light')
   */
  toggle() {
    const next = this.current === 'dark' ? 'light' : 'dark';
    this.set(next);
    return next;
  }

  /**
   * Set a specific theme.
   * @param {'dark' | 'light'} theme
   */
  set(theme) {
    if (theme !== 'dark' && theme !== 'light') return;
    this.current = theme;
    this._apply(theme);
    localStorage.setItem('cv-theme', theme);
    this._dispatchChange(theme);
  }

  /**
   * Get the current theme.
   * @returns {'dark' | 'light'}
   */
  get() {
    return this.current;
  }

  /**
   * Apply theme to document.
   * @param {'dark' | 'light'} theme
   */
  _apply(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  }

  /**
   * Listen for system preference changes.
   */
  _listenSystem() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only auto-switch if user hasn't set a manual preference
      if (!localStorage.getItem('cv-theme')) {
        this.set(e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * Dispatch a custom event for other components.
   * @param {'dark' | 'light'} theme
   */
  _dispatchChange(theme) {
    document.dispatchEvent(new CustomEvent('cv:theme-change', {
      detail: { theme }
    }));
  }
}

// Initialize immediately
const themeEngine = new ThemeEngine();

// Make globally available for inline scripts
if (typeof window !== 'undefined') {
  window.themeEngine = themeEngine;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ThemeEngine, themeEngine };
}
