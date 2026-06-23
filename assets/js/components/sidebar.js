/**
 * CalcVerse Sidebar Navigation Component
 * Fixed left sidebar with category navigation, favorites, and search.
 */
class CalcVerseSidebar {
  /**
   * @param {HTMLElement|string} containerEl - Container element or selector
   * @param {Object} [options]
   * @param {boolean} [options.collapsed] - Start collapsed
   * @param {Function} [options.onNavigate] - Navigation callback
   */
  constructor(containerEl, options = {}) {
    this.container = typeof containerEl === 'string'
      ? document.querySelector(containerEl)
      : containerEl;
    this.options = options;
    this.collapsed = options.collapsed || false;
    this.activeId = null;
    this._onNavigate = options.onNavigate || null;

    this.categories = [
      { id: 'math', name: 'Mathematics', icon: '∑', items: [
        { id: 'math-basic', name: 'Basic', path: '/app/math/basic.html' },
        { id: 'math-scientific', name: 'Scientific', path: '/app/math/scientific.html' },
        { id: 'math-algebra', name: 'Algebra', path: '/app/math/algebra.html' },
        { id: 'math-percentage', name: 'Percentage', path: '/app/math/percentage.html' },
        { id: 'math-fraction', name: 'Fraction', path: '/app/math/fraction.html' },
        { id: 'math-prime', name: 'Prime Numbers', path: '/app/math/prime.html' },
        { id: 'math-matrix', name: 'Matrix', path: '/app/math/matrix.html' },
        { id: 'math-statistics', name: 'Statistics', path: '/app/math/statistics.html' },
        { id: 'math-graphing', name: 'Graphing', path: '/app/math/graphing.html' },
        { id: 'math-base', name: 'Number Base', path: '/app/math/number-base.html' },
      ]},
      { id: 'finance', name: 'Finance', icon: '$', items: [
        { id: 'fin-loan', name: 'Loan / EMI', path: '/app/finance/loan.html' },
        { id: 'fin-mortgage', name: 'Mortgage', path: '/app/finance/mortgage.html' },
        { id: 'fin-compound', name: 'Compound Interest', path: '/app/finance/compound-interest.html' },
        { id: 'fin-simple', name: 'Simple Interest', path: '/app/finance/simple-interest.html' },
        { id: 'fin-roi', name: 'ROI', path: '/app/finance/roi.html' },
        { id: 'fin-npv', name: 'NPV / DCF', path: '/app/finance/npv.html' },
        { id: 'fin-irr', name: 'IRR', path: '/app/finance/irr.html' },
        { id: 'fin-salary', name: 'Salary', path: '/app/finance/salary.html' },
        { id: 'fin-tax', name: 'Tax Estimator', path: '/app/finance/tax.html' },
        { id: 'fin-vat', name: 'VAT / GST', path: '/app/finance/vat.html' },
        { id: 'fin-currency', name: 'Currency', path: '/app/finance/currency.html' },
        { id: 'fin-savings', name: 'Savings Goal', path: '/app/finance/savings-goal.html' },
        { id: 'fin-retirement', name: 'Retirement', path: '/app/finance/retirement.html' },
        { id: 'fin-breakeven', name: 'Break-Even', path: '/app/finance/break-even.html' },
        { id: 'fin-margin', name: 'Profit Margin', path: '/app/finance/profit-margin.html' },
        { id: 'fin-crypto', name: 'Crypto P&L', path: '/app/finance/crypto.html' },
      ]},
      { id: 'health', name: 'Health & Fitness', icon: '♥', items: [
        { id: 'health-bmi', name: 'BMI', path: '/app/health/bmi.html' },
        { id: 'health-bmr', name: 'BMR', path: '/app/health/bmr.html' },
        { id: 'health-tdee', name: 'TDEE', path: '/app/health/tdee.html' },
        { id: 'health-bodyfat', name: 'Body Fat', path: '/app/health/body-fat.html' },
        { id: 'health-idealwt', name: 'Ideal Weight', path: '/app/health/ideal-weight.html' },
        { id: 'health-calorie', name: 'Calorie Burn', path: '/app/health/calorie.html' },
        { id: 'health-water', name: 'Water Intake', path: '/app/health/water-intake.html' },
        { id: 'health-pregnancy', name: 'Due Date', path: '/app/health/pregnancy.html' },
        { id: 'health-ovulation', name: 'Ovulation', path: '/app/health/ovulation.html' },
        { id: 'health-heartrate', name: 'Heart Rate', path: '/app/health/heart-rate.html' },
      ]},
      { id: 'science', name: 'Science & Physics', icon: '⚗', items: [
        { id: 'sci-physics', name: 'Physics', path: '/app/science/physics.html' },
        { id: 'sci-chemistry', name: 'Chemistry', path: '/app/science/chemistry.html' },
        { id: 'sci-ohm', name: "Ohm's Law", path: '/app/science/ohm-law.html' },
        { id: 'sci-force', name: 'Force', path: '/app/science/force.html' },
        { id: 'sci-pressure', name: 'Gas Laws', path: '/app/science/pressure.html' },
        { id: 'sci-energy', name: 'Energy', path: '/app/science/energy.html' },
        { id: 'sci-wavelength', name: 'Wavelength', path: '/app/science/wavelength.html' },
        { id: 'sci-periodic', name: 'Periodic Table', path: '/app/science/periodic.html' },
      ]},
      { id: 'engineering', name: 'Engineering', icon: '⚙', items: [
        { id: 'eng-unit', name: 'Unit Converter', path: '/app/engineering/unit-converter.html' },
        { id: 'eng-resistor', name: 'Resistor Code', path: '/app/engineering/resistor.html' },
        { id: 'eng-voltage', name: 'Voltage Divider', path: '/app/engineering/voltage-divider.html' },
        { id: 'eng-binary', name: 'Binary', path: '/app/engineering/binary.html' },
        { id: 'eng-hex', name: 'Hex Color', path: '/app/engineering/hex.html' },
        { id: 'eng-subnet', name: 'IP Subnet', path: '/app/engineering/ip-subnet.html' },
        { id: 'eng-datastorage', name: 'Data Storage', path: '/app/engineering/data-storage.html' },
        { id: 'eng-bandwidth', name: 'Bandwidth', path: '/app/engineering/bandwidth.html' },
      ]},
      { id: 'everyday', name: 'Everyday', icon: '📅', items: [
        { id: 'day-age', name: 'Age', path: '/app/everyday/age.html' },
        { id: 'day-temp', name: 'Temperature', path: '/app/everyday/temperature.html' },
        { id: 'day-length', name: 'Length', path: '/app/everyday/length.html' },
        { id: 'day-weight', name: 'Weight', path: '/app/everyday/weight.html' },
        { id: 'day-volume', name: 'Volume', path: '/app/everyday/volume.html' },
        { id: 'day-timezone', name: 'Time Zone', path: '/app/everyday/time-zone.html' },
        { id: 'day-speed', name: 'Speed/Distance', path: '/app/everyday/speed-distance.html' },
      ]},
    ];
	
    this.render();
    this._bindEvents();
  }

