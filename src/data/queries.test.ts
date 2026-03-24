import { describe, expect, it } from "vitest";

import {
  allEvents,
  allExperiences,
  allProjects,
  getSocialsByPlatform,
  mostRecentEvent,
  mostRecentExp,
} from "./queries";

describe("queries", () => {
  describe("getSocialsByPlatform", () => {
    it("returns single platform by name", () => {
      const result = getSocialsByPlatform("github");
      expect(result).toHaveLength(1);
      expect(result?.[0]?.platform).toBe("github");
      expect(result?.[0]?.username).toBe("JesseKoldewijn");
    });

    it("returns multiple platforms", () => {
      const result = getSocialsByPlatform("twitter", "github", "linkedin");
      expect(result).toHaveLength(3);
      const platforms = result!.map((s) => s.platform);
      expect(platforms).toContain("twitter");
      expect(platforms).toContain("github");
      expect(platforms).toContain("linkedin");
    });

    it("returns null for unknown platform", () => {
      const result = getSocialsByPlatform("mastodon");
      expect(result).toBeNull();
    });
  });

  describe("allExperiences", () => {
    it("returns all experiences", () => {
      const result = allExperiences();
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((e) => e.company_name)).toBe(true);
    });

    it("includes JET with multi-role structure", () => {
      const result = allExperiences();
      const jet = result.find(
        (e) => e.company_name === "Just Eat Takeaway.com",
      );
      expect(jet).toBeDefined();
      expect("roles" in jet! && jet.roles).toBeTruthy();
      expect(jet!.roles).toHaveLength(2);
      expect(jet!.roles![0]!.title).toBe("Software Engineer");
      expect(jet!.roles![1]!.title).toBe("Associate Software Engineer");
    });
  });

  describe("allEvents", () => {
    it("returns all events", () => {
      const result = allEvents();
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((e) => e.name && e.year)).toBe(true);
    });
  });

  describe("allProjects", () => {
    it("returns all projects", () => {
      const result = allProjects();
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((p) => p.title && p.description)).toBe(true);
    });
  });

  describe("mostRecentExp", () => {
    it("returns the most recent experience by start date", () => {
      const result = mostRecentExp();
      expect(result).not.toBeNull();
      expect(result?.title).toBe("Software Engineer");
      expect(result?.company_name).toBe("Just Eat Takeaway.com");
    });
  });

  describe("mostRecentEvent", () => {
    it("returns the most recent event by date", () => {
      const result = mostRecentEvent();
      expect(result).not.toBeNull();
      expect(result?.name).toBe("Vercel Ship '25");
      expect(result?.year).toBe("2025");
    });
  });
});
