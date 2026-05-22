import { useState } from "react";
import logoBranco from "../assets/logo-sbcd-branco.png";

const PROGRESS = { uf: 25, municipio: 50, cnpj: 75, detalhe: 100 };

function maskCnpj(val) {
  const d = val.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12)
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

export default function Header({ onLogout, onSearch, step }) {
  const [query, setQuery] = useState("");
  const [erro, setErro] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const handleChange = (e) => {
    setQuery(maskCnpj(e.target.value));
    setErro(false);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    const found = onSearch(query);
    if (found) {
      setQuery("");
      setMobileSearch(false);
    } else {
      setErro(true);
    }
  };

  const progress = PROGRESS[step] || 25;

  return (
    <div className="header-wrap">
      <div className="main-header">
        <div className="header-logo-left">
          <img src={logoBranco} alt="SBCD" className="logo-left-img" />
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

          <button
            className="search-icon-btn btn-ghost"
            onClick={() => {
              setMobileSearch((m) => !m);
              setErro(false);
            }}
            aria-label="Buscar por CNPJ"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <div className="header-brand-right">
            <div className="divider" />
            <div className="tag">Consultor de CNPJs</div>
          </div>

          <button className="btn-ghost" onClick={onLogout}>
            Sair
          </button>
        </div>
      </div>

      {mobileSearch && (
        <div className="mobile-search-drawer">
          <input
            type="text"
            className={`search-input mobile mono${erro ? " search-error" : ""}`}
            placeholder="Digite o CNPJ…"
            value={query}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            autoFocus
          />
          <button className="search-btn" onClick={handleSearch}>
            Buscar
          </button>
          {erro && <span className="search-not-found">não encontrado</span>}
        </div>
      )}

      <div className="header-progress-bar">
        <div className="header-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
