
import S from "./signUp.module.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { login,userData, setTheme } from "../../redux/User/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { cnpj } from "cpf-cnpj-validator";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const resposta = await axios.post("http://localhost:3000/auth/signup", {
        cnpj: data.cnpj,
        email: data.email,
        password: data.password,
        
      });

      // Se cadastro OK, segue para dashboard
      dispatch(login());
      dispatch(userData(resposta.data[0]));
      dispatch(setTheme(resposta.data[0].color));
      navigate("/dashboard");
    } catch (err) {
      // Se erro, mostra mensagem
      alert(err.response?.data?.error || "Erro ao criar conta");
    }
    
     if (!cnpj.isValid(data.cnpj)) {
       setError("cnpj", {
        type: "manual",
        message: "CNPJ inválido",
      });
      return;
     }
  };

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
          <Controller
            id="input-cnpj"
            name="cnpj"
            control={control}
            rules={{
              required: true,
              validate: (value) => cnpj.isValid(value) || "CNPJ inválido",
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
                  className={errors.cnpj ? S.errorInput : ""}
                />
              </div>
            )}
          />
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
          <input
            id="input-confirm-password"
            type="password"
            placeholder="Confirmar senha"
            {...register("confirmPassword", { required: true })}
            className={errors.confirmPassword ? S.errorInput : ""}
          />
          {errors.cnpj && (
            <span className={S.errorMessage}>{errors.cnpj.message}</span>
          )}
          <div className={S.containerButton}>
            <input id="btn-submit" type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
}
