import S from "./signIn.module.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {
  login,
  setTheme,
  userData,
  setColorBlindness,
} from "../../redux/User/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import PropagateLoader from "react-spinners/PropagateLoader";
import Modal from "../Modal/Modal";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForgot, setIsLoadingForgot] = useState(false);
  const [modalForgotPasswordOpen, setModalForgotPasswordOpen] = useState(false);
  const [error, setError] = useState({
    user: "",
    password: "",
    server: "",
    status: 200,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm();

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: errorsForgot },
    reset: resetForgot,
  } = useForm();

  //  José, documentação do google, mas é só sobre o botão https://github.com/MomenSherif/react-oauth
  // https://developers.google.com/identity/gsi/web/guides/verify-google-id-token?hl=pt-br#node.js esse é oq importa para o back end
  // Está funcionando pegando do env, só que o github é chato...
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const loginGoogle = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    // Aqui tu coloca a rota que quiser, só coloquei essa como exemplo
    const resposta = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/google`,
      {
        token: idToken,
      }
    );
    console.log(resposta.data);
  };

  const onSubmitLogin = async (data) => {
    setIsLoading(true);
    setError({
      user: "",
      password: "",
      server: "",
      status: 200,
    });

    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signin`,
        {
          email: data.email,
          password: data.password,
        }
      );

      if (resposta.status === 200) {
        dispatch(userData(resposta.data));
        dispatch(setTheme(resposta.data.color));
        dispatch(setColorBlindness(resposta.data.accessibility));
        dispatch(login());
        setIsLoading(false);
        navigate("/dashboard");
        return;
      }
      throw new Error("Conexão recusada...");
    } catch (err) {
      if (err.response?.status === 401) {
        setError({
          password: err.response.data.error,
          status: err.response.status,
        });
      } else if (err.response?.status === 404) {
        setError({
          user: err.response.data.error,
          status: err.response.status,
        });
      } else if (err.response?.status === 500) {
        setError({
          server: err.response.data.error,
          status: err.response.status,
        });
      } else {
        setError({
          server: err.response?.data?.error || "Erro desconhecido",
          status: err.response?.status || 0,
        });
      }
      setIsLoading(false);
    }
  };

  const onSubmitForgotPassword = async (data) => {
    setIsLoadingForgot(true);
    console.log(data);

    setTimeout(() => {
      setIsLoadingForgot(false);
      closeModal();
    }, 2000);
  };

  const closeModal = () => {
    setModalForgotPasswordOpen(false);
    resetForgot();
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

        <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
          <input
            id="input-email"
            type="email"
            placeholder="E-mail"
            {...registerLogin("email", {
              required: true,
              min: 5,
              maxLength: 100,
            })}
            className={errorsLogin.email ? S.errorInput : ""}
            autoComplete="email"
            disabled={isLoading}
          />
          <input
            id="input-password"
            type="password"
            placeholder="Senha"
            {...registerLogin("password", { required: true })}
            className={
              error.password || errorsLogin.password ? S.errorInput : ""
            }
            autoComplete="current-password"
            disabled={isLoading}
          />
          <div className={S.errorContainer}>
            <ErrorMessage condition={error.user} message={error.user} />
            <ErrorMessage condition={error.server} message={error.server} />
            <ErrorMessage condition={error.password} message={error.password} />
          </div>
          <div className={S.forgotPasswordContainer}>
            <button
              type="button"
              id="forgot-password"
              className={S.forgotPassword}
              onClick={() => setModalForgotPasswordOpen(true)}
            >
              Esqueceu sua senha?
            </button>
          </div>
          <div className={S.containerButton}>
            {isLoading ? (
              <PropagateLoader />
            ) : (
              <input id="btn-submit" type="submit" value="Entrar" />
            )}
          </div>
        </form>
      </div>

      <Modal isOpen={modalForgotPasswordOpen} onClose={closeModal}>
        <div className={S.modalContainer}>
          <h2>Recuperar Senha</h2>
          <p>
            Para recuperar sua senha, por favor, insira seu e-mail cadastrado e
            seu código de verificação.
          </p>

          <form onSubmit={handleSubmitForgot(onSubmitForgotPassword)}>
            <input
              type="email"
              placeholder="E-mail"
              {...registerForgot("email", {
                required: "E-mail é obrigatório",
              })}
              className={errorsForgot.email ? S.errorInput : ""}
              autoComplete="email"
              disabled={isLoadingForgot}
            />
            {errorsForgot.email && (
              <span className={S.errorText}>{errorsForgot.email.message}</span>
            )}

            <input
              type="text"
              placeholder="Código de Verificação"
              {...registerForgot("code", {
                required: "Código é obrigatório",
                minLength: { value: 4, message: "Código muito curto" },
                maxLength: { value: 10, message: "Código muito longo" },
              })}
              className={errorsForgot.code ? S.errorInput : ""}
              autoComplete="off"
              disabled={isLoadingForgot}
            />
            {errorsForgot.code && (
              <span className={S.errorText}>{errorsForgot.code.message}</span>
            )}
            <div className={S.buttonContainer}>
              <button
                type="submit"
                className={S.submitButton}
                disabled={isLoadingForgot}
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
}
