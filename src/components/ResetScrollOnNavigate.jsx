import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ResetScrollOnNavigate() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Instantly reset scroll BEFORE the browser paints the new route
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}