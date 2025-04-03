import S from "./signUp.module.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { login } from "../../redux/User/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.userReducer.login);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    //! Parte onde o back pega as infos e passa para o banco, além de verificar se tudo está correto
    console.log(data);
    dispatch(login());
    navigate("/dashboard");
  };
  console.log(errors);

  return (
    <section className={S.containerLogin}>
      <div className={S.wrapperForm}>
        <h3>Criar nova conta</h3>
        <GoogleOAuthProvider clientId="idgoogle">
          <GoogleLogin />
        </GoogleOAuthProvider>
        <div className={S.divider}>
          <span>ou</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="CNPJ"
            {...register("cnpj", { required: true })}
          />
          <input
            type="email"
            placeholder="E-mail"
            {...register("email", { required: true, min: 5, maxLength: 100 })}
          />
          <input
            type="password"
            placeholder="Senha"
            {...register("password", { required: true })}
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            {...register("confirmPassword", { required: true })}
          />
          <div className={S.containerButton}>
            <input type="submit" />
          </div>
        </form>
        <p>Status: {loginStatus === null ? "Deslogado" : "Logado"}</p>
        {/* Acompanhamento de variavel */}
      </div>
    </section>
  );
}
