import { useEffect, useState } from "react";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { task } from "../redux/Route/slice";
import S from "./../styles/organizer.module.css";
import TaskColumn from "../components/TaskColumn/TaskColumn";
import { LuListTodo } from "react-icons/lu";
import { GrInProgress } from "react-icons/gr";
import { IoMdDoneAll } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const oldTasks = localStorage.getItem("tasks");

export default function Tasks() {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.userReducer.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(task());
  }, [dispatch]);

  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activeCard, setActiveCard] = useState(null);

  async function fetchTasks() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks/taskID`,
        {
          uuid: userId.uuid,
        }
      );
      setTasks(response.data);
    } catch (error) {
      toast.error("Erro ao buscar tarefas");
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  // useEffect(() => {
  //   fetchTasks();
  // }, [userId]);

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  //   console.log("Tarefas salvas no localStorage:", tasks);
  // }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const onDrop = async (status, position) => {
    console.log(`${activeCard} ta indo para ${status} e a posição ${position}`);
    if (activeCard == null || activeCard === undefined) return;

    const taskToMove = tasks[activeCard];

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks/taskUpdateStatus`,
        {
          id: taskToMove.id,
          status: status,
        }
      );

      if (response.status === 200) {
        const updatedTasks = tasks.filter(
          (task, index) => index !== activeCard
        );
        updatedTasks.splice(position, 0, {
          ...taskToMove,
          status: status,
        });
        setTasks(updatedTasks);
      }
    } catch (error) {
      toast.error("Erro ao atualizar status da tarefa");
      console.error("Erro ao atualizar status:", error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchTasks();
      } catch (error) {
        toast.error("Erro ao inicializar dados");
        console.error("Erro ao inicializar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      initializeData();
    }
  }, [userId.uuid]);

  return (
    <DefaultLayout>
      <h1 className={S.titlePage}>Tarefas do mês</h1>
      <section className={S.sectionOrganizer} id="organizer">
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
          fetchTasks={fetchTasks}
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
          fetchTasks={fetchTasks}
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
          fetchTasks={fetchTasks}
        />
      </section>
    </DefaultLayout>
  );
}
