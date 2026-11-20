import type { Config } from "@react-router/dev/config";

export default {
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  /**
   * Manifest initial complet : évite un 404 client si la découverte lazy
   * `/__manifest` échoue ou est retardée (nav home → /fr/equipe).
   * Site vitrine = peu de routes, coût négligeable.
   */
  routeDiscovery: { mode: "initial" },
} satisfies Config;
