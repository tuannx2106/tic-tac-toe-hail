import React from 'react';
import clsx from 'clsx';
import { HTMLMotionProps, motion } from 'framer-motion';
import s from './Button.module.scss';

export type ButtonProps = {
  variant?: 'primaryLg' | 'primary' | 'secondary' | 'default';
  children?: React.ReactNode;
} & HTMLMotionProps<'button'>;

export const Button = ({ variant = 'default', ...rest }: ButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={clsx(s.btnRoot, {
      [s.default]: variant === 'default',
      [s.primary]: variant === 'primary',
      [s.primaryLg]: variant === 'primaryLg',
      [s.secondary]: variant === 'secondary',
    })}
    {...rest}
  />
);
