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
        { id: 'math-basic', name: 'Basic' },
        { id: 'math-scientific', name: 'Scientific' },
        { id: 'math-algebra', name: 'Algebra' },
        { id: 'math-percentage', name: 'Percentage' },
        { id: 'math-fraction', name: 'Fraction' },
        { id: 'math-prime', name: 'Prime Numbers' },
        { id: 'math-matrix', name: 'Matrix' },
        { id: 'math-statistics', name: 'Statistics' },
        { id: 'math-graphing', name: 'Graphing' },
        { id: 'math-base', name: 'Number Base' },
      ]},
      { id: 'finance', name: 'Finance', icon: '$', items: [
        { id: 'fin-loan', name: 'Loan / EMI' },
        { id: 'fin-mortgage', name: 'Mortgage' },
        { id: 'fin-compound', name: 'Compound Interest' },
        { id: 'fin-simple', name: 'Simple Interest' },
        { id: 'fin-roi', name: 'ROI' },
        { id: 'fin-npv', name: 'NPV / DCF' },
        { id: 'fin-irr', name: 'IRR' },
        { id: 'fin-salary', name: 'Salary' },
        { id: 'fin-tax', name: 'Tax Estimator' },
        { id: 'fin-vat', name: 'VAT / GST' },
        { id: 'fin-currency', name: 'Currency' },
        { id: 'fin-savings', name: 'Savings Goal' },
        { id: 'fin-retirement', name: 'Retirement' },
        { id: 'fin-breakeven', name: 'Break-Even' },
        { id: 'fin-margin', name: 'Profit Margin' },
        { id: 'fin-crypto', name: 'Crypto P&L' },
      ]},
      { id: 'health', name: 'Health & Fitness', icon: '♥', items: [
        { id: 'health-bmi', name: 'BMI' },
        { id: 'health-bmr', name: 'BMR' },
        { id: 'health-tdee', name: 'TDEE' },
        { id: 'health-bodyfat', name: 'Body Fat' },
        { id: 'health-idealwt', name: 'Ideal Weight' },
        { id: 'health-calorie', name: 'Calorie Burn' },
        { id: 'health-water', name: 'Water Intake' },
        { id: 'health-pregnancy', name: 'Due Date' },
        { id: 'health-ovulation', name: 'Ovulation' },
        { id: 'health-heartrate', name: 'Heart Rate' },
      ]},
      { id: 'science', name: 'Science & Physics', icon: '⚗', items: [
        { id: 'sci-physics', name: 'Physics' },
        { id: 'sci-chemistry', name: 'Chemistry' },
        { id: 'sci-ohm', name: "Ohm's Law" },
        { id: 'sci-force', name: 'Force' },
        { id: 'sci-pressure', name: 'Gas Laws' },
        { id: 'sci-energy', name: 'Energy' },
        { id: 'sci-wavelength', name: 'Wavelength' },
        { id: 'sci-periodic', name: 'Periodic Table' },
      ]},
      { id: 'engineering', name: 'Engineering', icon: '⚙', items: [
        { id: 'eng-unit', name: 'Unit Converter' },
        { id: 'eng-resistor', name: 'Resistor Code' },
        { id: 'eng-voltage', name: 'Voltage Divider' },
        { id: 'eng-binary', name: 'Binary' },
        { id: 'eng-hex', name: 'Hex Color' },
        { id: 'eng-subnet', name: 'IP Subnet' },
        { id: 'eng-datastorage', name: 'Data Storage' },
        { id: 'eng-bandwidth', name: 'Bandwidth' },
      ]},
      { id: 'everyday', name: 'Everyday', icon: '📅', items: [
        { id: 'day-age', name: 'Age' },
        { id: 'day-datediff', name: 'Date Diff' },
        { id: 'day-timezone', name: 'Time Zone' },
        { id: 'day-tip', name: 'Tip & Split' },
        { id: 'day-discount', name: 'Discount' },
        { id: 'day-fuel', name: 'Fuel Cost' },
        { id: 'day-speed', name: 'Speed/Distance' },
        { id: 'day-cooking', name: 'Cooking' },
        { id: 'day-grade', name: 'Grade / GPA' },
        { id: 'day-random', name: 'Random' },
      ]},
    ];

    this.render();
    this._bindEvents();
  }

  /**
   * Render sidebar HTML into container.
   */
  render() {
    const collapsedClass = this.collapsed ? 'sidebar-collapsed' : '';

    this.container.innerHTML = `
      <aside class="sidebar fixed left-0 top-0 h-full z-40 flex flex-col ${collapsedClass} ${this.collapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-out transform">
        <!-- Logo -->
        <div class="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <a href="/" class="flex items-center gap-2 ${this.collapsed ? 'justify-center w-full' : ''}">
            <span class="text-2xl font-bold text-primary">⚡</span>
            ${!this.collapsed ? '<span class="text-lg font-bold text-gray-900 dark:text-gray-100">CalcVerse</span>' : ''}
          </a>
          <button class="sidebar-toggle btn-icon ${this.collapsed ? 'hidden' : ''}" aria-label="Collapse sidebar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        </div>

        <!-- Search -->
        ${!this.collapsed ? `
        <div class="px-3 py-3">
          <div class="relative">
            <input type="text" class="sidebar-search w-full px-3 py-2 pl-9 rounded-lg bg-gray-100 dark:bg-gray-800 border-0 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="🔍 Search calculators..." />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>
        ` : ''}

        <!-- Nav Items (scrollable) -->
        <nav class="flex-1 overflow-y-auto px-2 py-2 scrollbar-thin space-y-1">
          ${this._renderCategories()}
          
          <!-- Coming Soon Section -->
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <a href="/app/coming-soon/ai-math.html" class="sidebar-coming-soon flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span class="text-lg">✨</span>
              ${!this.collapsed ? `
              <div class="flex-1 min-w-0">
                <span class="text-gray-600 dark:text-gray-400">AI Features</span>
              </div>
              <span class="coming-soon-badge"><span class="badge-dot"></span> Soon</span>
              ` : ''}
            </a>
          </div>
        </nav>

        <!-- Bottom section -->
        <div class="shrink-0 border-t border-gray-200 dark:border-gray-800 p-3">
          <button class="theme-toggle-sidebar flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150" aria-label="Toggle theme">
            <span class="dark:hidden">🌙</span>
            <span class="hidden dark:inline">☀️</span>
            ${!this.collapsed ? '<span class="dark:hidden">Dark Mode</span><span class="hidden dark:inline">Light Mode</span>' : ''}
          </button>
        </div>
      </aside>
    `;

    // Mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay fixed inset-0 z-30 bg-black/50 hidden';
    this.container.parentElement.appendChild(overlay);
  }

  /**
   * Render category navigation items.
   * @returns {string}
   */
  _renderCategories() {
    return this.categories.map(cat => `
      <div class="sidebar-category" data-category="${cat.id}">
        <button class="sidebar-category-header flex items-center w-full px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150" aria-expanded="true">
          <span class="text-sm mr-2">${cat.icon}</span>
          ${!this.collapsed ? `
          <span class="flex-1 text-left">${cat.name}</span>
          <svg class="w-3 h-3 transition-transform duration-150" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          ` : ''}
        </button>
        <div class="sidebar-category-items ml-1 space-y-0.5 ${this.collapsed ? 'hidden' : ''}">
          ${cat.items.map(item => `
            <a href="/app/${this._getCategoryPath(item.id)}.html" class="sidebar-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${item.id === this.activeId ? 'active text-primary bg-primary/10 border-l-3 border-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}" data-calc-id="${item.id}">
              <span class="w-1.5 h-1.5 rounded-full ${item.id === this.activeId ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}"></span>
              ${!this.collapsed ? `<span class="truncate">${item.name}</span>` : ''}
            </a>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  /**
   * Get path for calculator ID.
   * @param {string} id
   * @returns {string}
   */
  _getCategoryPath(id) {
    const prefixMap = {
      'math': 'math',
      'fin': 'finance',
      'health': 'health',
      'sci': 'science',
      'eng': 'engineering',
      'day': 'everyday',
    };
    const prefix = id.split('-')[0];
    return `${prefixMap[prefix] || prefix}/${id}`;
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
    sidebar?.classList.add('w-16');
    sidebar?.classList.remove('w-64');
    // Hide text elements
    sidebar?.querySelectorAll('.sidebar-category-items').forEach(el => el.classList.add('hidden'));
    sidebar?.querySelectorAll('.sidebar-category-header span').forEach(el => {
      if (!el.closest('.flex')?.querySelector('.text-sm') === el) el.classList.add('hidden');
    });
  }

  /**
   * Expand sidebar to full mode.
   */
  expand() {
    this.collapsed = false;
    const sidebar = this.container.querySelector('.sidebar');
    sidebar?.classList.remove('w-16');
    sidebar?.classList.add('w-64');
    // Show text elements
    sidebar?.querySelectorAll('.sidebar-category-items').forEach(el => el.classList.remove('hidden'));
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
    const sidebar = this.container.querySelector('.sidebar');
    sidebar?.classList.remove('-translate-x-full');
    const overlay = this.container.parentElement.querySelector('.sidebar-overlay');
    if (overlay) overlay.classList.remove('hidden');
  }

  /**
   * Hide sidebar (for mobile overlay).
   */
  hide() {
    const sidebar = this.container.querySelector('.sidebar');
    sidebar?.classList.add('-translate-x-full');
    const overlay = this.container.parentElement.querySelector('.sidebar-overlay');
    if (overlay) overlay.classList.add('hidden');
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CalcVerseSidebar };
}
