import { useState, useEffect, useCallback } from "react";
import Joyride, { STATUS, ACTIONS, EVENTS } from "react-joyride";
import { BsQuestionLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import S from "./guideUsers.module.css";
import Modal from "../../components/Modal/Modal";
import { dashboardSteps } from "./dashboardSteps.jsx";

export default function GuideUsers() {
  const rotaStatus = useSelector((state) => state.rotaReducer.rota);
  const [runTour, setRunTour] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [tourKey, setTourKey] = useState(0);

  const [hasSeenTour, setHasSeenTour] = useState(() => {
    return localStorage.getItem(`tour-seen-${rotaStatus}`) === "true";
  });

  const getStepsForCurrentRoute = useCallback(() => {
    switch (rotaStatus) {
      case "dashboard":
        return dashboardSteps;
      case "calendar":
        return [
          {
            target: "body",
            content: (
              <div>
                <h2>📅 Calendário</h2>
                <p>Gerencie seus compromissos e eventos aqui.</p>
              </div>
            ),
            placement: "center",
          },
        ];
      default:
        return [];
    }
  }, [rotaStatus]);

  const handleJoyrideCallback = useCallback(
    (data) => {
      const { status, type, index, action } = data;

      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        setRunTour(false);
        setTourIndex(0);

        localStorage.setItem(`tour-seen-${rotaStatus}`, "true");
        setHasSeenTour(true);
      } else if (type === EVENTS.STEP_AFTER) {
        setTourIndex(index + 1);
      }
    },
    [rotaStatus]
  );

  // Função para iniciar o tour
  const startTour = () => {
    setTourIndex(0);
    setRunTour(true);
    setTourKey((prev) => prev + 1);
  };

  // Auto start tour para novos usuários
  const [showIntroModal, setShowIntroModal] = useState(false);

  // useEffect(() => {
  //   const shouldAutoStart = !hasSeenTour && rotaStatus === "dashboard";
  //   if (shouldAutoStart) {
  //     const timer = setTimeout(() => {
  //       setShowIntroModal(true);
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [hasSeenTour, rotaStatus]);

  // Reset tour quando muda de rota
  useEffect(() => {
    setRunTour(false);
    setTourIndex(0);
  }, [rotaStatus]);

  return (
    <>
      {showIntroModal && (
        <Modal isOpen={true} onClose={() => setShowIntroModal(false)}>
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>Quer fazer um tour rápido para conhecer o sistema?</p>
            <button
              onClick={() => {
                setShowIntroModal(false);
                startTour();
              }}
              style={{
                marginTop: "25px",
                backgroundColor: "#3498db",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Iniciar Tour
            </button>
          </div>
        </Modal>
      )}

      <div className={S.guideContainer}>
        <button
          className={S.guideButton}
          onClick={startTour}
          title="Guia completo do sistema"
        >
          <BsQuestionLg className={S.icon} />
        </button>
      </div>

      <Joyride
        key={tourKey}
        steps={getStepsForCurrentRoute()}
        run={runTour}
        stepIndex={tourIndex}
        callback={handleJoyrideCallback}
        continuous
        showSkipButton
        scrollToFirstStep
        scrollDuration={300}
        disableOverlayClose
        disableScrollParentFix
        locale={{
          back: "Voltar",
          close: "Fechar",
          last: " Finalizar",
          next: "Próximo",
          skip: "Pular Tour",
          step: "Passo",
          of: "de",
        }}
        styles={{
          options: {
            primaryColor: "#3498db",
            backgroundColor: "#ffffff",
            textColor: "#2c3e50",
            width: 400,
            zIndex: 10000,
            arrowColor: "#ffffff",
          },
          tooltip: {
            borderRadius: "12px",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            fontSize: "14px",
            lineHeight: "1.6",
          },
          tooltipContainer: {
            textAlign: "left",
          },
          tooltipTitle: {
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "15px",
            color: "#2c3e50",
          },
          tooltipContent: {
            position: "relative",
          },
          buttonNext: {
            backgroundColor: "#3498db",
            borderRadius: "6px",
            color: "#ffffff",
            fontSize: "14px",
            padding: "10px 20px",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
          },
          buttonBack: {
            color: "#7f8c8d",
            fontSize: "14px",
            marginRight: "15px",
            background: "none",
            border: "none",
            cursor: "pointer",
          },
          buttonSkip: {
            color: "#95a5a6",
            fontSize: "12px",
            background: "none",
            border: "none",
            cursor: "pointer",
          },
          spotlight: {
            borderRadius: "8px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
          beacon: {
            inner: "#3498db",
            outer: "#3498db",
          },
        }}
        floaterProps={{
          disableAnimation: false,
          styles: {
            arrow: {
              length: 8,
              spread: 16,
            },
          },
        }}
        renderTooltipContent={({ step, content }) => {
          const total = getStepsForCurrentRoute().length;
          const current = tourIndex + 1;

          return (
            <div>
              <div style={{ marginBottom: 10 }}>
                <strong>{`Passo ${current} de ${total}`}</strong>
              </div>
              <div>{content}</div>
            </div>
          );
        }}
      />
    </>
  );
}
