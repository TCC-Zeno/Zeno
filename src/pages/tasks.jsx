import { useEffect, useState } from "react";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { useDispatch } from "react-redux";
import { task } from "../redux/Route/slice";
import S from "./../styles/organizer.module.css";
import TaskColumn from "../components/TaskColumn/TaskColumn";
import { LuListTodo } from "react-icons/lu";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";

const oldTasks = localStorage.getItem("tasks");

export default function Tasks() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(task());
  }, [dispatch]);

  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const onDrop = (status, position) => {
    console.log(
      `${activeCard} ta indo para ${status} e a posição ${position} `
    );
    if(activeCard == null || activeCard === undefined) return;

    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((task, index) => index !== activeCard)

    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status
    })

    setTasks(updatedTasks)
  };
  return (
    <DefaultLayout>
      <h1 className={S.titlePage}>Tarefas do mês</h1>
      <section className={S.sectionOrganizer}>
        <TaskColumn
          title="A fazer"
          icon={<LuListTodo />}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          setTasks={setTasks}
          id={"todo-column"}
        />
        <TaskColumn
          title="Em andamento"
          icon={<GrInProgress />}
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          setTasks={setTasks}
          id={"doing-column"}
        />
        <TaskColumn
          title="Concluído"
          icon={<IoMdDoneAll />}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          setTasks={setTasks}
          id={"done-column"}
        />
      </section>
    </DefaultLayout>
  );
}
