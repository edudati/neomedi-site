import React from 'react';
import styles from '../styles.module.css';
import type { Tag } from '../types';

interface TagCloudProps {
  tags: Tag[];
  onTagClick: (tag: Tag) => void;
}

export const TagCloud: React.FC<TagCloudProps> = ({ tags, onTagClick }) => {
  return (
    <div className={styles.tagCloud}>
      {tags.map((tag) => (
        <button
          key={tag.id}
          className={styles.tag}
          onClick={() => onTagClick(tag)}
          title={tag.prompt}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
};
