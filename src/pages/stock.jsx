import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { stock } from "../redux/Route/slice";
import style from "./../styles/stock.module.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import coxinha from "./../assets/Coxinha.jpg";
import strogonoff from "./../assets/Strogonoff.jpg";
import prafotfeito from "./../assets/PratoFeito.jpg";
import feijoada from "./../assets/Feijoada.jpg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import Modal from "../components/Modal/Modal";
import ModalBig from "../components/ModalBig/ModalBig";
import { IoIosArrowRoundBack } from "react-icons/io";
import Dropzone from "../components/Dropzone/Dropzone";

export default function Stock() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(stock());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalBigOpen, setModalBigOpen] = useState(false);

  return (
    <>
      <DefaultLayout>
        <div className={style.containerFilter}>
          <input
            className={style.inputFilter}
            type="text"
            placeholder="Procurar Produto"
            {...register("Full name", { required: true })}
            id="input-filter"
          />{" "}
          <button className={style.buttonFilter} id="button-filter">
            <HiMiniMagnifyingGlass
              className={style.icon}
              onSubmit={handleSubmit(onSubmit)}
            />
          </button>
        </div>

        <div className={style.containerCards}>
          <div
            className={style.Cardadd}
            id="card-add"
            onClick={() => setModalBigOpen(true)}
          >
            <LuPlus className={style.add} />
            <div className={style.contentAdd}>
              <h1>Adicionar Produto</h1>
            </div>
          </div>
          <div
            className={style.Cards}
            id="card-view"
            onClick={() => setModalOpen(true)}
          >
            <div>
              <img className={style.images} src={coxinha} alt="coxinha" />
            </div>
            <div className={style.content}>
              <h1 className={style.titleCard}>Seila</h1>
              <p className={style.textCard}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                minima, libero obcaecati quae, vero omnis.
              </p>
            </div>
            <div className={style.actions}>
              <button className={style.button} id="button-back-counter">
                <IoIosArrowBack className={style.Arrowicon} />
              </button>
              <h1 className={style.counter} id="counter">
                000
              </h1>
              <button className={style.button} id="button-forward-counter">
                <IoIosArrowForward className={style.Arrowicon} />
              </button>
            </div>
          </div>
          <div className={style.Cards} id="card-view">
            <div>
              <img
                className={style.images}
                src={prafotfeito}
                alt="prato feito"
              />
            </div>
            <div className={style.content}>
              <h1 className={style.titleCard}>Lalalla</h1>
              <p className={style.textCard}>
                Error dignissimos veritatis voluptatibus veniam, quos, ratione
                accusantium iusto quas magnam tenetur consequatur.
              </p>
            </div>
            <div className={style.actions}>
              <button className={style.button} id="button-back-counter">
                <IoIosArrowBack className={style.Arrowicon} />
              </button>
              <h1 className={style.counter} id="counter">
                000
              </h1>
              <button className={style.button} id="button-forward-counter">
                <IoIosArrowForward className={style.Arrowicon} />
              </button>
            </div>
          </div>
          <div className={style.Cards} id="card-view">
            <div>
              <img className={style.images} src={strogonoff} alt="strogonoff" />
            </div>
            <div className={style.content}>
              <h1 className={style.titleCard}>Fafafaf</h1>
              <p className={style.textCard}>
                Quam placeat nisi sint facere quod blanditiis illum earum
                maiores, cumque sed possimus sit ab? Commodi, minima!
              </p>
            </div>
            <div className={style.actions}>
              <button className={style.button} id="button-back-counter">
                <IoIosArrowBack className={style.Arrowicon} />
              </button>
              <h1 className={style.counter} id="counter">
                000
              </h1>
              <button className={style.button} id="button-forward-counter">
                <IoIosArrowForward className={style.Arrowicon} />
              </button>
            </div>
          </div>
          <div className={style.Cards} id="card-view">
            <div>
              <img className={style.images} src={feijoada} alt="feijoada" />
            </div>
            <div className={style.content}>
              <h1 className={style.titleCard}>Dadadada</h1>
              <p className={style.textCard}>
                Nostrum tempore dignissimos assumenda possimus porro quam
                voluptatem blanditiis culpa atque officia aliquid rem.
              </p>
            </div>
            <div className={style.actions}>
              <button className={style.button} id="button-back-counter">
                <IoIosArrowBack className={style.Arrowicon} />
              </button>
              <h1 className={style.counter} id="counter">
                000
              </h1>
              <button className={style.button} id="button-forward-counter">
                <IoIosArrowForward className={style.Arrowicon} />
              </button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          stock={true}
        >
          <div className={style.modalContent}>
            <div className={style.modalLeft}>
              <div className={style.ModalInfos}>
                <h1>Informações do Produto</h1>
                <h3 className={style.ModalTitle}>
                  Produto:{" "}
                  <span className={style.ModalTxt}>Nome do Produto</span>
                </h3>
                <h3 className={style.ModalTitle}>
                  Quantidade: <span className={style.ModalTxt}>000</span>
                </h3>
                <h3 className={style.ModalTitle}>
                  Descrição:{" "}
                  <span className={style.ModalTxt}>
                    {" "}
                    Descrição do produto aqui.
                  </span>
                </h3>
              </div>
              <div className={style.line} />
              <div className={style.ModalForne}>
                <h1>Fornecedor</h1>
                <h3 className={style.ModalTitle}>
                  Nome:{" "}
                  <span className={style.ModalTxt}>Nome do Fornecedor</span>
                </h3>
                <h3 className={style.ModalTitle}>
                  <h3 className={style.ModalTitle}>
                    Endereço:{" "}
                    <span className={style.ModalTxt}> Rua Exemplo, 123</span>
                  </h3>
                  Telefone: <span className={style.ModalTxt}>0000-0000</span>
                </h3>
                <h3 className={style.ModalTitle}>
                  Email:{" "}
                  <span className={style.ModalTxt}>
                    {" "}
                    emailfornecedor@email.com{" "}
                  </span>
                </h3>
              </div>
              <div className={style.line} />
              <div classsName={style.ModalQuanti}>
                <h3 className={style.ModalTitle}>
                  Quantidade em Estoque:{" "}
                  <span className={style.ModalTxt}> 000 </span>
                </h3>
                <h3 className={style.ModalTitle}>
                  Quantidade minima para comprar:{" "}
                  <span className={style.ModalTxt}> 000 </span>
                </h3>
              </div>
            </div>
            <div className={style.modalRight}>
              <div className={style.modalImg}>
                <img
                  className={style.modalImages}
                  src={coxinha}
                  alt="coxinha"
                />
                <h3 className={style.ModalTitle}>
                  Alerta:{" "}
                  <span className={style.ModalTxt}>
                    Você esta sendo alertado
                  </span>
                </h3>
                <h3 className={style.ModalTitle}>
                  Categoria:{" "}
                  <span className={style.ModalTxt}>Categoria do Produto</span>
                </h3>
              </div>
              <div className={style.buttons}>
                <button className={style.buttonEdit}> Editar Produto</button>
                <button className={style.buttonDelete}> Deletar Produto</button>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={modalBigOpen}
          onClose={() => setModalBigOpen(false)}
          stock={true}
        >
          <div>
          <h1>Cadastrar Produto</h1>
          <input
            className={style.inputAdd}
            type="text"
            placeholder="Nome do produto"
            {...register("Full name", { required: true })}
          />
          <input
            className={style.inputAdd}
            type="text"
            placeholder="Quatidade Fixa"
            {...register("Full name", { required: true })}
          />
          <input
            className={style.inputAdd}
            type="text"
            placeholder="Descrição"
            {...register("Full name", { required: true })}
          />
          <input
            className={style.inputAdd}
            type="text"
            placeholder="Categoria"
            {...register("Full name", { required: true })}
          />
          </div>
          <div>
            <h1>Fornecedor</h1>
            <p>Opcional</p>
            <input
            className={style.inputAdd}
            type="text"
            placeholder="Nome do Fornecedor"
            {...register("Full name", { required: true })}
          />
          <input
            className={style.inputAdd}
            type="number"
            placeholder="Número do Fornecedor"
            {...register("Full name", { required: true })}
          />
          <input
            className={style.inputAdd}
            type="text"
            placeholder="Endereço"
            {...register("Full name", { required: true })}
          />
          <input
            className={style.inputAdd}
            type="text"
            placeholder="Email"
            {...register("Full name", { required: true })}
          />
          </div>
          <div>
          <Dropzone/>
          </div>

        </Modal>
      </DefaultLayout>
    </>
  );
}
