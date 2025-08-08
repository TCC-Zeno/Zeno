import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { report } from "../redux/Route/slice";
import style from "./../styles/report.module.css";

export default function Report() {
  return (
    <>
      <DefaultLayout>
        <div className={style.container}>
          <h1>Relatório</h1>
        </div>
      </DefaultLayout>
    </>
  );
}
