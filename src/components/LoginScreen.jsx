import { useState } from "react";
import { SENHA } from "../config/auth";
import cnpjs from "../data/cnpjs.json";
import logoSemFundo from "../assets/logo-sem-fundo-sbcdata.png";

export default function LoginScreen({ onLogin }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const tentar = () => {
    if (senha === SENHA) {
      setErro("");
      onLogin();
    } else {
      setErro("Senha incorreta. Tente novamente.");
    }
  };

  const totalEstados = new Set(cnpjs.map((e) => e.uf)).size;
  const totalMunicipios = new Set(cnpjs.map((e) => e.municipio)).size;

  return (
    <div className="login-shell">
      <div className="login-left">
        <h1 className="login-headline">
          Consulta de cnpjs,
          <br />
          <span className="highlight">por SBCDATA.</span>
        </h1>
        <p className="login-sub">
          Plataforma exclusiva para consulta do portfólio de cnpjs da
          Sociedade Brasileira Caminho de Damasco.
        </p>

        <div className="login-stats">
          <div className="login-stat">
            <div className="num">{cnpjs.length}</div>
            <div className="lbl">Cnpjs cadastrados</div>
          </div>
          <div className="login-stat">
            <div className="num">{totalEstados}</div>
            <div className="lbl">Estados</div>
          </div>
          <div className="login-stat">
            <div className="num">{totalMunicipios}</div>
            <div className="lbl">Municípios</div>
          </div>
        </div>

        <div className="login-foot">
          <span>SBCD · 2026</span>
          <span>v1.0</span>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-wrap">
          <h2 className="login-title">Acessar plataforma</h2>
          <p className="login-desc">
            Insira sua senha de acesso para consultar a base de cnpjs.
          </p>

          <label className="field-label">Senha</label>
          <input
            type="password"
            className="field-input"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && tentar()}
            autoFocus
          />

          <button className="btn-primary" onClick={tentar}>
            Entrar <span>→</span>
          </button>

          <div className="login-error">{erro}</div>
        </div>
      </div>
    </div>
  );
}
