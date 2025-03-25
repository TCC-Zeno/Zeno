import { useDispatch } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { useEffect } from "react";
import { settings } from "../redux/Route/slice";
import S from "./../styles/settings.module.css";
import { useForm } from "react-hook-form";

export default function Settings() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(settings());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <DefaultLayout>
      <section className={S.sectionSettings}>
        <h1>Personalize seu sistema</h1>
        <div className={S.containerForm}>
          <form className={S.formSettings} onSubmit={handleSubmit(onSubmit)}>
            <input
              className={S.inputCompany}
              type="text"
              placeholder="Nome da empresa"
              {...register}
            />
            <input
              className={S.inputName}
              type="text"
              placeholder="Nome do dono da empresa"
              {...register}
            />
            <select className={S.selectColorBlindness}{...register("Select daltonismo")}>
              <option value="Padrão">Padrão</option>
              <option value="Protanopia">Protanopia</option>
              <option value="Deuteranopia">Deuteranopia</option>
              <option value="Tritanopia">Tritanopia</option>
              <option value="Achromatopsia">Achromatopsia</option>
            </select>

            <input type="submit" />
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
}
