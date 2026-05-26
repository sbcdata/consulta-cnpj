import { useMemo, useState } from "react";
import cnpjs from "../data/cnpjs.json";
import ExportDialog from "./ExportDialog";

export default function TodosScreen({ onSelect, onVoltar }) {
  const [busca, setBusca] = useState("");
  const [copiado, setCopiado] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return cnpjs;
    const qNum = q.replace(/\D/g, "");
    return cnpjs.filter((e) => {
      if (qNum && e.cnpj.replace(/\D/g, "").includes(qNum)) return true;
      if (e.nome.toLowerCase().includes(q)) return true;
      if (e.municipio.toLowerCase().includes(q)) return true;
      if (e.uf.toLowerCase() === q) return true;
      return false;
    });
  }, [busca]);

  const copiar = (ev, entry) => {
    ev.stopPropagation();
    navigator.clipboard?.writeText(entry.cnpj);
    setCopiado(entry.cnpj);
    setTimeout(() => setCopiado(null), 2000);
  };

  const exportTitle = "CNPJs_SBCD";

  return (
    <>
      <div className="stage-head">
        <div className="stage-step">
          <span className="num" style={{ fontSize: 10 }}>≡</span>
          <span>Listagem completa</span>
        </div>
        <div className="stage-titles">
          <h1>Todos os CNPJs</h1>
          <div className="desc">
            {cnpjs.length} CNPJs cadastrados em nossa base de dados.
          </div>
        </div>
      </div>

      <div className="todos-bar">
        <button className="todos-back-btn" onClick={onVoltar}>← Voltar</button>
        <input
          className="todos-input"
          type="text"
          placeholder="Buscar por nome, CNPJ ou município…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          autoFocus
        />
        {busca.trim() && (
          <span className="todos-count">
            {lista.length} resultado{lista.length !== 1 ? "s" : ""}
          </span>
        )}
        <button
          className="todos-export-btn"
          onClick={() => setExportOpen(true)}
          disabled={lista.length === 0}
        >
          Exportar
        </button>
      </div>

      <div className="row-list">
        {lista.length === 0 && (
          <div className="todos-empty">Nenhum resultado para "{busca}"</div>
        )}
        {lista.map((e, i) => (
          <div
            key={e.cnpj}
            className="row-item"
            onClick={() => onSelect(e)}
            style={{ animation: `fadeUp 0.3s ${Math.min(i, 15) * 0.03}s both` }}
          >
            <div className="row-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="row-main">
              <div className="name">{e.nome}</div>
              <div className="meta mono">CNPJ {e.cnpj}</div>
              <div className="meta">{e.municipio} · {e.uf}</div>
            </div>
            <button
              className={`row-copy${copiado === e.cnpj ? " copied" : ""}`}
              onClick={(ev) => copiar(ev, e)}
              title="Copiar CNPJ"
            >
              {copiado === e.cnpj ? "✓" : "⎘"}
            </button>
            <div className="row-arrow">→</div>
          </div>
        ))}
      </div>

      <ExportDialog
        data={lista}
        title={exportTitle}
        open={exportOpen}
        onClose={() => setExportOpen(false)}
      />
    </>
  );
}
