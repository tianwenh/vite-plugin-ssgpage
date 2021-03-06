import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { DarkModeToggle } from '@tianwenh/utils/react/DarkModeToggle';

interface Props {
  home: string;
}

// Container of all pages.
export const Layout: React.FC<Props> = (props) => {
  return (
    <div className="layout-container">
      <header className="layout-head">
        <h3>
          <Link to="/">{props.home}</Link>
          <DarkModeToggle className="dark-toggle"></DarkModeToggle>
        </h3>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
