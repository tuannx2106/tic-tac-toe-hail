import React from 'react';
import clsx from 'clsx';
import s from './Button.module.scss';

export type ButtonProps = {
  variant?: 'primaryLg' | 'primary' | 'secondary' | 'default';
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ variant = 'default', ...rest }: ButtonProps) => (
  <button
    className={clsx(s.btnRoot, {
      [s.default]: variant === 'default',
      [s.primary]: variant === 'primary',
      [s.primaryLg]: variant === 'primaryLg',
      [s.secondary]: variant === 'secondary',
    })}
    {...rest}
  />
);
