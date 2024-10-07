import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.names.trim()) {
    errors.names = "Los nombres son requeridos";
  }

  if (!values.surname.trim()) {
    errors.surname = "Los apellidos son requeridos";
  }

  if (!values.address.trim()) {
    errors.address = "La direccion es requerida";
  }

  if (!values.phone.trim()) {
    errors.phone = "El telefono es requerido";
  }

  if (!values.birthdate) {
    errors.birthdate = "La fecha de nacimiento es requerida";
  }

  if (!values.sex) {
    errors.sex = "El sexo es requerido";
  }

  if (!values.race) {
    errors.race = "La raza es requerida";
  }

  if (!values.civil) {
    errors.civil = "El estado civil es requerido";
  }

  if (!values.bloodType) {
    errors.bloodType = "El tipo de sangre es requerido";
  }

  return errors;
};

export default function MedicalRecordForm() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem(user?.uid));
  const medicalRecord = userData?.medicalRecord;

  const formik = useFormik({
    initialValues: {
      names: medicalRecord?.names || "",
      surname: medicalRecord?.surname || "",
      address: medicalRecord?.address || "",
      phone: medicalRecord?.phone || "",
      birthdate: medicalRecord?.birthdate || "",
      sex: medicalRecord?.sex || "",
      race: medicalRecord?.race || "",
      civil: medicalRecord?.civil || "",
      bloodType: medicalRecord?.bloodType || ""
    },
    validate,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));

      /* guardar los valores del form en local storage con el id del usuario */
      localStorage.setItem(
        user.uid,
        JSON.stringify({
          ...userData,
          medicalRecord: values
        })
      );

      formik.resetForm();
      alert("Datos guardados");
      navigate("/historia-clinica");
    }
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      {/* errores de validacion */}
      {formik.touched.names && formik.errors.names ? (
        <p className="error">{formik.errors.names}</p>
      ) : null}

      {formik.touched.surname && formik.errors.surname ? (
        <p className="error">{formik.errors.surname}</p>
      ) : null}

      {formik.touched.address && formik.errors.address ? (
        <p className="error">{formik.errors.address}</p>
      ) : null}

      {formik.touched.phone && formik.errors.phone ? (
        <p className="error">{formik.errors.phone}</p>
      ) : null}

      {formik.touched.birthdate && formik.errors.birthdate ? (
        <p className="error">{formik.errors.birthdate}</p>
      ) : null}

      {formik.touched.sex && formik.errors.sex ? (
        <p className="error">{formik.errors.sex}</p>
      ) : null}

      {formik.touched.race && formik.errors.race ? (
        <p className="error">{formik.errors.race}</p>
      ) : null}

      {formik.touched.civil && formik.errors.civil ? (
        <p className="error">{formik.errors.civil}</p>
      ) : null}

      {formik.touched.bloodType && formik.errors.bloodType ? (
        <p className="error">{formik.errors.bloodType}</p>
      ) : null}

      <div>
        <label htmlFor="names">Nombres: </label>
        <input
          type="text"
          id="names"
          name="names"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.names}
        />
      </div>

      {/* apellidos */}
      <div>
        <label htmlFor="surname">Apellidos: </label>
        <input
          type="text"
          id="surname"
          name="surname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.surname}
        />
      </div>

      {/* direccion */}
      <div>
        <label htmlFor="address">Direccion: </label>
        <input
          type="text"
          id="address"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        />
      </div>

      {/* telefono */}
      <div>
        <label htmlFor="phone">Telefono: </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
      </div>

      {/* fecha de nacimiento */}
      <div>
        <label htmlFor="birthdate">Fecha de nacimiento: </label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.birthdate}
        />
      </div>

      {/* sexo con un select */}
      <div>
        <label htmlFor="sex">Sexo: </label>
        <select
          id="sex"
          name="sex"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.sex}
        >
          <option value="">Seleccione</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      {/* raza con un select */}
      <div>
        <label htmlFor="race">Raza: </label>
        <select
          id="race"
          name="race"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.race}
        >
          <option value="">Seleccione</option>
          <option value="Indigena">Indigena</option>
          <option value="Blanco">Blanco</option>
          <option value="Negro">Negro</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      {/* estado civil con un select */}
      <div>
        <label htmlFor="civil">Estado civil: </label>
        <select
          id="civil"
          name="civil"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.civil}
        >
          <option value="">Seleccione</option>
          <option value="Soltero">Soltero</option>
          <option value="Casado">Casado</option>
          <option value="Divorciado">Divorciado</option>
          <option value="Viudo">Viudo</option>
        </select>
      </div>

      {/* tipo de sange con un select */}
      <div>
        <label htmlFor="bloodType">Tipo de sangre: </label>
        <select
          id="bloodType"
          name="bloodType"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bloodType}
        >
          <option value="">Seleccione</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="AB+">AB+</option>
          <option value="O+">O+</option>
          <option value="A-">A-</option>
          <option value="B-">B-</option>
          <option value="AB-">AB-</option>
          <option value="O-">O-</option>
        </select>
      </div>

      <button type="submit">{medicalRecord ? "Guardar" : "Crear"}</button>
    </form>
  );
}
