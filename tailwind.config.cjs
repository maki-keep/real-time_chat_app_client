module.exports = {
  darkMode: 'media',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': 'var(--app-bg)',
        'app-text': 'var(--app-text)',
        'app-muted': 'var(--app-muted)',
        'app-card': 'var(--app-card)',
        'app-btn': 'var(--app-btn)',
        'app-btn-border': 'var(--app-btn-border)',
        'app-accent': 'var(--app-accent)',
        'app-accent-text': 'var(--app-accent-text)',
        'app-error-text': 'var(--app-error-text)'
      }
    }
  },
  plugins: []
}
