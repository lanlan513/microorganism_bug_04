import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

interface StatCounterProps {
  value: number;
  label: string;
  color?: string;
  suffix?: string;
  delay?: number;
}

export function StatCounter({
  value,
  label,
  color = '#00ffc8',
  suffix = '',
  delay = 0,
}: StatCounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    let animationId: number;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            timeoutId = setTimeout(() => {
              const duration = 1500;
              const startTime = performance.now();
              const animate = (now: number) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplay(Math.floor(eased * value));
                if (progress < 1) animationId = requestAnimationFrame(animate);
                else setDisplay(value);
              };
              animationId = requestAnimationFrame(animate);
            }, delay);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      clearTimeout(timeoutId);
      if (animationId !== undefined) cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [value, delay]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl font-bold mb-2" style={{ color }}>
        {display}
        {suffix}
      </div>
      <div className="font-mono text-xs md:text-sm text-text-muted/70 tracking-[0.15em] uppercase">
        {label}
      </div>
    </div>
  );
}
