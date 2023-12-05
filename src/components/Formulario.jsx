import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const generarId = () => {
  const random = Math.random().toString(36).substring(2);
  const fecha = Date.now().toString(36);
  return random + fecha;
};

const Formulario = ({ setPaciente, setPacientes, paciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      [nombre, propietario, email, fecha, sintomas]
        .map((field) => field.trim())
        .includes("")
    ) {
      setError(true);
    } else {
      setError(false);
      const objectPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas,
      };
      if (paciente.id) {
        objectPaciente.id = paciente.id;
        setPacientes((pacientes) =>
          pacientes.map((pacienteState) =>
            paciente.id === pacienteState.id ? objectPaciente : pacienteState
          )
        );
        setPaciente({});
      } else {
        objectPaciente.id = generarId();
        setPacientes((pacientes) => [...pacientes, objectPaciente]);
      }
      setNombre("");
      setPropietario("");
      setEmail("");
      setFecha("");
      setSintomas("");
    }
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className=" text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && (
          <div className="bg-red-600 uppercase text-white text-center p-2 rounded-md mb-3 font-bold">
            Todos los campos son obligatorios
          </div>
        )}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-black"
          >
            Nombre Mascota
          </label>
          <input
            id="mascota"
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
            type="text"
            placeholder="Nombre de la mascota"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-black"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
            type="text"
            placeholder="Nombre del propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-black"
          >
            Email Contacto
          </label>
          <input
            id="email"
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
            type="email"
            placeholder="Email Contacto Propietario"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-black"
          >
            Alta
          </label>
          <input
            id="alta"
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintoma"
            className="block text-gray-700 uppercase font-black"
          >
            Sintomas
          </label>
          <textarea
            id="sintoma"
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white hover:bg-indigo-700 cursor-pointer transition-colors uppercase"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  );
};

Formulario.propTypes = {
  setPacientes: PropTypes.func.isRequired,
};

export default Formulario;
