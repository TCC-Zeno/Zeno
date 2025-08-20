import { useEffect, useState } from "react";
import S from "./CardOfStock.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Modal from "../Modal/Modal";
import axios from "axios";

export function CardOfStock({ product }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [supplierData, setSupplierData] = useState(null);
  console.log(product);

  console.log("Dados do fornecedor:", supplierData);

  async function readSupplier() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/readSupplierWithID`,
        {
          id: product.supplierInfo,
        }
      );
      if (response.status === 200) {
        console.log("Dados do fornecedor:", response.data);
        setSupplierData(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do fornecedor:", error);
    }
  }

  useEffect(() => {
    if (product.supplierInfo) {
      readSupplier();
    }
  }, []);

  return (
    <>
      <div
        className={S.Cards}
        id="card-view"
        onClick={() => setModalOpen(true)}
      >
        <div>
          <img className={S.images} src={product.image} alt={product.name} />
        </div>
        <div className={S.content}>
          <h1 className={S.titleCard}>{product.name}</h1>
          <p className={S.textCard}>{product.description}</p>
        </div>
        <div className={S.actions}>
          <button className={S.button} id="button-back-counter">
            <IoIosArrowBack className={S.Arrowicon} />
          </button>
          <h1 className={S.counter} id="counter">
            {product.quantity}
          </h1>
          <button className={S.button} id="button-forward-counter">
            <IoIosArrowForward className={S.Arrowicon} />
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        stock={true}
      >
        <div className={S.modalContent}>
          <div className={S.modalLeft}>
            <div className={S.ModalInfos}>
              <h1>Informações do Produto</h1>
              <h3 className={S.ModalTitle}>
                Produto: <span className={S.ModalTxt}>{product.name}</span>
              </h3>
              <h3 className={S.ModalTitle}>
                Quantidade:{" "}
                <span className={S.ModalTxt}>{product.quantity}</span>
              </h3>
              <h3 className={S.ModalTitle}>
                Descrição:{" "}
                <span className={S.ModalTxt}> {product.description}</span>
              </h3>
            </div>
            <div className={S.line} />
            <div className={S.ModalForne}>
              <h1>Fornecedor</h1>
              <h3 className={S.ModalTitle}>
                Nome: <span className={S.ModalTxt}>{supplierData?.[0]?.name || "N/A"}</span>
              </h3>
              <h3 className={S.ModalTitle}>
                Endereço: <span className={S.ModalTxt}>{supplierData?.[0]?.Address || "N/A"}</span>
              </h3>
              Telefone: <span className={S.ModalTxt}>{supplierData?.[0]?.Number || "N/A"}</span>
              <h3 className={S.ModalTitle}>
                Email: <span className={S.ModalTxt}>{supplierData?.[0]?.email || "N/A"}</span>
              </h3>
            </div>
            <div className={S.line} />
            <div classsName={S.ModalQuanti}>
              <h3 className={S.ModalTitle}>
                Quantidade em Estoque: <span className={S.ModalTxt}> {product.quantity_of_product} </span>
              </h3>
              <h3 className={S.ModalTitle}>
                Quantidade minima para comprar:{" "}
                <span className={S.ModalTxt}> {product.minimum_quantity} </span>
              </h3>
              <h3 className={S.ModalTitle}>
                Preço: <span className={S.ModalTxt}>R$ {product.price} </span>
              </h3>
              <h3 className={S.ModalTitle}>
                Lucro: <span className={S.ModalTxt}>R$ {product.price2} </span>
              </h3>
            </div>
          </div>
          <div className={S.modalRight}>
            <div className={S.modalImg}>
              <img
                className={S.modalImages}
                src={product.image}
                alt="coxinha"
              />
              <h3 className={S.ModalTitle}>
                Alerta:{" "}
                <span className={S.ModalTxt}>{product.alert}</span>
              </h3>
              <h3 className={S.ModalTitle}>
                Categoria:{" "}
                <span className={S.ModalTxt}>{product.product_category}</span>
              </h3>
            </div>
            <div className={S.buttons}>
              <button className={S.buttonEdit}> Editar </button>
              <button className={S.buttonDelete}> Excluir </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
