import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import style from "./../styles/service.module.css";
import { service } from "../redux/Route/slice";
import { LuClock7 } from "react-icons/lu";
import { RiPlayLargeLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Modal from "../components/Modal/Modal";
import CurrencyInput from "react-currency-input-field";
import axios from "axios";
import { Check, CheckIcon, Trash } from "lucide-react";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";

export default function Service() {
  const [scheduled, setScheduled] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [value, setValue] = useState(0);
  const [serviceEdit, setServiceEdit] = useState({});
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const userId = useSelector((state) => state.userReducer.userData);
  const [dataServices, setDataServices] = useState([]);
  const [dataServicesFilter, setDataServicesFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(service());
  }, [dispatch]);

  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, control, reset: addReset } = useForm();
  const {
    register: editRegister,
    handleSubmit: handleSubmitEdit,
    control: editControl,
    reset: editReset,
    formState: { errors: editErrors },
  } = useForm();
  const onSubmit = async (data) => {
    const priceDot = data.price?.toString().replace(",", ".");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/services/addServicesform`,
        {
          userId: userId.uuid,
          name_customer: data.clientName,
          pending_amount: parseFloat(priceDot),
          date: data.date,
          description: data.description,
          status: data.status,
          name_services: data.serviceName,
          number_customer: data.clientContact,
        }
      );

      if (response.status === 201) {
        addReset();
        fetchData();
      }
    } catch (error) {
      console.error("Erro ao adicionar serviço:", error);
    }

    console.log(data);
    console.log();
    setModalOpen(false);
  };

  async function fetchData() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/services/servicesId`,
        { uuid: userId.uuid }
      );

      const services = response.data;
      setDataServices(services);

      // Calcula os totais
      const scheduledCount = services.filter(
        (s) => s.status === "agendado"
      ).length;
      const inProgressCount = services.filter(
        (s) => s.status === "em_andamento"
      ).length;
      const completedCount = services.filter(
        (s) => s.status === "concluido"
      ).length;

      setScheduled(scheduledCount);
      setInProgress(inProgressCount);
      setCompleted(completedCount);

      //valor total recebido
      const totalValue = services
        .filter((s) => s.status === "concluido")
        .reduce((acc, s) => acc + parseFloat(s.pending_amount || 0), 0);

      setValue(totalValue);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  async function editService(data) {
    const priceDot = data.price?.toString().replace(",", ".");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/services/editServicesForm`,
        {
          id: serviceEdit.id,
          userId: userId.uuid,
          name_customer: data.clientName,
          pending_amount: parseFloat(priceDot),
          date: data.date,
          description: data.description,
          status: data.status,
          name_services: data.serviceName,
          number_customer: data.clientContact,
        }
      );

      if (response.status === 200) {
        editReset();
        setModalEditOpen(false);
        await fetchData();
      }
    } catch (error) {
      console.error("Erro ao editar serviço:", error);
    }
  }

  async function deleteService(id) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/services/servicesDelete`,
        {
          id,
        }
      );

      if (response.status === 200) {
        editReset();
        setModalEditOpen(false);
        await fetchData();
      }
    } catch (error) {
      console.error("Erro ao excluir serviço:", error);
    }
  }

  async function updateStatus(id, status) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/services/editServicesForm`,
        {
          id: id,
          status: status,
        }
      );

      if (response.status === 200) {
        editReset();
        await fetchData();
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  }

  function viewStatus(status, id) {
    switch (status) {
      case "agendado":
        return <td className={style.statusAgendTable}>Agendado</td>;
      case "em_andamento":
        return (
          <td className={style.statusAndamContainer}>
            <span className={style.statusAndamTable}>Em Andamento</span>{" "}
            <button
              title="Clique para concluir serviço"
              className={style.buttonCheck}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                updateStatus(id, "concluido");
              }}
            >
              <CheckIcon />
            </button>
          </td>
        );
      case "concluido":
        return <td className={style.statusConclTable}>Concluído</td>;
      case "cancelado":
        return <td className={style.statusCancelTable}>Cancelado</td>;
      default:
        return <td className={style.statusAgendTable}>Outro</td>;
    }
  }

  function filterData(filter = "all") {
    if (filter === "all") {
      return setDataServicesFilter(dataServices);
    } else if (filter === "agendado") {
      return setDataServicesFilter(
        dataServices.filter((s) => s.status === "agendado")
      );
    } else if (filter === "em_andamento") {
      return setDataServicesFilter(
        dataServices.filter((s) => s.status === "em_andamento")
      );
    } else if (filter === "concluido") {
      return setDataServicesFilter(
        dataServices.filter((s) => s.status === "concluido")
      );
    } else if (filter === "cancelado") {
      return setDataServicesFilter(
        dataServices.filter((s) => s.status === "cancelado")
      );
    } else {
      return setDataServicesFilter(dataServices);
    }
  }

  function handleServiceClick(service) {
    setServiceEdit(service);
    setModalEditOpen(true);
  }

  useEffect(() => {
    if (dataServices.length > 0) {
      filterData("all");
    }
  }, [dataServices]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchData();
      } catch (error) {
        console.error("Erro ao inicializar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      initializeData();
    }
  }, []);
  return (
    <>
      <DefaultLayout>
        <div className={style.tudo}>
          <div className={style.addContainer}>
            <button
              className={style.buttonAdd}
              onClick={() => setModalOpen(true)}
            >
              <FaPlus /> Adicionar Serviço
            </button>
          </div>
          <div className={style.statusContainer}>
            <div className={style.statusAgend}>
              <div className={style.titleAgend}>
                <h2 className={style.title}>Agendados</h2>
                <LuClock7 className={style.iconAgend} />
              </div>
              <div className={style.valueAgend}>
                <h1 className={style.value1}>{scheduled}</h1>
              </div>
            </div>

            <div className={style.statusAndam}>
              <div className={style.titleAndam}>
                <h2 className={style.title}>Em Andamento</h2>
                <RiPlayLargeLine className={style.iconAndam} />
              </div>
              <div className={style.valueAndam}>
                <h1 className={style.value2}>{inProgress}</h1>
              </div>
            </div>

            <div className={style.statusConcl}>
              <div className={style.titleConcl}>
                <h2 className={style.title}>Concluídos</h2>
                <FaCheck className={style.iconConcl} />
              </div>
              <div className={style.valueConcl}>
                <h1 className={style.value3}>{completed}</h1>
              </div>
            </div>

            <div className={style.statusReceb}>
              <div className={style.titleReceb}>
                <h2 className={style.title}>Valor Recebido</h2>
                <MdAttachMoney className={style.iconReceb} />
              </div>
              <div className={style.valueReceb}>
                <h1 className={style.value4}>{value.toFixed(2)}</h1>
              </div>
            </div>
          </div>
          <div className={style.linhaContainer}>
            <div className={style.linha}></div>
          </div>
          <div className={style.searchContainer}>
            <div className={style.filterContainer}>
              <div className={style.buttonContainer}>
                <div>
                  <button
                    className={style.button}
                    onClick={() => filterData("all")}
                  >
                    Todos
                  </button>
                </div>
                <div>
                  <button
                    className={style.button}
                    onClick={() => filterData("em_andamento")}
                  >
                    Em Andamento
                  </button>
                </div>
                <div>
                  <button
                    className={style.button}
                    onClick={() => filterData("concluido")}
                  >
                    Concluídos
                  </button>
                </div>
                <div>
                  <button
                    className={style.button}
                    onClick={() => filterData("cancelado")}
                  >
                    Cancelados
                  </button>
                </div>
              </div>
            </div>

            <div className={style.tableContainer}>
              <table className={style.tabela}>
                <thead className={style.thead}>
                  <tr className={style.tr}>
                    <th className={style.th}>Serviços</th>
                    <th className={style.th}>Cliente</th>
                    <th className={style.th}>Data Agendamento</th>
                    <th className={style.th}>Status</th>
                    <th className={style.th}>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {dataServicesFilter.map((service) => (
                    <tr
                      className={style.conteudo}
                      key={service.id}
                      onClick={() => {
                        handleServiceClick(service);
                      }}
                    >
                      <td className={style.td}>{service.name_services}</td>
                      <td className={style.td}>{service.name_customer}</td>
                      <td className={style.td}>{service.date}</td>
                      {viewStatus(service.status, service.id)}
                      <td className={style.td}>
                        R$ {parseFloat(service.pending_amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DefaultLayout>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={style.modalContainer}>
          <div className={style.modalTitle}>
            <h2>Adicionar Serviço</h2>
          </div>
          <div className={style.modalFormContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={style.modalForm}>
                <div className={style.modalRow}>
                  <input
                    type="text"
                    placeholder="Nome do Serviço"
                    className={style.modalInput}
                    {...register("serviceName", {
                      required: "Nome do serviço é obrigatório",
                    })}
                  />
                  <Controller
                    name="price"
                    control={control}
                    rules={{
                      required: "Preço é obrigatório",
                      validate: (value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue) || numValue <= 0) {
                          return "Digite um valor válido maior que zero";
                        }
                        return true;
                      },
                    }}
                    render={({
                      field: { onChange, value, name },
                      fieldState: { error },
                    }) => (
                      <CurrencyInput
                        id="input-price"
                        name={name}
                        placeholder="R$ 0,00"
                        decimalsLimit={2}
                        decimalScale={2}
                        decimalSeparator=","
                        groupSeparator="."
                        prefix="R$ "
                        onValueChange={(value) => onChange(value)}
                        value={value === 0 ? "" : value}
                        className={`${style.modalInput} ${
                          error ? "error" : ""
                        }`}
                      />
                    )}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Descrição"
                  className={style.modalInput}
                  {...register("description", {
                    required: "Descrição do serviço é obrigatória",
                  })}
                />
                <div className={style.modalRow}>
                  <input
                    type="text"
                    placeholder="Cliente"
                    className={style.modalInput}
                    {...register("clientName", {
                      required: "Nome do cliente é obrigatório",
                    })}
                  />
                  <input
                    type="text"
                    placeholder="Contato Cliente"
                    className={style.modalInput}
                    {...register("clientContact", {
                      required: "Contato do cliente é obrigatório",
                    })}
                  />
                </div>
                <div className={style.modalRow}>
                  <select
                    className={style.modalInput1}
                    {...register("status", {
                      required: "Status é obrigatório",
                    })}
                  >
                    <option value="">Selecione o Status</option>
                    <option value="agendado">Agendado</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluido">Concluído</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                  <input
                    type="date"
                    className={style.modalInput}
                    {...register("date", { required: "Data é obrigatória" })}
                  />
                </div>
              </div>
              <div className={style.modalButton}>
                <button type="submit">Adicionar</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Modal isOpen={modalEditOpen} onClose={() => setModalEditOpen(false)}>
        <div className={style.modalContainer}>
          <div className={style.modalTitle}>
            <h2>Editar Serviço</h2>
          </div>
          <div className={style.modalFormContainer}>
            <form onSubmit={handleSubmitEdit(editService)}>
              <div className={style.modalForm}>
                <div className={style.modalRow}>
                  <input
                    type="text"
                    placeholder="Nome do Serviço"
                    className={style.modalInput}
                    {...editRegister("serviceName", {
                      required: "Nome do serviço é obrigatório",
                    })}
                    defaultValue={serviceEdit.name_services}
                  />
                  <Controller
                    name="price"
                    control={editControl}
                    defaultValue={serviceEdit.pending_amount}
                    rules={{
                      required: "Preço é obrigatório",
                      validate: (value) => {
                        const numValue = parseFloat(value);
                        if (isNaN(numValue) || numValue <= 0) {
                          return "Digite um valor válido maior que zero";
                        }
                        return true;
                      },
                    }}
                    render={({
                      field: { onChange, value, name },
                      fieldState: { error },
                    }) => (
                      <CurrencyInput
                        id="input-price"
                        name={name}
                        placeholder="R$ 0,00"
                        decimalsLimit={2}
                        decimalScale={2}
                        decimalSeparator=","
                        groupSeparator="."
                        prefix="R$ "
                        onValueChange={(val) => onChange(val)}
                        value={value}
                        className={`${style.modalInput} ${
                          error ? "error" : ""
                        }`}
                      />
                    )}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Descrição"
                  className={style.modalInput}
                  {...editRegister("description", {
                    required: "Descrição do serviço é obrigatória",
                  })}
                  defaultValue={serviceEdit.description}
                />
                <div className={style.modalRow}>
                  <input
                    type="text"
                    placeholder="Cliente"
                    className={style.modalInput}
                    {...editRegister("clientName", {
                      required: "Nome do cliente é obrigatório",
                    })}
                    defaultValue={serviceEdit.name_customer}
                  />
                  <input
                    type="text"
                    placeholder="Contato Cliente"
                    className={style.modalInput}
                    {...editRegister("clientContact", {
                      required: "Contato do cliente é obrigatório",
                    })}
                    defaultValue={serviceEdit.number_customer}
                  />
                </div>
                <div className={style.modalRow}>
                  <select
                    className={style.modalInput1}
                    {...editRegister("status", {
                      required: "Status é obrigatório",
                    })}
                    defaultValue={serviceEdit.status}
                  >
                    <option value="">Selecione o Status</option>
                    <option value="agendado">Agendado</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluido">Concluído</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                  <input
                    type="date"
                    className={style.modalInput}
                    {...editRegister("date", {
                      required: "Data é obrigatória",
                    })}
                    defaultValue={serviceEdit.date}
                  />
                </div>
              </div>
              {/* <ErrorMessage condition={editErrors} message={editErrors} /> */}
              <div className={style.modalButton}>
                <button type="submit">Editar</button>
                <button
                  className={style.buttonDelete}
                  type="button"
                  onClick={() => deleteService(serviceEdit.id)}
                >
                  Excluir <Trash />
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
