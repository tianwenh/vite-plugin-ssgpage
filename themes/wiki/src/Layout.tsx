import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { DarkModeToggle } from '@tianwenh/utils/react/DarkModeToggle';
import { className } from '@tianwenh/utils/string';
import type {
  PageMetadata,
  PageQueryData,
} from '@tianwenh/vite-plugin-ssgpage';

interface Props {
  home: string;
  pages: PageMetadata[];
  loadPageQuery?: () => Promise<PageQueryData[]>;
}

const BurgerIcon = () => (
  <svg
    aria-label="menu"
    role="img"
    viewBox="0 0 24 24"
    height="30"
    width="30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
    ></path>
  </svg>
);

const CloseIcon = () => (
  <svg
    aria-label="close"
    role="img"
    viewBox="0 0 24 24"
    height="30"
    width="30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    ></path>
  </svg>
);

const SearchIcon = () => (
  <svg
    aria-label="search"
    role="img"
    viewBox="0 0 16 16"
    height="24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"
    ></path>
  </svg>
);

interface File {
  name: string;
  routepath: string;
}
class Folder {
  readonly folders: Record<string, Folder> = {};
  readonly files: File[] = [];
  constructor(paths: string[] = []) {
    for (const path of paths) {
      this.addPath(path.split('/'), path);
    }
  }
  addPath(subpaths: string[], file: string) {
    if (subpaths.length === 1) {
      this.files.push({ name: subpaths[0], routepath: file });
    } else {
      const [subpath, ...rest] = subpaths;
      if (!this.folders[subpath]) {
        this.folders[subpath] = new Folder();
      }
      this.folders[subpath].addPath(rest, file);
    }
  }
}

// Container of all pages.
export const Layout: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  const folder: Folder = useMemo(() => {
    const routepaths = props.pages.map((page) => page.routepath);
    return new Folder(routepaths);
  }, [props.pages]);

  const searchInput = (event: FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;
    props.loadPageQuery?.().then((pages) => {
      const activePages = pages.filter((page) => page.content.includes(input));
      console.log(input, activePages);
      // TODO: render result
    });
  };

  return (
    <div className="layout-container">
      <main className="main-container">
        <h3 className="layout-head">
          <button
            className="svg-button burger-icon"
            onClick={() => setIsOpen(true)}
          >
            <BurgerIcon />
          </button>
          <Link to="/">{props.home}</Link>
        </h3>
        <Outlet />
      </main>
      <aside className={className({ 'aside-container': true, open: isOpen })}>
        <h3 className="layout-head">
          <div>
            <Link to="/">{props.home}</Link>
            <DarkModeToggle className="dark-toggle"></DarkModeToggle>
          </div>
          <button
            className="svg-button close-icon"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </button>
        </h3>
        <div className="search-bar">
          <SearchIcon />
          <input
            className="search-input"
            aria-label="Search"
            placeholder="Search..."
            type="text"
            onChange={searchInput}
          />
        </div>
        <div className="aside-content">
          <FolderList folder={folder} />
        </div>
      </aside>
    </div>
  );
};

interface FolderListProps {
  folder: Folder;
  name?: string;
}

const FolderList: React.FC<FolderListProps> = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const head = props.name && (
    <span
      onClick={() => setIsOpen(!isOpen)}
      className={className({ arrow: true, open: isOpen })}
    >
      {props.name}
    </span>
  );
  const body = (!head || isOpen) && (
    <ul>
      {Object.entries(props.folder.folders).map(([subpath, folder]) => {
        return (
          <li key={subpath}>
            <FolderList folder={folder} name={subpath} />
          </li>
        );
      })}
      {props.folder.files.map((file) => {
        return (
          <li key={file.name}>
            <NavLink
              to={`/${file.routepath}`}
              className={({ isActive }) => className({ active: isActive })}
            >
              {file.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
  return (
    <>
      {head}
      {body}
    </>
  );
};
