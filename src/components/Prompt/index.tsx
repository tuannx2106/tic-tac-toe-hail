import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonProps } from 'components/Button';
import { motion } from 'framer-motion';
import s from './Prompt.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  titleLead?: string | null;
  onOk?: () => void;
  okBtnProps?: ButtonProps;
  okText?: string;
  cancelText?: string;
};

const Prompt = ({
  isOpen,
  onClose,
  title,
  titleLead,
  onOk,
  okText = 'Yes',
  cancelText = 'No, Cancel',
  okBtnProps,
}: Props) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={s.wrapper}
      role="presentation"
      onClick={onClose}
    >
      <div
        className={s.box}
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className={s.lead}>{titleLead}</p>
          <p className={s.title}>{title}</p>
          <div className={s.actions}>
            <Button onClick={onClose}>{cancelText}</Button>
            <Button
              variant="secondary"
              onClick={onOk}
              {...okBtnProps}
            >
              {okText}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>,
    document.getElementById('prompt-overlay') as HTMLElement
  );
};

export default Prompt;
