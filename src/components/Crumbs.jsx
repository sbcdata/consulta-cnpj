import { Fragment } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import cnpjs from "../data/cnpjs.json";

export default function Crumbs() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const segments = location.pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Estados", path: "/" }];

  if (segments[0] === "todos") {
    crumbs.push({ label: "Todos os CNPJs", path: "/todos" });
  } else {
    const { uf, municipio, cnpjId } = params;
    if (uf) crumbs.push({ label: uf, path: `/${uf}` });
    if (municipio) {
      crumbs.push({
        label: municipio,
        path: `/${uf}/${encodeURIComponent(municipio)}`,
      });
    }
    if (cnpjId) {
      const entry = cnpjs.find((e) => e.cnpj.replace(/\D/g, "") === cnpjId);
      crumbs.push({ label: entry?.nome || cnpjId, path: null });
    }
  }

  return (
    <div className="crumbs">
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <Fragment key={i}>
            <span
              className={`crumb-link ${isLast ? "active" : ""}`}
              onClick={() => !isLast && c.path && navigate(c.path)}
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
