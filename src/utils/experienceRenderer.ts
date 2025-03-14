'use server'

import path from 'path';
import { unified } from 'unified';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkHtml from 'remark-html';
import { read } from 'to-vfile';

function parse(metaData: string) {
  const lines = metaData.split('\r\n');
  const result = {};

  lines.forEach(line => {
    const [key, value] = line.split(' = ');
    result[key.trim()] = value.replace(/"/g, '').trim();
  });
  return result;
}

export default async function render(filePath) {
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

