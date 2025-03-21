'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Frameworks from "@/components/Frameworks";
import Languages from "@/components/Languages";
import '@/styles/home.css';
import '@/styles/globals.css';

export default function Home() {
  return (
    <main className="home">
      <div className="home__image-container">
        <Image className="home__image" src="/me.png" alt="picture of Tristan" width="600" height="600"></Image>
      </div>
      <div className="home__description">
        <h2 className="home__description-title gradient-text">Junior Software Engineer</h2>
        <div className="line-break"/>
        <p className="home__description-text">I am Tristan Miller &#x2014; a full-stack developer that loves creating user-accessible web and desktop applications by following common industry standards and best practices.</p>
        <Link className="home__page-link" href="/projects">Check out my&nbsp;<u>Projects</u></Link>
        <div className="home__description-about">
          <h3 className="home__description-about-text">Click to learn more about my:</h3>
          <div className="home__description-about-links">
            <Link className="home__page-link" href={{ pathname: '/about', query: { tab: 'professional' } }}><u>Professional</u>&nbsp;History</Link>
            <Link className="home__page-link" href={{ pathname: '/about', query: { tab: 'personal' } }}><u>Personal</u>&nbsp;History</Link>
          </div>
        </div>
      </div>
      <Languages />
      <Frameworks />
    </main>
  );
}
