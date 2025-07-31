import S from "./signIn.module.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { login, setTheme, userData } from "../../redux/User/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export default function SignIn() {
  const [error, setError] = useState({
    user: "",
    password: "",
    server: "",
    status: 200,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  José, documentação do google, mas é só sobre o botão https://github.com/MomenSherif/react-oauth
  // https://developers.google.com/identity/gsi/web/guides/verify-google-id-token?hl=pt-br#node.js esse é oq importa para o back end
  // Está funcionando pegando do env, só que o github é chato...
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const loginGoogle = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    // Aqui tu coloca a rota que quiser, só coloquei essa como exemplo
    const resposta = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google`, {
      token: idToken,
    });
    console.log(resposta.data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError({
      user: "",
      password: "",
      server: "",
      status: 200,
    });

    try {
      const resposta = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        email: data.email,
        password: data.password,
      });
      // Se login OK, segue para dashboard
      if (resposta.status === 200) {
        console.log(resposta.data);
        dispatch(userData(resposta.data));
        dispatch(setTheme(resposta.data.color));
        dispatch(login());
        navigate("/dashboard");
      }
      throw "Conexão recusada...";

    } catch (err) {
      if (err.status == 401) {
        setError({
          password: err.response.data.error,
          status: err.status,
        });
      } else if (err.status == 404) {
        setError({
          user: err.response.data.error,
          status: err.status,
        });
      } else if (err.status == 500) {
        setError({
          server: err.response.data.error,
          status: err.status,
        });
      } else {
        setError({
          server: err.response?.data?.error || "Erro ao fazer login",
          status: err.status,
        });
      }
    }
  };
  return (
    <section className={S.containerLogin}>
      <div className={S.wrapperForm}>
        <h3>Entrar</h3>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={loginGoogle}
            onError={() => console.log("Não foi o login pelo google")}
          />
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
            className={error.password || errors.password ? S.errorInput : ""}
            autocomplete="current-password"
          />
          <div className={S.errorContainer}>
            <ErrorMessage condition={error.user} message={error.user} />
            <ErrorMessage condition={error.server} message={error.server} />
            <ErrorMessage condition={error.password} message={error.password} />
          </div>
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
