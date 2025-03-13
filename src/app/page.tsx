import React from "react";
import Image from "next/image";
import Link from "next/link";
import '@/styles/home.css';
import '@/styles/globals.css';

export default function Home() {
  let languages: { name: string; lines: number; percentage?: string }[] = [
    { name: "JavaScript", lines: 10000 },
    { name: "TypeScript", lines: 10000 },
    { name: "HTML", lines: 3000 },
    { name: "CSS", lines: 6000 },
    { name: "CSharp", lines: 8000 },
    { name: "Python", lines: 2000 },
    { name: "C", lines: 5400 },
    { name: "Java", lines: 200 },
    { name: "C++", lines: 3200 },
  ].sort((a, b) => b.lines - a.lines);

  const totalLines = languages.reduce((acc, lang) => acc + lang.lines, 0);

  languages = languages.map((language) => {
    const percentage = ((language.lines / totalLines) * 100).toFixed(2);
    return { ...language, percentage };
  });

  const maxPercentage = languages[0].percentage;

  

  return (
    <main className="home">
      <div className="home__image-container">
        <Image className="home__image" src="/me.png" alt="picture of Tristan" width="600" height="600"></Image>
      </div>
      <div className="home__description">
        <h2 className="home__description-title gradient-text">Full-Stack Developer</h2>
        <p className="home__description-text">I am Tristan Miller - a full-stack developer that loves creating user-accessible web and desktop applications by following common industry standards and best practices.</p>
        <Link className="home__projects-link" href="/projects">Check out my projects</Link>
      </div>
      <div className="home__languages">
        <h2 className="home__languages-title gradient-text">Programming Languages I Use</h2>
      </div>
      <div className="home__languages-list">
        {languages
          .map((language) => (
            <div key={language.name} className="home__language">
              <span className="home__language-name">{language.name}</span>
              <div className="home__language-bar">
                <div className="home__language-bar-fill" style={{ width: `${parseFloat(language.percentage) / parseFloat(maxPercentage) * 100}%` }}></div>
                <span className="home__language-percentage">{language.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
    </main>
  );
}
