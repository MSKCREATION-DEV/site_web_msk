import { useCallback, useEffect, useState } from "react";
import { BackToTop } from "~/components/ui";

/** Afficher le bouton après ce seuil de scroll (px). */
const SHOW_AFTER_PX = 320;

/**
 * Wrapper client — scroll vers #hero / top.
 * Masqué en haut de page (visible seulement après scroll).
 */
export function BackToTopControl() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleClick = useCallback(() => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!visible) return null;

  return <BackToTop onClick={handleClick} />;
}
