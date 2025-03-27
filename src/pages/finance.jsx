import { useDispatch } from "react-redux";
import { useEffect } from "react";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { finance } from "../redux/Route/slice";
import style from "./../styles/finance.module.css";

export default function Finance() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(finance());
  }, [dispatch]);

  return (
    <>
      <DefaultLayout>
        <header className={style.containerHeader}>
          <h1>Data:</h1>
          <div className={style.data}>
            <p>27/03/25</p>
          </div>
          <select name="metodoPagamento" id="MP" className={style.select}>
            <option value="Cartão de Credito"> Cartão de Crédito</option>
            <option value="Cartão de Débito"> Cartão de Débito</option>
            <option value="Dinheiro"> Dinheiro</option>
            <option value="Pix"> Pix</option>
            <option value="Outros"> Outros</option>
          </select>
          <select name="Categorias" id="C" className={style.select}>
            <option value="Compras">Compras</option>
            <option value="Contas">Contas</option>
            <option value="Manutenção">Manutenção</option>
            <option value="Outros">Outros</option>
          </select>
          <select name="TipoFluxo" id="TF" className={style.select}>
            <option value="Entrada">Entrada</option>
            <option value="Saida">Saída</option>
          </select>
        </header>
        <div className={style.containerView}>
          <div className={style.entrada}>
            <p>Entradas do mês</p>
            <p>Icon</p>
            <h2>Valor</h2>
          </div>
          <div className={style.saida}>
            <p>Saías do mês</p>
            <p>Icon</p>
            <h2>Valor</h2>
          </div>
          <div className={style.saldo}>
            <p>Saldo do mês</p>
            <p>Icon</p>
            <h2>Valor</h2>
          </div>
        </div>
        <div className={style.containerTabela}>
          <h1>Tabela do fluxo de caixa </h1>
        </div>
        <h1 className={style.Add}>Adicionar</h1>
        <div className={style.containerAdd}>
          <input type="text" placeholder="Nome" className={style.inputNome} />
          <input
            type="text"
            placeholder="R$: Valor"
            className={style.inputValor}
          />
          <button type="submit" className={style.btnEnviar}>
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
        <button className={style.btnRelatorio}>Gerar Relatório</button>
      </DefaultLayout>
    </>
  );
}
