'use client'

import React, { Suspense } from 'react';
import '@/styles/Languages.css';

const LanguagesList = React.lazy(() => import('./LanguagesList'));

export default function Languages() {
  return (
    <div className="languages">
      <h2 className="languages__title gradient-text">Programming Languages I Use</h2>
      <div className="line-break"/>
      <Suspense fallback={<div>Loading...</div>}>
        <LanguagesList />
      </Suspense>
    </div>
  );
}