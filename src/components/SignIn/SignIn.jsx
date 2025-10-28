import S from "./signIn.module.css";
import { setTheme, userData, setColorBlindness } from "../../redux/User/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import PropagateLoader from "react-spinners/PropagateLoader";
import Modal from "../Modal/Modal";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

export default function SignIn() {
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForgot, setIsLoadingForgot] = useState(false);
  const [modalForgotPasswordOpen, setModalForgotPasswordOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPartPrimary, setIsForgotPartPrimary] = useState(true);
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

  const {
    register: registerNewPassword,
    handleSubmit: handleSubmitNewPassword,
    formState: { errors: errorsNewPassword },
    reset: resetNewPassword,
  } = useForm();

  const onSubmitLogin = async (data) => {
    setIsLoading(true);
    setError({
      user: "",
      password: "",
      server: "",
      status: 200,
    });

    try {
      const result = await login(data.email, data.password);

      if (result.success) {
        toast.success("Login realizado com sucesso!");
        dispatch(userData(result.user));
        dispatch(setTheme(result.user.color));
        dispatch(setColorBlindness(result.user.accessibility));
        navigate("/dashboard", { replace: true });
      } else {
        setError({
          server: result.error,
          status: 401,
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError({
        server: "Erro ao fazer login. Tente novamente.",
        status: 500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitForgotPassword = async (data) => {
    setIsLoadingForgot(true);
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        {
          email: data.email,
          security_phrase: data.phrase,
        }
      );
      if (resposta.status === 200) {
        toast.success("Frase verificada com sucesso!");
        setIsForgotPartPrimary(false);
      }
    } catch (error) {
      console.error("Frase de verificação inválida:", error);
      toast.error("Frase de verificação inválida.");
    } finally {
      setIsLoadingForgot(false);
    }
  };

  const onSubmitForgotNewPassword = async (data) => {
    console.log(data);
  };

  const closeModal = () => {
    setModalForgotPasswordOpen(false);
    setIsForgotPartPrimary(true);
    resetForgot();
    resetNewPassword();
  };

  return (
    <section className={S.containerLogin}>
      <div className={S.wrapperForm}>
        <h3>Entrar</h3>

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
          <div className={S.passwordWrapper}>
            <input
              id="input-password"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              {...registerLogin("password", { required: true })}
              className={
                error.password || errorsLogin.password ? S.errorInput : ""
              }
              autoComplete="current-password"
              disabled={isLoading}
            />
            <button
              type="button"
              className={S.togglePassword}
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

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
        {isForgotPartPrimary ? (
          <div className={S.modalContainer}>
            <h2>Recuperar Senha</h2>
            <p>
              Para recuperar sua senha, por favor, insira seu e-mail cadastrado
              e seu código de verificação.
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
                <span className={S.errorText}>
                  {errorsForgot.email.message}
                </span>
              )}

              <input
                type="text"
                placeholder="Código de Verificação"
                {...registerForgot("phrase", {
                  required: "A frase de Verificação é obrigatória",
                })}
                className={errorsForgot.phrase ? S.errorInput : ""}
                autoComplete="off"
                disabled={isLoadingForgot}
              />
              {errorsForgot.phrase && (
                <span className={S.errorText}>
                  {errorsForgot.phrase.message}
                </span>
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
        ) : (
          <div className={S.modalContainer}>
            <h2>Recuperar Senha</h2>
            <p>
              Agora digite sua nova senha para concluir o processo de
              recuperação.
            </p>

            <form onSubmit={handleSubmitNewPassword(onSubmitForgotNewPassword)}>
              <input
                type="password"
                placeholder="Nova Senha"
                {...registerNewPassword("password", {
                  required: "Senha é obrigatório",
                })}
                className={errorsForgot.password ? S.errorInput : ""}
                autoComplete="new-password"
                disabled={isLoadingForgot}
              />
              <input 
                type="password"
                placeholder="Confirmar Nova Senha"
                {...registerNewPassword("confirmPassword", {
                  required: "Confirmação de senha é obrigatório",
                })}
                className={errorsForgot.password ? S.errorInput : ""}
                autoComplete="new-password"
                disabled={isLoadingForgot}
              />
              {errorsForgot.password && (
                <span className={S.errorText}>
                  {errorsForgot.password.message}
                </span>
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
        )}
      </Modal>
    </section>
  );
}
