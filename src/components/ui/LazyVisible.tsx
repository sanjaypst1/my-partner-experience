import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Mounts children only when the block approaches the viewport, so heavy libraries
 * (charts, in practice) stay out of the initial download.
 *
 * `minHeight` reserves the final space up front to avoid layout shift, and the
 * placeholder is announced as busy rather than appearing as empty content.
 */
export function LazyVisible({
  children,
  minHeight,
  label,
}: {
  children: ReactNode;
  minHeight: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    // No observer support (or in tests): render immediately rather than never.
    if (!element || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight }}>
      {visible ? (
        children
      ) : (
        <div
          role="status"
          aria-busy="true"
          className="grid h-full place-items-center rounded-xl2 border border-slateMuted-100/10 bg-slateMuted-100/[0.02] text-[0.82rem] text-slateMuted-400"
          style={{ minHeight }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
