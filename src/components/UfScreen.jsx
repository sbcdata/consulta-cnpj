import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import StepHead from "./StepHead";
import cnpjs from "../data/cnpjs.json";
import { UF_NAMES } from "../data/ufNames";

export default function UfScreen() {
  const navigate = useNavigate();

  const ufs = useMemo(() => {
    const map = {};
    cnpjs.forEach((e) => {
      map[e.uf] = (map[e.uf] || 0) + 1;
    });
    return Object.entries(map).sort();
  }, []);

  return (
    <>
      <StepHead
        num={1}
        title="Selecione o estado"
        desc={`${ufs.length} unidades federativas com CNPJs cadastrados em nossa base.`}
      />
      <div
        className="todos-all-card"
        onClick={() => navigate("/todos")}
        style={{ animation: "fadeUp 0.4s both" }}
      >
        <div className="todos-all-icon">≡</div>
        <div className="row-main">
          <div className="name">Ver todos os CNPJs</div>
          <div className="meta">{cnpjs.length} CNPJs em todos os estados</div>
        </div>
        <div className="row-arrow">→</div>
      </div>
      <div className="uf-grid">
        {ufs.map(([uf, count], i) => (
          <div
            key={uf}
            className="uf-card"
            onClick={() => navigate(`/${uf}`)}
            style={{ animation: `fadeUp 0.4s ${i * 0.04}s both` }}
          >
            <div className="uf-code">{uf}</div>
            <div className="uf-name">{UF_NAMES[uf] || uf}</div>
            <div className="uf-count">
              <span>
                {count} {count === 1 ? "CNPJ" : "CNPJs"}
              </span>
              <span className="arrow">→</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
