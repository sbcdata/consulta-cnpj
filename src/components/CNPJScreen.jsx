import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StepHead from "./StepHead";
import cnpjs from "../data/cnpjs.json";

export default function CNPJScreen() {
  const { uf, municipio } = useParams();
  const navigate = useNavigate();

  const lista = useMemo(
    () => cnpjs.filter((e) => e.uf === uf && e.municipio === municipio),
    [uf, municipio],
  );

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
              <div className="meta mono">CNPJ {entry.cnpj}</div>
            </div>
            <div className="row-arrow">→</div>
          </div>
        ))}
      </div>
    </>
  );
}
