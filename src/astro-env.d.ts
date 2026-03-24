/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />
/// <reference types="vite-plugin-pwa/client" />

/**
 * `.astro` templates use `astroHTML.JSX` (transition:*, client:*, etc.). With
 * `jsx: "react-jsx"` for `.tsx`, some tooling still resolves template JSX
 * against the global `JSX` namespace and reports TS7026. Bridge Astro intrinsics
 * into global JSX for editor / check alignment.
 */
declare namespace JSX {
  interface IntrinsicElements extends astroHTML.JSX.IntrinsicElements {}
}

declare module "virtual:pwa-info" {
  export interface PwaInfo {
    webManifest: { href: string; linkTag: string };
  }
  export const pwaInfo: PwaInfo | undefined;
}
