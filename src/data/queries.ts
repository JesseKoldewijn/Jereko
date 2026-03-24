import type { Event } from "@/data/events";
import { events } from "@/data/events";
import type { Experience } from "@/data/experiences";
import { experiences, isMultiRoleExperience } from "@/data/experiences";
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
  if (isMultiRoleExperience(exp)) {
    const r = exp.roles[0]!;
    return `${r.start_year}/${r.start_month}/01`;
  }
  return `${exp.start_year}/${exp.start_month}/01`;
}

/** Top-level role fields merged with company identity (used for “current job” copy). */
export type FlattenedExperience = {
  exp_key: Experience["exp_key"];
  company_name: string;
  location: string;
  title: string;
  description: string;
  skills: string;
  start_year: string;
  start_month: string;
  end_year: string;
  end_month: string;
};

function flattenExperience(exp: Experience): FlattenedExperience {
  if (isMultiRoleExperience(exp)) {
    const currentRole =
      exp.roles.find((r) => r.end_month === "current") ?? exp.roles[0]!;
    return {
      exp_key: exp.exp_key,
      company_name: exp.company_name,
      location: exp.location,
      title: currentRole.title,
      description: currentRole.description,
      skills: currentRole.skills,
      start_year: currentRole.start_year,
      start_month: currentRole.start_month,
      end_year: currentRole.end_year,
      end_month: currentRole.end_month,
    };
  }
  return {
    exp_key: exp.exp_key,
    company_name: exp.company_name,
    location: exp.location,
    title: exp.title,
    description: exp.description,
    skills: exp.skills,
    start_year: exp.start_year,
    start_month: exp.start_month,
    end_year: exp.end_year,
    end_month: exp.end_month,
  };
}

export function mostRecentExp(): FlattenedExperience | null {
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
