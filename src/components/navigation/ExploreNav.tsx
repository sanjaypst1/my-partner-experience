import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { activeNavId, navItems } from './navItems';
import { useWalkthrough } from '@/hooks/useWalkthrough';
import type { SectionId } from '@/types/portfolio';

/** Desktop navigation for the "Explore freely" mode. */
export function ExploreNav() {
  const { goTo, visibleSection } = useWalkthrough();
  const [openMenu, setOpenMenu] = useState<SectionId | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const current = activeNavId(visibleSection);

  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openMenu]);

  return (
    <nav ref={navRef} aria-label="Explore sections" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {navItems.map((item) => {
          const isCurrent = current === item.id;
          const isOpen = openMenu === item.id;

          return (
            <li key={item.id} className="relative">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    goTo(item.id);
                    setOpenMenu(null);
                  }}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={cn(
                    'rounded-full px-3 py-2 text-[0.82rem] transition-colors',
                    isCurrent
                      ? 'bg-slateMuted-100/8 font-semibold text-slateMuted-100'
                      : 'text-slateMuted-300 hover:bg-slateMuted-100/[0.06] hover:text-slateMuted-100',
                  )}
                >
                  {item.label}
                  {isCurrent ? <span className="sr-only"> (current section)</span> : null}
                </button>

                {item.children ? (
                  <button
                    type="button"
                    onClick={() => setOpenMenu(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? 'Hide' : 'Show'} ${item.label} case studies`}
                    className="rounded-full p-1.5 text-slateMuted-400 transition-colors hover:bg-slateMuted-100/[0.06] hover:text-slateMuted-100"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={cn('h-3.5 w-3.5 transition-transform', isOpen && 'rotate-180')}
                    />
                  </button>
                ) : null}
              </div>

              {item.children && isOpen ? (
                <ul className="glass-strong absolute right-0 top-full z-50 mt-2 w-60 space-y-1 p-2">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <button
                        type="button"
                        onClick={() => {
                          goTo(child.id);
                          setOpenMenu(null);
                        }}
                        className={cn(
                          'w-full rounded-lg px-3 py-2 text-left text-[0.85rem] transition-colors',
                          visibleSection === child.id
                            ? 'bg-slateMuted-100/8 text-slateMuted-100'
                            : 'text-slateMuted-300 hover:bg-slateMuted-100/[0.07] hover:text-slateMuted-100',
                        )}
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
