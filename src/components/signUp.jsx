import { useState } from "react";
import S from "../styles/login.module.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { login } from "../redux/User/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.userReducer.login);
  const dispatch = useDispatch();

  const CreateCount = () => {
    //! Parte onde o back pega as infos e passa para o banco, além de verificar se tudo está correto
    dispatch(login());
    navigate("/dashboard");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
        <input
          type="text"
          placeholder="CNPJ"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className={S.containerButton}>
          <button onClick={CreateCount}>Criar</button>
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
        {/* Acompanhamento de variável */}
      </div>
    </section>
  );
}
