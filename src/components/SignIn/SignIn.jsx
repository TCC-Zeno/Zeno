import S from "./signIn.module.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { login, setTheme, userData, } from "../../redux/User/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from 'axios'

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const onSubmit = async (data) => {
      try {
        const resposta = await axios.post('http://localhost:3000/auth/signin', {

          email: data.email,
          password: data.password
        });
        // Se login OK, segue para dashboard
        if (resposta.status === 200) {
          console.log(resposta.data);
        dispatch(userData(resposta.data));
        dispatch(setTheme(resposta.data.color));
        dispatch(login());
        navigate("/dashboard");
        }
      } catch (err) {
        // Se erro, mostra mensagem
        alert(err.response?.data?.error || "Erro ao fazer login");
      }
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
