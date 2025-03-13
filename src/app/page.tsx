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
        <h2 className="home__description-title gradient-text">Full-Stack Developer</h2>
        <div className="line-break"/>
        <p className="home__description-text">I am Tristan Miller &#x2014; a full-stack developer that loves creating user-accessible web and desktop applications by following common industry standards and best practices.</p>
        <Link className="home__projects-link" href="/projects">Check out my projects</Link>
      </div>
      <Languages />
      <Frameworks />
    </main>
  );
}
