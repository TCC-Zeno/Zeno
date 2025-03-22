import React, { useEffect } from "react";
import S from "./modal.module.css";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={S.modalOverlay}>
      <div className={S.modalBackdrop} onClick={onClose}></div>

      <div className={S.modalContainer}>
        <button className={S.modalCloseButton} onClick={onClose}>
          ✕
        </button>

        <div className={S.modalContent}>{children}</div>
      </div>
    </div>
  );
}
