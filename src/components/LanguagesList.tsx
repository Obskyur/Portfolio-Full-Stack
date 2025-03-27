'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getLanguagesPromise } from '@/utils/githubAPI';
import '@/styles/Languages.css';

const languageIcons = {
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  "Clojure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clojure/clojure-original.svg",
  "Haskell": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/haskell/haskell-original.svg",
  "Kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
  "C": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  "EJS": "https://www.svgrepo.com/show/373574/ejs.svg",
};

function setPercentages(languages) {
  const totalLines = languages.reduce((acc, lang) => acc + lang.lines, 0);

  return languages
    .sort((a, b) => b.lines - a.lines)
    .map((language) => {
    const percentage = ((language.lines / totalLines) * 100).toFixed(2);
    return { ...language, percentage };
  });
}

export default function LanguagesList() {
  const [languages, setLanguages] = useState<{ name: string; lines: number; percentage?: string }[]>([]);

  useEffect(() => {
    getLanguagesPromise().then((languages) => {
      const langsByPercent = setPercentages(languages);
      setLanguages(langsByPercent);
    });
  }, []);

  const maxPercentage = languages.length > 0 ? languages[0].percentage : "0";

  return (
    <div className="languages__list">
      {languages.map((language) => (
        <div key={language.name} className="language">
          <div className="language__container">
            <span className="language__name">{language.name}</span>
            <Image className="language__icon" src={languageIcons[language.name]} alt={language.name} width="50" height="50" />
          </div>
          <div className="language__bar">
            <div className="language__bar-fill" style={{ width: `${parseFloat(language.percentage) / parseFloat(maxPercentage) * 100}%` }}/>
            <span className="language__percentage">{language.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}