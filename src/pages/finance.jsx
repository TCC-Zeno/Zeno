import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
import axios from "axios";

export default function Finance() {
  const userId = useSelector((state) => state.userReducer.userData);
  const [dataFinance, setDataFinance] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(finance());
  }, [dispatch]);

  const { register: filterRegister, handleSubmit: handleFilterSubmit } =
    useForm();

  const {
    register: addRegister,
    handleSubmit: handleAddSubmit,
    control,
    reset: addReset,
  } = useForm({
    defaultValues: { price: 0 },
  });

  const {
    register: categoryRegister,
    handleSubmit: handleCategorySubmit,
    reset: categoryReset,
  } = useForm();

  const onFilterSubmit = async (data) => {
    console.log(data);
    // try {
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const onAddSubmit = async (data) => {
    const priceDot = data.price.replace(",", ".");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/finance/addFinanceForm`,
        {
          userId: userId.uuid,
          name: data.name,
          value: parseFloat(priceDot),
          category: data.category,
          payment_method: data.paymentMethod,
          type_flow: data.flow,
        }
      );
      console.log(response);
      addReset();
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/finance/financeId`,
        {
          uuid: userId.uuid,
        }
      );
      console.log(data.data);
      setDataFinance(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [userId.uuid]);

  const onCategorySubmit = async (data) => {
    console.log(data);

    // try {
    // } catch (error) {
    //   console.error(error);
    // }
  };

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
          <div
            className={style.row0}
            onSubmit={handleFilterSubmit(onFilterSubmit)}
          >
            <div className={style.date}>
              <div>
                <h1 className={style.titleDate}>Data:</h1>
              </div>
              <input
                className={style.inputDate}
                id="filter-date"
                type="date"
                {...filterRegister("date")}
              />
            </div>
            <select
              className={style.financeSelect1}
              id="filter-payment-method"
              {...filterRegister("paymentMethod")}
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
              {...filterRegister("category")}
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
              {...filterRegister("flow")}
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
              {dataFinance.map((data) => (
                <tr className={style.conteudo} key={data.id}>
                  <td>{data.name}</td>
                  <td>R$ {data.value}</td>
                  <td>{data.payment_method}</td>
                  <td>{data.category}</td>
                  <td className={data.type_flow === "Entrada" ? style.entrada : style.saida}>{data.type_flow}</td>
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
              onSubmit={handleAddSubmit(onAddSubmit)}
            >
              <div className={style.row01}>
                <input
                  className={style.inputName}
                  id="name-input"
                  type="text"
                  placeholder="Nome completo"
                  {...addRegister("name", { required: true })}
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
                      className={`${style.inputPrice} ${error ? "error" : ""}`}
                    />
                  )}
                />
                {/* <Controller
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
                      onValueChange={(value) => {
                        onChange(value || "");
                      }}
                      value={value}
                      className={`${style.inputPrice} ${error ? "error" : ""}`}
                    />
                  )}
                /> */}

                <input className={style.button} type="submit" />
              </div>
              <div className={style.row02}>
                <select
                  className={style.financeSelect}
                  id="payment-method-select"
                  {...addRegister("paymentMethod", { required: true })}
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
                  {...addRegister("category", { required: true })}
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
                  {...addRegister("flow", { required: true })}
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
              onSubmit={handleCategorySubmit(onCategorySubmit)}
            >
              <div className={style.row01}>
                <input
                  className={style.inputName}
                  type="text"
                  id="category-input"
                  placeholder="Nome da categoria"
                  {...categoryRegister("categoryName", { required: true })}
                />
                <input
                  className={style.button2}
                  type="submit"
                  id="btn-add-category"
                  value="Adicionar Categoria"
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
