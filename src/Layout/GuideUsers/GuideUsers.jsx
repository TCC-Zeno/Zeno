import { useState } from "react";
import Stepper, { Step } from "./../../components/Stepper/Stepper";
import { BsQuestionLg } from "react-icons/bs";
import S from "./guideUsers.module.css";
import Modal from "../../components/Modal/Modal";
import img from "./../../assets/fluxoCaixa.png";
import { useEffect } from "react";

export default function GuideUsers() {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = img;
    preloadImage.onload = () => setImageLoaded(true);
  }, []);
  return (
    <>
      <button className={S.guideButton} onClick={() => setModalOpen(true)}>
        <BsQuestionLg className={S.icon} />
      </button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} style={{ backgroundColor: "transparent", boxShadow: "none", color: "white" }}>
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => setModalOpen(false)}
          backButtonText="Voltar"
          nextButtonText="Continuar"
        >
          <Step>
            <h2>Welcome to the React Bits stepper!</h2>
            <p>Check out the next step!</p>
          </Step>
          <Step>
            <h2 className={S.titleStep}>Fluxo de caixa </h2>
            <img
              className={S.imgStep}
              style={{
                opacity: imageLoaded ? 1 : 0,
              }}
              src={img}
              alt="fluxo de caixa"
              loading="eager"
            />
            <p>Aqui você poderá ver seus lucros e gastos e blablabla</p>
          </Step>
          <Step>
            <h2>How about an input?</h2>
            <input
              type="text"
              placeholder="Type something..."
              className="w-full rounded-md border-2 border-gray-300 p-2"
            />
          </Step>
          <Step>
            <h2>Final Step</h2>
            <p>You made it!</p>
          </Step>
          <Step>
            <h2>Final Step</h2>
            <p>You made it!</p>
          </Step>
          <Step>
            <h2>Final Step</h2>
            <p>You made it!</p>
          </Step>
        </Stepper>
      </Modal>
    </>
  );
}