  /**
   * Render sidebar HTML into container.
   * Always renders all content — uses CSS hidden class for collapse state.
   */
  render() {
    const collapsedClass = this.collapsed ? 'sidebar-collapsed' : '';
    const textHidden = this.collapsed ? 'hidden' : '';

    this.container.innerHTML = `
      <aside class="sidebar fixed left-0 top-0 h-full z-50 flex flex-col ${collapsedClass} ${this.collapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-out transform ${window.innerWidth < 768 ? '-translate-x-full' : ''}">
        <!-- Logo -->
        <div class="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <a href="/" class="flex items-center gap-2 ${this.collapsed ? 'justify-center w-full' : ''}">
            <span class="text-2xl font-bold text-primary">⚡</span>
            <span class="sidebar-text text-lg font-bold text-gray-900 dark:text-gray-100 ${textHidden}">CalcVerse</span>
          </a>
          <button class="sidebar-text sidebar-toggle btn-icon ${textHidden}" aria-label="Collapse sidebar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        </div>

        <!-- Search -->
        <div class="sidebar-text px-3 py-3 ${textHidden}">
          <div class="relative">
            <input type="text" class="sidebar-search w-full px-3 py-2 pl-9 rounded-lg bg-gray-100 dark:bg-gray-800 border-0 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="🔍 Search calculators..." />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>

        <!-- Nav Items (scrollable) -->
        <nav class="flex-1 overflow-y-auto px-2 py-2 scrollbar-thin space-y-1">
          <!-- Favorites Section -->
          <div class="sidebar-favorites ${textHidden}">
            <div class="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <span>★</span> Favorites
            </div>
            <div class="sidebar-favorites-list space-y-0.5 ml-1" id="sidebar-favorites-list">
              <div class="px-3 py-2 text-xs text-gray-400 italic sidebar-fav-empty">No favorites yet</div>
            </div>
          </div>

          ${this._renderCategories()}
          
          <!-- Coming Soon Section -->
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <a href="/app/coming-soon/ai-math.html" class="sidebar-coming-soon flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span class="text-lg">✨</span>
              <div class="sidebar-text flex-1 min-w-0 ${textHidden}">
                <span class="text-gray-600 dark:text-gray-400">AI Features</span>
              </div>
              <span class="sidebar-text coming-soon-badge ${textHidden}"><span class="badge-dot"></span> Soon</span>
            </a>
          </div>
        </nav>

        <!-- Bottom section -->
        <div class="shrink-0 border-t border-gray-200 dark:border-gray-800 p-3">
          <button class="theme-toggle-sidebar flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150" aria-label="Toggle theme">
            <span class="dark:hidden">🌙</span>
            <span class="hidden dark:inline">☀️</span>
            <span class="sidebar-text dark:hidden ${textHidden}">Dark Mode</span>
            <span class="sidebar-text hidden dark:inline ${textHidden}">Light Mode</span>
          </button>
        </div>
      </aside>
    `;

    // Mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay fixed inset-0 z-40 bg-black/50 hidden';
    overlay.addEventListener('click', () => this.hide());
    this.container.parentElement.appendChild(overlay);
    this._overlay = overlay;
  }

