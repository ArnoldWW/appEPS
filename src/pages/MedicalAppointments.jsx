import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MedicalAppointmentsForm from "../components/MedicalAppointmentsForm";

export default function medicalAppointments() {
  const { user } = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem(user?.uid));
  const [medicalAppointments, setMedicalAppointments] = useState(
    userData?.medicalAppointments || []
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  }, [user]);

  const cancelAppointment = (id) => {
    /* preguntar si se quiere cancelar la cita */
    if (confirm("¿Estás seguro que deseas cancelar esta cita?")) {
      const newAppointments = medicalAppointments.filter(
        (appointment) => appointment.id !== id
      );

      /* remover citas en local storage */
      localStorage.setItem(
        user.uid,
        JSON.stringify({
          ...userData,
          medicalAppointments: newAppointments
        })
      );

      /* actualizar citas en estado local */
      setMedicalAppointments(newAppointments);
    }
  };

  const authorizeExams = (id, idEspecialist) => {
    /* preguntar si se quiere solicitar autorización */
    if (confirm("¿Estás seguro que deseas solicitar autorización?")) {
      const newAppointments = medicalAppointments.map((appointment) => {
        if (appointment.id === id) {
          return {
            ...appointment,
            authorizationRequest: true
          };
        }
        return appointment;
      });

      /* guardar citas en local storage */
      localStorage.setItem(
        user.uid,
        JSON.stringify({
          ...userData,
          medicalAppointments: newAppointments
        })
      );

      /* actualizar citas en estado local */
      setMedicalAppointments(newAppointments);
    }
  };

  /* revisar si hay una historia clinica en local storage */
  if (!userData?.medicalRecord) {
    return (
      <>
        <h2>No tienes datos de historia clinica</h2>
        <p>Debes crear tus datos de historia clinica para poder crear citas</p>
        <Link to="/historia-clinica">Crear historia clinica</Link>
      </>
    );
  }

  return (
    <>
      <h2>Crea tus citas médicas</h2>

      {/* formulario de crear citas médicas */}
      <MedicalAppointmentsForm
        setMedicalAppointments={setMedicalAppointments}
      />

      <hr />

      <h2>Tus citas médicas</h2>
      {medicalAppointments?.length > 0 ? (
        <ul>
          {medicalAppointments.map((appointment) => (
            <li key={appointment.id}>
              <p>ID: {appointment.id}</p>
              <p>Nombre especialista: Doctor {appointment.specialist}</p>
              <p>Fecha de cita: {appointment.date}</p>
              <p>Hora de cita: {appointment.time}</p>
              <p>Descripcion: {appointment.description}</p>
              <p>
                Estado de examenes:{" "}
                {appointment.authorized ? "Autorizado" : "Pendiente"}
              </p>

              {!appointment.authorizationRequest ? (
                <>
                  <button onClick={() => cancelAppointment(appointment.id)}>
                    Cancelar cita
                  </button>
                  <button
                    onClick={() =>
                      authorizeExams(appointment.id, appointment.specialist)
                    }
                  >
                    Solicitar autorización de examenes
                  </button>
                </>
              ) : (
                <p style={{ color: "red" }}>
                  La Solicitud de autorización de examenes para esta cita fue
                  enviada
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes citas médicas</p>
      )}
    </>
  );
}
