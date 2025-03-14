import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/NavBar.css';
import '@/styles/globals.css';


export default function NavBar() {

  return (
    <header className="header">
      <Link className="header__title-link" href="/">
        <Image className="header__title-img" src="/avatar.png" alt="profile icon" width="100" height="100" ></Image>
        <h1 className="header__title-text gradient-text">Tristan Miller</h1>
      </Link>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item"><Link className="header__nav-item-link" href="/">Home</Link></li>
          <div className="header__nav-break"></div>
          <li className="header__nav-item"><Link className="header__nav-item-link" href="/projects">Projects</Link></li>
          <div className="header__nav-break"></div>
          <li className="header__nav-item"><Link className="header__nav-item-link" href="/about">About</Link></li>
          <div className="header__nav-break"></div>
          <li className="header__nav-item"><Link className="header__nav-item-link" href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}