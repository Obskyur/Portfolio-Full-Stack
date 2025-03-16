'use server'

import path from 'path';
import { unified } from 'unified';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkHtml from 'remark-html';
import { read } from 'to-vfile';
import getConfig from 'next/config';
import matter from 'gray-matter';
import { marked } from 'marked';
import fs from 'fs';

const { publicRuntimeConfig } = getConfig();

// function logFileTree(dirPath: string, depth: number = 0) {
//   const files = fs.readdirSync(dirPath);

//   files.forEach(file => {
//     const filePath = path.join(dirPath, file);
//     const stats = fs.statSync(filePath);

//     if (stats.isDirectory()) {
//       console.log(' '.repeat(depth * 2) + file);
//       logFileTree(filePath, depth + 1);
//     }
//   });
// }

// export default async function getExperiences() {
//   const experienceFiles = (await fetchExperienceFiles());
//   console.log(`Logging file tree: ${process.cwd()}`);
//   logFileTree(process.cwd());

//   console.log("Extracting experiences from files... ", experienceFiles);
//   let experiences = await Promise.all(experienceFiles.map(async (file) => {
//     let experience;
//     try {
//       const filePath = await fetch(`${process.cwd()}/experiences/files.json`);
//       experience = await render(filePath);
//     } catch (error) {
//       console.error(`Error rendering file ${file}:`, error);
//       return null;
//     }
//     return {
//       key: file,
//       title: experience['title'],
//       start: experience['start'],
//       end: experience['end'],
//       company: experience['company'],
//       location: experience['location'],
//       content: experience.content,
//     };
//   }));

//   experiences.sort((a, b) => {
//     if (a.end === "Ongoing") return -1;
//     if (b.end === "Ongoing") return 1;
//     return new Date(b.end).getTime() - new Date(a.end).getTime();
//   });

//   console.log("Experiences extracted: ", experiences);

//   return experiences;
// }

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('public', 'experiences'));
  const paths = files.map(file => ({
    params: {
      slug: file.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('public', 'experiences', `${slug}.md`),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  const html = marked(content);

  return {
    props: {
      frontmatter,
      html,
    },
  }
}

// async function fetchExperienceFiles() {
//   try {
//     const res = await fetch(`${publicRuntimeConfig.baseURL}/experiences/files.json`);
//     const files = await res.json();
//     return files;
//   } catch (error) {
//     console.error("Error fetching experience files: ", error);
//     return [];
//   }
// }

// export async function render(filePath) {
//   let metaData = {};
  
//   console.log("Rendering file: ", filePath);

//   // Use remark to convert markdown into HTML string
//   const file = await unified()
//     .use(remarkParse)
//     .use(remarkStringify)
//     .use(remarkFrontmatter, ['yaml', 'toml'])
//     .use(() => tree => {
//       metaData = parse(tree.children[0].value);
//     })
//     .use(remarkHtml)
//     .process(await read(filePath));
  
//   console.log("File rendered: ", file);
  
//   const content = String(file);

//   console.log("File parsed: ", { ...metaData, content });

//   // Combine the metaData with the html content
//   return {
//     ...metaData,
//     content,
//   };
// }

// function parse(metaData: string) {
//   const lines = metaData.split('\r\n');
//   const result = {};

//   lines.forEach(line => {
//     const [key, value] = line.split(' = ');
//     result[key.trim()] = value.replace(/"/g, '').trim();
//   });
//   return result;
// }