  /**
   * Render category navigation items.
   * Always renders all content — uses CSS hidden class for collapse state.
   * @returns {string}
   */
  _renderCategories() {
    const textHidden = this.collapsed ? 'hidden' : '';
    return this.categories.map(cat => `
      <div class="sidebar-category" data-category="${cat.id}">
        <button class="sidebar-category-header flex items-center w-full px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150" aria-expanded="true">
          <span class="text-sm mr-2">${cat.icon}</span>
          <span class="sidebar-text flex-1 text-left ${textHidden}">${cat.name}</span>
          <svg class="sidebar-text w-3 h-3 transition-transform duration-150 ${textHidden}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="sidebar-category-items ml-1 space-y-0.5 ${textHidden}">
          ${cat.items.map(item => `
            <a href="${item.path}" class="sidebar-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${item.id === this.activeId ? 'active text-primary bg-primary/10 border-l-3 border-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}" data-calc-id="${item.id}">
              <span class="w-1.5 h-1.5 rounded-full ${item.id === this.activeId ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}"></span>
              <span class="sidebar-text truncate ${textHidden}">${item.name}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  /**
   * Build a path lookup map from id to path across all categories.
   * @returns {Object<string, string>}
   */
  _buildPathMap() {
    const map = {};
    this.categories.forEach(cat => {
      cat.items.forEach(item => {
        map[item.id] = item.path;
      });
    });
    return map;
  }

  /**
   * Bind sidebar events.
   */
  _bindEvents() {
    // Collapse toggle
    this.container.querySelector('.sidebar-toggle')?.addEventListener('click', () => this.toggle());

    // Category collapse/expand
    this.container.querySelectorAll('.sidebar-category-header').forEach(header => {
      header.addEventListener('click', () => {
        const items = header.nextElementSibling;
        const arrow = header.querySelector('svg');
        if (items) {
          items.classList.toggle('hidden');
          if (arrow) arrow.classList.toggle('-rotate-180');
        }
      });
    });

    // Search input
    this.container.querySelector('.sidebar-search')?.addEventListener('input', (e) => {
      this.search(e.target.value);
    });

    // Theme toggle
    this.container.querySelector('.theme-toggle-sidebar')?.addEventListener('click', () => {
      if (window.themeEngine) {
        window.themeEngine.toggle();
      }
    });

    // Listen for favorites updates
    document.addEventListener('cv:favorites-update', () => this.updateFavorites());

    // Initial favorites load
    setTimeout(() => this.updateFavorites(), 100);

    // Universal sidebar margin handler
    this._updateMainMargin = () => {
      const main = document.getElementById('main-content');
      if (!main) return;
      const width = window.innerWidth;
      if (width < 768) {
        main.style.marginLeft = '0px';
      } else if (width < 1024) {
        main.style.marginLeft = '64px';
      } else {
        main.style.marginLeft = this.collapsed ? '64px' : '256px';
      }
    };

    // Listen for sidebar change events
    document.addEventListener('cv:sidebar-change', () => this._updateMainMargin());

    // Universal resize handler — auto-collapse/expand/hide without refresh
    this._resizeHandler = () => {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => {
        const w = window.innerWidth;
        if (w < 768) {
          // Mobile: sidebar should be full-width but hidden offscreen
          this.expand();
          this.hide();
        } else if (w < 1024) {
          // Tablet: collapsed icon-only, visible inline
          this.collapse();
          // Ensure it's not translated offscreen
          const sidebar = this.container.querySelector('.sidebar');
          sidebar?.classList.remove('-translate-x-full');
          if (this._overlay) this._overlay.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        } else {
          // Desktop: expanded full-width, visible
          this.expand();
          const sidebar = this.container.querySelector('.sidebar');
          sidebar?.classList.remove('-translate-x-full');
          if (this._overlay) this._overlay.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
        this._updateMainMargin();
      }, 150);
    };
    window.addEventListener('resize', this._resizeHandler);

    // Run once on init
    setTimeout(() => this._updateMainMargin(), 50);
  }

  /**
   * Set the active calculator.
   * @param {string} id - Calculator ID
   */
  setActive(id) {
    this.activeId = id;
    this.container.querySelectorAll('.sidebar-item').forEach(item => {
      const isActive = item.dataset.calcId === id;
      item.classList.toggle('active', isActive);
      item.classList.toggle('text-primary', isActive);
      item.classList.toggle('bg-primary/10', isActive);
      item.classList.toggle('border-l-3', isActive);
      item.classList.toggle('border-primary', isActive);
      item.classList.toggle('text-gray-600', !isActive);
      item.classList.toggle('dark:text-gray-400', !isActive);
      item.classList.toggle('hover:bg-gray-100', !isActive);
      item.classList.toggle('dark:hover:bg-gray-800', !isActive);
      
      const dot = item.querySelector('.w-1\\.5');
      if (dot) {
        dot.classList.toggle('bg-primary', isActive);
        dot.classList.toggle('bg-gray-300', !isActive);
        dot.classList.toggle('dark:bg-gray-600', !isActive);
      }
    });
  }

  /**
   * Collapse sidebar to icon-only mode.
   */
  collapse() {
    this.collapsed = true;
    const sidebar = this.container.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.classList.add('w-16');
    sidebar.classList.remove('w-64');
    // Hide all text elements (always exist in DOM now)
    sidebar.querySelectorAll('.sidebar-text').forEach(el => el.classList.add('hidden'));
    sidebar.querySelectorAll('.sidebar-category-items').forEach(el => el.classList.add('hidden'));
    sidebar.querySelectorAll('.sidebar-favorites').forEach(el => el.classList.add('hidden'));
    this._dispatchSidebarChange();
  }

  /**
   * Expand sidebar to full mode.
   */
  expand() {
    this.collapsed = false;
    const sidebar = this.container.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.classList.remove('w-16');
    sidebar.classList.add('w-64');
    // Show all text elements (always exist in DOM now)
    sidebar.querySelectorAll('.sidebar-text').forEach(el => el.classList.remove('hidden'));
    sidebar.querySelectorAll('.sidebar-category-items').forEach(el => el.classList.remove('hidden'));
    sidebar.querySelectorAll('.sidebar-favorites').forEach(el => el.classList.remove('hidden'));
    this._dispatchSidebarChange();
  }

  /**
   * Toggle sidebar collapse state.
   */
  toggle() {
    if (this.collapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  /**
   * Update the favorites list in the sidebar from CalcStorage.
   */
  updateFavorites() {
    const listEl = this.container.querySelector('#sidebar-favorites-list');
    if (!listEl) return;
    
    const pathMap = this._buildPathMap();
    const favIds = typeof CalcStorage !== 'undefined' ? CalcStorage.getFavorites() : [];
    
    if (favIds.length === 0) {
      listEl.innerHTML = '<div class="px-3 py-2 text-xs text-gray-400 italic sidebar-fav-empty">No favorites yet</div>';
      return;
    }
    
    const rendered = favIds.map(id => {
      const path = pathMap[id];
      if (!path) return null;
      const name = this._getItemName(id) || id;
      return `
        <a href="${path}" class="sidebar-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-calc-id="${id}">
          <span class="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
          <span class="truncate">${name}</span>
        </a>
      `;
    }).filter(Boolean).join('');
    
    if (!rendered) {
      listEl.innerHTML = '<div class="px-3 py-2 text-xs text-gray-400 italic sidebar-fav-empty">No favorites yet</div>';
      return;
    }
    
    listEl.innerHTML = rendered;
  }

  /**
   * Get item name by ID from categories.
   * @param {string} id
   * @returns {string|null}
   */
  _getItemName(id) {
    for (const cat of this.categories) {
      const found = cat.items.find(item => item.id === id);
      if (found) return found.name;
    }
    return null;
  }

  /**
   * Filter sidebar items by search query.
   * @param {string} query
   */
  search(query) {
    const q = query.toLowerCase().trim();
    this.container.querySelectorAll('.sidebar-category').forEach(cat => {
      let hasVisible = false;
      cat.querySelectorAll('.sidebar-item').forEach(item => {
        const name = item.textContent.toLowerCase();
        const match = !q || name.includes(q);
        item.style.display = match ? '' : 'none';
        if (match) hasVisible = true;
      });
      cat.style.display = hasVisible || !q ? '' : 'none';
    });
  }

  /**
   * Show sidebar (for mobile overlay).
   */
  show() {
    // Expand to full width before showing (fixes mobile w-16 issue)
    this.expand();
    const sidebar = this.container.querySelector('.sidebar');
    sidebar?.classList.remove('-translate-x-full');
    if (this._overlay) {
      this._overlay.classList.remove('hidden');
    }
    document.body.classList.add('overflow-hidden');
    this._dispatchSidebarChange();
  }

  /**
   * Hide sidebar (for mobile overlay).
   */
  hide() {
    const sidebar = this.container.querySelector('.sidebar');
    sidebar?.classList.add('-translate-x-full');
    if (this._overlay) {
      this._overlay.classList.add('hidden');
    }
    document.body.classList.remove('overflow-hidden');
    this._dispatchSidebarChange();
  }

  /**
   * Dispatch a custom resize event so the dashboard can update margins.
   */
  _dispatchSidebarChange() {
    document.dispatchEvent(new CustomEvent('cv:sidebar-change'));
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CalcVerseSidebar };
}
