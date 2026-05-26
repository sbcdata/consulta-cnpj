import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cnpjs from "../data/cnpjs.json";
import logoBranco from "../assets/logo-sbcd-branco.png";

function maskCnpj(val) {
  const d = val.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12)
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

function getProgress(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "todos") return 100;
  return { 0: 25, 1: 50, 2: 75, 3: 100 }[segments.length] ?? 25;
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [erro, setErro] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const handleChange = (e) => {
    setQuery(maskCnpj(e.target.value));
    setErro(false);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    const normalizado = query.replace(/\D/g, "");
    const encontrado = cnpjs.find((e) => e.cnpj.replace(/\D/g, "") === normalizado);
    if (encontrado) {
      setQuery("");
      setMobileSearch(false);
      setErro(false);
      navigate(
        `/${encontrado.uf}/${encodeURIComponent(encontrado.municipio)}/${encontrado.cnpj.replace(/\D/g, "")}`
      );
    } else {
      setErro(true);
    }
  };

  const progress = getProgress(location.pathname);

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
