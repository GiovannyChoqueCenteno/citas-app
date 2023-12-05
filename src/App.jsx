import { useEffect, useState } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";

const App = () => {
  const INITIAL = JSON.parse(localStorage.getItem('pacientes')) ?? [];
  const [pacientes, setPacientes] = useState(INITIAL);
  const [paciente, setPaciente] = useState({});
  const eliminarPaciente = (id) => {
    setPacientes((pacientes) =>
      pacientes.filter((paciente) => paciente.id !== id)
    );
  };
  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);
  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario
          setPaciente={setPaciente}
          paciente={paciente}
          setPacientes={setPacientes}
        />
        <Listado
          eliminarPaciente={eliminarPaciente}
          setPaciente={setPaciente}
          pacientes={pacientes}
        />
      </div>
    </div>
  );
};

export default App;
