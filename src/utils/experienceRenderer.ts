'use server'

import path from 'path';
import { unified } from 'unified';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkHtml from 'remark-html';
import { read } from 'to-vfile';
import fs from 'fs';

function parse(metaData: string) {
  const lines = metaData.split('\r\n');
  const result = {};

  lines.forEach(line => {
    const [key, value] = line.split(' = ');
    result[key.trim()] = value.replace(/"/g, '').trim();
  });
  return result;
}

export async function render(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  let metaData = {};
  
  // Use remark to convert markdown into HTML string
  const file = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(() => tree => {
      metaData = parse(tree.children[0].value);
    })
    .use(remarkHtml)
    .process(await read(fullPath));
  
  const content = String(file);

  // Combine the metaData with the html content
  return {
    ...metaData,
    content,
  };
}

const experiencesDirectory = path.join(process.cwd(), 'src/experiences');

export default async function getExperiences() {
  const experienceFiles = fs.readdirSync(experiencesDirectory).filter(file => file.endsWith('.md'));

  let experiences = await Promise.all(experienceFiles.map(async (file) => {
    const experience = await render(`/src/experiences/${file}`);
    return {
      key: file,
      title: experience['title'],
      start: experience['start'],
      end: experience['end'],
      company: experience['company'],
      location: experience['location'],
      content: experience.content,
    };
  }));

  experiences.sort((a, b) => {
    if (a.end === "Ongoing") return -1;
    if (b.end === "Ongoing") return 1;
    return new Date(b.end).getTime() - new Date(a.end).getTime();
  });

  return experiences;
}