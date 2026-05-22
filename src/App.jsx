import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Header from "./components/Header";
import Crumbs from "./components/Crumbs";
import UfScreen from "./components/UfScreen";
import MunicipioScreen from "./components/MunicipioScreen";
import CNPJScreen from "./components/CNPJScreen";
import DetalheScreen from "./components/DetalheScreen";
import cnpjs from "./data/cnpjs.json";
import logoSemFundo from "./assets/logo-sem-fundo-sbcdata.png";

const SESSION_KEY = "sbcd_auth";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const { ts } = JSON.parse(raw);
    if (Date.now() - ts > WEEK_MS) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

const ESTADO_INICIAL = {
  step: "uf",
  uf: null,
  municipio: null,
  cnpj: null,
};

export default function App() {
  const [state, setState] = useState(() =>
    loadSession() ? { ...ESTADO_INICIAL, step: "uf" } : ESTADO_INICIAL
  );

  const goto = (step) => {
    if (step === "uf") {
      setState({ ...state, step: "uf", uf: null, municipio: null, cnpj: null });
    } else if (step === "municipio") {
      setState({ ...state, step: "municipio", municipio: null, cnpj: null });
    } else if (step === "cnpj") {
      setState({ ...state, step: "cnpj", cnpj: null });
    }
  };

  const login = () => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ ts: Date.now() }));
    setState({ ...state, step: "uf" });
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setState(ESTADO_INICIAL);
  };

  const buscarPorCnpj = (cnpjStr) => {
    const normalizado = cnpjStr.replace(/\D/g, "");
    const encontrado = cnpjs.find(
      (e) => e.cnpj.replace(/\D/g, "") === normalizado
    );
    if (encontrado) {
      setState({
        step: "detalhe",
        uf: encontrado.uf,
        municipio: encontrado.municipio,
        cnpj: encontrado,
      });
      return true;
    }
    return false;
  };

  if (state.step === "login") {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <div className="app-shell">
      <Header onLogout={logout} onSearch={buscarPorCnpj} step={state.step} />
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

      <img src={logoSemFundo} alt="" className="watermark" aria-hidden="true" />
    </div>
  );
}
