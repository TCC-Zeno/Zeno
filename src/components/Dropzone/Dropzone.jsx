import React, { useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import S from "./dropzone.module.css";
import { useSelector } from "react-redux";


export default function Dropzone () {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const FILE_LIMIT = 25 * 1024 * 1024; // tamanho de imagem com maxio de 25MB
  const profileinfo = useSelector((state) => state.userReducer.userData);


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

  const handleReset = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  

  const  handleSubmit = async  (e) => {
    e.preventDefault();
    if (selectedFile) {
      if (selectedFile.size > FILE_LIMIT) {
        alert("Arquivo excede o tamanho máximo de 25MB");
        return;
      }
      alert("Este é apenas um demo, nenhum arquivo foi enviado.");
      console.log (selectedFile);
      // aqui envia pro BD a imagem
      const resposta = await axios.post (`${import.meta.env.VITE_API_URL}/user/logo`, {
       logo: selectedFile,
       uuid: profileinfo.uuid});

        setSelectedFile(resposta.data[0].logo)
    } else {
      alert("Nenhum arquivo selecionado");
    }
  };

  return (
    <form
      className={S.dropzoneBox}
      onReset={handleReset}
      onSubmit={handleSubmit}
    >
      <p>Clique para fazer upload ou arraste e solte</p>

      <div
        className={`${S.dropzoneArea} ${isDragOver ? S.dropzoneOver : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={S.fileUploadIcon}>
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
        <div className={S.fileInfo}>
          <p>
            {selectedFile
              ? `${selectedFile.name}, ${(selectedFile.size / 1024).toFixed(
                  2
                )} KB`
              : "Nenhum arquivo selecionado"}
          </p>
        </div>
      </div>

      <div className={S.dropzoneDescription}>
        <span>Tamanho máximo: 25MB</span>
        <span>JPEG, JPG e PNG</span>
      </div>

      <div className={S.dropzoneActions}>
        <div className={S.actionButtons}>
          <button type="reset">Cancelar</button>
          <button id="submitButton" type="submit">
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
};
