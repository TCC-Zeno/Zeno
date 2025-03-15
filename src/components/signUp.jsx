import { useState } from "react";
import S from "../styles/login.module.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { login } from "../redux/User/slice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 

export default function SignUp() {  
    const [cnpj, setCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const loginStatus = useSelector(state => state.userReducer.login);  
    const dispatch = useDispatch();  

    const CreateCount = () => {
        //! Parte onde o back pega as infos e passa para o banco, além de verificar se tudo está correto
        dispatch(login());  
        navigate("/dashboard"); 
    };

    return(
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
                <p>Status: {loginStatus === null ? 'Deslogado' : 'Logado'}</p>
                {/* Acompanhamento de variável */}
            </div>
        </section>
    );
}
