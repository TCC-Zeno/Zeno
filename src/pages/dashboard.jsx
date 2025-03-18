import { useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import { Navbar } from "../components/Navbar/Navbar";
import styles from "../styles/dashboard.module.css";
import { useEffect } from "react";
import { dashboard } from "../redux/Route/slice";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dashboard());
  }, [dispatch]); 
  return (
    <>
      <div className={styles.body}>
        <Navbar />
        <main className={styles.dashboardPage}>
          <Header />
        </main>
      </div>
    </>
  );
}
