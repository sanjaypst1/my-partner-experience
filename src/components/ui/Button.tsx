import { forwardRef, useCallback, useRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useMotionPreference } from '@/hooks/useMotionPreference';

type Variant = 'primary' | 'secondary' | 'ghost' | 'quiet';
type Size = 'md' | 'sm';

const variants: Record<Variant, string> = {
  primary:
    'rounded-full bg-signal-cyan text-white hover:bg-[#0077ed] focus-visible:bg-[#0077ed] font-semibold shadow-glow',
  secondary:
    'rounded-full border border-slateMuted-100/15 bg-white text-signal-cyan hover:bg-midnight-900',
  ghost: 'rounded-full text-slateMuted-200 hover:text-slateMuted-100 hover:bg-slateMuted-100/[0.06]',
  quiet: 'text-slateMuted-300 hover:text-signal-cyan underline decoration-dotted underline-offset-4',
};

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-[1rem]',
  sm: 'px-4 py-2 text-[0.88rem]',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Subtle cursor-following nudge on pointer devices; ignored when motion is off. */
  magnetic?: boolean;
  icon?: ReactNode;
  iconAfter?: ReactNode;
}

/**
 * Every button carries a real text label (or an explicit aria-label) and meets the
 * 44px touch-target minimum through `touch-target`.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', magnetic = false, icon, iconAfter, className, children, ...props },
  forwardedRef,
) {
  const localRef = useRef<HTMLButtonElement | null>(null);
  const { motionEnabled } = useMotionPreference();

  const setRefs = useCallback(
    (node: HTMLButtonElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (!magnetic || !motionEnabled || event.pointerType !== 'mouse') return;
      const node = localRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
      node.style.transform = `translate3d(${x * 6}px, ${y * 5}px, 0)`;
    },
    [magnetic, motionEnabled],
  );

  const resetTransform = useCallback(() => {
    const node = localRef.current;
    if (node) node.style.transform = '';
  }, []);

  return (
    <button
      ref={setRefs}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTransform}
      onBlur={resetTransform}
      className={cn(
        'touch-target inline-flex items-center justify-center gap-2 rounded-full transition-[background,border,color,transform] duration-300 ease-expressive',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
      {iconAfter}
    </button>
  );
});

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}

export function LinkButton({
  variant = 'secondary',
  size = 'md',
  icon,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        'touch-target inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-300 ease-expressive',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}
