import React, { useState } from "react";

import S from "./taskColumn.module.css";
import TaskCard from "./../TaskCard/TaskCard";
import DropArea from "../DropArea/DropArea";
import TaskForm from "../TaskForm/TaskForm";

const TaskColumn = ({
  title,
  tasks,
  status,
  setActiveCard,
  onDrop,
  fetchTasks,
  id,
}) => {
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setEditForm(true);
  };
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
      id={id}
    >
      <h2 className={S.task_column_heading}>{title}</h2>

      <DropArea onDrop={() => onDrop(status, 0)} />
      {tasks.map(
        (task, index) =>
          task.status === status && (
            <React.Fragment key={index}>
              <TaskCard
                information={task.information}
                date={task.date}
                index={index}
                setActiveCard={setActiveCard}
                id={task.id}
                fetchTasks={fetchTasks}
                onEditClick={() => handleEditClick(task)}
              />
              <DropArea onDrop={() => onDrop(status, index + 1)} />
            </React.Fragment>
          )
      )}
      {editForm && (
        <TaskForm
          fetchTasks={fetchTasks}
          task={selectedTask}
          onClose={() => {
            setEditForm(false);
            setSelectedTask(null);
          }}
          isEditing={true}
        />
      )}
      {addForm ? (
        <TaskForm
          fetchTasks={fetchTasks}
          status={status}
          onClose={() => setAddForm(false)}
        />
      ) : (
        <button
          onClick={() => setAddForm(true)}
          className={S.addTask}
          id="btn-add-task"
        >
          + Adicionar uma tarefa
        </button>
      )}
    </section>
  );
};

export default TaskColumn;
