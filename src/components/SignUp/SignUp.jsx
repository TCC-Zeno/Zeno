import S from "./signUp.module.css";
import {
  userData,
  setTheme,
  setColorBlindness,
} from "../../redux/User/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { cnpj } from "cpf-cnpj-validator";
import axios from "axios";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function SignUp() {
  const { login: authLogin } = useAuth(); 
  const [error, setError] = useState({
    cnpjErr: "",
    user: "",
    password: "",
    server: "",
    status: 200,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError({
      cnpjErr: "",
      user: "",
      password: "",
      server: "",
      status: 200,
    });
    if (!cnpj.isValid(data.cnpj)) {
      setError({
        cnpjErr: "Seu CNPJ é falso",
      });
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError({
        password: "A senha inserida nos campos precisam ser idênticas",
      });
      return;
    }

    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          cnpj: data.cnpj,
          email: data.email,
          password: data.password,
        }
      );
      console.log(resposta);
      // Se cadastro OK, segue para dashboard
      if (resposta.status === 201) {
        // Após cadastro bem sucedido, faz o login
        const loginResult = await authLogin(data.email, data.password);

        if (loginResult.success) {
          dispatch(userData(loginResult.user));
          dispatch(setTheme("blue"));
          dispatch(setColorBlindness("Padrão"));
          navigate("/dashboard");
        } else {
          throw new Error(
            loginResult.error || "Erro ao fazer login após cadastro"
          );
        }
      }
    } catch (err) {
      console.log(err);
      // Se erro, mostra mensagem
      if (err.status == 401) {
        setError({
          user: err.response.data.error,
          status: err.status,
        });
      } else if (err.status == 409) {
        setError({
          user: err.response.data.error,
          status: err.status,
        });
      } else if (err.status == 400) {
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
        <h3>Criar nova conta</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            id="input-cnpj"
            name="cnpj"
            control={control}
            rules={{
              required: true,
              validate: (value) =>
                cnpj.isValid(value) ||
                setError({ cnpjErr: "Seu CNPJ é falso" }),
            }}
            render={({ field: { onChange, value, ...restField } }) => (
              <div>
                <IMaskInput
                  mask="00.000.000/0000-00"
                  placeholder="CNPJ"
                  type="text"
                  {...restField}
                  value={value || ""}
                  onAccept={(value) => {
                    const rawValue = value.replace(/\D/g, "");
                    onChange(rawValue);
                  }}
                  className={error.cnpjErr || errors.cnpj ? S.errorInput : ""}
                />
              </div>
            )}
          />
          <input
            id="input-email"
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            {...register("email", { required: true, min: 5, maxLength: 100 })}
            className={errors.email ? S.errorInput : ""}
          />
          <input
            id="input-password"
            type="password"
            placeholder="Senha"
            autoComplete="new-password"
            {...register("password", { required: true })}
            className={error.password || errors.password ? S.errorInput : ""}
          />
          <input
            id="input-confirm-password"
            type="password"
            placeholder="Confirmar senha"
            autoComplete="pass"
            {...register("confirmPassword", { required: true })}
            className={
              error.password || errors.confirmPassword ? S.errorInput : ""
            }
          />
          <ErrorMessage condition={error.cnpjErr} message={error.cnpjErr} />
          <ErrorMessage condition={error.password} message={error.password} />
          <ErrorMessage condition={error.server} message={error.server} />
          <ErrorMessage condition={error.user} message={error.user} />

          <div className={S.containerButton}>
            <input id="btn-submit" type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
}
