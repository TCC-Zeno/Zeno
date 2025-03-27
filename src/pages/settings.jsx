import { useDispatch } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Dropzone from "../components/Dropzone/Dropzone";
import { useEffect } from "react";
import { settings } from "../redux/Route/slice";
import S from "./../styles/settings.module.css";

export default function Settings() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(settings());
  }, [dispatch]);

  // enviar o dado assim que for escolhido, já que o usuario pode querer mudar só uma coisa . By Vinicius
  return (
    <DefaultLayout>
      <section className={S.sectionSettings}>
        <h1>Personalize seu sistema</h1>
        <div className={S.containerForm}>
          <div className={S.containerSettings}>
            <input
              className={S.inputCompany}
              type="text"
              placeholder="Nome da empresa"
            />
            <input
              className={S.inputName}
              type="text"
              placeholder="Nome do dono da empresa"
            />
            <div className={S.containerInternalForm}>
              <div className={S.containerForm}>
                <h2>Qual a cor para o site?</h2>
                <div className={S.containerColor}></div>
                <h2>Acessibilidade - Daltonismo</h2>
                <select className={S.selectColorBlindness}>
                  <option value="Padrão">Padrão</option>
                  <option value="Protanopia">Protanopia</option>
                  <option value="Deuteranopia">Deuteranopia</option>
                  <option value="Tritanopia">Tritanopia</option>
                  <option value="Achromatopsia">Achromatopsia</option>
                </select>
                <h2>Coloque a sua logo aqui</h2>
                <Dropzone />
                <h2>Funções</h2>
                <div className={S.toggleContainer}>
                  <div className={S.toggleRow}>
                    <div className={S.toggleWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.toggleLabel}>Estoque</span>
                    </div>
                    <div className={S.toggleWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.toggleLabel}>Agenda</span>
                    </div>
                  </div>
                  <div className={S.toggleRow}>
                    <div className={S.toggleWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.toggleLabel}>Fluxo de caixa</span>
                    </div>
                    <div className={S.toggleWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.toggleLabel}>Organizador</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
