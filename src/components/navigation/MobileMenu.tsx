import { useEffect, useId, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { activeNavId, navItems } from './navItems';
import { useWalkthrough } from '@/hooks/useWalkthrough';
import { Button } from '@/components/ui/Button';

/**
 * Mobile navigation drawer. Escape closes it, focus moves in on open and returns to
 * the trigger on close, and the rest of the page is inert while it is open.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { goTo, visibleSection, start, active } = useWalkthrough();
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const firstItemRef = useRef<HTMLButtonElement | null>(null);
  const current = activeNavId(visibleSection);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    firstItemRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        className="touch-target inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-2 text-[0.85rem] text-slateMuted-100"
      >
        <Menu aria-hidden="true" className="h-4 w-4" />
        Sections
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site sections"
          className="fixed inset-0 z-[70] flex flex-col bg-midnight-950/97 backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <p className="font-display text-[1rem] text-slateMuted-100">Explore freely</p>
            <button
              type="button"
              onClick={close}
              className="touch-target inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-[0.85rem] text-slateMuted-100"
            >
              <X aria-hidden="true" className="h-4 w-4" />
              Close
            </button>
          </div>

          <nav aria-label="Sections" className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="space-y-2">
              {navItems.map((item, itemIndex) => (
                <li key={item.id}>
                  <button
                    ref={itemIndex === 0 ? firstItemRef : undefined}
                    type="button"
                    onClick={() => {
                      goTo(item.id);
                      close();
                    }}
                    aria-current={current === item.id ? 'true' : undefined}
                    className={cn(
                      'touch-target w-full rounded-xl border px-4 py-3 text-left text-[1rem]',
                      current === item.id
                        ? 'border-signal-cyan/50 bg-signal-cyan/10 font-semibold text-slateMuted-100'
                        : 'border-white/10 bg-white/[0.03] text-slateMuted-200',
                    )}
                  >
                    {item.label}
                  </button>

                  {item.children ? (
                    <ul className="mt-2 space-y-1 pl-3">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <button
                            type="button"
                            onClick={() => {
                              goTo(child.id);
                              close();
                            }}
                            className="touch-target w-full rounded-lg px-3 py-2 text-left text-[0.9rem] text-slateMuted-300"
                          >
                            {child.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          {!active ? (
            <div className="border-t border-white/10 px-5 py-4">
              <Button
                className="w-full"
                onClick={() => {
                  start();
                  close();
                }}
              >
                Start the guided walkthrough
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
