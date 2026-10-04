import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  WorksStackCard,
  type WorksStackCardData,
} from "./works-stack-card";
import { cn } from "~/lib/utils";

type WorksStackProps = {
  title: string;
  seeProjectLabel: string;
  counterAriaLabel: string;
  projects: WorksStackCardData[];
  className?: string;
};

function formatCounterLabel(
  template: string,
  current: number,
  total: number,
): string {
  return template
    .replace("{current}", String(current))
    .replace("{total}", String(total));
}

function readPeekPx(): number {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--msk-works-stack-peek")
    .trim();
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 16;
}

/** TranslateY scroll-linked (px), lerp linéaire. */
function cardTranslateY(
  index: number,
  exact: number,
  deckH: number,
  peek: number,
): number {
  const settled = index * peek;
  const arriveStart = index - 1;

  if (exact <= arriveStart) return deckH + 4;
  if (exact < index) {
    const t = exact - arriveStart;
    return deckH * (1 - t) + settled * t;
  }
  return settled;
}

function setCardActive(node: HTMLElement, active: boolean) {
  node.style.pointerEvents = active ? "auto" : "none";
  node.setAttribute("aria-hidden", active ? "false" : "true");
  if (active) node.removeAttribute("inert");
  else node.setAttribute("inert", "");
}

/**
 * Travaux — stage sticky + scrub scroll (N × 100svh).
 * Gaps : tokens `--msk-works-stack-*` (voir tokens.css).
 */
export function WorksStack({
  title,
  seeProjectLabel,
  counterAriaLabel,
  projects,
  className,
}: WorksStackProps) {
  const total = projects.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const headerRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const deck = deckRef.current;
    if (!track || !deck || total < 1 || reduceMotion) return;

    let frame = 0;
    let lastDisplay = -1;
    let lastOnLast = false;
    const peek = readPeekPx();

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const scrollable = Math.max(track.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top, 0), scrollable) / scrollable;
      const exact = total <= 1 ? 0 : progress * (total - 1);
      const deckH = deck.clientHeight;
      const clickIndex = Math.min(total - 1, Math.max(0, Math.round(exact)));

      for (let i = 0; i < total; i++) {
        const node = cardRefs.current[i];
        if (!node) continue;
        node.style.transform = `translate3d(0, ${cardTranslateY(i, exact, deckH, peek)}px, 0)`;
        node.style.zIndex = String(10 + i);
        setCardActive(node, i === clickIndex);
      }

      const display = Math.min(total, Math.floor(exact + 1e-6) + 1);
      if (display !== lastDisplay && counterRef.current) {
        lastDisplay = display;
        counterRef.current.textContent = `[ ${display} / ${total} ]`;
        counterRef.current.setAttribute(
          "aria-label",
          formatCounterLabel(counterAriaLabel, display, total),
        );
      }

      const onLast = total > 1 && exact >= total - 1 - 0.001;
      if (onLast !== lastOnLast) {
        lastOnLast = onLast;
        headerRef.current?.classList.toggle("msk-works-header-gone", onLast);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [total, reduceMotion, counterAriaLabel]);

  if (reduceMotion) {
    return (
      <div className={cn("msk-works-reduced bg-msk-ink", className)}>
        <header className="msk-works-reduced-header">
          <h2
            id="travaux-heading"
            className="font-mono-msk text-xs tracking-msk-wider text-msk-text uppercase md:text-sm"
          >
            [ {title} ]
          </h2>
          <p className="font-mono-msk text-xs tracking-msk-wider text-msk-text uppercase md:text-sm">
            [ {total} / {total} ]
          </p>
        </header>
        <ul className="msk-works-reduced-list">
          {projects.map((project, index) => (
            <li key={project.slug} className="h-[min(70svh,640px)]">
              <WorksStackCard
                project={project}
                seeProjectLabel={seeProjectLabel}
                priority={index === 0}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      ref={trackRef}
      className={cn("msk-works-track bg-msk-ink", className)}
      style={
        {
          "--msk-works-stack-count": Math.max(total, 1),
        } as CSSProperties
      }
    >
      <div className="msk-works-stage">
        <header ref={headerRef} className="msk-works-header">
          <h2
            id="travaux-heading"
            className="font-mono-msk text-xs tracking-msk-wider text-msk-text uppercase md:text-sm"
          >
            [ {title} ]
          </h2>
          <p
            ref={counterRef}
            className="font-mono-msk text-xs tracking-msk-wider text-msk-text uppercase md:text-sm"
            aria-live="polite"
            aria-atomic="true"
            aria-label={formatCounterLabel(counterAriaLabel, 1, total)}
          >
            [ 1 / {total} ]
          </p>
        </header>

        <div ref={deckRef} className="msk-works-deck">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="msk-works-card-slot"
              style={{ zIndex: 10 + index }}
            >
              <WorksStackCard
                project={project}
                seeProjectLabel={seeProjectLabel}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
