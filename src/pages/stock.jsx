import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { stock } from "../redux/Route/slice";
import style from "./../styles/stock.module.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

export default function Stock() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(stock());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <>
      <DefaultLayout>
        <div className={style.title}>
          <h1>Estoque</h1>
        </div>
        <div className={style.containerFilter}>
          <input
            className={style.inputFilter}
            type="text"
            placeholder="Procurar Produto"
            {...register("Full name", { required: true })}
          />{" "}
          <button className={style.buttonFilter}>
            <HiMiniMagnifyingGlass
              className={style.icon}
              onSubmit={handleSubmit(onSubmit)}
            />
          </button>
        </div>
      </DefaultLayout>
    </>
  );
}
