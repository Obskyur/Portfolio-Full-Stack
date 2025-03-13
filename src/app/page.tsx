'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import '@/styles/home.css';
import '@/styles/globals.css';
import { getLanguagesPromise } from "@/utils/githubAPI";

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
}

function setPercentages(languages) {
  const totalLines = languages.reduce((acc, lang) => acc + lang.lines, 0);

  return languages
    .sort((a, b) => b.lines - a.lines)
    .map((language) => {
    const percentage = ((language.lines / totalLines) * 100).toFixed(2);
    return { ...language, percentage };
  });
}

export default function Home() {
  const [languages, setLanguages] = useState<{ name: string; lines: number; percentage?: string }[]>([]);

  useEffect(() => {
    getLanguagesPromise().then((languages) => {
      const langsByPercent = setPercentages(languages);
      setLanguages(langsByPercent);
    });
  }, []);

  const maxPercentage = languages.length > 0 ? languages[0].percentage : "0";

  return (
    <main className="home">
      <div className="home__image-container">
        <Image className="home__image" src="/me.png" alt="picture of Tristan" width="600" height="600"></Image>
      </div>
      <div className="home__description">
        <h2 className="home__description-title gradient-text">Full-Stack Developer</h2>
        <div className="line-break"/>
        <p className="home__description-text">I am Tristan Miller &#x2014; a full-stack developer that loves creating user-accessible web and desktop applications by following common industry standards and best practices.</p>
        <Link className="home__projects-link" href="/projects">Check out my projects</Link>
      </div>
      <div className="home__languages">
        <h2 className="home__languages-title gradient-text">Programming Languages I Use</h2>
        <div className="line-break"/>
        <div className="home__languages-list">
        {languages
          .map((language) => (
            <div key={language.name} className="home__language">
              <div className="home__language-container">
                <span className="home__language-name">{language.name}</span>
                <Image className="home__language-icon" src={languageIcons[language.name]} alt={language.name} width="50" height="50" />
              </div>
              <div className="home__language-bar">
                <div className="home__language-bar-fill" style={{ width: `${parseFloat(language.percentage) / parseFloat(maxPercentage) * 100}%` }}></div>
                <span className="home__language-percentage">{language.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
