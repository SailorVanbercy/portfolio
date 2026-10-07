export const THEME_STORAGE_KEY = 'theme';

// Inlined in <head> so the theme is applied before first paint (no light flash in dark mode).
export const THEME_INIT_SCRIPT = `(function(){var t='light';try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');if(s==='dark'||s==='light'){t=s}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){t='dark'}}catch(e){}document.documentElement.dataset.theme=t})();`;
