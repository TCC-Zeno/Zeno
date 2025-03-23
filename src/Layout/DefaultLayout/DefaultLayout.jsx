import { Footer } from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import S from "./../../styles/default.module.css";

export default function DefaultLayout({ children }) {
  return (
    <>
      <div className={S.body}>
        <Navbar />
        <main className={S.main}>
          <Header />
          <div className={S.content}>{children}</div>
        </main>
        <footer className={S.footer}>
          <Footer />
        </footer>
      </div>
    </>
  );
}
