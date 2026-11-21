import { useEffect } from "react";
import { useLocation } from "react-router";
import {
  preferredScrollBehavior,
  scrollToAnchor,
  shouldSkipHashAnchorSync,
} from "~/lib/utils/scroll-to-anchor";

const INTRO_STORAGE_KEY = "msk-intro-seen";
const INTRO_BUFFER_MS = 1100;

/**
 * Repositionne le scroll sur le hash (load, navigation cross-route, i18n).
 * Attend la fin éventuelle de l’intro rideau pour éviter un décalage.
 * Ignore les pushState issus d’un clic nav (déjà scrollés avec header masqué).
 */
export function HashAnchorSync() {
  const { hash, pathname, key } = useLocation();

  useEffect(() => {
    if (!hash || hash === "#") return;
    if (shouldSkipHashAnchorSync()) return;

    let cancelled = false;
    let timer = 0;

    const run = () => {
      if (cancelled || shouldSkipHashAnchorSync()) return;
      scrollToAnchor(hash, preferredScrollBehavior());
    };

    let introPending = false;
    try {
      introPending = !sessionStorage.getItem(INTRO_STORAGE_KEY);
    } catch {
      introPending = false;
    }

    const delay = introPending ? INTRO_BUFFER_MS : 0;
    timer = window.setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(run);
      });
    }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [hash, pathname, key]);

  return null;
}
