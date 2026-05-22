import { Fragment } from "react";

export default function Crumbs({ state, onGo }) {
  const crumbs = [{ label: "Estados", step: "uf" }];
  if (state.uf) crumbs.push({ label: state.uf, step: "municipio" });
  if (state.municipio) crumbs.push({ label: state.municipio, step: "cnpj" });
  if (state.cnpj) crumbs.push({ label: state.cnpj.nome, step: "detalhe" });

  return (
    <div className="crumbs">
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <Fragment key={i}>
            <span
              className={`crumb-link ${isLast ? "active" : ""}`}
              onClick={() => !isLast && onGo(c.step)}
            >
              {c.label}
            </span>
            {!isLast && <span className="sep">/</span>}
          </Fragment>
        );
      })}
    </div>
  );
}
