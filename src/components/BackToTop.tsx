import { useEffect, useState } from 'react';

/** 滚动到一定位置后出现的"回到顶部"悬浮按钮 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    // 挂载时先同步一次，避免组件重挂载后状态与实际滚动位置不符
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    // 必须移除监听：否则每次挂载都会累积一个监听器，
    // 来回进出页面后多个监听器反复 setState，按钮出现/消失状态紊乱
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => {
        // 系统开启"减弱动态效果"时跳过平滑滚动，直接回到顶部
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
      }}
      className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-glow-primary/10 border border-glow-primary/40 text-glow-primary hover:bg-glow-primary/20 transition-colors"
      aria-label="回到顶部"
    >
      ↑
    </button>
  );
}
