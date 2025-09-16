import React, { useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import S from "./dropzone.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../redux/User/slice";

export default function Dropzone(id) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const FILE_LIMIT = 25 * 1024 * 1024; // tamanho de imagem com maxio de 25MB
  const profileinfo = useSelector((state) => state.userReducer.userData);
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      if (selectedFile.size > FILE_LIMIT) {
        alert("Arquivo excede o tamanho máximo de 25MB");
        return;
      }
      const formData = new FormData();
      formData.append("logo", selectedFile); 
      formData.append("uuid", profileinfo.uuid); 
   
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logo`, formData,
        {
          header:{
            "Content-Type": "multipart/form-data",
          },
        },
        
      );
     if (resposta.status === 200) {
  dispatch(userData({ ...profileinfo, logo: resposta.data.logo }));
}
console.log(profileinfo)
    } else {
      alert("Nenhum arquivo selecionado");
    }
  };

  return (
    <form
      className={S.dropzoneBox}
      onReset={handleReset}
      onSubmit={handleSubmit}
      id={id.id}
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
}
