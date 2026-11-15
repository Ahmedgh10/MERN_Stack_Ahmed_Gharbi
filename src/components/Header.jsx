import React from 'react';

// Functional component receiving two props: title and subtitle
export default function Header({ title, subtitle }) {
  // Pure JavaScript logic: format the current local date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <small className="header-date">Session Date: {currentDate}</small>
    </header>
  );
}
