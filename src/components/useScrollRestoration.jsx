import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    // Check if the scroll position is saved in sessionStorage
    const scrollPosition = sessionStorage.getItem(pathname);
    
    // If scroll position exists, restore it
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }

    // Save scroll position on page leave
    const handleScroll = () => {
      sessionStorage.setItem(pathname, window.scrollY.toString());
    };

    // Attach scroll listener
    window.addEventListener('beforeunload', handleScroll);

    // Clean up
    return () => {
      window.removeEventListener('beforeunload', handleScroll);
    };
  }, [location]);
};

export default useScrollRestoration;
