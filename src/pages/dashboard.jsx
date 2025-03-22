import { useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import { Navbar } from "../components/Navbar/Navbar";
import style from "../styles/dashboard.module.css";
import { useEffect } from "react";
import { dashboard } from "../redux/Route/slice";
import { Footer } from "../components/Footer/Footer";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dashboard());
  }, [dispatch]);
  return (
    <>
      <div className={style.body}>
        <Navbar />
        <main className={style.dashboardPage}>
          <Header />
        </main>
        <footer className={style.footer}>
          <Footer />
        </footer>
      </div>
    </>
  );
}
