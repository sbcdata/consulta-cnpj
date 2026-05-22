import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Header from "./components/Header";
import Crumbs from "./components/Crumbs";
import UfScreen from "./components/UfScreen";
import MunicipioScreen from "./components/MunicipioScreen";
import CNPJScreen from "./components/CNPJScreen";
import DetalheScreen from "./components/DetalheScreen";

const ESTADO_INICIAL = {
  step: "login",
  uf: null,
  municipio: null,
  cnpj: null,
};

export default function App() {
  const [state, setState] = useState(ESTADO_INICIAL);

  const goto = (step) => {
    if (step === "uf") {
      setState({
        ...state,
        step: "uf",
        uf: null,
        municipio: null,
        cnpj: null,
      });
    } else if (step === "municipio") {
      setState({
        ...state,
        step: "municipio",
        municipio: null,
        cnpj: null,
      });
    } else if (step === "cnpj") {
      setState({ ...state, step: "cnpj", cnpj: null });
    }
  };

  if (state.step === "login") {
    return <LoginScreen onLogin={() => setState({ ...state, step: "uf" })} />;
  }

  return (
    <div className="app-shell">
      <Header onLogout={() => setState(ESTADO_INICIAL)} />
      <div className="stage">
        <Crumbs state={state} onGo={goto} />

        {state.step === "uf" && (
          <UfScreen
            onSelect={(uf) => setState({ ...state, step: "municipio", uf })}
          />
        )}

        {state.step === "municipio" && (
          <MunicipioScreen
            uf={state.uf}
            onSelect={(m) => setState({ ...state, step: "cnpj", municipio: m })}
          />
        )}

        {state.step === "cnpj" && (
          <CNPJScreen
            uf={state.uf}
            municipio={state.municipio}
            onSelect={(e) => setState({ ...state, step: "detalhe", cnpj: e })}
          />
        )}

        {state.step === "detalhe" && (
          <DetalheScreen
            cnpj={state.cnpj}
            onNova={() => setState({ ...ESTADO_INICIAL, step: "uf" })}
            onVoltar={() => setState({ ...state, step: "cnpj", cnpj: null })}
          />
        )}
      </div>
    </div>
  );
}
