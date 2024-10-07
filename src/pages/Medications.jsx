import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { formatPrice } from "../utils";

const medicamentos = [
  {
    id: 1,
    name: "Paracetamol",
    price: 10000
  },
  {
    id: 2,
    name: "Aspirina",
    price: 20000
  },
  {
    id: 3,
    name: "Atorvastatina",
    price: 30000
  },
  {
    id: 4,
    name: "Metformina",
    price: 10000
  },
  {
    id: 5,
    name: "Ciclosporina",
    price: 20000
  },
  {
    id: 6,
    name: "Levofloxacino",
    price: 8000
  },
  {
    id: 7,
    name: "Ciclofosfamida",
    price: 7000
  },
  {
    id: 8,
    name: "Ciclobenzamida",
    price: 15000
  }
];

export default function Medications() {
  const { user } = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem(user?.uid));
  const medicamentosLocalStorage = userData?.medications || [];
  const [cart, setCart] = useState(medicamentosLocalStorage);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  }, [user]);

  const addMedicamento = (medicamento) => {
    /* verificar si el medicamento ya esta en el carrito y sumar una unidad */
    if (cart.find((item) => item.id === medicamento.id)) {
      alert("Medicamento ya en el carrito, se añadio una unidad");
      const newCart = cart.map((item) => {
        if (item.id === medicamento.id) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });

      setCart(newCart);
      return;
    }

    /* agregar medicamento al carrito */
    setCart([...cart, { ...medicamento, quantity: 1 }]);

    /* guardar el medicamento en local storage con el id del usuario */
    localStorage.setItem(
      user.uid,
      JSON.stringify({
        ...userData,
        medications: [...medicamentosLocalStorage, medicamento]
      })
    );
  };

  /* calcular el total del carrito y enviar pedido */
  const sendOrder = (e) => {
    e.preventDefault();

    if (address.trim().length === 0) {
      alert("Direccion es requerida");
      return;
    }

    setAddress("");

    /* borrar medicamentos del carrito */
    setCart([]);

    /* borrar medicamentos del local storage */
    localStorage.setItem(
      user.uid,
      JSON.stringify({
        ...userData,
        medications: []
      })
    );

    alert("Pedido enviado");
  };

  /* calcular el total del carrito */
  const total = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  /* eliminar medicamento del carrito */
  const removeMedicamento = (medicamento) => {
    /* eliminar medicamento del carrito */
    setCart(cart.filter((item) => item.id !== medicamento.id));
    /* eliminar medicamento del local storage */
    localStorage.setItem(
      user.uid,
      JSON.stringify({
        ...userData,
        medications: medicamentosLocalStorage.filter(
          (item) => item.id !== medicamento.id
        )
      })
    );
  };

  /* restar una unidad del medicamento */
  const restMedicamento = (medicamento) => {
    /* restar una unidad */
    setCart(
      cart.map((item) => {
        if (item.id === medicamento.id) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }
        return item;
      })
    );
  };

  /* revisar si hay una historia clinica en local storage */
  if (!userData?.medicalRecord) {
    return (
      <>
        <h2>No tienes datos de historia clinica</h2>
        <p>
          Debes crear tus datos de historia clinica para solicitar medicamentos
        </p>
        <Link to="/historia-clinica">Crear historia clinica</Link>
      </>
    );
  }

  return (
    <>
      <h2>Medicamentos</h2>

      <p>
        Los medicamentos pueden variar, por lo que es importante reviisar el
        catalogo de medicamentos con frecuencia.
      </p>

      <ul>
        {medicamentos.map((medicamento) => (
          <li key={medicamento.name}>
            <p>{medicamento.name}</p>
            <p>Precio: {formatPrice(medicamento.price)}</p>
            <p>
              <button onClick={() => addMedicamento(medicamento)}>
                Añadir al carrito
              </button>
            </p>
          </li>
        ))}
      </ul>

      <hr />

      <h2>Carrito de medicamentos</h2>
      <p>Total de medicamentos: {cart.length}</p>
      <ul>
        {cart.map((medicamento) => (
          <li key={medicamento.id}>
            <p>{medicamento.name}</p>
            <p>
              {medicamento.quantity} und/s X {formatPrice(medicamento.price)}
            </p>
            <p>
              Subtotal: {formatPrice(medicamento.price * medicamento.quantity)}
            </p>
            <p></p>
            <button onClick={() => removeMedicamento(medicamento)}>
              Eliminar
            </button>
            {/* boton para restar una unidad */}
            {medicamento.quantity > 1 && (
              <button onClick={() => restMedicamento(medicamento)}>
                Quitar una unidad
              </button>
            )}
          </li>
        ))}
      </ul>
      <p>Envio: $0</p>
      <p>Total a pagar: {formatPrice(total)}</p>
      {cart.length > 0 && (
        <form onSubmit={sendOrder}>
          <label htmlFor="address">Direccion: </label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <button type="submit">Realizar pedido</button>
        </form>
      )}
    </>
  );
}
