import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import Dropzone from "../components/Dropzone/Dropzone";
import { useEffect, useState } from "react";
import { settings } from "../redux/Route/slice";
import {
  setTheme,
  setColorBlindness,
  toggleBlockedResource,
  userData,
} from "../redux/User/slice";
import S from "./../styles/settings.module.css";
import { IoHelpCircleOutline } from "react-icons/io5";
import Modal from "../components/Modal/Modal";
import { RiKey2Line } from "react-icons/ri";
import axios from "axios";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const colorBlindness = useSelector(
    (state) => state.userReducer.colorBlindness
  );
  const theme = useSelector((state) => state.userReducer.theme);
  const blockedResources = useSelector(
    (state) => state.userReducer.blockedResources
  );
  const profileinfo = useSelector((state) => state.userReducer.userData);
  const dispatch = useDispatch();

  // Inicializar features com base nos dados do Redux
  const [features, setFeatures] = useState({
    service: profileinfo?.features?.service ?? true,
    stock: profileinfo?.features?.stock ?? true,
    finance: profileinfo?.features?.finance ?? true,
    calendar: profileinfo?.features?.calendar ?? true,
    task: profileinfo?.features?.task ?? true,
  });

  const handleFeatureChange = async (e) => {
    const { name, checked } = e.target;
    setFeatures((prev) => ({
      ...prev,
      [name]: checked,
    }));

    // Atualizar no banco de dados imediatamente
    const updatedFeatures = {
      ...features,
      [name]: checked,
    };

    try {
      await updateinfos({ features: updatedFeatures });
    } catch (error) {
      console.error("Erro ao atualizar features:", error);
    }
  };

  const [functionGuideOpen, setFunctionGuideOpen] = useState(false);
  const [blockGuideOpen, setBlockGuideOpen] = useState(false);

  const [companyName, setCompanyName] = useState(
    profileinfo.company_name ?? ""
  );
  const [ownerName, setOwnerName] = useState(profileinfo.owner_name ?? "");

  const handleColorSelect = async (color) => {
    dispatch(setTheme(color));
    await updateinfos({ color });
  };

  const handleColorBlindnessSelect = async (value) => {
    dispatch(setColorBlindness(value));
    await updateinfos({ accessibility: value });
  };

  const handleBlockResource = (resource, blocked) => {
    dispatch(toggleBlockedResource({ resource, blocked }));
  };

  // updateinfos agora aceita um objeto opcional para sobrescrever campos
  const updateinfos = async (override = {}) => {
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/update`,
        {
          uuid: profileinfo.uuid,
          companyName: companyName,
          ownerName: ownerName,
          color: override.color ?? theme,
          accessibility: override.accessibility ?? colorBlindness,
          features: override.features ?? features,
        }
      );

      const updatedUser = resposta.data[0];

      setCompanyName(updatedUser.company_name);
      setOwnerName(updatedUser.owner_name);

      // Atualiza todo o userData no Redux
      dispatch(userData(updatedUser));

      // Mantém a atualização individual também, caso seja necessário
      dispatch(setTheme(updatedUser.color));
      dispatch(setColorBlindness(updatedUser.accessibility));
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao atualizar informações");
    }
  };

  useEffect(() => {
    dispatch(settings());
  }, [dispatch]);

  // useEffect para atualizar features quando os dados do profileinfo mudarem
  useEffect(() => {
    if (profileinfo.uuid && profileinfo.features) {
      setFeatures({
        service: profileinfo.features.service ?? true,
        stock: profileinfo.features.stock ?? true,
        finance: profileinfo.features.finance ?? true,
        calendar: profileinfo.features.calendar ?? true,
        task: profileinfo.features.task ?? true,
      });
    }
  }, [profileinfo.features]);

  useEffect(() => {
    if (profileinfo.uuid) {
      if (profileinfo.color) {
        dispatch(setTheme(profileinfo.color));
      }
      if (profileinfo.accessibility) {
        dispatch(setColorBlindness(profileinfo.accessibility));
      }

      // Remover o updateinfos daqui para evitar chamadas desnecessárias
      // updateinfos();
    }
  }, [
    profileinfo.uuid,
    profileinfo.color,
    profileinfo.accessibility,
    dispatch,
  ]);

  useEffect(() => {
    console.log(features);
  }, [features]);

  useEffect(() => {
    if (profileinfo.uuid) {
      setLoading(false);
    }
  }, [profileinfo.uuid]);
  // enviar o dado assim que for escolhido, já que o usuario pode querer mudar só uma coisa . By Vinicius
  return (
    <DefaultLayout loading={loading}>
      <section className={S.sectionSettings}>
        <h1>Personalize seu sistema</h1>
        <div className={S.containerForm}>
          <div className={S.containerSettings}>
            <input
              id="companyname"
              className={S.inputCompany}
              type="text"
              placeholder="Nome da empresa"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onBlur={updateinfos}
            />
            <input
              id="ownername"
              className={S.inputName}
              type="text"
              placeholder="Nome do dono da empresa"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              onBlur={updateinfos}
            />
            <div className={S.containerInternalForm}>
              <div className={S.containerForm}>
                <h2>Altere a sua senha</h2>
                <div className={S.containerPassword}>
                  <button className={S.togglePassword}>
                    <RiKey2Line />
                    Alterar senha
                  </button>
                </div>
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
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="stock"
                        checked={features.stock}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.toggleLabel}>Estoque</span>
                    </div>
                    <div className={S.toggleWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="finance"
                        checked={features.finance}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.toggleLabel}>Fluxo de caixa</span>
                    </div>
                  </div>
                  <div className={S.toggleRow}>
                    <div className={S.toggleWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="calendar"
                        checked={features.calendar}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.toggleLabel}>Agenda</span>
                    </div>
                    <div className={S.toggleWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="task"
                        checked={features.task}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.toggleLabel}>Tarefas</span>
                    </div>
                  </div>
                  <div className={S.toggleRow}>
                    <div className={S.toggleWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="service"
                        checked={features.service}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.toggleLabel}>Serviços</span>
                    </div>
                  </div>
                </div>
                {/* Triste não usar isso */}
                {/* <h2>
                  Bloquear funções com senha
                  <button onClick={() => setBlockGuideOpen(true)}>
                    <IoHelpCircleOutline />
                  </button>
                </h2>
                <div className={S.buttonBlockOpen}>
                  <button onClick={() => setModalBlockResourcesOpen(true)}>
                    <TbLock />
                    Bloquear
                  </button>
                </div> */}
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
        {/* <Modal
          isOpen={modalBlockResourcesOpen}
          onClose={() => setModalBlockResourcesOpen(false)}
        >
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
            <div className={S.blockRow}>
              <div className={S.buttonBlockClose}>
                <button onClick={() => setModalBlockResourcesOpen(false)}>
                  Salvar e sair
                </button>
              </div>
            </div>
          </div>
        </Modal> */}
      </section>
    </DefaultLayout>
  );
}
