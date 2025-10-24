import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import S from "./ContributorsCardView.module.css";

export default function ContributorsCardView({
  id,
  name,
  email,
  features,
  onEdit,
  onDelete,
}) {
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
          onClick={() => onDelete(id)}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}
