import { useSelector } from "react-redux";
import { Footer } from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import GuideUsers from "../GuideUsers/GuideUsers";
import S from "./../../styles/default.module.css";
import ZenoGIF from "./../../assets/loadingZENO.gif";
import { Slide, ToastContainer } from "react-toastify";

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
                <img
                  src={ZenoGIF}
                  alt="Description of GIF"
                  className={S.load}
                />
              </div>
            ) : (
              children
            )}
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
          />
        </main>
        <footer className={S.footer}>
          <Footer />
        </footer>
        <GuideUsers />
      </div>
    </>
  );
}
