import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { prefersReducedMotion } from '../lib/motion';

const SHOW_AFTER = 400;

/** 滚动到一定位置后出现的"回到顶部"悬浮按钮 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(window.scrollY > SHOW_AFTER);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
    };
  }, []);

  useEffect(() => {
    setVisible(window.scrollY > SHOW_AFTER);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-glow-primary/10 border border-glow-primary/40 text-glow-primary hover:bg-glow-primary/20 transition-colors"
      aria-label="回到顶部"
    >
      ↑
    </button>
  );
}
