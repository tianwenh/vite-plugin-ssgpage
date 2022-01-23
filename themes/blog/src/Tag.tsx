import React from 'react';
import { NavLink } from 'react-router-dom';
import { className, slugify } from '@tianwenh/utils/string';

interface Props {
  tag: string;
  className?: string;
}

// Tag component, click to tags/:tag page.
export const Tag: React.FC<Props> = (props) => {
  const slug = slugify(props.tag);

  return (
    <NavLink
      to={`/tags/${slug}`}
      className={({ isActive }) =>
        className({
          [props.className ?? '']: true,
          'tag-active': isActive,
        })
      }
    >
      #{props.tag}
    </NavLink>
  );
};
