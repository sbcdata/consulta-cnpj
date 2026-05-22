import { useState } from "react";
import logo from "../assets/logo-sbcd-branco.png";

function maskCnpj(val) {
  const d = val.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12)
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

export default function Header({ onLogout, onSearch }) {
  const [query, setQuery] = useState("");
  const [erro, setErro] = useState(false);

  const handleChange = (e) => {
    setQuery(maskCnpj(e.target.value));
    setErro(false);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    const found = onSearch(query);
    if (found) {
      setQuery("");
    } else {
      setErro(true);
    }
  };

  return (
    <div className="main-header">
      <div className="header-brand">
        <div className="logo">
          <img src={logo} alt="Logo SBCD" width="120" height="63" />
        </div>
      </div>
      <div className="header-actions">
        <div className="header-search">
          <input
            type="text"
            className={`search-input mono${erro ? " search-error" : ""}`}
            placeholder="Buscar por CNPJ…"
            value={query}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>
            Buscar
          </button>
          {erro && <span className="search-not-found">não encontrado</span>}
        </div>
        <div className="header-brand">
          <div className="name">
            SBC<span className="accent">Data</span>
          </div>
          <div className="divider"></div>
          <div className="tag">Consultor de CNPJs</div>
        </div>
        <button className="btn-ghost" onClick={onLogout}>
          Sair
        </button>
      </div>
    </div>
  );
}
