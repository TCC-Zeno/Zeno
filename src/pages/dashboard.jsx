import { useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import { Navbar } from "../components/Navbar/Navbar";
import { useEffect } from "react";
import { dashboard } from "../redux/Route/slice";
import { Footer } from "../components/Footer/Footer";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import S from "../styles/dashboard.module.css";
import { useForm } from "react-hook-form";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dashboard());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <>
      <DefaultLayout>
        <section className={`${S.sectionDashboard} ${S.sectionCash}`}>
          <div className={S.cashTitle}>
            <h1>Resumo de caixa</h1>
            <select
              className={S.cashSelectPeriod}
              name="cashSummaryPeriod"
              id="cashSummaryPeriod"
            >
              <option value="daily">Diário</option>
              <option value="monthly">Mensal</option>
              <option value="annual">Anual</option>
            </select>
          </div>
          <div className={S.cashContainer}>
            <div className={S.cashAmount}>
              <h4>Montante</h4>
              <p>R$ 1000</p>
            </div>
            <div className={S.cashProfit}>
              <h4>Lucro</h4>
              <p>R$ 1000</p>
            </div>
            <div className={S.cashExpenses}>
              <h4>Despesas</h4>
              <p>R$ 1000</p>
            </div>
          </div>
        </section>
        <section className={`${S.sectionDashboard} ${S.sectionOrganizer}`}>
          <div className={S.organizerTitle}>
            <h1>Organizador diário</h1>
          </div>
          <div className={S.organizerContainer}>
            <div className={S.organizerToDo}>
              <p>A fazer</p>
              <div>
                <ul>
                  <li>aaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                </ul>
              </div>
            </div>
            <div className={S.organizerProgress}>
              <p>Em andamento</p>
              <div>
                <ul>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                </ul>
              </div>
            </div>
            <div className={S.organizerDone}>
              <p>Concluído</p>
              <div>
                <ul>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                  <li>aaaaa</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className={`${S.sectionDashboard} ${S.sectionFinance}`}>
          <div className={S.financeTitle}>
            <h1>Fluxo de caixa</h1>
          </div>
          <div className={S.financeContainer}>
            <form className={S.financeForm} onSubmit={handleSubmit(onSubmit)}>
              <div className={S.row01}>
                <input
                  className={S.inputName}
                  type="text"
                  placeholder="Nome completo"
                  {...register("Full name", { required: true })}
                />
                <input
                  className={S.inputPrice}
                  type="number"
                  placeholder="Valor"
                  {...register("Price", { required: true })}
                />

                <input className={S.button} type="submit" />
              </div>
              <div className={S.row02}>
                <select
                  className={S.financeSelect}
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
                  className={S.financeSelect}
                  {...register("flow", { required: true })}
                >
                  <option value="Tipo de fluxo" disabled selected>
                    Tipo de fluxo
                  </option>
                  <option value="Entrada">Entrada</option>
                  <option value="Saída">Saída</option>
                </select>
              </div>
            </form>
          </div>
        </section>
      </DefaultLayout>
      {/* <div className={style.body}>
        <Navbar />
        <main className={style.dashboardPage}>
          <Header />
        </main>
        <footer className={style.footer}>
          <Footer />
        </footer>
      </div> */}
    </>
  );
}
