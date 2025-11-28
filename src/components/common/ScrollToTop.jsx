import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTopInstant } from '../../utils/scrollToTop';

/**
 * Component that automatically scrolls to top on route change
 * Place this component inside BrowserRouter in App.jsx
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top instantly when route changes
    scrollToTopInstant();
  }, [pathname]);

  return null;
};

export default ScrollToTop;

