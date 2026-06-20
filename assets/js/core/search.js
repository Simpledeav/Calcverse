/**
 * CalcVerse Search Engine
 * Real-time calculator search with fuzzy matching, category grouping, and keyboard navigation.
 */
class CalcVerseSearch {
  /**
   * @param {Array<{id: string, name: string, category: string, description: string, tags: string[]}>} registry
   */
  constructor(registry = []) {
    this.registry = registry;
    this._onSelect = null;
    this._debounceTimer = null;
  }

  /**
   * Set the calculator registry.
   * @param {Array} registry
   */
  setRegistry(registry) {
    this.registry = registry;
  }

  /**
   * Set the on-select callback.
   * @param {Function} fn
   */
  onSelect(fn) {
    this._onSelect = fn;
  }

  /**
   * Search calculators by query.
   * @param {string} query
   * @returns {Object} Grouped results: { category: Array<{id, name, description}> }
   */
  search(query) {
    if (!query || query.length < 1) return {};

    const q = query.toLowerCase().trim();
    const results = {};

    this.registry.forEach(calc => {
      const searchable = [
        calc.name.toLowerCase(),
        calc.category.toLowerCase(),
        calc.description.toLowerCase(),
        ...(calc.tags || []).map(t => t.toLowerCase()),
        calc.id.toLowerCase(),
      ];

      const match = searchable.some(text => {
        // Exact substring match
        if (text.includes(q)) return true;
        // Fuzzy: first letters of each word
        const words = text.split(/[\s-]+/);
        const initials = words.map(w => w[0]).join('');
        if (initials.includes(q)) return true;
        // Word starts with query
        return words.some(w => w.startsWith(q));
      });

      if (match) {
        const category = calc.category || 'Other';
        if (!results[category]) results[category] = [];
        results[category].push({
          id: calc.id,
          name: calc.name,
          description: calc.description,
          path: `/app/${calc.category.toLowerCase()}/${calc.id}.html`,
          tags: calc.tags || [],
        });
      }
    });

    return results;
  }

  /**
   * Debounced search for input handling.
   * @param {string} query
   * @param {Function} callback - Called with grouped results
   * @param {number} delay - Debounce delay in ms
   */
  debouncedSearch(query, callback, delay = 150) {
    clearTimeout(this._debounceTimer);
    this._debounceTimer = setTimeout(() => {
      callback(this.search(query));
    }, delay);
  }

  /**
   * Render search results dropdown.
   * @param {Object} results - Grouped results from search()
   * @param {HTMLElement} container
   */
  renderResults(results, container) {
    const keys = Object.keys(results);

    if (keys.length === 0) {
      container.innerHTML = `
        <div class="px-4 py-6 text-center text-gray-400">
          No calculators found matching your search.
        </div>
      `;
      container.classList.remove('hidden');
      return;
    }

    let html = '';
    keys.forEach(category => {
      const items = results[category];
      html += `
        <div class="search-category">
          <div class="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900/50">
            ${category}
          </div>
          ${items.map(item => `
            <a href="${item.path}" class="search-result-item flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-100" data-calc-id="${item.id}">
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">${item.name}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 truncate">${item.description}</div>
              </div>
              <span class="text-gray-300 dark:text-gray-600">→</span>
            </a>
          `).join('')}
        </div>
      `;
    });

    container.innerHTML = html;
    container.classList.remove('hidden');

    // Bind click navigation
    container.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const calcId = el.dataset.calcId;
        if (this._onSelect) this._onSelect(calcId);
        window.location.href = el.getAttribute('href');
      });
    });
  }

  /**
   * Get the first result ID.
   * @param {Object} results - Grouped results
   * @returns {string|null}
   */
  getFirstResultId(results) {
    const keys = Object.keys(results);
    if (keys.length === 0) return null;
    return results[keys[0]][0]?.id || null;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CalcVerseSearch };
}
