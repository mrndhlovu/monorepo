import { HTMLAttributes, ReactNode } from 'react';
import styles from './uibutton.module.scss';

/* eslint-disable-next-line */
export interface UIButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: string | number | ReactNode;
}

export const UIButton = ({ children, ...rest }: UIButtonProps) => {
  return (
    <button className={styles['ui-button']} {...rest}>
      {children}
    </button>
  );
};

export default UIButton;
