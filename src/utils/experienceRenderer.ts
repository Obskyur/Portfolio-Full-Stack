import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import fs from 'fs';

export type ExperienceType = {
  title: string;
  start: string;
  end: string;
  company: string;
  location: string;
  content: any;
}

export async function fetchExperiences(): Promise<ExperienceType[]> {
  try {
    const fileNames = await getExperienceFileNames();
    const experiences = await fetchAndParseExperience(fileNames);
    return sortExperiences(experiences);
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getExperienceFileNames(): Promise<any> {
  return fs.readdirSync(path.join('public', 'experiences'));
}

async function fetchAndParseExperience(fileNames) {
  return await Promise.all(fileNames.map(async (path) => {
    const exp = await getStaticProps(path);
    return parseExperience(exp);
  }));
}

async function getStaticProps(fileName) {
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

async function parseExperience(experience): Promise<ExperienceType> {
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
function sortExperiences(allExperiences: ExperienceType[]): ExperienceType[] {
  return allExperiences.sort((a: ExperienceType, b: ExperienceType) => {
    if (a.end === "Ongoing") return -1;
    if (b.end === "Ongoing") return 1;
    return new Date(b.end).getTime() - new Date(a.end).getTime();
  });
}