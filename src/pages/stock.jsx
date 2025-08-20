import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { stock } from "../redux/Route/slice";
import style from "./../styles/stock.module.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import coxinha from "./../assets/Coxinha.jpg";
import feijoada from "./../assets/Feijoada.jpg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import Modal from "../components/Modal/Modal";
import CurrencyInput from "react-currency-input-field";
import PhoneInput from "react-phone-number-input/input";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CardOfStock } from "../components/CardsOfStock/CardOfStock";

export default function Stock() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBigOpen, setModalBigOpen] = useState(false);
  const [addForn, setAddForn] = useState(false);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [minQuantity, setMinQuantity] = useState(0);
  const fileInputRef = useRef(null);
  const FILE_LIMIT = 25 * 1024 * 1024;
  const userId = useSelector((state) => state.userReducer.userData);
  const [dataStock, setDataStock] = useState([]);
  const [supplierData, setSupplierData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(stock());
  }, [dispatch]);
  const { register, handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      ProductName: "",
      FixedQuantity: "",
      Description: "",
      Category: "",
      Supplier: "",
      SupplierName: "",
      SupplierNumber: "",
      SupplierAddress: "",
      SupplierEmail: "",
      Price: "",
      Price1: "",
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > FILE_LIMIT) {
        alert("Arquivo excede o tamanho máximo de 25MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > FILE_LIMIT) {
        alert("Arquivo excede o tamanho máximo de 25MB");
        return;
      }
      fileInputRef.current.files = e.dataTransfer.files;
      setSelectedFile(file);
    }
  };

  const handleCounterChange = (setter, name, value) => {
    if (value >= 0) {
      setter(value);
      setValue(name, value);
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  const onSubmit = async (data) => {
    const addProductData = {
      ProductName: data.ProductName,
      FixedQuantity: data.FixedQuantity,
      Description: data.Description,
      Category: data.Category,
      Price: data.Price,
      Price1: data.Price1,
      StockQuantity: data.StockQuantity,
      MinQuantity: data.MinQuantity,
      Image: selectedFile,
      SupplierInfo: addForn
        ? {
            SupplierName: data.SupplierName,
            SupplierNumber: data.SupplierNumber,
            SupplierAddress: data.SupplierAddress,
            SupplierEmail: data.SupplierEmail,
          }
        : Number(data.Supplier),
    };

    console.log(addProductData);

    try {
      const formData = new FormData();
      formData.append("userId", userId.uuid);
      formData.append("ProductName", addProductData.ProductName);
      formData.append("Description", addProductData.Description);
      formData.append("Category", addProductData.Category);
      formData.append("Price", addProductData.Price);
      formData.append("Price1", addProductData.Price1);
      formData.append("StockQuantity", addProductData.StockQuantity);
      formData.append("MinQuantity", addProductData.MinQuantity);
      formData.append("FixedQuantity", addProductData.FixedQuantity);

      if (addForn) {
        formData.append(
          "SupplierName",
          addProductData.SupplierInfo.SupplierName
        );
        formData.append(
          "SupplierNumber",
          addProductData.SupplierInfo.SupplierNumber
        );
        formData.append(
          "SupplierAddress",
          addProductData.SupplierInfo.SupplierAddress
        );
        formData.append(
          "SupplierEmail",
          addProductData.SupplierInfo.SupplierEmail
        );
      } else {
        formData.append("SupplierInfo", addProductData.SupplierInfo);
      }

      if (addProductData.Image) {
        formData.append("image", addProductData.Image);
      } else {
        console.error("Imagem não selecionada");
        alert("Por favor, selecione uma imagem para o produto.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/createProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Produto criado com sucesso:", response.data);
        alert("Produto adicionado com sucesso!");
      }
    } catch (error) {
      console.error("Erro completo:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Erro ao adicionar produto";
      console.error("Erro ao adicionar produto:", errorMessage);

      alert(`Erro: ${errorMessage}`);
    }
  };

  //Le produto
  async function fetchData() {
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/readProduct`,
        {
          userId: userId.uuid,
        }
      );
      console.log(data);
      setDataStock(data.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  //le supplier
  async function readSupplier() {
    try {
      console.log("Lendo fornecedor com ID:", userId.uuid);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/readSupplier`,
        {
          uuid: userId.uuid,
        }
      );
      if (response.status === 200) {
        console.log("Dados do fornecedor:", response.data);
        setSupplierData(response.data);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro ao ler fornecedor";
      console.error("Erro ao ler fornecedor:", errorMessage);
    }
  }

  useEffect(() => {
    fetchData();
    readSupplier();
  }, []);

  return (
    <>
      <DefaultLayout>
        <div className={style.containerFilter}>
          <input
            className={style.inputFilter}
            type="text"
            placeholder="Procurar Produto"
            id="input-filter"
          />
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
          
          {dataStock.map((product) => (
            <CardOfStock key={product.id} product={product} />
          ))}
          
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
                  Nome: <span className={style.ModalTxt}>Nome do Fornecedor</span>
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
                <h3 className={style.ModalTitle}>
                  Preço: <span className={style.ModalTxt}>R$ 000 </span>
                </h3>
                <h3 className={style.ModalTitle}>
                  Lucro: <span className={style.ModalTxt}>R$ 000 </span>
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
                <button className={style.buttonEdit}> Editar </button>
                <button className={style.buttonDelete}> Excluir </button>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={modalBigOpen}
          onClose={() => setModalBigOpen(false)}
          stock={true}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.cadProd}>
              <div className={style.titleModal}>
                <h1>Cadastrar Produto</h1>
              </div>

              <div className={style.inputsCad}>
                <input
                  className={style.inputAdd}
                  type="text"
                  placeholder="Nome do produto"
                  {...register("ProductName", { required: true })}
                />
                <input
                  className={style.inputAdd}
                  type="number"
                  placeholder="Quantidade Fixa"
                  {...register("FixedQuantity", { required: true })}
                />
                <input
                  className={style.inputAdd}
                  type="text"
                  placeholder="Descrição"
                  {...register("Description", { required: true })}
                />
                <input
                  className={style.inputAdd}
                  type="text"
                  placeholder="Categoria"
                  {...register("Category", { required: true })}
                />
              </div>
            </div>

            <div className={style.cadForn}>
              <div className={style.containerFornTitle}>
                <div className={style.fornTitle}>
                  <h1>Fornecedor</h1>
                </div>
                <div className={style.fornOption}>
                  <p>opcional</p>
                </div>
              </div>
              <div className={style.selectForn}>
                <select
                  className={style.select}
                  {...register("Supplier")}
                  disabled={addForn}
                >
                  <option value="">Nenhum fornecedor</option>
                  {supplierData.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className={style.buttonAdd}
                  onClick={() => setAddForn(!addForn)}
                >
                  {addForn ? "Cancelar" : "Adicionar +"}
                </button>
              </div>

              {addForn && (
                <AnimatePresence>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className={style.inputsCad}
                  >
                    <input
                      className={style.inputAdd}
                      type="text"
                      placeholder="Nome do Fornecedor"
                      {...register("SupplierName", { required: true })}
                    />
                    <Controller
                      name="SupplierNumber"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <PhoneInput
                          {...field}
                          country="BR"
                          placeholder="Número do Fornecedor"
                          onChange={(value) => field.onChange(value)}
                          inputClass={style.inputAdd}
                        />
                      )}
                    />
                    <input
                      className={style.inputAdd}
                      type="text"
                      placeholder="Endereço"
                      {...register("SupplierAddress", { required: true })}
                    />
                    <input
                      className={style.inputAdd}
                      type="email"
                      placeholder="Email"
                      {...register("SupplierEmail", { required: true })}
                    />
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            <div className={style.drop}>
              {" "}
              <div className={style.dropzoneBox}>
                <p>Clique para fazer upload ou arraste e solte</p>

                <div
                  className={`${style.dropzoneArea} ${
                    isDragOver ? style.dropzoneOver : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className={style.fileUploadIcon}>
                    <AiOutlineCloudUpload />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    required
                    id="uploadFile"
                    name="uploadedFile"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className={style.fileInfo}>
                    <p>
                      {selectedFile
                        ? `${selectedFile.name}, ${(
                            selectedFile.size / 1024
                          ).toFixed(2)} KB`
                        : "Nenhum arquivo selecionado"}
                    </p>
                  </div>
                </div>

                <div className={style.dropzoneDescription}>
                  <span>Tamanho máximo: 25MB</span>
                  <span>JPEG, JPG e PNG</span>
                </div>

                <div className={style.dropzoneActions}>
                  {/* <div className={style.actionButtons}>
                    <button type="reset">Cancelar</button>
                    <button id="submitButton" type="submit">
                      Salvar
                    </button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className={style.custProd}>
              <h2>Custo do produto</h2>
              <Controller
                name="Price"
                control={control}
                rules={{
                  required: "Preço é obrigatório",
                  validate: (value) => {
                    const numValue = parseFloat(value);
                    if (isNaN(numValue) || numValue <= 0) {
                      return "Digite um valor válido maior que zero";
                    }
                    return true;
                  },
                }}
                render={({
                  field: { onChange, value, name },
                  fieldState: { error },
                }) => (
                  <CurrencyInput
                    name={name}
                    placeholder="R$ 0,00"
                    decimalsLimit={2}
                    decimalScale={2}
                    decimalSeparator=","
                    groupSeparator="."
                    prefix="R$ "
                    onValueChange={(value) => onChange(value)}
                    value={value === 0 ? "" : value}
                    className={`${style.inputPrice} ${error ? "error" : ""}`}
                  />
                )}
              />
              <h2>Preço final</h2>
              <Controller
                name="Price1"
                control={control}
                rules={{
                  required: "Preço é obrigatório",
                  validate: (value) => {
                    const numValue = parseFloat(value);
                    if (isNaN(numValue) || numValue <= 0) {
                      return "Digite um valor válido maior que zero";
                    }
                    return true;
                  },
                }}
                render={({
                  field: { onChange, value, name },
                  fieldState: { error },
                }) => (
                  <CurrencyInput
                    name={name}
                    placeholder="R$ 0,00"
                    decimalsLimit={2}
                    decimalScale={2}
                    decimalSeparator=","
                    groupSeparator="."
                    prefix="R$ "
                    onValueChange={(value) => onChange(value)}
                    value={value === 0 ? "" : value}
                    className={`${style.inputPrice} ${error ? "error" : ""}`}
                  />
                )}
              />
              <h2>Lucro</h2>
              <input
                type="text"
                disabled
                placeholder="R$ 0,00"
                className={style.inputPrice}
              />
            </div>

            {/* Estoque */}
            <div className={style.linha} />
            <div className={style.quantStock}>
              <div className={style.containerTitleQuant}>
                <div className={style.titleQuant}>
                  <h2>Quantidade em estoque</h2>
                </div>
                <div className={style.pQuant}>
                  <p>Informe o estoque da sua MEI</p>
                </div>
              </div>
              <div className={style.actions1}>
                <button
                  type="button"
                  className={style.button}
                  onClick={() =>
                    handleCounterChange(
                      setStockQuantity,
                      "StockQuantity",
                      stockQuantity - 1
                    )
                  }
                >
                  <IoIosArrowBack className={style.Arrowicon} />
                </button>
                <h1 className={style.counter}>{stockQuantity}</h1>
                <button
                  type="button"
                  className={style.button}
                  onClick={() =>
                    handleCounterChange(
                      setStockQuantity,
                      "StockQuantity",
                      stockQuantity + 1
                    )
                  }
                >
                  <IoIosArrowForward className={style.Arrowicon} />
                </button>
              </div>
            </div>

            <div className={style.linha} />
            <div className={style.quantStock}>
              <div className={style.containerTitleQuant}>
                <div className={style.titleQuant}>
                  <h2>Quantidade mínima para comprar mais</h2>
                </div>
                <div className={style.pQuant}>
                  <p>Ao chegar nessa quantidade deverá repor no estoque</p>
                </div>
              </div>
              <div className={style.actions1}>
                <button
                  type="button"
                  className={style.button}
                  onClick={() =>
                    handleCounterChange(
                      setMinQuantity,
                      "MinQuantity",
                      minQuantity - 1
                    )
                  }
                >
                  <IoIosArrowBack className={style.Arrowicon} />
                </button>
                <h1 className={style.counter}>{minQuantity}</h1>
                <button
                  type="button"
                  className={style.button}
                  onClick={() =>
                    handleCounterChange(
                      setMinQuantity,
                      "MinQuantity",
                      minQuantity + 1
                    )
                  }
                >
                  <IoIosArrowForward className={style.Arrowicon} />
                </button>
              </div>
            </div>

            {/* Botões */}
            <div className={style.buttonsCad}>
              <div className={style.buttonCad1}>
                <button className={style.buttonSalveCad} type="submit">
                  Salvar
                </button>
              </div>
              <div className={style.buttonCad1}>
                <button
                  type="button"
                  className={style.buttonDeleteCad}
                  onClick={() => {
                    reset();
                    setStockQuantity(0);
                    setMinQuantity(0);
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </DefaultLayout>
    </>
  );
}
