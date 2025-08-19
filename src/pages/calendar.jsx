import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { calendar } from "../redux/Route/slice";
import { useEffect, useState } from "react";
import S from "./../styles/calendar.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import multiMonth from "@fullcalendar/multimonth";
import Modal from "../components/Modal/Modal";
import { useForm } from "react-hook-form";
import axios from "axios"

export default function Calendar() {
  //? documentação da lib: https://fullcalendar.io/docs
  //* https://www.youtube.com/watch?v=uxbIQALflYs nesse video ele fala como fazer em PHP, eu tive que olhar a maior parte na documentação e em tutoriais, mas acabou saindo
  const { register, handleSubmit } = useForm();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [select, setSelect] = useState(null);

  const profileinfo = useSelector((state) => state.userReducer.userData);

  const dispatch = useDispatch();
const onSubmit = async (data) => {
  try {
   
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/calendar/insert`,
        {
          uuid: profileinfo.uuid,
          title: data.title,
          initial_date: data.dateStart,
          end_date: data.dateEnd
        });    
    }
  catch(err){
    alert(err.response?.data?.error || "Erro ao atualizar informações");
    }
};
  
  useEffect(() => {
    dispatch(calendar());
  }, [dispatch]);

  const events = [
    { id: 1, title: "Event 1", date: "2025-04-24" },
    { id: 2, title: "Event 2", date: "2025-04-24" },
  ];
  const selectDates = (selectInfo) => {
    console.log(
      "Selected dates:",
      selectInfo.startStr,
      "to",
      selectInfo.endStr
    );
    setSelect({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
  };

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalOpen = () => setIsModalOpen(true);
  return (
    <DefaultLayout>
      <div className={S.containerCalendar}>
        <FullCalendar
          plugins={[dayGrid, interaction, multiMonth]}
          locale="pt-br"
          initialView="dayGridMonth"
          selectable={true}
          editable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,multiMonthYear",
          }}
          buttonText={{
            today: "Hoje",
            dayGridMonth: "Mês",
            dayGridWeek: "Semana",
            multiMonthYear: "Ano",
          }}
          views={{
            dayGridMonth: {
              titleFormat: { month: "long", year: "numeric" },
              dayHeaderFormat: { weekday: "long" },
            },
            dayGridWeek: {
              titleFormat: { month: "long", year: "numeric" },
              dayHeaderFormat: { weekday: "long" },
            },
            multiMonthYear: {
              titleFormat: { year: "numeric" },
              multiMonthMaxColumns: 3,
              multiMonthMinWidth: 300,
            },
          }}
          events={events}
          select={(e) => {
            handleModalOpen(), selectDates(e);
          }}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <form onSubmit={handleSubmit(onSubmit)} className={S.formModalAddEvent}>
          <h2>Adicione um título para o evento</h2>
          <input
            placeholder="Adicione seu título para o evento"
            type="text"
            name="title"
            id="title"
            {...register("title")}
          />
          <h2>Selecione a data inicial para o evento</h2>
          <input
            type="date"
            name="dateStart"
            id="dateStart"
            defaultValue={select?.start || ""}
            {...register("dateStart", { required: true })}
          />
          <h2>Selecione a data final para o evento</h2>
          <input
            type="date"
            name="dateEnd"
            id="dateEnd"
            defaultValue={select?.end || ""}
            {...register("dateEnd")}
          />
          <input className={S.submitButton} type="submit" />
        </form>
      </Modal>
    </DefaultLayout>
  );
}
