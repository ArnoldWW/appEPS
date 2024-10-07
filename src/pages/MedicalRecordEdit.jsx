import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MedicalRecordForm from "../components/MedicalRecordForm";
import { AuthContext } from "../context/AuthContext";

export default function MedicalRecordEdit() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem(user?.uid));

  useEffect(() => {
    if (!userData) {
      navigate("/historia-clinica");
    }
  }, [userData]);

  return (
    <>
      <h2>Editar historia clinica</h2>
      <Link to="/historia-clinica">Volver</Link>

      <MedicalRecordForm />
    </>
  );
}
