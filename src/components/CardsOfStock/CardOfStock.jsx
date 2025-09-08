import { useEffect, useState } from "react";
import S from "./CardOfStock.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Modal from "../Modal/Modal";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import noImage from "../../assets/imagemSemImagem.png";

export function CardOfStock({ product, fetchData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [supplierData, setSupplierData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { register, control, reset, handleSubmit } = useForm({
    defaultValues: {
      name: product.name || "",
      quantity_of_product: product.quantity_of_product || "",
      fixed_quantity: product.fixed_quantity || "",
      description: product.description || "",
      minimum_quantity: product.minimum_quantity || "",
      price: product.price || "",
      price1: product.price1 || "",
      alert: product.alert || "",
      product_category: product.product_category || "",
      image: product.image || "",
    },
  });

  const handleCancel = () => {
    reset({
      name: product.name || "",
      quantity_of_product: product.quantity_of_product || "",
      description: product.description || "",
      fixed_quantity: product.fixed_quantity || "",
      minimum_quantity: product.minimum_quantity || "",
      price: product.price || "",
      price1: product.price1 || "",
      alert: product.alert || "",
      product_category: product.product_category || "",
      image: product.image || "",
    });
    setIsEdit(false);
  };

  const handleSave = async (data) => {
    console.log("Dados editados:", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/updateProductById`,
        {
          id: product.id,
          data,
        }
      );
      console.log(response);
      if (response.status === 200) {
        fetchData();
        setIsEdit(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function readSupplier() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/readSupplierWithID`,
        { id: product.supplierInfo }
      );
      if (response.status === 200) {
        setSupplierData(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do fornecedor:", error);
    }
  }

  const updateQuantity = async (newQuantity) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/updateProductById`,
        {
          id: product.id,
          data: { quantity_of_product: newQuantity },
        }
      );

      if (response.status === 200) {
        fetchData();
      }
    } catch (err) {
      console.error("Erro ao atualizar quantidade:", err);
    }
  };

  const updateStatus = async () => {
    let newStatus = "default";

    if (product.quantity_of_product <= 0) {
      newStatus = "out_stock";
    } else if (product.quantity_of_product < product.minimum_quantity) {
      newStatus = "low_stock";
    } else if (product.quantity_of_product < product.fixed_quantity) {
      newStatus = "restock";
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/updateProductById`,
        {
          id: product.id,
          data: { alert: newStatus },
        }
      );

      if (response.status === 200) {
        fetchData();
      }
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  };

  async function handleDelete(id) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/deleteProductById`,
        {
          id,
        }
      );

      if (response.status === 200) {
        fetchData();
      }
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
    }
  }

  useEffect(() => {
    if (product.supplierInfo) {
      readSupplier();
    }
  }, []);

  useEffect(() => {
    updateStatus();
  }, [product.quantity_of_product]);

  return (
    <>
      <div
        className={S.Cards}
        id="card-view"
        onClick={() => setModalOpen(true)}
      >
        <div>
          <img
            className={S.images}
            src={product.image || noImage}
            alt={product.name}
          />
        </div>
        <div className={S.content}>
          <h1 className={S.titleCard}>{product.name}</h1>
          <p className={S.textCard}>{product.description}</p>
        </div>
        <div className={S.actions}>
          <button
            className={S.button}
            id="button-back-counter"
            onClick={(e) => {
              e.stopPropagation();
              if (product.quantity_of_product > 0) {
                updateQuantity(product.quantity_of_product - 1);
              }
            }}
          >
            <IoIosArrowBack className={S.Arrowicon} />
          </button>

          <h1 className={S.counter} id="counter">
            {product.quantity_of_product}
          </h1>

          <button
            className={S.button}
            id="button-forward-counter"
            onClick={(e) => {
              e.stopPropagation();
              updateQuantity(product.quantity_of_product + 1);
            }}
          >
            <IoIosArrowForward className={S.Arrowicon} />
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        stock={true}
      >
        {isEdit ? (
          <form className={S.modalContent} onSubmit={handleSubmit(handleSave)}>
            <div className={S.modalLeft}>
              <div className={S.ModalInfos}>
                <h1>Edite o Produto</h1>

                <h3 className={S.ModalTitle}>
                  Produto:
                  <input
                    name="name"
                    {...register("name")}
                    defaultValue={product.name}
                    className={S.editInput}
                  />
                </h3>

                <h3 className={S.ModalTitle}>
                  Quantidade:
                  <input
                    type="number"
                    name="quantity_of_product"
                    {...register("quantity_of_product")}
                    defaultValue={product.quantity_of_product}
                    className={S.editInput}
                  />
                </h3>

                <h3 className={S.ModalTitle}>
                  Descrição:
                  <input
                    name="description"
                    {...register("description")}
                    defaultValue={product.description}
                    className={S.editInput}
                  />
                </h3>
              </div>

              <div className={S.line} />

              <div className={S.ModalQuanti}>
                <h3 className={S.ModalTitle}>
                  Quantidade fixa em Estoque:
                  <input
                    type="number"
                    name="fixed_quantity"
                    {...register("fixed_quantity")}
                    defaultValue={product.fixed_quantity}
                    className={S.editInput}
                  />
                </h3>

                <h3 className={S.ModalTitle}>
                  Quantidade mínima:
                  <input
                    type="number"
                    name="minimum_quantity"
                    {...register("minimum_quantity")}
                    defaultValue={product.minimum_quantity}
                    className={S.editInput}
                  />
                </h3>

                <h3 className={S.ModalTitle}>
                  Custo:
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <CurrencyInput
                        {...field}
                        placeholder="R$ 0,00"
                        decimalsLimit={2}
                        decimalSeparator=","
                        groupSeparator="."
                        prefix="R$ "
                        onValueChange={(value) => field.onChange(value)}
                        className={S.inputPrice}
                      />
                    )}
                  />
                </h3>

                <h3 className={S.ModalTitle} style={{ display: "flex" }}>
                  Preço:
                  <Controller
                    name="price1"
                    control={control}
                    render={({ field }) => (
                      <CurrencyInput
                        {...field}
                        placeholder="R$ 0,00"
                        decimalsLimit={2}
                        decimalSeparator=","
                        groupSeparator="."
                        prefix="R$ "
                        onValueChange={(value) => field.onChange(value)}
                        className={S.inputPrice}
                      />
                    )}
                  />
                </h3>
              </div>
            </div>

            <div className={S.modalRight}>
              <div className={S.modalImg}>
                <img
                  className={S.modalImages}
                  src={product.image}
                  alt="produto"
                />
                <h3 className={S.ModalTitle}>
                  Alerta:
                  <input
                    name="alert"
                    {...register("alert")}
                    defaultValue={product.alert}
                    className={S.editInput}
                    disabled
                  />
                </h3>

                <h3 className={S.ModalTitle}>
                  Categoria:
                  <input
                    name="product_category"
                    {...register("product_category")}
                    defaultValue={product.product_category}
                    className={S.editInput}
                  />
                </h3>
              </div>

              <div className={S.buttons}>
                <button type="submit" className={S.buttonEdit}>
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={S.buttonDelete}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className={S.modalContent}>
            <div className={S.modalLeft}>
              <div className={S.ModalInfos}>
                <h1>Informações do Produto</h1>
                <h3 className={S.ModalTitle}>
                  Produto: <span className={S.ModalTxt}>{product.name}</span>
                </h3>
                <h3 className={S.ModalTitle}>
                  Quantidade:{" "}
                  <span className={S.ModalTxt}>
                    {product.quantity_of_product}
                  </span>
                </h3>
                <h3 className={S.ModalTitle}>
                  Descrição:{" "}
                  <span className={S.ModalTxt}>{product.description}</span>
                </h3>
              </div>

              {supplierData && (
                <>
                  <div className={S.line} />
                  <div className={S.ModalForne}>
                    <h1>Fornecedor</h1>
                    <h3 className={S.ModalTitle}>
                      Nome:{" "}
                      <span className={S.ModalTxt}>
                        {supplierData?.[0]?.name || "N/A"}
                      </span>
                    </h3>
                    <h3 className={S.ModalTitle}>
                      Endereço:{" "}
                      <span className={S.ModalTxt}>
                        {supplierData?.[0]?.Address || "N/A"}
                      </span>
                    </h3>
                    <h3 className={S.ModalTitle}>
                      Telefone:{" "}
                      <span className={S.ModalTxt}>
                        {supplierData?.[0]?.Number || "N/A"}
                      </span>
                    </h3>
                    <h3 className={S.ModalTitle}>
                      Email:{" "}
                      <span className={S.ModalTxt}>
                        {supplierData?.[0]?.email || "N/A"}
                      </span>
                    </h3>
                  </div>
                </>
              )}

              <div className={S.line} />

              <div className={S.ModalQuanti}>
                <h3 className={S.ModalTitle}>
                  Quantidade fixa em Estoque:{" "}
                  <span className={S.ModalTxt}>{product.fixed_quantity}</span>
                </h3>
                <h3 className={S.ModalTitle}>
                  Quantidade mínima para comprar:{" "}
                  <span className={S.ModalTxt}>{product.minimum_quantity}</span>
                </h3>
                <h3 className={S.ModalTitle}>
                  Custo: <span className={S.ModalTxt}>R$ {product.price}</span>
                </h3>
                <h3 className={S.ModalTitle}>
                  Preço: <span className={S.ModalTxt}>R$ {product.price1}</span>
                </h3>
                <h3 className={S.ModalTitle}>
                  Lucro:{" "}
                  <span className={S.ModalTxt}>
                    R$ {product.price1 - product.price}
                  </span>
                </h3>
              </div>
            </div>

            <div className={S.modalRight}>
              <div className={S.modalImg}>
                <img
                  className={S.modalImages}
                  src={product.image || noImage}
                  alt="produto"
                />
                <h3 className={S.ModalTitle}>
                  Alerta: <span className={S.ModalTxt}>{product.alert}</span>
                </h3>
                <h3 className={S.ModalTitle}>
                  Categoria:{" "}
                  <span className={S.ModalTxt}>{product.product_category}</span>
                </h3>
              </div>
              <div className={S.buttons}>
                <button
                  className={S.buttonEdit}
                  onClick={() => setIsEdit(true)}
                >
                  Editar
                </button>
                <button
                  className={S.buttonDelete}
                  onClick={() => setIsDelete(true)}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal isOpen={isDelete} onClose={() => setIsDelete(false)}>
        <div className={S.modalDelete}>
          <h1>Tem certeza que deseja excluir este produto?</h1>
          <div className={S.buttonsDelete}>
            <button
              className={S.buttonCancel}
              onClick={() => setIsDelete(false)}
            >
              Cancelar
            </button>
            <button
              className={S.buttonDelete}
              onClick={() => handleDelete(product.id)}
            >
              Excluir
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
