import React from 'react';
import clsx from 'clsx';
import s from './Button.module.scss';

type Props = {
  variant?: 'primaryLg' | 'primary' | 'secondary' | 'default';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ variant = 'default', ...rest }: Props) => (
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
