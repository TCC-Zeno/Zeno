import S from "./signIn.module.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { login } from "../../redux/User/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    //! Parte onde o back pega as infos e passa para o banco, além de verificar se tudo está correto
    //* o backend deve pegar o array data, pois nele que tem todas as informações que o usuario digitou, mas atenção, o login pelo google é outro esquema
    console.log(data);
    dispatch(login());
    navigate("/dashboard");
  };

  return (
    <section className={S.containerLogin}>
      <div className={S.wrapperForm}>
        <h3>Entrar</h3>
        <GoogleOAuthProvider clientId="idgoogle">
          <GoogleLogin />
        </GoogleOAuthProvider>
        <div className={S.divider}>
          <span>ou</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="input-email"
            type="email"
            placeholder="E-mail"
            {...register("email", { required: true, min: 5, maxLength: 100 })}
            className={errors.email ? S.errorInput : ""}
          />
          <input
            id="input-password"
            type="password"
            placeholder="Senha"
            {...register("password", { required: true })}
            className={errors.password ? S.errorInput : ""}
          />
          <div className={S.forgotPasswordContainer}>
            <a id="forgot-password" className={S.forgotPassword}>
              Esqueceu sua senha?{" "}
            </a>
          </div>
          <div className={S.containerButton}>
            <input id="btn-submit" type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
}
