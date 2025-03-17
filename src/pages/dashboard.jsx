import { Navbar } from "../components/Navbar/Navbar";
import styles from "../styles/dashboard.module.css";

export default function Dashboard() {
  return (
    <>
      <div className={styles.body}>
        <Navbar />
      </div>
    </>
  );
}
