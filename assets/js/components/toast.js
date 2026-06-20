/**
 * CalcVerse Toast Notification System
 * Slide-in notifications from bottom-right with auto-dismiss.
 */
const Toast = {
  _container: null,
  _defaultDuration: 3000,

  /**
   * Initialize toast container.
   */
  _init() {
    if (this._container) return;
    this._container = document.createElement('div');
    this._container.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none';
    this._container.setAttribute('aria-live', 'polite');
    document.body.appendChild(this._container);
  },

  /**
   * Show a toast notification.
   * @param {string} message - Toast message
   * @param {'success'|'error'|'info'|'warning'} [type='info'] - Toast type
   * @param {number} [duration] - Duration in ms before auto-dismiss
   * @returns {HTMLElement} The toast element
   */
  show(message, type = 'info', duration = this._defaultDuration) {
    this._init();

    const colors = {
      success: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-500',
        text: 'text-green-800 dark:text-green-200',
        icon: '✓',
      },
      error: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-500',
        text: 'text-red-800 dark:text-red-200',
        icon: '✕',
      },
      warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        border: 'border-yellow-500',
        text: 'text-yellow-800 dark:text-yellow-200',
        icon: '⚠',
      },
      info: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-500',
        text: 'text-blue-800 dark:text-blue-200',
        icon: 'ℹ',
      },
    };

    const style = colors[type] || colors.info;

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto toast ${style.bg} ${style.border} ${style.text} flex items-center gap-3 px-4 py-3 rounded-xl border-l-4 shadow-lg min-w-[280px] max-w-[400px] animate-slide-up`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <span class="font-bold text-sm">${style.icon}</span>
      <span class="flex-1 text-sm font-medium">${this._escapeHtml(message)}</span>
      <button class="text-current opacity-60 hover:opacity-100 transition-opacity" aria-label="Dismiss">&times;</button>
    `;

    // Dismiss button
    toast.querySelector('button').addEventListener('click', () => {
      this._dismiss(toast);
    });

    this._container.appendChild(toast);

    // Auto-dismiss
    if (duration > 0) {
      setTimeout(() => {
        this._dismiss(toast);
      }, duration);
    }

    return toast;
  },

  /**
   * Dismiss a toast with animation.
   * @param {HTMLElement} toast
   */
  _dismiss(toast) {
    if (!toast || toast.classList.contains('toast-dismissed')) return;
    toast.classList.add('toast-dismissed');
    toast.style.transition = 'all 0.3s ease-out';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  },

  /**
   * Show a success toast.
   * @param {string} message
   * @param {number} [duration]
   */
  success(message, duration) {
    return this.show(message, 'success', duration);
  },

  /**
   * Show an error toast.
   * @param {string} message
   * @param {number} [duration]
   */
  error(message, duration) {
    return this.show(message, 'error', duration);
  },

  /**
   * Show an info toast.
   * @param {string} message
   * @param {number} [duration]
   */
  info(message, duration) {
    return this.show(message, 'info', duration);
  },

  /**
   * Show a warning toast.
   * @param {string} message
   * @param {number} [duration]
   */
  warning(message, duration) {
    return this.show(message, 'warning', duration);
  },

  /**
   * Escape HTML entities for safe display.
   * @param {string} text
   * @returns {string}
   */
  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },
};

// Listen for toast events from other components
document.addEventListener('cv:toast', (e) => {
  if (e.detail) {
    Toast.show(e.detail.message, e.detail.type || 'info', e.detail.duration);
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Toast };
}
