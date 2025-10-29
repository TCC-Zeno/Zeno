import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
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
import Modal from "../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Finance() {
  const userId = useSelector((state) => state.userReducer.userData);
  const [dataFinance, setDataFinance] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    control: editControl,
    reset: editReset,
    formState: { errors: editErrors },
  } = useForm({
    mode: "onChange",
  });

  // Função para aplicar filtros
  const applyFilters = (data, filters) => {
    let filtered = [...data];

    if (filters.date) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.created_at).toISOString().split("T")[0];
        return itemDate === filters.date;
      });
    }

    if (filters.paymentMethod && filters.paymentMethod !== "") {
      filtered = filtered.filter(
        (item) => item.payment_method === filters.paymentMethod
      );
    }

    if (filters.category && filters.category !== "") {
      filtered = filtered.filter((item) => item.category === filters.category);
    }

    if (filters.flow && filters.flow !== "") {
      filtered = filtered.filter((item) => item.type_flow === filters.flow);
    }

    return filtered;
  };

  const watchedFilters = watch();

  const filteredData = useMemo(() => {
    if (dataFinance.length === 0) return [];

    const cleanFilters = {};
    Object.keys(watchedFilters).forEach((key) => {
      if (
        watchedFilters[key] &&
        watchedFilters[key] !== "" &&
        watchedFilters[key] !== "Método de pagamento" &&
        watchedFilters[key] !== "Categorias" &&
        watchedFilters[key] !== "Tipo de fluxo"
      ) {
        cleanFilters[key] = watchedFilters[key];
      }
    });

    return applyFilters(dataFinance, cleanFilters);
  }, [watchedFilters, dataFinance, applyFilters]);

  // Função inutil, só esta aqui pra não dar erro
  // const onFilterSubmit = async (data) => {
  //   console.log("Filtros aplicados:", data);
  // };

  // Limpa os filtros
  const clearFilters = () => {
    filterReset();
  };

  // Função para adicionar finanças
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

      if (response.status === 201) {
        addReset();
        fetchData();
        toast.success("Finança adicionada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao adicionar finança:", error);
      toast.error("Erro ao adicionar finança!");
    }
  };

  // Função para buscar dados do usuário
  async function fetchData() {
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/finance/financeId`,
        {
          uuid: userId.uuid,
        }
      );
      setDataFinance(data.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  // Função para adicionar categoria
  const onCategorySubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/finance/addFinanceCategoria`,
        {
          userId: userId.uuid,
          category: data.categoryName,
        }
      );
      if (response.status === 201) {
        categoryReset();
        await ReadCategory();
      }
    } catch (error) {
      console.error("Erro ao adicionar finança:", error);
      toast.error("Erro ao adicionar categoria!");
    }
  };

  // Função para ler categorias
  async function ReadCategory() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/finance/financeCategoria`,
        {
          uuid: userId.uuid,
        }
      );
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Erro ao ler categoria:", error);
      toast.error("Erro ao ler categoria!");
    }
  }

  // Função para editar item
  async function onEditSubmit(id, data) {
    const priceDot = data.price?.toString().replace(",", ".");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/finance/editFinanceForm`,
        {
          category: data.category,
          name: data.name,
          value: parseFloat(priceDot),
          payment_method: data.paymentMethod,
          type_flow: data.flow,
          uuid: userId.uuid,
          id: id,
        }
      );
      if (response.status === 200) {
        setCategoryData(response.data);
        editReset();
        setIsModalOpen(false);
        toast.success("Editado com sucesso!");
        fetchData();
      }
    } catch (error) {
      console.error("Erro ao editar item:", error);
      toast.error("Erro ao editar item!");
    }
  }

  // Função para deletar item
  async function financeDelete(id) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/finance/financeDelete`,
        {
          id: id,
        }
      );
      if (response.status === 200) {
        toast.success("Deletado com sucesso!");
        fetchData();
      }
    } catch (error) {
      console.error("Erro ao deletar item:", error);
      toast.error("Erro ao deletar item!");
    }
  }

  const amountValue = filteredData
    .filter((item) => item.type_flow === "Entrada")
    .reduce((acc, curr) => acc + parseFloat(curr.value), 0);

  const expensesValue = filteredData
    .filter((item) => item.type_flow === "Saída")
    .reduce((acc, curr) => acc + parseFloat(curr.value), 0);

  const profitValue = amountValue - expensesValue;

  // useEffect para buscar dados
  // useEffect(() => {
  //   fetchData();
  //   ReadCategory();
  // }, [userId.uuid]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchData();
        await ReadCategory();
      } catch (error) {
        console.error("Erro ao inicializar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      initializeData();
    }
  }, [userId.uuid]);

  // useEffect para preencher o modal de edição
  useEffect(() => {
    if (selectedItem && isModalOpen) {
      editReset({
        name: selectedItem.name,
        price: parseFloat(selectedItem.value),
        paymentMethod: selectedItem.payment_method,
        category: selectedItem.category,
        flow: selectedItem.type_flow,
      });
    }
  }, [selectedItem, isModalOpen, editReset]);

  return (
    <>
      <DefaultLayout loading={loading}>
        <div className={style.containerViewAndFilter}>
          <div className={style.containerView} id="container-view">
            <div className={style.views}>
              <div className={style.titleIcon}>
                <p>Entradas do mês</p>
                <FaArrowTrendUp className={style.top} />
              </div>
              <h2 className={style.number} id="amount-value">
                R${" "}
                <CurrencyInput
                  decimalSeparator=","
                  groupSeparator="."
                  value={amountValue.toFixed(2)}
                  className={style.currencyInput}
                />
              </h2>
            </div>
            <div className={style.views}>
              <div className={style.titleIcon}>
                <p>Saídas do mês</p>
                <FaArrowTrendDown className={style.down} />
              </div>
              <h2 className={style.number2} id="expenses-value">
                R${" "}
                <CurrencyInput
                  decimalSeparator=","
                  groupSeparator="."
                  value={expensesValue.toFixed(2)}
                  className={style.currencyInput}
                />
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
                R${" "}
                <CurrencyInput
                  decimalSeparator=","
                  groupSeparator="."
                  value={profitValue.toFixed(2)}
                  className={style.currencyInput}
                />
              </h2>
            </div>
          </div>
          <div className={style.line}></div>

          <form
            className={style.row0}
            onSubmit={handleFilterSubmit(onFilterSubmit)}
            id="input-filter"
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
              {CategoryData.map((category) => (
                <option key={category.id} value={category.categoria}>
                  {category.categoria}
                </option>
              ))}
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
                id="btn-filters-clear"
              >
                <AiOutlineClear />
              </button>
            </div>
          </form>
        </div>

        <div className={style.containerTable}>
          <table className={style.table} id="table">
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
              {filteredData.map((data) => (
                <tr className={style.conteudo} key={data.id}>
                  <td>{data.name}</td>
                  <td className={style.valueTable}>
                    R${" "}
                    <CurrencyInput
                      decimalSeparator=","
                      groupSeparator="."
                      value={data.value.toFixed(2)}
                      className={style.currencyInput}
                    />
                  </td>
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
                    <button
                      id="edit-button"
                      onClick={() => {
                        setSelectedItem(data);
                        setIsModalOpen(true);
                      }}
                    >
                      <FaEdit className={style.iconEdit} />
                    </button>
                    <button
                      id="delete-button"
                      onClick={() => financeDelete(data.id)}
                    >
                      <MdDelete className={style.iconDelete} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && dataFinance.length > 0 && (
            <div className={style.noResults}>
              <p>Nenhum resultado encontrado com os filtros aplicados.</p>
            </div>
          )}
        </div>

        <section className={style.sectionDashboard} id="container-add">
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
                  {CategoryData.map((category) => (
                    <option key={category.id} value={category.categoria}>
                      {category.categoria}
                    </option>
                  ))}
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

        <section className={style.sectionDashboard} id="section-category">
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
          <button
            className={style.btnReport}
            id="btn-report"
            onClick={() => navigate("/report")}
          >
            <PiFileArchiveFill />
            Gerar Relatório
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className={style.modalContent}>
            <h2>Editar item: {selectedItem?.name}</h2>
            <form
              className={style.financeForm}
              onSubmit={handleEditSubmit((data) =>
                onEditSubmit(selectedItem?.id, data)
              )}
            >
              <div className={style.inputGroup}>
                <input
                  className={style.inputName}
                  id="name-input"
                  type="text"
                  placeholder="Nome completo"
                  defaultValue={selectedItem?.name}
                  {...editRegister("name", {
                    required: "O nome é obrigatório",
                    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
                  })}
                />
                <Controller
                  name="price"
                  control={editControl}
                  defaultValue={selectedItem?.value}
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
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <CurrencyInput
                      id="edit-input-price"
                      placeholder="R$ 0,00"
                      decimalsLimit={2}
                      decimalScale={2}
                      decimalSeparator=","
                      groupSeparator="."
                      prefix="R$ "
                      defaultValue={selectedItem?.value}
                      onValueChange={(value) => onChange(value || "")}
                      value={value || ""}
                      className={`${style.inputPrice} ${error ? "error" : ""}`}
                    />
                  )}
                />
                <select
                  className={style.financeSelect}
                  id="payment-method-select"
                  {...editRegister("paymentMethod", {
                    required: "Método de pagamento é obrigatório",
                  })}
                  defaultValue={selectedItem?.payment_method}
                >
                  <option value="">Método de pagamento</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Pix">Pix</option>
                  <option value="Outros">Outros</option>
                </select>
                <select
                  className={style.financeSelect}
                  id="category-select"
                  {...editRegister("category", {
                    required: "Categoria é obrigatória",
                  })}
                  defaultValue={selectedItem?.category}
                >
                  <option value="">Categorias</option>
                  {CategoryData.map((category) => (
                    <option key={category.id} value={category.categoria}>
                      {category.categoria}
                    </option>
                  ))}
                  <option value="Compras">Compras</option>
                  <option value="Contas">Contas</option>
                  <option value="Manutenção">Manutenção</option>
                  <option value="Outros">Outros</option>
                </select>
                <select
                  className={style.financeSelect}
                  id="flow-select"
                  {...editRegister("flow", {
                    required: "Tipo de fluxo é obrigatório",
                  })}
                  defaultValue={selectedItem?.type_flow}
                >
                  <option value="">Tipo de fluxo</option>
                  <option value="Entrada">Entrada</option>
                  <option value="Saída">Saída</option>
                </select>
                <input className={style.button} type="submit" id="btn-submit" />
              </div>
            </form>
          </div>
        </Modal>
      </DefaultLayout>
    </>
  );
}
