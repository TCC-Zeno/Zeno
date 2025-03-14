import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <h1>Nosso site de apresentação</h1>
      <Link to="/login">Login</Link>
    </>
  );
}
