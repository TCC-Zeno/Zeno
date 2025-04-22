import { useDispatch } from "react-redux";
import { useEffect } from "react";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { finance } from "../redux/Route/slice";
import style from "./../styles/finance.module.css";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

export default function Finance() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(finance());
  }, [dispatch]);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = (data) => console.log(data);
  // console.log(errors);
  // const [value, setValue] = useState(false);
  return (
    <>
      <DefaultLayout>
        <div className={style.line}></div>
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
        <div className={style.containerTable}>
          <table className={style.table}>
            <thead className={style.thead}>
              <tr className={style.tr}>
                <th>Nome</th>
                <th>Valor(R$)</th>
                <th>Metodo de Pagamento</th>
                <th>Categoria</th>
                <th>Tipo de Fluxo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>José Eduardo</td>
                <td>R$ 2000,00</td>
                <td>Cartãode Crédito</td>
                <td>Sei La</td>
                <td>Entrada</td>
                <td className={style.action}><FaArrowTrendDown/><FaArrowTrendUp/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h1 className={style.Add}>Adicionar</h1>
        <div className={style.containerAdd}>
          <input type="text" placeholder="Nome" className={style.inputNome} />
          <input
            type="text"
            placeholder="R$: Valor"
            className={style.inputValue}
          />
          <button type="submit" className={style.btnSubmit}>
            Enviar
          </button>
          <select name="metodoPagamento" id="MP" className={style.select2}>
            <option value="Cartão de Credito"> Cartão de Crédito</option>
            <option value="Cartão de Débito"> Cartão de Débito</option>
            <option value="Dinheiro"> Dinheiro</option>
            <option value="Pix"> Pix</option>
            <option value="Outros"> Outros</option>
          </select>
          <select name="Categorias" id="C" className={style.select2}>
            <option value="Compras">Compras</option>
            <option value="Contas">Contas</option>
            <option value="Manutenção">Manutenção</option>
            <option value="Outros">Outros</option>
          </select>
          <select name="TipoFluxo" id="TF" className={style.select2}>
            <option value="Entrada">Entrada</option>
            <option value="Saida">Saída</option>
          </select>
        </div>
        <button className={style.btnReport}>Gerar Relatório</button>
      </DefaultLayout>
    </>
  );
}
