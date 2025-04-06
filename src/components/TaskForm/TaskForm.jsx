import React, { useState } from "react";

import S from "./taskForm.module.css";
import { IoMdAdd } from "react-icons/io";


const TaskForm = ({ setTasks, status = "todo", onClose }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    date: "",
    status: status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.task || !taskData.date) return;

    const date = new Date(taskData.date);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${(date.getFullYear() + 1)
      .toString()
      .padStart(2, "0")}`;

    setTasks((prev) => {
      return [...prev, { ...taskData, date: formattedDate, status: status }];
    });

    setTaskData({
      task: "",
      date: "",
      status: status,
    });

    if (onClose) onClose();
  };
  return (
    <form className={S.task} onSubmit={handleSubmit}>
      <div className={S.row01}>
        <input
          type="text"
          name="task"
          className={S.inputText}
          placeholder="Digite a tarefa"
          value={taskData.task}
          onChange={handleChange}
          required
        />
      </div>
      <div className={S.row02}>
        <input
          type="date"
          name="date"
          className={S.inputDate}
          value={taskData.date}
          onChange={handleChange}
          required
        />
        <button type="submit" className={S.addTask}>
          <IoMdAdd />
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
