/**
 * CalcVerse Router
 * Lightweight SPA-lite navigation for the dashboard.
 */
class CalcVerseRouter {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this._popHandler = this._handlePopState.bind(this);
  }

  /**
   * Register a route.
   * @param {string} path - Route path (e.g., '/math/basic')
   * @param {Object} config - { load: Function, title: string, category: string }
   */
  register(path, config) {
    this.routes.set(path, config);
  }

  /**
   * Navigate to a route.
   * @param {string} path - Route path
   * @param {Object} [state] - Optional state to pass
   */
  navigate(path, state = {}) {
    const route = this.routes.get(path);
    if (!route) {
      console.warn(`Route not found: ${path}`);
      return;
    }

    this.currentRoute = path;
    history.pushState(state, route.title, path);

    if (route.title) {
      document.title = `${route.title} — CalcVerse`;
    }

    if (typeof route.load === 'function') {
      route.load(state);
    }

    // Dispatch navigation event for sidebar/analytics
    document.dispatchEvent(new CustomEvent('cv:route-change', {
      detail: { path, route }
    }));
  }

  /**
   * Initialize router and listen for popstate.
   */
  init() {
    window.addEventListener('popstate', this._popHandler);

    // Handle initial route from URL
    const initialPath = window.location.pathname;
    if (this.routes.has(initialPath)) {
      this.navigate(initialPath);
    }
  }

  /**
   * Destroy router (cleanup).
   */
  destroy() {
    window.removeEventListener('popstate', this._popHandler);
  }

  /**
   * Handle browser back/forward.
   * @param {PopStateEvent} e
   */
  _handlePopState(e) {
    const path = window.location.pathname;
    if (this.routes.has(path)) {
      const route = this.routes.get(path);
      this.currentRoute = path;
      if (typeof route.load === 'function') {
        route.load(e.state || {});
      }
    }
  }

  /**
   * Get the current route path.
   * @returns {string|null}
   */
  getCurrentRoute() {
    return this.currentRoute;
  }
}

// Export singleton
const router = new CalcVerseRouter();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CalcVerseRouter, router };
}
