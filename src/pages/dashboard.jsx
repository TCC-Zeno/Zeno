import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { dashboard } from "../redux/Route/slice";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import S from "../styles/dashboard.module.css";
import { Controller, useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import axios from "axios";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("daily");
  const profileinfo = useSelector((state) => state.userReducer.userData);

  const [dataFinance, setDataFinance] = useState([]);
  const [dataStock, setDataStock] = useState([]);
  const [dataTasks, setDataTasks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dashboard());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    control,
    reset: addReset,
  } = useForm({
    defaultValues: { price: 0 },
    mode: "onChange",
  });

  async function fetchData() {
    if (!profileinfo?.uuid) return;
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/finance/financeId`,
        {
          uuid: profileinfo.uuid,
        }
      );
      setDataFinance(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  const onSubmit = async (data) => {
    const priceDot = data.price?.toString().replace(",", ".");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/finance/addFinanceForm`,
        {
          userId: profileinfo?.uuid,
          name: data.name,
          value: parseFloat(priceDot),
          category: data.category,
          payment_method: data.payment_method,
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

  async function fetchStock() {
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/readProduct`,
        {
          userId: profileinfo?.uuid,
        }
      );
      setDataStock(data.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }
  async function fetchTasks() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks/taskID`,
        {
          uuid: profileinfo?.uuid,
        }
      );
      setDataTasks(response.data);
    } catch (error) {
      toast.error("Erro ao buscar tarefas");
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  const amountValue = dataFinance
    .filter((item) => item.type_flow === "Entrada")
    .reduce((acc, curr) => acc + parseFloat(curr.value), 0);

  const expensesValue = dataFinance
    .filter((item) => item.type_flow === "Saída")
    .reduce((acc, curr) => acc + parseFloat(curr.value), 0);

  const profitValue = amountValue - expensesValue;

  // Validação e tratamento de erros para os filtros
  const itensStock = dataStock.filter((item) => item?.alert === "default");
  const itensRefill = dataStock.filter((item) => item?.alert === "low_stock");
  const itensBuy = dataStock.filter((item) => item?.alert === "restock");

  const tasksToDo = dataTasks.filter((item) => item?.status === "todo");
  const tasksProgress = dataTasks.filter((item) => item?.status === "doing");
  const tasksDone = dataTasks.filter((item) => item?.status === "done");

  useEffect(() => {
    async function initializeData() {
      setLoading(true);
      try {
        await fetchData();
        await fetchTasks();
        await fetchStock();
      } catch (error) {
        console.error("Erro ao inicializar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    if (profileinfo?.uuid) {
      initializeData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileinfo?.uuid]);

  return (
    <>
      <DefaultLayout loading={loading}>
        <div className={S.containerDashboard}>
          {profileinfo.features.finance && (
            <section
              className={`${S.sectionDashboard} ${S.sectionCash} sectionCash`}
              id="cash-summary-section"
            >
              <div className={S.cashTitle}>
                <h1>Resumo de caixa</h1>
                <select
                  className={S.cashSelectPeriod}
                  name="cash-summary-period"
                  id="cash-summary-period"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="daily">Diário</option>
                  <option value="monthly">Mensal</option>
                  <option value="annual">Anual</option>
                </select>
              </div>
              <div className={S.cashContainer}>
                <div className={S.cashAmount}>
                  <h4>Montante</h4>
                  <p id="amount-value">R$ {amountValue.toFixed(2)}</p>
                </div>
                <div className={S.cashProfit}>
                  <h4>Lucro</h4>
                  <p id="profit-value">R$ {profitValue.toFixed(2)}</p>
                </div>
                <div className={S.cashExpenses}>
                  <h4>Despesas</h4>
                  <p id="expenses-value">R$ {expensesValue.toFixed(2)}</p>
                </div>
              </div>
            </section>
          )}

          {profileinfo.features.finance && (
            <section
              className={`${S.sectionDashboard} ${S.sectionFinance} sectionFinance`}
              id="finance-flow-section"
            >
              <div className={S.financeTitle}>
                <h1>Fluxo de caixa</h1>
              </div>
              <div className={S.financeContainer}>
                <form
                  className={S.financeForm}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className={S.row01}>
                    <input
                      id="input-name"
                      className={S.inputName}
                      type="text"
                      placeholder="Nome completo"
                      {...register("name", { required: true })}
                    />
                    {/* oq está logo abaixo é o input de preço, usei uma lib que tem mais info aqui https://github.com/cchanxzy/react-currency-input-field. By Vinicius */}
                    <Controller
                      name="price"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value, name } }) => (
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
                          className={S.inputPrice}
                        />
                      )}
                    />

                    <input
                      id="btn-submit-finance"
                      className={S.button}
                      type="submit"
                    />
                  </div>
                  <div className={S.row02}>
                    <select
                      id="input-payment_method"
                      className={S.financeSelect}
                      {...register("payment_method", { required: true })}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Método de pagamento
                      </option>
                      <option value="Cartão de crédito">
                        Cartão de crédito
                      </option>
                      <option value="Cartão de débito">Cartão de débito</option>
                      <option value="Dinheiro">Dinheiro</option>
                      <option value="Pix">Pix</option>
                      <option value="Outros">Outros</option>
                    </select>
                    <select
                      id="input-payment-category"
                      className={S.financeSelect}
                      {...register("category", { required: true })}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Categorias
                      </option>
                      <option value="Compras">Compras</option>
                      <option value="Contas">Contas</option>
                      <option value="Manutenção">Manutenção</option>
                      <option value="Outros">Outros</option>
                    </select>
                    <select
                      id="input-payment-flow"
                      className={S.financeSelect}
                      {...register("flow", { required: true })}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Tipo de fluxo
                      </option>
                      <option value="Entrada">Entrada</option>
                      <option value="Saída">Saída</option>
                    </select>
                    {/* Fiz uma gambiarra pra deixar responsivo, então tem o botão pra desktop e pra mobile */}
                    <input
                      id="btn-submit-finance-mobile"
                      className={S.buttonM}
                      type="submit"
                    />
                  </div>
                </form>
              </div>
            </section>
          )}

          {profileinfo.features.task && (
            <section
              className={`${S.sectionDashboard} ${S.sectionOrganizer} sectionOrganizer`}
              id="daily-organizer-section"
            >
              <div className={S.organizerTitle}>
                <h1>Organizador diário</h1>
              </div>
              <div className={S.organizerContainer}>
                <div className={S.organizerToDo}>
                  <p>A fazer</p>
                  <div>
                    <ul>
                      {tasksToDo.map((task) => (
                        <li key={task.id}>{task.information}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={S.organizerProgress}>
                  <p>Em andamento</p>
                  <div>
                    <ul>
                      {tasksProgress.map((task) => (
                        <li key={task.id}>{task.information}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={S.organizerDone}>
                  <p>Concluído</p>
                  <div>
                    <ul>
                      {tasksDone.map((task) => (
                        <li key={task.id}>{task.information}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {profileinfo.features.stock && (
            <section
              className={`${S.sectionDashboard} ${S.sectionStock} sectionStock`}
              id="stock-control-section"
            >
              <div className={S.stockTitle}>
                <h1>Estoque</h1>
              </div>
              <div className={S.stockContainer}>
                <div className={S.stockInStock}>
                  <p>Em estoque</p>
                  <div>
                    <ul>
                      {itensStock.map((task) => (
                        <li key={task.id}>{task.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={S.stockRefill}>
                  <p>Para repor</p>
                  <div>
                    <ul>
                      {itensRefill.map((task) => (
                        <li key={task.id}>{task.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={S.stockBuy}>
                  <p>Para comprar</p>
                  <div>
                    <ul>
                      {itensBuy.map((task) => (
                        <li key={task.id}>{task.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </DefaultLayout>
    </>
  );
}
