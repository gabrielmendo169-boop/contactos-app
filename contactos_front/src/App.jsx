import { useState, useEffect } from "react";
import "./App.css";



function App() {

  const [contactos, setContactos] = useState([]);

  const [filtro, setFiltro] = useState("");

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");



  useEffect(() => {
  validarCampos();
}, [nombre, email, telefono]);





  const cargarContactos = async () => {

    const res = await fetch("http://localhost/contactos_api/contactos");

    const data = await res.json();

    setContactos(data);
  };

const eliminarContacto = async (id) => {

  console.log("Click eliminar:", id);

  const res = await fetch(`http://localhost/contactos_api/contactos/${id}`, {
    method: "DELETE"
  });

  console.log("Status:", res.status);

  if (res.status === 200) {
  setMensaje("🗑️ Contacto eliminado correctamente");
  setTipoMensaje("error");

  setTimeout(() => {
  setMensaje("");
  }, 3000);
    cargarContactos();
  }
};

const validarFormulario = () => {

  let nuevosErrores = {};

  if (!nombre.trim()) {
    nuevosErrores.nombre = "El nombre es obligatorio";
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexEmail.test(email)) {
    nuevosErrores.email = "Email no válido";
  }

  const regexTelefono = /^[0-9]{7,15}$/;

  if (!regexTelefono.test(telefono)) {
    nuevosErrores.telefono = "Teléfono no válido";
  }

  setErrores(nuevosErrores);

  return Object.keys(nuevosErrores).length === 0;
};




const crearContacto = async (e) => {

  e.preventDefault();

  setEnviado(true);

  if (!validarFormulario()) return;

  const res = await fetch("http://localhost/contactos_api/contactos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre,
      email,
      telefono
    })
  });

  if (res.status === 201) {
    setNombre("");
    setEmail("");
    setTelefono("");
    setErrores({});
    setEnviado(false);

  setMensaje("✅ Contacto agregado correctamente");
  setTipoMensaje("success");

  setTimeout(() => {
  setMensaje("");
  }, 3000);
    cargarContactos();
  }
};




  useEffect(() => {
    cargarContactos();
  }, []);

 const contactosFiltrados = contactos.filter(c =>
  (c.nombre || "")
    .toLowerCase()
    .includes(filtro.trim().toLowerCase())
);

const validarCampos = () => {

  let nuevosErrores = {};

  if (!nombre.trim()) {
    nuevosErrores.nombre = "El nombre es obligatorio";
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    nuevosErrores.email = "Email no válido";
  }

  const regexTelefono = /^[0-9]{7,15}$/;
  if (!regexTelefono.test(telefono)) {
    nuevosErrores.telefono = "Teléfono no válido";
  }

  setErrores(nuevosErrores);

  return Object.keys(nuevosErrores).length === 0;
};


  return (
    <div className="container">

  {mensaje && (
    <div className={`alert ${tipoMensaje}`}>
      {mensaje}
    </div>
  )}

  <div className="layout">

    <div className="card">
      <h2 className="card-title">Agregar contacto</h2>

      <form className="form" onSubmit={crearContacto}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={errores.nombre && enviado ? "input-error" : ""}
          />
          {enviado && errores.nombre && (
            <span className="error">{errores.nombre}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errores.email && enviado ? "input-error" : ""}
          />
          {enviado && errores.email && (
            <span className="error">{errores.email}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            maxLength={10}
            onChange={(e) =>
              setTelefono(e.target.value.replace(/\D/g, ""))
            }
            className={errores.telefono && enviado ? "input-error" : ""}
          />
          {enviado && errores.telefono && (
            <span className="error">{errores.telefono}</span>
          )}
        </div>

        <button type="submit" className="button">
          Crear contacto
        </button>
      </form>
    </div>

    <div className="card">
      <h2 className="card-title">Lista de contactos</h2>

      <div className="filter">
        <input
          type="text"
          placeholder="Filtrar por nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contactosFiltrados.map((c) => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.email}</td>
                <td>{c.telefono}</td>
                <td>
                  <button
                    className="button button-danger"
                    onClick={() => eliminarContacto(c.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {contactosFiltrados.length === 0 && (
              <tr>
                <td colSpan="4" className="empty">
                  No hay contactos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

  </div>
</div>

);

}

export default App;
