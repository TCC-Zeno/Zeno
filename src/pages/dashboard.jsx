import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { dashboard } from "../redux/Route/slice";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import S from "../styles/dashboard.module.css";
import { Controller, useForm } from "react-hook-form";
import Modal from "../components/Modal/Modal";
import ResourceBlocked from "../components/ResourceBlocked/ResourceBlocked";
import CurrencyInput from "react-currency-input-field";
import Counter from "../components/Counter/Counter";

export default function Dashboard() {
  // Resumo de caixa
  const [selectedPeriod, setSelectedPeriod] = useState("daily");

  // Organizador diário
  const tasksToDo = [
    { id: 1, name: "Reunião com a equipe" },
    { id: 2, name: "Entregar projeto" },
    { id: 3, name: "Revisar documentos" },
    { id: 4, name: "Planejar próxima semana" },
    { id: 5, name: "Atualizar site" },
    { id: 6, name: "Responder e-mails" },
    { id: 7, name: "Organizar arquivos" },
    { id: 8, name: "Preparar apresentação" },
    { id: 9, name: "Analisar resultados" },
    { id: 10, name: "Fazer backup de dados" },
  ];
  const tasksProgress = [
    { id: 1, name: "Reunião com a equipe" },
    { id: 2, name: "Entregar projeto" },
    { id: 3, name: "Revisar documentos" },
    { id: 4, name: "Planejar próxima semana" },
    { id: 5, name: "Atualizar site" },
    { id: 6, name: "Responder e-mails" },
    { id: 7, name: "Organizar arquivos" },
    { id: 8, name: "Preparar apresentação" },
    { id: 9, name: "Analisar resultados" },
    { id: 10, name: "Fazer backup de dados" },
  ];
  const tasksDone = [
    { id: 1, name: "Reunião com a equipe" },
    { id: 2, name: "Entregar projeto" },
    { id: 3, name: "Revisar documentos" },
    { id: 4, name: "Planejar próxima semana" },
    { id: 5, name: "Atualizar site" },
    { id: 6, name: "Responder e-mails" },
    { id: 7, name: "Organizar arquivos" },
    { id: 8, name: "Preparar apresentação" },
    { id: 9, name: "Analisar resultados" },
    { id: 10, name: "Fazer backup de dados" },
  ];

  // Estoque
  const itensStock = [
    { id: 1, name: "Produto A" },
    { id: 2, name: "Produto B" },
    { id: 3, name: "Produto C" },
    { id: 4, name: "Produto D" },
    { id: 5, name: "Produto E" },
    { id: 6, name: "Produto F" },
    { id: 7, name: "Produto G" },
    { id: 8, name: "Produto H" },
    { id: 9, name: "Produto I" },
    { id: 10, name: "Produto J" },
  ];
  const itensRefill = [
    { id: 1, name: "Produto A" },
    { id: 2, name: "Produto B" },
    { id: 3, name: "Produto C" },
    { id: 4, name: "Produto D" },
    { id: 5, name: "Produto E" },
    { id: 6, name: "Produto F" },
    { id: 7, name: "Produto G" },
    { id: 8, name: "Produto H" },
    { id: 9, name: "Produto I" },
    { id: 10, name: "Produto J" },
  ];
  const itensBuy = [
    { id: 1, name: "Produto A" },
    { id: 2, name: "Produto B" },
    { id: 3, name: "Produto C" },
    { id: 4, name: "Produto D" },
    { id: 5, name: "Produto E" },
    { id: 6, name: "Produto F" },
    { id: 7, name: "Produto G" },
    { id: 8, name: "Produto H" },
    { id: 9, name: "Produto I" },
    { id: 10, name: "Produto J" },
  ];

  const [resourceToUnlock, setResourceToUnlock] = useState(null);
  const [protectedModalOpen, setProtectedModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const blockedResources = useSelector(
    (state) => state.userReducer.blockedResources
  );

  const [permissions, setPermissions] = useState({
    cash: blockedResources.cash,
    organizer: blockedResources.organizer,
    finance: blockedResources.finance,
    stock: blockedResources.stock,
    agenda: blockedResources.agenda,
    calendar: blockedResources.calendar,
    service: blockedResources.service,
  });

  useEffect(() => {
    dispatch(dashboard());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.Price) {
      const numericValue = data.Price.replace(",", ".");
      data.Price = parseFloat(numericValue);
    }
    console.log(data);
  };

  return (
    <>
      <DefaultLayout>
        {!permissions.cash && (
          <section className={`${S.sectionDashboard} ${S.sectionCash}`}>
            <div className={S.cashTitle}>
              <h1>Resumo de caixa</h1>
              <select
                className={S.cashSelectPeriod}
                name="cash-summary-period"
                id="cash-summary-period"
                defaultValue="daily"
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
                <p id="amount-value">R$ 1000</p>
              </div>
              <div className={S.cashProfit}>
                <h4>Lucro</h4>
                <p id="profit-value">R$ 1000</p>
              </div>
              <div className={S.cashExpenses}>
                <h4>Despesas</h4>
                <p id="expenses-value">R$ 1000</p>
              </div>
            </div>
          </section>
        )}
        {permissions.cash && (
          <ResourceBlocked
            title="Resumo de caixa"
            onUnlock={() => {
              setResourceToUnlock("cash");
              setProtectedModalOpen(true);
            }}
          />
        )}
        {!permissions.finance && (
          <section className={`${S.sectionDashboard} ${S.sectionFinance}`}>
            <div className={S.financeTitle}>
              <h1>Fluxo de caixa</h1>
            </div>
            <div className={S.financeContainer}>
              <form className={S.financeForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={S.row01}>
                  <input
                    id="input-name"
                    className={S.inputName}
                    type="text"
                    placeholder="Nome completo"
                    {...register("Full name", { required: true })}
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
                    id="input-payment-method"
                    className={S.financeSelect}
                    {...register("payment-method", { required: true })}
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
                    id="input-payment-category"
                    className={S.financeSelect}
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
                    id="input-payment-flow"
                    className={S.financeSelect}
                    {...register("flow", { required: true })}
                  >
                    <option value="Tipo de fluxo" disabled selected>
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
        {permissions.finance && (
          <ResourceBlocked
            title="Fluxo de caixa"
            onUnlock={() => {
              setResourceToUnlock("finance");
              setProtectedModalOpen(true);
            }}
          />
        )}
        {!permissions.organizer && (
          <section className={`${S.sectionDashboard} ${S.sectionOrganizer}`}>
            <div className={S.organizerTitle}>
              <h1>Organizador diário</h1>
            </div>
            <div className={S.organizerContainer}>
              <div className={S.organizerToDo}>
                <p>A fazer</p>
                <div>
                  <ul>
                    {tasksToDo.map((task) => (
                      <li key={task.id}>{task.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={S.organizerProgress}>
                <p>Em andamento</p>
                <div>
                  <ul>
                    {tasksProgress.map((task) => (
                      <li key={task.id}>{task.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={S.organizerDone}>
                <p>Concluído</p>
                <div>
                  <ul>
                    {tasksDone.map((task) => (
                      <li key={task.id}>{task.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
        {permissions.organizer && (
          <ResourceBlocked
            title="Organizador"
            onUnlock={() => {
              setResourceToUnlock("organizer");
              setProtectedModalOpen(true);
            }}
          />
        )}
        {!permissions.stock && (
          <section className={`${S.sectionDashboard} ${S.sectionStock}`}>
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
        {permissions.stock && (
          <ResourceBlocked
            title="Estoque"
            onUnlock={() => {
              setResourceToUnlock("stock");
              setProtectedModalOpen(true);
            }}
          />
        )}
        <Modal
          isOpen={protectedModalOpen}
          onClose={() => {
            setProtectedModalOpen(false);
            setResourceToUnlock(null);
            setPassword("");
            setPasswordError("");
          }}
        >
          <div className={S.passwordModal}>
            <h2>Desbloquear recurso</h2>
            <p>Digite sua senha para desbloquear este recurso.</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className={S.passwordInput}
            />
            {passwordError && <p className={S.errorText}>{passwordError}</p>}
            <div className={S.modalButtons}>
              <button
                className={S.cancelButton}
                onClick={() => {
                  setProtectedModalOpen(false);
                  setResourceToUnlock(null);
                  setPassword("");
                  setPasswordError("");
                }}
              >
                Cancelar
              </button>
              <button
                className={S.confirmButton}
                onClick={() => {
                  const correctPassword = "vinicius";
                  if (password === correctPassword) {
                    if (resourceToUnlock) {
                      setPermissions({
                        ...permissions,
                        [resourceToUnlock]: false,
                      });

                      setProtectedModalOpen(false);
                      setResourceToUnlock(null);
                      setPassword("");
                      setPasswordError("");
                    }
                  } else {
                    setPasswordError("Senha incorreta. Tente novamente.");
                  }
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </Modal>
      </DefaultLayout>
    </>
  );
}
