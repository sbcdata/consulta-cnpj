import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StepHead from "./StepHead";
import cnpjs from "../data/cnpjs.json";
import { UF_NAMES } from "../data/ufNames";

export default function MunicipioScreen() {
  const { uf } = useParams();
  const navigate = useNavigate();

  const municipios = useMemo(() => {
    const map = {};
    cnpjs
      .filter((e) => e.uf === uf)
      .forEach((e) => {
        map[e.municipio] = (map[e.municipio] || 0) + 1;
      });
    return Object.entries(map).sort();
  }, [uf]);

  return (
    <>
      <StepHead
        num={2}
        title="Selecione o município"
        desc={`${municipios.length} ${
          municipios.length === 1 ? "município" : "municípios"
        } com CNPJs em ${UF_NAMES[uf] || uf}.`}
      />
      <div className="row-list">
        {municipios.map(([m, count], i) => (
          <div
            key={m}
            className="row-item"
            onClick={() => navigate(`/${uf}/${encodeURIComponent(m)}`)}
            style={{ animation: `fadeUp 0.4s ${i * 0.05}s both` }}
          >
            <div className="row-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="row-main">
              <div className="name">{m}</div>
              <div className="meta">
                {count} {count === 1 ? "CNPJ cadastrado" : "CNPJs cadastrados"}
              </div>
            </div>
            <div className="row-arrow">→</div>
          </div>
        ))}
      </div>
    </>
  );
}
