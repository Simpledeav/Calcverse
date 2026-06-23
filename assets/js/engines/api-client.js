/**
 * CalcVerse API Client
 * Bridges calculator pages to the Python FastAPI microservice.
 * Includes graceful fallback when the API is unavailable.
 */
const CalcAPI = (function() {
  const API_BASE = 'http://localhost:8000';
  const FALLBACK_BANNER_ID = 'api-fallback-banner';

  /**
   * Core request method.
   * @param {string} endpoint - API path (e.g. '/api/amortization/table')
   * @param {object} data - JSON body
   * @returns {Promise<object|null>} Response data or null on failure
   */
  async function post(endpoint, data) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }));
        console.warn(`CalcAPI ${endpoint}: ${res.status} — ${err.detail || 'Unknown error'}`);
        showFallbackBanner(`API error: ${err.detail || 'Service unavailable'}`);
        return null;
      }

      hideFallbackBanner();
      return await res.json();
    } catch (err) {
      if (err.name === 'AbortError') {
        console.warn('CalcAPI: Request timed out after 5s');
        showFallbackBanner('API request timed out. Using local calculations.');
      } else {
        console.warn('CalcAPI: Network error —', err.message);
        showFallbackBanner('Python engine offline. Results may use local approximations.');
      }
      return null;
    }
  }

  /**
   * Show a non-intrusive fallback warning banner.
   */
  function showFallbackBanner(message) {
    let banner = document.getElementById(FALLBACK_BANNER_ID);
    if (!banner) {
      banner = document.createElement('div');
      banner.id = FALLBACK_BANNER_ID;
      banner.className = 'fixed bottom-4 right-4 z-50 max-w-sm animate-slide-up';
      document.body.appendChild(banner);
    }
    banner.innerHTML = `
      <div class="flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 shadow-lg text-sm">
        <span class="text-amber-500 shrink-0 mt-0.5">⚠️</span>
        <div class="flex-1 min-w-0">
          <p class="text-amber-800 dark:text-amber-200 font-medium">CalcVerse API</p>
          <p class="text-amber-600 dark:text-amber-400 text-xs mt-0.5">${message}</p>
        </div>
        <button class="text-amber-400 hover:text-amber-600 shrink-0" onclick="this.closest('#${FALLBACK_BANNER_ID}').remove()" aria-label="Dismiss">✕</button>
      </div>
    `;
    // Auto-dismiss after 8 seconds
    setTimeout(() => {
      const b = document.getElementById(FALLBACK_BANNER_ID);
      if (b) b.remove();
    }, 8000);
  }

  function hideFallbackBanner() {
    const banner = document.getElementById(FALLBACK_BANNER_ID);
    if (banner) banner.remove();
  }

  // ===== API Methods =====

  const api = {};

  /** Amortization: Generate full schedule */
  api.amortizationTable = (data) => post('/api/amortization/table', data);

  /** Amortization: Summary statistics */
  api.amortizationSummary = (data) => post('/api/amortization/summary', data);

  /** Statistics: Descriptive stats */
  api.statisticsDescribe = (data) => post('/api/statistics/describe', data);

  /** Statistics: Histogram bins */
  api.statisticsHistogram = (data) => post('/api/statistics/histogram', data);

  /** Statistics: Linear regression */
  api.statisticsRegression = (data) => post('/api/statistics/regression', data);

  /** Matrix: Add */
  api.matrixAdd = (data) => post('/api/matrix/add', data);

  /** Matrix: Subtract */
  api.matrixSubtract = (data) => post('/api/matrix/subtract', data);

  /** Matrix: Multiply */
  api.matrixMultiply = (data) => post('/api/matrix/multiply', data);

  /** Matrix: Determinant */
  api.matrixDeterminant = (data) => post('/api/matrix/determinant', data);

  /** Matrix: Inverse */
  api.matrixInverse = (data) => post('/api/matrix/inverse', data);

  /** Matrix: Eigenvalues */
  api.matrixEigenvalues = (data) => post('/api/matrix/eigenvalues', data);

  /** Matrix: Transpose */
  api.matrixTranspose = (data) => post('/api/matrix/transpose', data);

  /** Retirement: Year-by-year projection */
  api.retirementProject = (data) => post('/api/retirement/project', data);

  /** Retirement: Net Present Value */
  api.retirementNpv = (data) => post('/api/retirement/npv', data);

  /** Retirement: Internal Rate of Return */
  api.retirementIrr = (data) => post('/api/retirement/irr', data);

  /** Retirement: Monte Carlo simulation */
  api.retirementMonteCarlo = (data) => post('/api/retirement/monte-carlo', data);

  /**
   * Health check — verify API is running.
   * @returns {Promise<boolean>}
   */
  api.healthCheck = async function() {
    try {
      const res = await fetch(`${API_BASE}/api/health`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) return false;
      const data = await res.json();
      return data.status === 'ok';
    } catch {
      return false;
    }
  };

  /**
   * Utility: check if API is available and toggle page hint.
   * Call this on page load to show/hide "API Connected" indicator.
   */
  api.checkStatus = async function() {
    const ok = await api.healthCheck();
    const indicator = document.getElementById('api-status');
    if (indicator) {
      indicator.innerHTML = ok
        ? '<span class="text-green-500 text-xs">● API Connected</span>'
        : '<span class="text-amber-500 text-xs">● API Offline</span>';
    }
    return ok;
  };

  return api;
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CalcAPI };
}
