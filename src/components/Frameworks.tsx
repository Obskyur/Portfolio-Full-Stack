'use client'

import React from "react";
import Image from "next/image";
import '@/styles/Frameworks.css';

const frameworkIcons = {
    "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    "ReactJS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "ExpressJS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    "NodeJS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    "NextJS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    "dot-net": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg",
    "Avalonia": "https://reference.avaloniaui.net/assets/img/logo.svg",
};

export default function Frameworks() {
    return (
    <div className="frameworks">
        <h2 className="frameworks__title gradient-text">Frameworks and Tools I Use</h2>
        <div className="line-break" />
        <div className="frameworks__icons">
        {Object.entries(frameworkIcons).map(([name, icon]) => (
            <div key={name} className="framework">
            <Image className="framework__icon" src={icon} alt={name} width="50" height="50" />
            <span className="framework__name">{name}</span>
            </div>
        ))}
        </div>
    </div>
    )
}