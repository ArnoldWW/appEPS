import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MedicalRecordForm from "../components/MedicalRecordForm";

import { Margin, usePDF } from "react-to-pdf";

export default function MedicalRecord() {
  const { user } = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem(user?.uid));

  const navigate = useNavigate();

  const { toPDF, targetRef } = usePDF({
    method: "open",
    filename: "historia-clinica.pdf",
    page: { margin: Margin.MEDIUM }
  });

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  }, [user]);

  return (
    <>
      {userData?.medicalRecord ? (
        <>
          <div ref={targetRef}>
            <h2>Historia clinica</h2>
            <p>Nombres: {userData.medicalRecord.names}</p>
            <p>Apellidos: {userData.medicalRecord.surname}</p>
            <p>Direccion: {userData.medicalRecord.address}</p>
            <p>Telefono: {userData.medicalRecord.phone}</p>
            <p>Fecha de nacimiento: {userData.medicalRecord.birthdate}</p>
            <p>Sexo: {userData.medicalRecord.sex}</p>
            <p>Raza: {userData.medicalRecord.race}</p>
            <p>Estado civil: {userData.medicalRecord.civil}</p>
            <p>Tipo de sangre: {userData.medicalRecord.bloodType}</p>
          </div>
          <hr />
          <p>
            <Link to="/historia-clinica/edit">Editar datos</Link>
          </p>
          <button onClick={toPDF}>Descargar historia clinica</button>
        </>
      ) : (
        <>
          <h2>Crea tu historia clinica</h2>
          <MedicalRecordForm />
        </>
      )}
    </>
  );
}
