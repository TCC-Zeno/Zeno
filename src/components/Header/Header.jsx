import Logo from "./../../assets/logo/LogoZeno_LogoBrancoSFundo.png";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdTune } from "react-icons/md";
import S from "./header.module.css";
import { useSelector } from "react-redux";
import DropdownHeader from "./DropdownHeader";
import { FilterContent, NotificationContent, ProfileContent } from "./dropdownContents";
import { BsQuestionLg } from "react-icons/bs";

export default function Header() {
  const rotaStatus = useSelector((state) => state.rotaReducer.rota);

  function getTitulo(rotaStatus) {
    switch (rotaStatus) {
      case "finance":
        return "Fluxo de Caixa";
      case "stock":
        return "Estoque";
      case "task":
        return "Tarefas";
      case "calendar":
        return "Agenda";
      case "support":
        return "Ajuda";
      default:
        return "";
    }
  }

  return (
    <header
      className={`${S.header} ${
        [
          "dashboard",
          "finance",
          "stock",
          "agenda",
          "task",
          "calendar",
          "support",
        ].includes(rotaStatus)
          ? null
          : S.none
      }`}
    >
      <div
        className={`${S.containerLogo} ${
          rotaStatus === "dashboard" ? null : S.none
        }`}
      >
        <img src={Logo} alt="Logo da sua empresa" />
      </div>

      <div
        className={`${S.title} ${rotaStatus === "dashboard" ? S.none : null}`}
      >
        <h1>{getTitulo(rotaStatus)}</h1>
      </div>

      <div className={S.containerIcons}>
        {rotaStatus === "stock" ? (
          <DropdownHeader
            id="btn-filters"
            icon={<MdTune className={S.icon} />}
            modalContent={<FilterContent />}
          />
        ) : null}

        <DropdownHeader
          id="btn-notifications"
          icon={<IoMdNotifications className={S.icon} />}
          modalContent={<NotificationContent />}
        />

        <DropdownHeader
          id="btn-settings"
          icon={<CgProfile className={S.icon} />}
          modalContent={<ProfileContent />}
        />
      </div>
    </header>
  );
}
