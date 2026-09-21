import { useEffect, useState } from 'react';

/** 滚动到一定位置后出现的"回到顶部"悬浮按钮 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => setVisible(window.scrollY > 400));
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-glow-primary/10 border border-glow-primary/40 text-glow-primary hover:bg-glow-primary/20 transition-colors"
      aria-label="回到顶部"
    >
      ↑
    </button>
  );
}
