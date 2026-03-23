import type { Event } from "@/data/events";
import { events } from "@/data/events";
import type { Experience } from "@/data/experiences";
import { experiences } from "@/data/experiences";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import type { Social } from "@/data/socials";
import { socials } from "@/data/socials";

export function getSocialsByPlatform(...platform: string[]): Social[] | null {
  if (platform.length === 1) {
    const found = socials.find((s) => s.platform === platform[0]);
    return found ? [found] : null;
  }
  const filtered = socials.filter(
    (s) => s.platform && platform.includes(s.platform),
  );
  return filtered.length > 0 ? [...filtered] : null;
}

export function allExperiences(): Experience[] {
  return [...experiences];
}

export function allEvents(): Event[] {
  return [...events];
}

export function allProjects(): Project[] {
  return [...projects];
}

export function getExperienceStartDate(exp: Experience): string {
  if ("roles" in exp && exp.roles) {
    const r = exp.roles[0]!;
    return `${r.start_year}/${r.start_month}/01`;
  }
  return `${exp.start_year}/${exp.start_month}/01`;
}

function flattenExperience(exp: Experience): Experience & { title: string; description: string; skills: string; start_year: string; start_month: string; end_year: string; end_month: string } {
  if ("roles" in exp && exp.roles) {
    const currentRole = exp.roles.find((r) => r.end_month === "current") ?? exp.roles[0]!;
    return {
      ...exp,
      ...currentRole,
    } as Experience & typeof currentRole;
  }
  return exp as Experience & { title: string; description: string; skills: string; start_year: string; start_month: string; end_year: string; end_month: string };
}

export function mostRecentExp(): (Experience & { title: string; description: string; skills: string; start_year: string; start_month: string; end_year: string; end_month: string }) | null {
  const exps = allExperiences();
  if (!exps.length) return null;
  const mostRecent = exps.reduce((prev, current) => {
    const prevDate = new Date(getExperienceStartDate(prev)).getTime();
    const curDate = new Date(getExperienceStartDate(current)).getTime();
    return curDate > prevDate ? current : prev;
  });
  return flattenExperience(mostRecent);
}

export function mostRecentEvent(): Event | null {
  const evts = allEvents();
  if (!evts.length) return null;
  return evts.reduce((prev, current) => {
    const prevDate = Date.parse(
      `${prev?.month ?? "01"}-${prev?.day ?? "01"}-${prev?.year ?? "1970"}`,
    ).toString();
    const curDate = Date.parse(
      `${current.month ?? "01"}-${current.day ?? "01"}-${current.year ?? "1970"}`,
    ).toString();
    return Number(prevDate) > Number(curDate) ? prev : current;
  }, evts[0]!);
}
