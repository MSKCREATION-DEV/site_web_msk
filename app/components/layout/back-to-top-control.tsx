import { useCallback } from "react";
import { BackToTop } from "~/components/ui";

/**
 * Wrapper client pour scroll vers le haut / #hero (Figma 9:54).
 */
export function BackToTopControl() {
  const handleClick = useCallback(() => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return <BackToTop onClick={handleClick} />;
}
