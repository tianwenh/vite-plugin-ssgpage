import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { getTheme, setTheme } from '@tianwenh/utils/theme';

// Container of all pages.
export const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <header className="layout-head">
        <h3>
          <Link to="/">HTW</Link>
          <DarkModeToggle></DarkModeToggle>
        </h3>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

function getIsDark(): boolean {
  // Skip for SSR
  if (typeof window === 'undefined') {
    return false;
  }
  return getTheme() === 'dark';
}
const DarkModeToggle = () => {
  const themeName = (isDark: boolean) => (isDark ? 'dark' : 'light');

  const [isDark, setIsDark] = useState(getIsDark());
  useEffect(() => {
    setTheme(themeName(isDark));
  }, [isDark]);

  return (
    <span className="dark-toggle" onClick={() => setIsDark(!isDark)}>
      {isDark ? '🌘' : '🌔'}
    </span>
  );
};
