import S from "./signUp.module.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { login } from "../../redux/User/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { cnpj } from "cpf-cnpj-validator";

export default function SignUp() {
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.userReducer.login);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    //! Parte onde o back pega as infos e passa para o banco, além de verificar se tudo está correto
    if (!cnpj.isValid(data.cnpj)) {
      setError("cnpj", {
        type: "manual",
        message: "CNPJ inválido",
      });
      return;
    }

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
          <Controller
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
            type="email"
            placeholder="E-mail"
            {...register("email", { required: true, min: 5, maxLength: 100 })}
            className={errors.email ? S.errorInput : ""}
          />
          <input
            type="password"
            placeholder="Senha"
            {...register("password", { required: true })}
            className={errors.password ? S.errorInput : ""}
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            {...register("confirmPassword", { required: true })}
            className={errors.confirmPassword ? S.errorInput : ""}
          />
          {errors.cnpj && (
            <span className={S.errorMessage}>{errors.cnpj.message}</span>
          )}
          <div className={S.containerButton}>
            <input type="submit" />
          </div>
        </form>
        <p>Status: {loginStatus === null ? "Deslogado" : "Logado"}</p>
        {/* Acompanhamento de variavel para os devs saberem oq ta acontecendo  */}
      </div>
    </section>
  );
}
