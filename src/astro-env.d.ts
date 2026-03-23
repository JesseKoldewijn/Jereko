/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module "virtual:pwa-info" {
  export interface PwaInfo {
    webManifest: { href: string; linkTag: string };
  }
  export const pwaInfo: PwaInfo | undefined;
}
