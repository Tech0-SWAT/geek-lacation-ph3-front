"use client";

import React, { useEffect, useState, useCallback } from "react";

type GenericModalProps = {
  onClose: () => void;
  onClosed?: () => void;
  children: React.ReactNode;
  actions?: (handleClose: () => void) => React.ReactNode;
  interactable?: boolean;
  zIndex?: number;
};

export const GenericModal = ({
  onClose,
  onClosed,
  children,
  actions,
  interactable = false,
  zIndex = 9999,
}: GenericModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && interactable) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClosed) onClosed();
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-[2px] p-4 sm:p-8 ${
        isVisible ? "fade-in" : "fade-out pointer-events-none"
      }`}
      style={{ zIndex }} // ✅ zIndexを適用
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white rounded-md shadow-lg w-full max-w-sm sm:max-w-md text-center overflow-hidden ${
          isVisible ? "fade-in" : "fade-out"
        }`}
      >
        <div className="p-6 sm:p-8 text-sm text-accent">{children}</div>
        { actions && (
          <div className="bg-base-secondary py-3 px-4 sm:px-6">
            {actions(handleClose)}
          </div>
        )}
      </div>
    </div>
  );
};

export const useModal = (afterClose?: () => void, delay = 2000) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    if (afterClose) {
      setTimeout(() => {
        afterClose();
      }, delay);
    }
  }, [afterClose, delay]);

  return { isOpen, openModal, closeModal };
};
