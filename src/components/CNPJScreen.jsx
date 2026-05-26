import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StepHead from "./StepHead";
import cnpjs from "../data/cnpjs.json";

export default function CNPJScreen() {
  const { uf, municipio } = useParams();
  const navigate = useNavigate();
  const [copiado, setCopiado] = useState(null);

  const lista = useMemo(
    () => cnpjs.filter((e) => e.uf === uf && e.municipio === municipio),
    [uf, municipio],
  );

  const copiar = (e, entry) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(entry.cnpj);
    setCopiado(entry.cnpj);
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <>
      <StepHead
        num={3}
        title="Selecione o CNPJ"
        desc={`${lista.length} ${
          lista.length === 1 ? "CNPJ disponível" : "CNPJs disponíveis"
        } em ${municipio}, ${uf}.`}
      />
      <div className="row-list">
        {lista.map((entry, i) => (
          <div
            key={entry.cnpj}
            className="row-item"
            onClick={() =>
              navigate(
                `/${uf}/${encodeURIComponent(municipio)}/${entry.cnpj.replace(/\D/g, "")}`
              )
            }
            style={{ animation: `fadeUp 0.4s ${i * 0.05}s both` }}
          >
            <div className="row-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="row-main">
              <div className="name">{entry.nome}</div>
              <div
                className="meta mono cnpj-copy-inline"
                onClick={(ev) => copiar(ev, entry)}
                title="Clique para copiar"
              >
                CNPJ {entry.cnpj}
              </div>
            </div>
            <button
              className={`row-copy${copiado === entry.cnpj ? " copied" : ""}`}
              onClick={(ev) => copiar(ev, entry)}
              title="Copiar CNPJ"
            >
              {copiado === entry.cnpj ? "✓" : "⎘"}
            </button>
            <div className="row-arrow">→</div>
          </div>
        ))}
      </div>

      {copiado && (
        <div className="copied-toast">
          <span className="check">✓</span>
          CNPJ copiado
        </div>
      )}
    </>
  );
}
