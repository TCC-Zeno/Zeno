import { useSelector } from "react-redux";
import { Footer } from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import GuideUsers from "../GuideUsers/GuideUsers";
import S from "./../../styles/default.module.css";

export default function DefaultLayout({ children }) {
  const rotaStatus = useSelector((state) => state.rotaReducer.rota);
  return (
    <>
      <div className={S.body}>
        <Navbar />
        <main className={S.main}>
          <Header />
          <div className={rotaStatus == "support" ? S.contentMax : S.content}>
            {children}
          </div>
        </main>
        <footer className={S.footer}>
          <Footer />
        </footer>
        <GuideUsers />
      </div>
    </>
  );
}
