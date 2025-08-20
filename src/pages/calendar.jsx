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
import axios from "axios";

export default function Calendar() {
  //? documentação da lib: https://fullcalendar.io/docs
  //* https://www.youtube.com/watch?v=uxbIQALflYs nesse video ele fala como fazer em PHP, eu tive que olhar a maior parte na documentação e em tutoriais, mas acabou saindo
  const { register, handleSubmit } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [events, setEvents] = useState([]);
  const profileinfo = useSelector((state) => state.userReducer.userData);

  const dispatch = useDispatch();

  const fetchEvents = async () => {
  try {
    const resposta = await axios.post(
      `${import.meta.env.VITE_API_URL}/calendar/fetch`,
      {
        uuid: profileinfo.uuid,
      }
    );
    
    console.log("resposta:", resposta.data);
    
    // Transform data to match FullCalendar's expected format
    const transformedEvents = resposta.data.map(event => ({
      id: event.id,
      title: event.title,
      start: event.initial_date,
      end: event.end_date,
    }));
    
    console.log("transformed events:", transformedEvents);
    setEvents(transformedEvents);
  } catch (err) {
    console.error("Erro ao buscar eventos:", err);
  }
};

const onSubmit = async (data) => {
  try {
    const resposta = await axios.post(
      `${import.meta.env.VITE_API_URL}/calendar/insert`,
      {
        uuid: profileinfo.uuid,
        title: data.title,
        initial_date: data.dateStart,
        end_date: data.dateEnd,
      }
    );
    
    // Close modal and refresh events after successful insertion
    handleModalClose();
    await fetchEvents(); // Refresh the calendar events
    
  } catch (err) {
    alert(err.response?.data?.error || "Erro ao atualizar informações");
  }
};

  useEffect(() => {
    fetchEvents();
  }, [profileinfo]);

  useEffect(() => {
    dispatch(calendar());
  }, [dispatch]);

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
