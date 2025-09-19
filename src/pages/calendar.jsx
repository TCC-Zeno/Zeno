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
  const {
    register: addRegister,
    handleSubmit: handleSubmitAdd,
    reset: addReset,
  } = useForm();
  const { register: editRegister, handleSubmit: handleSubmitEdit } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEditEvent, setModalEditEvent] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [select, setSelect] = useState(null);
  const [events, setEvents] = useState([]);
  const profileinfo = useSelector((state) => state.userReducer.userData);

  const dispatch = useDispatch();

  const fetchEvents = async () => {
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/calendar/fetchUuid`,
        {
          uuid: profileinfo.uuid,
        }
      );

      // Transform data to match FullCalendar's expected format
      const transformedEvents = resposta.data.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.initial_date,
        end: event.end_date,
      }));

      setEvents(transformedEvents);
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("A: ", data);
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

 function dateFormatter(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

  // function eventMove(dateString, delta) {
  //   const date = new Date(dateString);
  //   if (delta.days < 0 || delta.years < 0 || delta.mouths < 0) {
  //     const day = String(date.getDay() - delta.days).padStart(2, "0");
  //     const year = date.getFullYear() - delta.years;
  //     const month = String(date.getMonth() - delta.months).padStart(2, "0");
  //     return `${year}-${month}-${day}`;
  //   } else {
  //     const day = String(date.getDay() + delta.days).padStart(2, "0");
  //     const year = date.getFullYear() + delta.years;
  //     const month = String(date.getMonth() + delta.months).padStart(2, "0");
  //     return `${year}-${month}-${day}`;
  //   }
  // }
  
  const onSubmitEdit = async (data) => {
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/calendar/update`,
        {
          id: dataEdit.id, // Usa o ID do evento editado
          title: data.title,
          initial_date: data.dateStart,
          end_date: data.dateEnd,
        }
      );

      handleModalClose();
      setModalEditEvent(false);
      await fetchEvents();
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

  const handleEventDrop = async (info) => {
    console.log("Clicked event:", info);
    const { event } = info;
    console.log("Dropped event:", event);
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/calendar/update`,
        {
          id: event._def.publicId,
          title: event._def.title,
          initial_date: info.event._instance.range.start,
          end_date: info.event._instance.range.end,
        }
      );
      console.log("resposta: ", resposta);
      handleModalClose();
      await fetchEvents();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Erro ao atualizar informações");
    }
  };

  const handleEventClick = async (info) => {
    console.log("Clicked event:", info);
    const { event } = info;
    // tem que fazer um select para pegar os dados do evento de acordo com o id do banco de dados. Ele está em event._def.publicId e ai passa para o setDataEdit
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/calendar/fetchId`,
        {
          id: event._def.publicId,
        }
      );

      console.log("resposta:", resposta.data[0]);
      setDataEdit(resposta.data[0]);
      setModalEditEvent(true);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao atualizar informações");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;

    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/calendar/delete`, // Você precisará criar esta rota
        {
          id: eventId,
        }
      );

      setModalEditEvent(false);
      await fetchEvents();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao excluir evento");
    }
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
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          handleModalClose();
          addReset();
        }}
      >
        <form
          onSubmit={handleSubmitAdd(onSubmit)}
          className={S.formModalAddEvent}
        >
          <h2>Adicione um título para o evento</h2>
          <input
            placeholder="Adicione seu título para o evento"
            type="text"
            name="title"
            id="title"
            {...addRegister("title")}
          />
          <h2>Selecione a data inicial para o evento</h2>
          <input
            type="date"
            name="dateStart"
            id="dateStart"
            defaultValue={select?.start || ""}
            {...addRegister("dateStart", { required: true })}
          />
          <h2>Selecione a data final para o evento</h2>
          <input
            type="date"
            name="dateEnd"
            id="dateEnd"
            defaultValue={dateFormatter(select?.end) || ""}
            {...addRegister("dateEnd")}
          />
          <input className={S.submitButton} type="submit" />
        </form>
      </Modal>
      <Modal isOpen={modalEditEvent} onClose={() => setModalEditEvent(false)}>
        <form
          onSubmit={handleSubmitEdit(onSubmitEdit)}
          className={S.formModalAddEvent}
        >
          <h2>Adicione um título para o evento</h2>
          <input
            placeholder="Adicione seu título para o evento"
            type="text"
            name="title"
            id="title"
            defaultValue={dataEdit?.title || ""}
            {...editRegister("title")}
          />
          <h2>Selecione a data inicial para o evento</h2>
          <input
            type="date"
            name="dateStart"
            id="dateStart"
            defaultValue={
              dataEdit?.initial_date ? dataEdit.initial_date.slice(0, 10) : ""
            }
            {...editRegister("dateStart", { required: true })}
          />
          <h2>Selecione a data final para o evento</h2>
          <input
            type="date"
            name="dateEnd"
            id="dateEnd"
            defaultValue={
              dataEdit?.end_date ? dataEdit.end_date.slice(0, 10) : ""
            }
            {...editRegister("dateEnd")}
          />
          <input className={S.submitButton} type="submit" />
          <input
            className={S.submitButtonDelete}
            type="button"
            title="Excluir"
            onClick={() => handleDeleteEvent(dataEdit.id)} // Corrige a chamada
            value="Excluir"
          />
        </form>
      </Modal>
    </DefaultLayout>
  );
}
