import Logo from "./../../assets/logo/LogoZeno_LogoBrancoSFundo.png";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import S from "./header.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const [showNot, setShowNot] = useState(false);
  const ToggleNot = () => {
    setShowNot(true);
  };
  const rotaStatus = useSelector((state) => state.rotaReducer.rota);
  return (
    <header className={S.header}>
      <div
        className={`${S.containerLogo} ${
          rotaStatus === "dashboard" ? null : S.none
        }`}
      >
        <img src={Logo} alt="Logo Zeno" />
      </div>
      <div className={S.containerIcons}>
        <button className={S.buttonNot} onClick={ToggleNot}>
          <IoMdNotifications size="65%" />
        </button>
        <button className={S.buttonProfile} onClick={ToggleNot}>
          <CgProfile size="65%" />
        </button>
        {showNot == false ? null : null}
      </div>
    </header>
  );
}
