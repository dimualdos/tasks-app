import React from 'react';
import styles from './avatar.module.css';

export const Avatar = ({ name }) => {
  return (
    <div className={styles.avatar}>
      <div className={styles.initials}>{name}</div>
    </div>
  );
};