import { useState, useEffect, useCallback } from "react";
import Joyride, { STATUS, EVENTS } from "react-joyride";
import { BsQuestionLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import S from "./guideUsers.module.css";
import Modal from "../../components/Modal/Modal";
import { dashboardSteps } from "./dashboardSteps.jsx";
import { initSteps } from "./initSteps.jsx";
import { stockSteps } from "./stockSteps.jsx";
import { financeSteps } from "./financeSteps.jsx";
import { calendarSteps } from "./calendarSteps.jsx";
import { tasksSteps } from "./tasksSteps.jsx";
import { reportSteps } from "./reportSteps.jsx";
import { serviceSteps } from "./serviceSteps.jsx";
import { settingsSteps } from "./settingsSteps.jsx";

export default function GuideUsers() {
  const rotaStatus = useSelector((state) => state.rotaReducer.rota);

  const [runTour, setRunTour] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [tourKey, setTourKey] = useState(0);

  const [tourPhase, setTourPhase] = useState("dashboard");

  const AUTO_TOUR_KEY = "auto-tour-executed";
  const TOUR_SEEN_KEY = `tour-seen-${rotaStatus}`;

  const [hasSeenTour, setHasSeenTour] = useState(() => {
    return localStorage.getItem(TOUR_SEEN_KEY) === "true";
  });

  const [hasExecutedAutoTour, setHasExecutedAutoTour] = useState(() => {
    return localStorage.getItem(AUTO_TOUR_KEY) === "true";
  });

  const getStepsForCurrentRoute = useCallback(() => {
    switch (rotaStatus) {
      case "dashboard":
        if (tourPhase === "init") return initSteps;
        return dashboardSteps;
      case "stock":
        return stockSteps;
      case "finance":
        return financeSteps;
      case "calendar":
        return calendarSteps;
      case "task":
        return tasksSteps;
      case "report":
        return reportSteps;
      case "service":
        return serviceSteps;
      case "settings":
        return settingsSteps;
      default:
        return [];
    }
  }, [tourPhase, rotaStatus]);

  const handleJoyrideCallback = useCallback(
    (data) => {
      const { status, type, index } = data;

      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        if (tourPhase === "init" && rotaStatus === "dashboard") {
          setTourPhase("dashboard");
          setTourIndex(0);
          setTourKey((prev) => prev + 1);
          setRunTour(true);
          return;
        }

        setRunTour(false);
        setTourIndex(0);
        localStorage.setItem(TOUR_SEEN_KEY, "true");
        setHasSeenTour(true);

        if (rotaStatus === "dashboard" && !hasExecutedAutoTour) {
          localStorage.setItem(AUTO_TOUR_KEY, "true");
          setHasExecutedAutoTour(true);
        }
      } else if (type === EVENTS.STEP_AFTER) {
        setTourIndex(index + 1);
      }
    },
    [tourPhase, rotaStatus, hasExecutedAutoTour, TOUR_SEEN_KEY, AUTO_TOUR_KEY]
  );

  const startTour = (withIntro = false) => {
    const shouldUseIntro = withIntro && rotaStatus === "dashboard";
    setTourPhase(shouldUseIntro ? "init" : rotaStatus);
    setTourIndex(0);
    setRunTour(true);
    setTourKey((prev) => prev + 1);
  };

  const [showIntroModal, setShowIntroModal] = useState(false);

  useEffect(() => {
    const shouldAutoStart =
      !hasExecutedAutoTour && rotaStatus === "dashboard" && !hasSeenTour;

    if (shouldAutoStart) {
      const timer = setTimeout(() => {
        setShowIntroModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasExecutedAutoTour, rotaStatus, hasSeenTour]);

  useEffect(() => {
    setRunTour(false);
    setTourIndex(0);
    setTourPhase(rotaStatus);
  }, [rotaStatus]);

  const handleStartTourFromModal = () => {
    setShowIntroModal(false);
    localStorage.setItem(AUTO_TOUR_KEY, "true");
    setHasExecutedAutoTour(true);
    startTour(true);
  };

  const handleCloseModal = () => {
    setShowIntroModal(false);
    localStorage.setItem(AUTO_TOUR_KEY, "true");
    setHasExecutedAutoTour(true);
  };

  const hasStepsForCurrentRoute = getStepsForCurrentRoute().length > 0;

  return (
    <>
      {showIntroModal && rotaStatus === "dashboard" && (
        <Modal isOpen={true} onClose={handleCloseModal}>
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>Quer fazer um tour rápido para conhecer o sistema?</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
              <button
                onClick={handleStartTourFromModal}
                style={{
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
              <button
                onClick={handleCloseModal}
                style={{
                  backgroundColor: "#95a5a6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Não, obrigado
              </button>
            </div>
          </div>
        </Modal>
      )}

      {hasStepsForCurrentRoute && (
        <div className={S.guideContainer}>
          <button
            className={S.guideButton}
            onClick={() => startTour(false)}
            title={`Guia da página ${rotaStatus}`}
            aria-label={`Guia da página ${rotaStatus}`}
            id="guideButton"
          >
            <BsQuestionLg className={S.icon} />
          </button>
        </div>
      )}

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
            zIndex: 999999,
          },
        }}
      />
    </>
  );
}
