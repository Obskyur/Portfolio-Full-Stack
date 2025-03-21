import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import fs from 'fs';

export type Experience = {
  title: string;
  start: string;
  end: string;
  company: string;
  location: string;
  content: any;
}

export function fetchExperiences(): Experience[] {
  try {
    const fileNames = getExperienceFileNames();
    const experiences = fetchAndParseExperience(fileNames);
    return sortExperiences(experiences);
  } catch (err) {
    console.error(err);
    return [];
  }
}

function getExperienceFileNames(): string[]  {
  return fs.readdirSync(path.join('public', 'experiences'));
}

function fetchAndParseExperience(fileNames) {
  return fileNames.map(fn => {
    const exp = getDataFromFile(fn);
    return parseExperience(exp);
  });
}

function getDataFromFile(fileName) {
  const markdownWithMeta = fs.readFileSync(
    path.join('public', 'experiences', `${fileName}`),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  const html = marked(content);

  return {
    frontmatter,
    html,
  }
}

function parseExperience(experience): Experience {
  // Split by spaces before key-value pairs
  const lines = experience.frontmatter.split(/\s(?=\w+\s?=\s?")/); 
  const frontmatter: Record<string, string> = {};

  lines.forEach(line => {
    const [key, value] = line.split('=');
    frontmatter[key.trim()] = value.replace(/"/g, '').trim();
  });

  return {
    title: frontmatter.title || '',
    start: frontmatter.start || '',
    end: frontmatter.end || '',
    company: frontmatter.company || '',
    location: frontmatter.location || '',
    content: experience.html || '',
  };
}

// Sort experiences by `end` date (descending order)
function sortExperiences(allExperiences: Experience[]): Experience[] {
  return allExperiences.sort((a: Experience, b: Experience) => {
    if (a.end === "Ongoing") return -1;
    if (b.end === "Ongoing") return 1;
    return new Date(b.end).getTime() - new Date(a.end).getTime();
  });
}