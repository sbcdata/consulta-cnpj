import { useMemo, useState } from "react";
import StepHead from "./StepHead";
import cnpjs from "../data/cnpjs.json";

export default function CNPJScreen({ uf, municipio, onSelect }) {
  const [copiado, setCopiado] = useState(null);

  const lista = useMemo(
    () => cnpjs.filter((e) => e.uf === uf && e.municipio === municipio),
    [uf, municipio],
  );

  const copiar = (e, cnpj) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(cnpj.cnpj);
    setCopiado(cnpj.cnpj);
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
        {lista.map((e, i) => (
          <div
            key={e.cnpj}
            className="row-item"
            onClick={() => onSelect(e)}
            style={{ animation: `fadeUp 0.4s ${i * 0.05}s both` }}
          >
            <div className="row-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="row-main">
              <div className="name">{e.nome}</div>
              <div className="meta mono">CNPJ {e.cnpj}</div>
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
    </>
  );
}
