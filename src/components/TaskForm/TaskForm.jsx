import React, { useState } from "react";

import S from "./taskForm.module.css";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const TaskForm = ({
  status = "todo",
  onClose,
  fetchTasks,
  task,
  isEditing,
}) => {
  const userId = useSelector((state) => state.userReducer.userData);
  const date = task?.date || "";
  const formatedDate = date ? date.split("/").reverse().join("-") : "";
  const [taskData, setTaskData] = useState({
    task: task?.information || "",
    date: formatedDate,
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
    date.setDate(date.getDate() + 1);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

    try {
      if (isEditing) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/tasks/taskEdit`,
          {
            id: task.id,
            date: formattedDate,
            information: taskData.task,
            status: status,
            uuid: userId.uuid,
          }
        );
        if (response.status === 200) {
          toast.success("Tarefa editada com sucesso!");
          await fetchTasks();
        }
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/tasks/createTask`,
          {
            date: formattedDate,
            information: taskData.task,
            uuid: userId.uuid,
            status: status,
          }
        );
        if (response.status === 201) {
          toast.success("Tarefa adicionada com sucesso!");
          await fetchTasks();
        }
      }
    } catch (error) {
      toast.error("Erro ao adicionar tarefa");
      console.error("Erro ao adicionar tarefa:", error);
    }

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
          {isEditing ? "Editar" : <IoMdAdd />}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
