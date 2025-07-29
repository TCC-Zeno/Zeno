import { useDispatch } from "react-redux";
import { useEffect } from "react";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { finance } from "../redux/Route/slice";
import style from "./../styles/finance.module.css";
import { useForm, Controller } from "react-hook-form";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import CurrencyInput from "react-currency-input-field";
import { PiFileArchiveFill } from "react-icons/pi";

export default function Finance() {
  const dataArray = [
    {
      id: 1,
      name: "Produto A",
      value: "R$ 100,00",
      method: "Cartão de crédito",
      category: "Compras",
      flow: "Entrada",
    },
    {
      id: 2,
      name: "Produto B",
      value: "R$ 200,00",
      method: "Dinheiro",
      category: "Contas",
      flow: "Saída",
    },
    {
      id: 3,
      name: "Produto C",
      value: "R$ 150,00",
      method: "Pix",
      category: "Manutenção",
      flow: "Entrada",
    },
    {
      id: 4,
      name: "Produto D",
      value: "R$ 300,00",
      method: "Cartão de débito",
      category: "Outros",
      flow: "Saída",
    },
    {
      id: 5,
      name: "Produto E",
      value: "R$ 250,00",
      method: "Cartão de crédito",
      category: "Compras",
      flow: "Entrada",
    },
    {
      id: 6,
      name: "Produto F",
      value: "R$ 400,00",
      method: "Dinheiro",
      category: "Contas",
      flow: "Saída",
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(finance());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <>
      <DefaultLayout>
        <div className={style.containerViewAndFilter}>
          <div className={style.containerView}>
            <div className={style.views}>
              <div className={style.titleIcon}>
                <p>Entradas do mês</p>
                <FaArrowTrendUp className={style.top} />
              </div>
              <h2 className={style.number} id="amount-value">
                $value
              </h2>
            </div>
            <div className={style.views}>
              <div className={style.titleIcon}>
                <p>Saídas do mês</p>
                <FaArrowTrendDown className={style.down} />
              </div>
              <h2 className={style.number2} id="expenses-value">
                $value
              </h2>
            </div>
            <div className={style.views}>
              <div className={style.titleIcon}>
                <p>Saldo do mês</p>
                <p className={style.icon}>Icon</p>
              </div>
              <h2 className={style.number3} id="profit-value">
                $value
              </h2>
            </div>
          </div>
          <div className={style.line}></div>
          <div className={style.row0}>
            <div className={style.date}>
              <div>
                <h1 className={style.titleDate}>Data:</h1>
              </div>
              <input
                className={style.inputDate}
                id="filter-date"
                type="date"
                {...register("date", { required: true })}
              />
            </div>
            <select
              className={style.financeSelect1}
              id="filter-payment-method"
              {...register("Payment method", { required: true })}
            >
              <option value="Método de pagamento" disabled selected>
                Método de pagamento
              </option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Pix">Pix</option>
              <option value="Outros">Outros</option>
            </select>
            <select
              className={style.financeSelect1}
              id="filter-category"
              name="category"
              {...register("category", { required: true })}
            >
              <option value="Categorias" disabled selected>
                Categorias
              </option>
              <option value="Compras">Compras</option>
              <option value="Contas">Contas</option>
              <option value="Manutenção">Manutenção</option>
              <option value="Outros">Outros</option>
            </select>
            <select
              className={style.financeSelect1}
              id="filter-type"
              {...register("flow", { required: true })}
            >
              <option value="Tipo de fluxo" disabled selected>
                Tipo de fluxo
              </option>
              <option value="Entrada">Entrada</option>
              <option value="Saída">Saída</option>
            </select>
          </div>
        </div>
        <div className={style.containerTable}>
          <table className={style.table}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th className={style.th}>Nome</th>
                <th className={style.th}>Valor(R$)</th>
                <th className={style.th}>Metodo de Pagamento</th>
                <th className={style.th}>Categoria</th>
                <th className={style.th}>Tipo de Fluxo</th>
                <th className={style.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Eu fiz uma map de um array só para ter como base, mas provavelmente os nomes irão mudar, mas isso o Backend decide */}
              {dataArray.map((data) => (
                <tr className={style.conteudo} key={data.id}>
                  <td>{data.name}</td>
                  <td>{data.value}</td>
                  <td>{data.method}</td>
                  <td>{data.category}</td>
                  <td className={style.tipoFluxo}>{data.flow}</td>
                  <td className={style.action}>
                    <button id="edit-button">
                      <FaEdit className={style.iconEdit} />
                    </button>
                    <button id="delete-button">
                      <MdDelete className={style.iconDelete} />
                    </button>
                  </td>
                </tr>
              ))}
              {/* Esse é o padrão que o Goias fez */}
              <tr className={style.conteudo}>
                <td>José Eduardo</td>
                <td>R$ 2000,00</td>
                <td>Cartão de Crédito</td>
                <td>asdadadedasda</td>
                <td className={style.tipoFluxo}>Entrada</td>
                <td className={style.action}>
                  <button>
                    <FaEdit className={style.iconEdit} />
                  </button>
                  <button>
                    <MdDelete className={style.iconDelete} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <section className={style.sectionDashboard}>
          <div className={style.financeTitle}>
            <h1>Adicionar</h1>
          </div>
          <div className={style.financeContainer}>
            <form
              className={style.financeForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={style.row01}>
                <input
                  className={style.inputName}
                  id="name-input"
                  type="text"
                  placeholder="Nome completo"
                  {...register("Full name", { required: true })}
                />
                <Controller
                  name="Price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, name } }) => (
                    <CurrencyInput
                      id="price-input"
                      name={name}
                      placeholder="R$ 0,00"
                      decimalsLimit={2}
                      decimalScale={2}
                      decimalSeparator=","
                      groupSeparator="."
                      prefix="R$ "
                      onValueChange={(value) => onChange(value)}
                      value={value === 0 ? "" : value}
                      className={style.inputPrice}
                    />
                  )}
                />

                <input className={style.button} type="submit" />
              </div>
              <div className={style.row02}>
                <select
                  className={style.financeSelect}
                  id="payment-method-select"
                  {...register("Payment method", { required: true })}
                >
                  <option value="Método de pagamento" disabled selected>
                    Método de pagamento
                  </option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Pix">Pix</option>
                  <option value="Outros">Outros</option>
                </select>
                <select
                  className={style.financeSelect}
                  id="category-select"
                  {...register("category", { required: true })}
                >
                  <option value="Categorias" disabled selected>
                    Categorias
                  </option>
                  <option value="Compras">Compras</option>
                  <option value="Contas">Contas</option>
                  <option value="Manutenção">Manutenção</option>
                  <option value="Outros">Outros</option>
                </select>
                <select
                  className={style.financeSelect}
                  id="flow-select"
                  {...register("flow", { required: true })}
                >
                  <option value="Tipo de fluxo" disabled selected>
                    Tipo de fluxo
                  </option>
                  <option value="Entrada">Entrada</option>
                  <option value="Saída">Saída</option>
                </select>
                <input
                  className={style.buttonM}
                  type="submit"
                  id="btn-submit"
                />
              </div>
            </form>
          </div>
        </section>
        <section className={style.sectionDashboard}>
          <div className={style.financeTitle}>
            <h1>Adicionar Categoria</h1>
          </div>
          <div className={style.financeContainer}>
            <form
              className={style.financeForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={style.row01}>
                <input
                  className={style.inputName}
                  type="text"
                  id="category-input"
                  placeholder="Nome da categoria"
                  {...register("Full name", { required: true })}
                />
                <input
                  className={style.button2}
                  type="submit"
                  id="btn-add-category"
                />
              </div>
            </form>
          </div>
        </section>
        <div className={style.btn}>
          <button className={style.btnReport} id="btn-report">
            {" "}
            <PiFileArchiveFill />
            Gerar Relatório
          </button>
        </div>
      </DefaultLayout>
    </>
  );
}
