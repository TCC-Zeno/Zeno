import { useEffect } from "react";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { useDispatch } from "react-redux";
import { organizer } from "../redux/Route/slice";
import S from "./../styles/organizer.module.css";
import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import Task from "../components/Task/Task";

export default function Organizer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(organizer());
  }, [dispatch]);
  return (
    <DefaultLayout>
      <h1 className={S.titlePage}>Tarefas do mês</h1>
      <section className={S.sectionOrganizer}>
        <div className={S.toDoContainer}>
          <h2>A Fazer</h2>
          <div className={S.taskList}>
            <Task text="Fechar balanço financeiro" date="30/03" type="view"/>
            <Task text="Fechar balanço financeiro" date="30/03"/>
          </div>
          <button className={S.addTask}>+ Adicionar uma tarefa</button>
        </div>
        <div className={S.progressContainer}>
          <h2>Em andamento</h2>
        </div>
        <div className={S.doneContainer}>
          <h2>Concluído</h2>
        </div>
      </section>
    </DefaultLayout>
  );
}
