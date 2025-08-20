import { useDispatch } from "react-redux";
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

export default function Service() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(service());
  }, [dispatch]);

  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setModalOpen(false);
  };

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
                <h1 className={style.value1}>$value</h1>
              </div>
            </div>

            <div className={style.statusAndam}>
              <div className={style.titleAndam}>
                <h2 className={style.title}>Em Andamento</h2>
                <RiPlayLargeLine className={style.iconAndam} />
              </div>
              <div className={style.valueAndam}>
                <h1 className={style.value2}>$value</h1>
              </div>
            </div>

            <div className={style.statusConcl}>
              <div className={style.titleConcl}>
                <h2 className={style.title}>Concluídos</h2>
                <FaCheck className={style.iconConcl} />
              </div>
              <div className={style.valueConcl}>
                <h1 className={style.value3}>$value</h1>
              </div>
            </div>

            <div className={style.statusReceb}>
              <div className={style.titleReceb}>
                <h2 className={style.title}>Valor Recebido</h2>
                <MdAttachMoney className={style.iconReceb} />
              </div>
              <div className={style.valueReceb}>
                <h1 className={style.value4}>$value</h1>
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
                  <button className={style.button}>Todos</button>
                </div>
                <div>
                  <button className={style.button}>Em Andamento</button>
                </div>
                <div>
                  <button className={style.button}>Concluídos</button>
                </div>
                <div>
                  <button className={style.button}>Cancelados</button>
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
                  <tr className={style.conteudo}>
                    <td className={style.td}>Serviço 1</td>
                    <td className={style.td}>Cliente 1</td>
                    <td className={style.td}>01/01/2023</td>
                    <td className={style.statusAgendTable}>Agendado</td>
                    <td className={style.td}>R$ 100,00</td>
                  </tr>
                  <tr className={style.conteudo}>
                    <td className={style.td}>Serviço 1</td>
                    <td className={style.td}>Clienteokokokokokkokook</td>
                    <td className={style.td}>01/01/2023</td>
                    <td className={style.statusAndamTable}>Em Andamento</td>
                    <td className={style.td}>R$ 100,00</td>
                  </tr>
                  <tr className={style.conteudo}>
                    <td className={style.td}>Serviçookokkokokokokookoko</td>
                    <td className={style.td}>Cliente 1</td>
                    <td className={style.td}>01/01/2023</td>
                    <td className={style.statusConclTable}>Concluído</td>
                    <td className={style.td}>R$ 100,00</td>
                  </tr>
                  <tr className={style.conteudo}>
                    <td className={style.td}>Serviço 1</td>
                    <td className={style.td}>Cliente 1</td>
                    <td className={style.td}>01/01/2023</td>
                    <td className={style.statusCancelTable}>Cancelado</td>
                    <td className={style.td}>R$ 100000000000000,00</td>
                  </tr>
                  <tr className={style.conteudo}>
                    <td className={style.td}>Serviço 1</td>
                    <td className={style.td}>Cliente 1</td>
                    <td className={style.td}>01/01/2023</td>
                    <td className={style.statusAgendTable}>Agendado</td>
                    <td className={style.td}>R$ 100,00</td>
                  </tr>
                  <tr className={style.conteudo}>
                    <td className={style.td}>Serviço 1</td>
                    <td className={style.td}>Clienteokokokokokkokook</td>
                    <td className={style.td}>01/01/2023</td>
                    <td className={style.statusAndamTable}>Em Andamento</td>
                    <td className={style.td}>R$ 100,00</td>
                  </tr>
                  <tr className={style.conteudo}>
                    <td className={style.td}>Serviçookokkokokokokookoko</td>
                    <td className={style.td}>Cliente 1</td>
                    <td className={style.td}>01/01/2023</td>
                    <td className={style.statusConclTable}>Concluído</td>
                    <td className={style.td}>R$ 100,00</td>
                  </tr>
                  <tr className={style.conteudo}>
                    <td className={style.td}>Serviço 1</td>
                    <td className={style.td}>Cliente 1</td>
                    <td className={style.td}>01/01/2023</td>
                    <td className={style.statusCancelTable}>Cancelado</td>
                    <td className={style.td}>R$ 100000000000000,00</td>
                  </tr>
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
                      className={`${style.modalInput} ${error ? "error" : ""}`}
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
                    <option value="" >Selecione o Status</option>
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
    </>
  );
}
