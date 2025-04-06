import React, { useState } from "react";
import S from "./dropArea.module.css";

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <section
      onDragEnter={(e) => {
        e.preventDefault();
        setShowDrop(true);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={(e) => {
        e.preventDefault();
        setShowDrop(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
        setShowDrop(false);
      }}
      className={showDrop ? `${S.drop_area}` : `${S.hide_drop}`}
    >
      <div className={showDrop ? `${S.drop_area_div}` : `${S.hide_drop_div}`}>
        Solte aqui
      </div>
    </section>
  );
};

export default DropArea;
