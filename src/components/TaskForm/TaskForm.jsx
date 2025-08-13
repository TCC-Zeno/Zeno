import React, { useState } from "react";

import S from "./taskForm.module.css";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { useSelector } from "react-redux";

const TaskForm = ({ setTasks, status = "todo", onClose }) => {
  const userId = useSelector((state) => state.userReducer.userData);
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

  const handleSubmit = async (e) => {
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

    try {
      console.log({
        date: formattedDate,
        information: taskData.task,
        uuid: userId.uuid,
        status: status,
      });
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks/createTask`,
        {
          date: formattedDate,
          information: taskData.task,
          uuid: userId.uuid,
          status: status,
        }
      );

      console.log("Tarefa adicionada com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }

    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks/taskID`,
        {
          uuid: userId.uuid,
        }
      );
      setDataFinance(data.data);
    } catch (error) {
      
      console.error("Erro ao buscar dados:", error);
    }
  
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
          id="text-task"
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
          id="date-task"
          name="date"
          className={S.inputDate}
          value={taskData.date}
          onChange={handleChange}
          required
        />
        <button id="submit-add-task" type="submit" className={S.addTask}>
          <IoMdAdd />
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
