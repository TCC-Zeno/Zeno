import { Link } from "react-router-dom";
import LoginComponent from "../components/loginButton";

export default function Login() {
  return (
    <>
      <h1>Casa do Vinicius</h1>
      <LoginComponent/>
      <Link to="/dashboard">Home</Link>
    </>
  );
}
