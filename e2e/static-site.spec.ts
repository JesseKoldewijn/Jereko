/**
 * E2E-style tests: build the static site and validate the output.
 * Run with: yarn test:e2e (builds first, then runs these tests)
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { beforeAll, describe, expect, it } from "vitest";

const DIST_DIR = path.join(process.cwd(), "dist");

function readHtml(route: string): string {
  // Astro static output: /foo -> dist/foo/index.html, / -> dist/index.html
  const filePath =
    route === "/" || route === ""
      ? path.join(DIST_DIR, "index.html")
      : path.join(DIST_DIR, route, "index.html");
  return fs.readFileSync(filePath, "utf-8");
}

describe("static site e2e", () => {
  beforeAll(() => {
    if (!fs.existsSync(DIST_DIR)) {
      execSync("yarn build", { stdio: "inherit" });
    }
  });

  describe("build output", () => {
    it("generates dist directory with expected routes", () => {
      expect(fs.existsSync(DIST_DIR)).toBe(true);
      expect(fs.existsSync(path.join(DIST_DIR, "index.html"))).toBe(true);
      expect(fs.existsSync(path.join(DIST_DIR, "projects", "index.html"))).toBe(
        true,
      );
      expect(fs.existsSync(path.join(DIST_DIR, "experience", "index.html"))).toBe(
        true,
      );
      expect(fs.existsSync(path.join(DIST_DIR, "about-me", "index.html"))).toBe(
        true,
      );
      expect(fs.existsSync(path.join(DIST_DIR, "offline", "index.html"))).toBe(
        true,
      );
    });
  });

  describe("homepage", () => {
    it("has correct title", () => {
      const html = readHtml("/");
      expect(html).toContain("<title>");
      expect(html).toMatch(/Jereko|Jesse Koldewijn/i);
    });

    it("contains main content shell", () => {
      const html = readHtml("/");
      expect(html).toContain("min-h-screen");
    });
  });

  describe("projects page", () => {
    it("renders projects page", () => {
      const html = readHtml("/projects");
      expect(html.length).toBeGreaterThan(500);
    });
  });

  describe("experience page", () => {
    it("renders experience page", () => {
      const html = readHtml("/experience");
      expect(html.length).toBeGreaterThan(500);
    });
  });

  describe("offline page", () => {
    it("has offline fallback content", () => {
      const html = readHtml("/offline");
      expect(html).toMatch(/offline/i);
    });
  });

  describe("PWA assets", () => {
    it("generates service worker", () => {
      const swPath = path.join(DIST_DIR, "sw.js");
      expect(fs.existsSync(swPath)).toBe(true);
    });

    it("generates web manifest", () => {
      const manifestPath = path.join(DIST_DIR, "manifest.webmanifest");
      expect(fs.existsSync(manifestPath)).toBe(true);
      const manifest = JSON.parse(
        fs.readFileSync(manifestPath, "utf-8"),
      ) as { name?: string; short_name?: string };
      expect(manifest.name ?? manifest.short_name).toBeDefined();
    });
  });
});
