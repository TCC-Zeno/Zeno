import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Dropzone from "../components/Dropzone/Dropzone";
import { useEffect } from "react";
import { settings } from "../redux/Route/slice";
import { setTheme } from "../redux/User/slice";
import S from "./../styles/settings.module.css";

export default function Settings() {
  const theme = useSelector((state) => state.userReducer.theme);
  const dispatch = useDispatch();

  const handleColorSelect = (color) => {
    dispatch(setTheme(color));
  };

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
                <div className={S.colorContainer}>
                  <button
                    onClick={() => handleColorSelect("blue")}
                    className={`
          ${S.colorButton} 
          ${theme === "blue" ? S.selected : ""}
        `}
                  >
                    <span>Azul</span>
                    <div className={S.colorDivs}>
                      <div
                        style={{
                          backgroundColor: "rgb(23, 106, 244)",
                          borderRadius: "8px  0 0 8px",
                        }}
                      ></div>
                      <div
                        style={{ backgroundColor: "rgb(70, 135, 243)" }}
                      ></div>
                      <div
                        style={{
                          backgroundColor: "rgb(126,171,247)",
                          borderRadius: "0 8px   8px 0",
                        }}
                      ></div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleColorSelect("purple")}
                    className={`
          ${S.colorButton} 
          ${theme === "purple" ? S.selected : ""}
        `}
                  >
                    <span>Roxo</span>
                    <div className={S.colorDivs}>
                      <div
                        style={{
                          backgroundColor: "rgb(82 9 185)",
                          borderRadius: "8px  0 0 8px",
                        }}
                      ></div>
                      <div style={{ backgroundColor: "rgb(109 6 210)" }}></div>
                      <div
                        style={{
                          backgroundColor: "rgb(152, 80, 223)",
                          borderRadius: "0 8px   8px 0",
                        }}
                      ></div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleColorSelect("green")}
                    className={`
          ${S.colorButton} 
          ${theme === "green" ? S.selected : ""}
        `}
                  >
                    <span>Verde</span>
                    <div className={S.colorDivs}>
                      <div
                        style={{
                          backgroundColor: "rgb(68 156 80)",
                          borderRadius: "8px  0 0 8px",
                        }}
                      ></div>
                      <div style={{ backgroundColor: "rgb(96 186 108)" }}></div>
                      <div
                        style={{
                          backgroundColor: "rgb(124, 185, 132)",
                          borderRadius: "0 8px   8px 0",
                        }}
                      ></div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleColorSelect("red")}
                    className={`
          ${S.colorButton} 
          ${theme === "red" ? S.selected : ""}
        `}
                  >
                    <span>Vermelho</span>
                    <div className={S.colorDivs}>
                      <div
                        style={{
                          backgroundColor: "rgb(155 23 15)",
                          borderRadius: "8px  0 0 8px",
                        }}
                      ></div>
                      <div style={{ backgroundColor: "rgb(189 24 14)" }}></div>
                      <div
                        style={{
                          backgroundColor: "rgb(208, 93, 86)",
                          borderRadius: "0 8px   8px 0",
                        }}
                      ></div>
                    </div>
                  </button>
                </div>
                <h2>Acessibilidade - Daltonismo</h2>
                <select className={S.selectColorBlindness}>
                  <option value="Padrão" defaultChecked>Padrão</option>
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
