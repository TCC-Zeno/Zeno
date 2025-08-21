import { useSelector } from "react-redux";
import { Footer } from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import GuideUsers from "../GuideUsers/GuideUsers";
import S from "./../../styles/default.module.css";
import PuffLoader from "react-spinners/PuffLoader";
import ZenoGIF from "./../../assets/loadingZENO.gif"

export default function DefaultLayout({ children, loading }) {
  const rotaStatus = useSelector((state) => state.rotaReducer.rota);
  return (
    <>
      <div className={S.body}>
        <Navbar />
        <main className={S.main}>
          <Header />
          <div className={rotaStatus == "support" ? S.contentMax : S.content}>
            {loading ? (
              <div className={S.loading}>
                <img src={ZenoGIF} alt="Description of GIF" className={S.load}/>
              </div>
            ) : (
              children
            )}
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
