import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { stock } from "../redux/Route/slice";
import style from "./../styles/stock.module.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import coxinha from "./../assets/Coxinha.jpg";
import strogonoff from "./../assets/Strogonoff.jpg";
import prafotfeito from "./../assets/PratoFeito.jpg";
import feijoada from "./../assets/Feijoada.jpg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { LuPlus } from "react-icons/lu";

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

        <div className={style.containerCards}>
          <div className={style.Cardadd}>
            <LuPlus className={style.add}/>
            <div className={style.contentAdd}>
              <h1>
                Adicionar Produto
              </h1>
            </div>
          </div>
          <div className={style.Cards}>
            <div>
              <img className={style.images} src={coxinha} alt="coxinha" />
            </div>
            <div className={style.content}>
              <h1 className={style.titleCard}>Seila</h1>
              <p className={style.textCard}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi minima, libero obcaecati quae, vero omnis.</p>
            </div>
            <div className={style.actions}>
              <button className={style.button}><IoIosArrowBack className={style.Arrowicon}/></button>
              <h1 className={style.counter}>000</h1>
              <button className={style.button}><IoIosArrowForward className={style.Arrowicon}/></button>
            </div>
          </div>
          <div className={style.Cards}>
            <div>
              <img className={style.images} src={prafotfeito} alt="prato feito" />
            </div>
            <div className={style.content}>
              <h1 className={style.titleCard}>Lalalla</h1>
              <p className={style.textCard}>Error dignissimos veritatis voluptatibus veniam, quos, ratione accusantium iusto quas magnam tenetur consequatur.</p>
            </div>
            <div className={style.actions}>
              <button className={style.button}><IoIosArrowBack className={style.Arrowicon}/></button>
              <h1 className={style.counter}>000</h1>
              <button className={style.button}><IoIosArrowForward className={style.Arrowicon}/></button>
            </div>
          </div>
          <div className={style.Cards}>
            <div>
              <img className={style.images} src={strogonoff} alt="strogonoff" />
            </div>
            <div className={style.content}>
              <h1 className={style.titleCard}>Fafafaf</h1>
              <p className={style.textCard}>Quam placeat nisi sint facere quod blanditiis illum earum maiores, cumque sed possimus sit ab? Commodi, minima!</p>
            </div>
            <div className={style.actions}>
              <button className={style.button}><IoIosArrowBack className={style.Arrowicon}/></button>
              <h1 className={style.counter}>000</h1>
              <button className={style.button}><IoIosArrowForward className={style.Arrowicon}/></button>
            </div>
          </div>
          <div className={style.Cards}>
            <div>
              <img className={style.images} src={feijoada} alt="feijoada" />
            </div>
            <div className={style.content}>
              <h1 className={style.titleCard}>Dadadada</h1>
              <p className={style.textCard}>Nostrum tempore dignissimos assumenda possimus porro quam voluptatem blanditiis culpa atque officia aliquid rem.</p>
            </div>
            <div className={style.actions}>
              <button className={style.button}><IoIosArrowBack className={style.Arrowicon}/></button>
              <h1 className={style.counter}>000</h1>
              <button className={style.button}><IoIosArrowForward className={style.Arrowicon}/></button>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
