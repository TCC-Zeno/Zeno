import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

import S from "./ContributorsCardView.module.css";

export default function ContributorsCardView({
  id,
  name,
  email,
  features,
  onEdit,
}) {
  async function handleDelete(id) {
    // Função para deletar o colaborador
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/employee/delete`,
        {
          id: id,
        }
      );
    } catch (error) {
      console.error("Erro ao deletar colaborador:", error);
    }
  }
  return (
    <div key={id} className={S.containerContributors}>
      <div className={S.infoContributors}>
        <h2 className={S.nameContributors} name="name-contributors">
          {name}
        </h2>
        <p className={S.emailContributors} name="email-contributors">
          {email}
        </p>
      </div>
      <div className={S.buttonsContributors}>
        <button
          className={S.buttonEdit}
          id={`btn-edit-${id}`}
          onClick={() => onEdit({ id, name, email, features })}
        >
          <FaEdit />
        </button>
        <button
          className={S.buttonDelete}
          id={`btn-delete-${id}`}
          onClick={async () => {
            await handleDelete(id);
          }}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}
