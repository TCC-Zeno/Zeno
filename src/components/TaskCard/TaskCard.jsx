import React from "react";

import S from "./taskCard.module.css";
import { MdDelete } from "react-icons/md";
import { FaCalendarAlt, FaEdit } from "react-icons/fa";

const TaskCard = ({ title, date, handleDelete, index, setActiveCard }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    setActiveCard(index);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    setActiveCard(null);
  };

  return (
    <article
      className={S.task}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <>
        <div className={S.row01}>
          <span>{title}</span>
        </div>
        <div className={S.row02}>
          <FaCalendarAlt className={S.iconCalendar} />
          <span>{date}</span>
          <button className={S.buttonEdit}>
            <FaEdit className={S.iconEdit} />
          </button>
          <button
            className={S.buttonDelete}
            onClick={() => handleDelete(index)}
          >
            <MdDelete className={S.iconDelete} />
          </button>
        </div>
      </>
    </article>
  );
};

export default TaskCard;
