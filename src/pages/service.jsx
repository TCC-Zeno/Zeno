import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import style from "./../styles/service.module.css";
import { service } from "../redux/Route/slice";
import { LuClock7 } from "react-icons/lu";
import { RiPlayLargeLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

export default function Service() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(service());
  }, [dispatch]);

  return (
    <>
      <DefaultLayout>
        <div className={style.statusContainer}>
          <div className={style.statusAgend}>
            <div className={style.titleAgend}>
              <h2 className={style.title}>Agendados</h2>
              <LuClock7 className={style.iconAgend} />
            </div>
            <div className={style.valueAgend}>
              <h1 className={style.value1}>$value</h1>
            </div>
          </div>

          <div className={style.statusAndam}>
            <div className={style.titleAndam}>
              <h2 className={style.title}>Em Andamento</h2>
              <RiPlayLargeLine className={style.iconAndam} />
            </div>
            <div className={style.valueAndam}>
              <h1 className={style.value2}>$value</h1>
            </div>
          </div>

          <div className={style.statusConcl}>
            <div className={style.titleConcl}>
              <h2 className={style.title}>Concluídos</h2>
              <FaCheck className={style.iconConcl} />
            </div>
            <div className={style.valueConcl}>
              <h1 className={style.value3}>$value</h1>
            </div>
          </div>

          <div className={style.statusReceb}>
            <div className={style.titleReceb}>
              <h2 className={style.title}>Valor Recebido</h2>
              <MdAttachMoney className={style.iconReceb} />
            </div>
            <div className={style.valueReceb}>
              <h1 className={style.value4}>$value</h1>
            </div>
          </div>
        </div>
        <div className={style.linhaContainer}>
          <div className={style.linha}></div>
        </div>
        <div className={style.filterContainer}>
          <div className={style.buttonContainer}>
            <div>
              <button className={style.button}>Tudo</button>
            </div>
            <div>
              <button className={style.button}>Em Andamento</button>
            </div>
            <div>
              <button className={style.button}>Concluídos</button>
            </div>
            <div>
              <button className={style.button}>Cancelados</button>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
