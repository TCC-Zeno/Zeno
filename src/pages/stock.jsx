import { useDispatch } from "react-redux";
import { useEffect } from "react";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { stock } from "../redux/Route/slice";
import style from "./../styles/stock.module.css";

export default function Stock() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(stock());
  }, [dispatch]);
  return (
    <>
      <DefaultLayout>
        <div className={style.title}>
          <h1>Estoque</h1>
        </div>
      </DefaultLayout>
    </>
  );
}
