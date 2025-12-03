/**
 * Scrolls the window to the top of the page smoothly
 * @param {Object} options - Scroll options
 * @param {string} options.behavior - Scroll behavior ('smooth' or 'auto'). Default is 'smooth'
 */
export const scrollToTop = (options = {}) => {
  const { behavior = 'smooth' } = options;
  
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: behavior
  });
};

/**
 * Scrolls the window to the top instantly (no smooth animation)
 */
export const scrollToTopInstant = () => {
  window.scrollTo(0, 0);
};

