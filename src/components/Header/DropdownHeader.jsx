import React, { useState, useRef, useEffect } from "react";
import S from "./header.module.css";

export default function DropdownHeader({ icon, modalContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const iconRef = useRef(null);

  // Função para quando clicar fora o Dropdown sumir
  useEffect(() => {
    function handleClickOutside(event) {
      if (iconRef.current && iconRef.current.contains(event.target)) {
        return;
      }
      
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, iconRef]);

  return (
    <div className={S.iconContainer}>
      <div
        ref={iconRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        {icon}
      </div>

      {isOpen && (
        <div ref={modalRef} className={S.dropdown}>
          {modalContent}
        </div>
      )}
    </div>
  );
}