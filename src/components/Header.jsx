import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Header() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickLogOut = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <header>
      <h1>APP EPS</h1>
      {user && <h2>Hola, {user?.displayName}</h2>}
      <nav className="nav">
        {user ? (
          <>
            <Link to="/historia-clinica">Hisotira Clinica</Link>
            <Link to="/citas-medicas">Citas Médicas</Link>
            <Link to="/medicamentos">Medicamentos</Link>
            <a
              href="https://wa.me/573223871331?text=Hola,quiero asistir a una cita médica"
              target="_blank"
              noopener="true"
              noreferrer="true"
            >
              Solicitar chat
            </a>
            <button onClick={handleClickLogOut}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/">Iniciar sesión</Link>
            <Link to="/crear-cuenta">Crear cuenta</Link>
          </>
        )}
      </nav>
    </header>
  );
}
