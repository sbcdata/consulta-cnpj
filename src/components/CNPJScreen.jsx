import { useMemo } from "react";
import StepHead from "./StepHead";
import cnpjs from "../data/cnpjs.json";

export default function CNPJScreen({ uf, municipio, onSelect }) {
  const lista = useMemo(
    () => cnpjs.filter((e) => e.uf === uf && e.municipio === municipio),
    [uf, municipio],
  );

  return (
    <>
      <StepHead
        num={3}
        title="Selecione a cnpj"
        desc={`${lista.length} ${
          lista.length === 1 ? "cnpj disponível" : "cnpjs disponíveis"
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
            <div className="row-arrow">→</div>
          </div>
        ))}
      </div>
    </>
  );
}
