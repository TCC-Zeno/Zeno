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
          <table>
            <thead className={style.tableTitle}>
              <tr className={style.tableSeiLa}>
                <th>Nome</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Tipo de Fluxo</th>
                <th>Categoria</th>
                <th>Método de Pagamento</th>
              </tr>
            </thead>
            <tbody className={style.tableBody}>
              <tr className={style.tableRow}>
                <td className={style.tableData}>Nome</td>
                <td className={style.tableData}>R$ 0,00</td>
                <td className={style.tableData}>00/00/0000</td>
                <td className={style.tableData}>Entrada/Saída</td>
                <td className={style.tableData}>Categoria</td>
                <td className={style.tableData}>Método de Pagamento</td>
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
