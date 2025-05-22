import { useState } from "react";
import Stepper, { Step } from "./../../components/Stepper/Stepper";
import { BsQuestionLg } from "react-icons/bs";
import S from "./guideUsers.module.css";
import Modal from "../../components/Modal/Modal";

export default function GuideUsers() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button className={S.guideButton} onClick={() => setModalOpen(true)}>
        <BsQuestionLg className={S.icon} />
      </button>
      <button className={S.guideButton02} onClick={() => setModalOpen(true)}>
        <BsQuestionLg className={S.icon} />
      </button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Voltar"
          nextButtonText="Continuar"
        >
          <Step>
            <h2>Welcome to the React Bits stepper!</h2>
            <p>Check out the next step!</p>
          </Step>
          <Step>
            <h2>Step 2</h2>
            <img
              style={{
                height: "100px",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center -70px",
                borderRadius: "15px",
                marginTop: "1em",
              }}
              src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
            />
            <p>Custom step content!</p>
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
