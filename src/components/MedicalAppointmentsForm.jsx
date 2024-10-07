import { useFormik } from "formik";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const validate = (values) => {
  const errors = {};

  if (!values.specialist) {
    errors.specialist = "El especialista es requerido";
  }

  if (!values.date) {
    errors.date = "La fecha es requerida";
  }

  if (!values.time) {
    errors.time = "La hora es requerida";
  }

  if (!values.description) {
    errors.description = "La descripción es requerida";
  }

  return errors;
};

export default function MedicalAppointmentsForm({ setMedicalAppointments }) {
  const { user } = useContext(AuthContext);

  const userData = JSON.parse(localStorage.getItem(user?.uid));
  const medicalAppointmentsLocalStorage = userData?.medicalAppointments || [];

  const formik = useFormik({
    initialValues: {
      id: "",
      specialist: "",
      date: "",
      time: "",
      description: ""
    },
    validate,
    onSubmit: (values) => {
      //alert(JSON.stringify(newAppointment, null, 2));

      /* cita con id unico */
      const newAppointment = {
        id: uuidv4(),
        specialist: values.specialist,
        date: values.date,
        time: values.time,
        description: values.description,
        createdAt: new Date().toISOString(),
        authorizationRequest: false,
        authorized: false
      };

      /* guardar cita en local storage con el id del usuario */
      localStorage.setItem(
        user.uid,
        JSON.stringify({
          ...userData,
          medicalAppointments: [
            ...medicalAppointmentsLocalStorage,
            newAppointment
          ]
        })
      );

      /* actualizar citas en estado local */
      setMedicalAppointments([
        ...medicalAppointmentsLocalStorage,
        newAppointment
      ]);

      alert("Cita creada");

      /* limpiar formulario */
      formik.resetForm();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* errores de validacion */}
      {formik.touched.specialist && formik.errors.specialist ? (
        <p className="error">{formik.errors.specialist}</p>
      ) : null}

      {formik.touched.date && formik.errors.date ? (
        <p className="error">{formik.errors.date}</p>
      ) : null}

      {formik.touched.time && formik.errors.time ? (
        <p className="error">{formik.errors.time}</p>
      ) : null}

      {formik.touched.description && formik.errors.description ? (
        <p className="error">{formik.errors.description}</p>
      ) : null}

      {/* especialista con un select */}
      <div>
        <label htmlFor="specialist">Especialista: </label>
        <select
          id="specialist"
          name="specialist"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.specialist}
        >
          <option value="">Seleccione</option>
          <option value="Juan">Dr. Juan</option>
          <option value="Pedro">Dr. Pedro</option>
        </select>
      </div>

      <div>
        <label htmlFor="date">Fecha: </label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
        />
      </div>

      <div>
        <label htmlFor="time">Hora: </label>
        <input
          type="time"
          id="time"
          name="time"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.time}
        />
      </div>

      <div>
        <label htmlFor="description">Descripción: </label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
      </div>

      <button type="submit">Crear cita</button>
    </form>
  );
}
