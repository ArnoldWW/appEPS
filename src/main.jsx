import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MedicalRecord from "./pages/MedicalRecord";
import MedicalRecordEdit from "./pages/MedicalRecordEdit";
import MedicalAppointments from "./pages/MedicalAppointments";
import Medications from "./pages/Medications";

import { AuthProvider } from "./context/AuthContext";

//rutas de la aplicacion
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: "/crear-cuenta",
        element: <SignUp />
      },
      {
        path: "/historia-clinica",
        element: <MedicalRecord />
      },
      {
        path: "/historia-clinica/edit",
        element: <MedicalRecordEdit />
      },
      {
        path: "/citas-medicas",
        element: <MedicalAppointments />
      },
      {
        path: "/medicamentos",
        element: <Medications />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
