import React from "react";

import S from "./taskCard.module.css";
import { MdDelete } from "react-icons/md";
import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import axios from "axios";

const TaskCard = ({ title, date, handleDelete, index, setActiveCard }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
    setActiveCard(index);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    setActiveCard(null);
  };

  async function taskDelete(id) {
      try {
        console.log("ID do item a ser deletado:", id);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/task/taskDelete`,
          {
            id: id,
          }
        );
        console.log(response);
        
      } catch (error) {
        console.error("Erro ao deletar item:", error);
        const errorMessage =
          error.response?.data?.message || "Erro ao deletar item";
        console.error("Erro ao deletar item:", errorMessage);
      }
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
          <button className={S.buttonEdit} id="btn-edit-task">
            <FaEdit className={S.iconEdit} />
          </button>
          <button
            className={S.buttonDelete}
            onClick={() => taskDelete(index)}
            id="btn-delete-task"
          >
            <MdDelete className={S.iconDelete} />
          </button>
        </div>
      </>
    </article>
  );
};

export default TaskCard;
