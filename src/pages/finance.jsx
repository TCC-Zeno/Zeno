import { useDispatch } from "react-redux";
import { useEffect } from "react";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { finance } from "../redux/Route/slice";
import style from "./../styles/finance.module.css";

export function Finance() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(finance());
  }, [dispatch]);

  return (
    <>
      <DefaultLayout>
        <h1 className={style.h1}>
          Aqui sera o fluxo de caixa do nosso sistema
        </h1>
      </DefaultLayout>
    </>
  );
}
