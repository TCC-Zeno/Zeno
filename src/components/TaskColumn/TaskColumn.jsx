import React, { useState } from "react";

import S from "./taskColumn.module.css";
import TaskCard from "./../TaskCard/TaskCard";
import DropArea from "../DropArea/DropArea";
import TaskForm from "../TaskForm/TaskForm";

const TaskColumn = ({
  title,
  tasks,
  status,
  handleDelete,
  setActiveCard,
  onDrop,
  setTasks,
}) => {
  const [addForm, setAddForm] = useState(false);
  return (
    <section
      className={`${S.task_column} ${
        title == "A fazer"
          ? S.toDoContainer
          : title == "Em andamento"
          ? S.progressContainer
          : title == "Concluído"
          ? S.doneContainer
          : ""
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData("text/plain");
        if (draggedIndex !== "") {
          onDrop(status, 0);
        }
      }}
    >
      <h2 className={S.task_column_heading}>{title}</h2>

      <DropArea onDrop={() => onDrop(status, 0)} />
      {tasks.map(
        (task, index) =>
          task.status === status && (
            <React.Fragment key={index}>
              <TaskCard
                title={task.task}
                date={task.date}
                handleDelete={handleDelete}
                index={index}
                setActiveCard={setActiveCard}
              />
              <DropArea onDrop={() => onDrop(status, index + 1)} />
            </React.Fragment>
          )
      )}
      {addForm ? (
        <TaskForm setTasks={setTasks} status={status} onClose={() => setAddForm(false)} />
      ) : (
        <button onClick={() => setAddForm(true)} className={S.addTask}>+ Adicionar uma tarefa</button>
      )}
    </section>
  );
};

export default TaskColumn;
