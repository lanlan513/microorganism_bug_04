import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 路由切换时把视口带回页首。
 * 只盯 pathname：展厅页里改搜索词、排序、翻页都会改 query，
 * 那种情况下用户还在看列表，不该被弹回顶部。
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 注意：index.css 里 html { scroll-behavior: smooth } 生效时，
    // behavior: 'auto' 会服从 CSS 变成平滑滚动——滚动位置会长时间扫过
    // 回到顶部按钮的显隐阈值，导致按钮闪烁、动画被打断时按钮卡在错误状态。
    // 路由切换必须显式用 'instant' 立即归位。
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
