import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Dropzone from "../components/Dropzone/Dropzone";
import { useEffect, useState } from "react";
import { settings } from "../redux/Route/slice";
import {
  setTheme,
  setColorBlindness,
  toggleBlockedResource,
} from "../redux/User/slice";
import S from "./../styles/settings.module.css";
import { IoHelpCircleOutline } from "react-icons/io5";
import Modal from "../components/Modal/Modal";

export default function Settings() {
  const [functionGuideOpen, setFunctionGuideOpen] = useState(false);
  const [blockGuideOpen, setBlockGuideOpen] = useState(false);

  const theme = useSelector((state) => state.userReducer.theme);
  const colorBlindness = useSelector(
    (state) => state.userReducer.colorBlindness
  );
  const blockedResources = useSelector(
    (state) => state.userReducer.blockedResources
  );
  const dispatch = useDispatch();

  const handleColorSelect = (color) => {
    dispatch(setTheme(color));
  };

  const handleColorBlindnessSelect = (value) => {
    dispatch(setColorBlindness(value));
  };

  const handleBlockResource = (resource, blocked) => {
    dispatch(toggleBlockedResource({ resource, blocked }));
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
                <select
                  className={S.selectColorBlindness}
                  value={colorBlindness}
                  onChange={(e) => handleColorBlindnessSelect(e.target.value)}
                >
                  <option value="Padrão">Padrão</option>
                  <option value="Protanopia">Protanopia</option>
                  <option value="Deuteranopia">Deuteranopia</option>
                  <option value="Tritanopia">Tritanopia</option>
                  <option value="Achromatopsia">Achromatopsia</option>
                </select>
                <h2>Coloque a sua logo aqui</h2>
                <Dropzone />
                <h2>
                  Funções
                  <button onClick={() => setFunctionGuideOpen(true)}>
                    <IoHelpCircleOutline />
                  </button>
                </h2>
                <div className={S.toggleContainer}>
                  <div className={S.toggleRow}>
                    <div className={S.toggleWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.toggleLabel}>Estoque</span>
                    </div>
                    <div className={S.toggleWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.toggleLabel}>Fluxo de caixa</span>
                    </div>
                  </div>
                  <div className={S.toggleRow}>
                    <div className={S.toggleWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.toggleLabel}>Agenda</span>
                    </div>
                    <div className={S.toggleWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.toggleLabel}>Organizador</span>
                    </div>
                  </div>
                  <div className={S.toggleRow}>
                    <div className={S.toggleWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.toggleLabel}>Serviços</span>
                    </div>
                  </div>
                </div>
                <h2>
                  Bloquear funções com senha
                  <button onClick={() => setBlockGuideOpen(true)}>
                    <IoHelpCircleOutline />
                  </button>
                </h2>
                <div className={S.blockContainer}>
                  <div className={S.blockRow}>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        checked={blockedResources.cash}
                        onChange={(e) =>
                          handleBlockResource("cash", e.target.checked)
                        }
                      />
                      <span className={S.blockLabel}>Resumo de caixa</span>
                    </div>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        checked={blockedResources.stock}
                        onChange={(e) =>
                          handleBlockResource("stock", e.target.checked)
                        }
                      />
                      <span className={S.blockLabel}>Estoque</span>
                    </div>
                  </div>
                  <div className={S.blockRow}>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        checked={blockedResources.finance}
                        onChange={(e) =>
                          handleBlockResource("finance", e.target.checked)
                        }
                      />
                      <span className={S.blockLabel}>Fluxo de caixa</span>
                    </div>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        checked={blockedResources.calendar}
                        onChange={(e) =>
                          handleBlockResource("calendar", e.target.checked)
                        }
                      />
                      <span className={S.blockLabel}>Agenda</span>
                    </div>
                  </div>
                  <div className={S.blockRow}>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        checked={blockedResources.organizer}
                        onChange={(e) =>
                          handleBlockResource("organizer", e.target.checked)
                        }
                      />
                      <span className={S.blockLabel}>Organizador</span>
                    </div>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        checked={blockedResources.service}
                        onChange={(e) =>
                          handleBlockResource("service", e.target.checked)
                        }
                      />
                      <span className={S.blockLabel}>Serviços</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={functionGuideOpen}
          onClose={() => setFunctionGuideOpen(false)}
        >
          Batata da função?
        </Modal>
        <Modal isOpen={blockGuideOpen} onClose={() => setBlockGuideOpen(false)}>
          Batata do block?
        </Modal>
      </section>
    </DefaultLayout>
  );
}
