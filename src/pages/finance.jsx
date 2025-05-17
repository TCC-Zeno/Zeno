import { useDispatch } from "react-redux";
import { useEffect } from "react";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { finance } from "../redux/Route/slice";
import style from "./../styles/finance.module.css";
import { useForm, Controller } from "react-hook-form";
// import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import CurrencyInput from "react-currency-input-field";
import { PiFileArchiveFill } from "react-icons/pi";

export default function Finance() {
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
        <div className={style.containerView}>
          <div className={style.views}>
            <div className={style.titleIcon}>
              <p>Entradas do mês</p>
              <FaArrowTrendUp className={style.top} />
            </div>
            <h2 className={style.number}>$value</h2>
          </div>
          <div className={style.views}>
            <div className={style.titleIcon}>
              <p>Saías do mês</p>
              <FaArrowTrendDown className={style.down} />
            </div>
            <h2 className={style.number2}>$value</h2>
          </div>
          <div className={style.views}>
            <div className={style.titleIcon}>
              <p>Saldo do mês</p>
              <p className={style.icon}>Icon</p>
            </div>
            <h2 className={style.number3}>$value</h2>
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
              type="date"
              {...register("date", { required: true })}
            />
          </div>
          <select
            className={style.financeSelect1}
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
            {...register("flow", { required: true })}
          >
            <option value="Tipo de fluxo" disabled selected>
              Tipo de fluxo
            </option>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>
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
              <tr className={style.conteudo}>
                <td>José Eduardo</td>
                <td>R$ 2000,00</td>
                <td>Cartãode Crédito</td>
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
                      defaultValue={0}
                      decimalsLimit={2}
                      decimalScale={2}
                      decimalSeparator=","
                      groupSeparator="."
                      prefix="R$ "
                      onValueChange={(value) => onChange(value)}
                      value={value}
                      className={style.inputPrice}
                    />
                  )}
                />
                <input className={style.button} type="submit" />
              </div>
              <div className={style.row02}>
                <select
                  className={style.financeSelect}
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
                  {...register("flow", { required: true })}
                >
                  <option value="Tipo de fluxo" disabled selected>
                    Tipo de fluxo
                  </option>
                  <option value="Entrada">Entrada</option>
                  <option value="Saída">Saída</option>
                </select>
                <input className={style.buttonM} type="submit" />
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
                  placeholder="Nome da categoria"
                  {...register("Full name", { required: true })}
                />
                <input className={style.button2} type="submit" />
              </div>
            </form>
          </div>
        </section>
        <div className={style.btn}>
          <button className={style.btnReport}>
            {" "}
            <PiFileArchiveFill />
            Gerar Relatório
          </button>
        </div>
      </DefaultLayout>
    </>
  );
}
