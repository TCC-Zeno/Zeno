import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";
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
import { AiOutlineClear } from "react-icons/ai";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";

export default function Finance() {
  const userId = useSelector((state) => state.userReducer.userData);
  const [dataFinance, setDataFinance] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(finance());
  }, [dispatch]);

  const {
    register: filterRegister,
    handleSubmit: handleFilterSubmit,
    watch,
    reset: filterReset,
  } = useForm();

  const {
    register: addRegister,
    handleSubmit: handleAddSubmit,
    control,
    reset: addReset,
    formState: { errors: addErrors },
  } = useForm({
    defaultValues: { price: 0 },
    mode: "onChange",
  });

  const {
    register: categoryRegister,
    handleSubmit: handleCategorySubmit,
    reset: categoryReset,
  } = useForm();

  const applyFilters = useCallback((data, filters) => {
    let filtered = [...data];

    // Filtro por data
    if (filters.date) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.created_at).toISOString().split("T")[0];
        return itemDate === filters.date;
      });
    }

    if (
      filters.paymentMethod &&
      filters.paymentMethod !== "Método de pagamento"
    ) {
      filtered = filtered.filter(
        (item) => item.payment_method === filters.paymentMethod
      );
    }

    if (filters.category && filters.category !== "Categorias") {
      filtered = filtered.filter((item) => item.category === filters.category);
    }

    if (filters.flow && filters.flow !== "Tipo de fluxo") {
      filtered = filtered.filter((item) => item.type_flow === filters.flow);
    }

    return filtered;
  }, []);

  const watchedFilters = watch();

  const filterData = useCallback(
    debounce((filters, data) => {
      if (data.length > 0) {
        const cleanFilters = {};
        Object.keys(filters).forEach((key) => {
          if (
            filters[key] &&
            filters[key] !== "Método de pagamento" &&
            filters[key] !== "Categorias" &&
            filters[key] !== "Tipo de fluxo" &&
            filters[key] !== ""
          ) {
            cleanFilters[key] = filters[key];
          }
        });

        setActiveFilters(cleanFilters);
        const filtered = applyFilters(data, cleanFilters);
        setFilteredData(filtered);
      }
    }, 300),
    [applyFilters]
  );

  useEffect(() => {
    filterData(watchedFilters, dataFinance);
    return () => filterData.cancel();
  }, [watchedFilters, dataFinance, filterData]);

  const onFilterSubmit = async (data) => {
    console.log("Filtros aplicados:", data);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setFilteredData(dataFinance);
    filterReset();
  };

  const onAddSubmit = async (data) => {
    const priceDot = data.price?.toString().replace(",", ".");
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

      if (response.status === 200) {
        addReset();
        fetchData();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro ao adicionar finança";
      console.error("Erro ao adicionar finança:", errorMessage);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/finance/financeId`,
        {
          uuid: userId.uuid,
        }
      );

      setDataFinance(data.data);
      if (Object.keys(activeFilters).length > 0) {
        const filtered = applyFilters(data.data, activeFilters);
        setFilteredData(filtered);
      } else {
        setFilteredData(data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, [userId?.uuid, activeFilters, applyFilters]);

  useEffect(() => {
    fetchData();
  }, [userId.uuid, fetchData]);

  const onCategorySubmit = async (data) => {
    console.log(userId.uuid)
     try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/finance/addFinanceCategoria`,
        {
          userId: userId.uuid,
          category: data.categoryName,
        }
      );
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro ao adicionar finança";
      console.error("Erro ao adicionar finança:", errorMessage);
    }
    console.log(data);
  };

  async function ReadCategory(){
     try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/finance/financeCategoria`,
        {
          uuid: userId.uuid,
        }
      );
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro ao ler categoria";
      console.error("Erro ao ler categoria:", errorMessage);
    }
  };
  useEffect(() => {
    ReadCategory();
  }, [userId.uuid]);
  const displayData = filteredData;

  const amountValue = displayData
    .filter((item) => item.type_flow === "Entrada")
    .reduce((acc, curr) => acc + parseFloat(curr.value), 0);

  const expensesValue = displayData
    .filter((item) => item.type_flow === "Saída")
    .reduce((acc, curr) => acc + parseFloat(curr.value), 0);

  const profitValue = amountValue - expensesValue;

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
                R$ {amountValue.toFixed(2)}
              </h2>
            </div>
            <div className={style.views}>
              <div className={style.titleIcon}>
                <p>Saídas do mês</p>
                <FaArrowTrendDown className={style.down} />
              </div>
              <h2 className={style.number2} id="expenses-value">
                R$ {expensesValue.toFixed(2)}
              </h2>
            </div>
            <div className={style.views}>
              <div className={style.titleIcon}>
                <p>Saldo do mês</p>
                {profitValue < 0 ? (
                  <FaArrowTrendDown className={style.down} />
                ) : (
                  <FaArrowTrendUp className={style.top} />
                )}
              </div>
              <h2
                className={
                  profitValue < 0 ? style.number3Negative : style.number3
                }
                id="profit-value"
              >
                R$ {profitValue.toFixed(2)}
              </h2>
            </div>
          </div>
          <div className={style.line}></div>

          <form
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
              <option value="">Método de pagamento</option>
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
              <option value="">Categorias</option>
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
              <option value="">Tipo de fluxo</option>
              <option value="Entrada">Entrada</option>
              <option value="Saída">Saída</option>
            </select>

            <div className={style.filterActions}>
              <button
                type="button"
                onClick={clearFilters}
                className={style.clearButton}
              >
                <AiOutlineClear />
              </button>
            </div>
          </form>

          {/* {Object.keys(activeFilters).length > 0 && (
            <div className={style.activeFilters}>
              <p>Filtros ativos: {Object.keys(activeFilters).length}</p>
              <p>
                Mostrando {displayData.length} de {dataFinance.length} registros
              </p>
            </div>
          )} */}
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
              {displayData.map((data) => (
                <tr className={style.conteudo} key={data.id}>
                  <td>{data.name}</td>
                  <td>R$ {data.value}</td>
                  <td>{data.payment_method}</td>
                  <td>{data.category}</td>
                  <td
                    className={
                      data.type_flow === "Entrada" ? style.entrada : style.saida
                    }
                  >
                    {data.type_flow}
                  </td>
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

          {displayData.length === 0 && dataFinance.length > 0 && (
            <div className={style.noResults}>
              <p>Nenhum resultado encontrado com os filtros aplicados.</p>
            </div>
          )}
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
                  {...addRegister("name", {
                    required: "O nome é obrigatório",
                    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
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
                      className={`${style.inputPrice} ${error ? "error" : ""}`}
                    />
                  )}
                />
                <input className={style.button} type="submit" />
              </div>
              <div className={style.row02}>
                <select
                  className={style.financeSelect}
                  id="payment-method-select"
                  {...addRegister("paymentMethod", {
                    required: "Método de pagamento é obrigatório",
                  })}
                >
                  <option value="" selected>
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
                  {...addRegister("category", {
                    required: "Categoria é obrigatória",
                  })}
                >
                  <option value="" selected>
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
                  {...addRegister("flow", {
                    required: "Tipo de fluxo é obrigatório",
                  })}
                >
                  <option value="" selected>
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
          <ErrorMessage
            condition={addErrors.name}
            message={addErrors.name?.message}
          />
          <ErrorMessage
            condition={addErrors.price}
            message={addErrors.price?.message}
          />
          <ErrorMessage
            condition={addErrors.paymentMethod}
            message={addErrors.paymentMethod?.message}
          />
          <ErrorMessage
            condition={addErrors.flow}
            message={addErrors.flow?.message}
          />
          <ErrorMessage
            condition={addErrors.category}
            message={addErrors.category?.message}
          />
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
            <PiFileArchiveFill />
            Gerar Relatório
          </button>
        </div>
      </DefaultLayout>
    </>
  );
}
