import Logo from "./../../assets/logo/LogoZeno_LogoBrancoSFundo.png";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import S from "./header.module.css";
import { useSelector } from "react-redux";
import DropdownHeader from "./DropdownHeader";
import { NotificationContent, ProfileContent } from "./dropdownContents";

export default function Header() {
  const rotaStatus = useSelector((state) => state.rotaReducer.rota);
  return (
    <header className={`${S.header} ${
      ["dashboard", "finance", "stock", "agenda", "organizer", "calendar"].includes(rotaStatus) 
        ? null 
        : S.none
    }`}>
      <div
        className={`${S.containerLogo} ${
          rotaStatus === "dashboard" ? null : S.none
        }`}
      >
        <img src={Logo} alt="Logo Zeno" />
      </div>
      <div className={S.title}>
        <h1>Fluxo de caixa</h1>
      </div>
      <div className={S.containerIcons}>
        <DropdownHeader
          icon={<IoMdNotifications className={S.icon}  />}
          modalContent={<NotificationContent />}
        />

        <DropdownHeader
          icon={<CgProfile className={S.icon}  />}
          modalContent={<ProfileContent />}
        />
      </div>
    </header>
  );
}
