import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StepHead from "./StepHead";
import { UF_NAMES } from "../data/ufNames";
import ExportDialog from "./ExportDialog";
import cnpjs from "../data/cnpjs.json";

export default function DetalheScreen() {
  const { uf, municipio, cnpjId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const cnpj = cnpjs.find((e) => e.cnpj.replace(/\D/g, "") === cnpjId);

  if (!cnpj) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>CNPJ não encontrado.</p>
        <button className="btn-detail solid" onClick={() => navigate("/")}>
          Voltar ao início
        </button>
      </div>
    );
  }

  const copiar = () => {
    navigator.clipboard?.writeText(cnpj.cnpj);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const temContrato = cnpj.contrato && cnpj.contrato.trim() !== "";

  return (
    <>
      <StepHead
        num={4}
        title="Dados do CNPJ"
        desc="Informações completas do CNPJ selecionado em nossa base."
      />

      <div className="detail-grid">
        <div className="detail-hero">
          <div className="detail-eyebrow">CNPJ consultada</div>
          <h2 className="detail-name">{cnpj.nome}</h2>
          <div className="detail-cnpj clickable-cnpj" onClick={copiar} title="Clique para copiar">
            {cnpj.cnpj}
            <span className="cnpj-copy-hint">{copied ? " ✓ copiado" : " ⎘"}</span>
          </div>

          <div className="detail-actions">
            <button className="btn-detail solid" onClick={() => navigate("/")}>
              <span>Nova consulta</span>
              <span className="arrow">→</span>
            </button>
            <button className="btn-detail outline" onClick={copiar}>
              <span>{copied ? "CNPJ copiado" : "Copiar CNPJ"}</span>
              <span className="arrow">{copied ? "✓" : "⎘"}</span>
            </button>
            <button
              className="btn-detail outline"
              onClick={() =>
                navigate(`/${uf}/${encodeURIComponent(municipio)}`)
              }
            >
              <span>Voltar à lista</span>
              <span className="arrow">←</span>
            </button>
            <button className="btn-detail outline" onClick={() => setExportOpen(true)}>
              <span>Exportar</span>
              <span className="arrow">↓</span>
            </button>
          </div>
        </div>

        <div className="detail-fields">
          <div className="field-row">
            <div className="k">Nome fantasia</div>
            <div className="v">{cnpj.nome}</div>
          </div>
          <div className="field-row">
            <div className="k">CNPJ</div>
            <div className="v mono-v clickable-cnpj" onClick={copiar} title="Clique para copiar">
              {cnpj.cnpj}
              <span className="cnpj-copy-hint">{copied ? " ✓ copiado" : " ⎘"}</span>
            </div>
          </div>
          <div className="field-row">
            <div className="k">Estado</div>
            <div className="v">
              {UF_NAMES[cnpj.uf] || cnpj.uf}
              <span className="badge">{cnpj.uf}</span>
            </div>
          </div>
          <div className="field-row">
            <div className="k">Município</div>
            <div className="v">{cnpj.municipio}</div>
          </div>
          <div className="field-row">
            <div className="k">Endereço</div>
            <div className="v">{cnpj.endereco}</div>
          </div>
          <div className="field-row">
            <div className="k">Contrato de gestão</div>
            <div className={`v ${temContrato ? "mono-v" : "unavailable"}`}>
              {temContrato ? cnpj.contrato : "Indisponível"}
            </div>
          </div>
        </div>
      </div>

      {copied && (
        <div className="copied-toast">
          <span className="check">✓</span>
          CNPJ copiado
        </div>
      )}

      <ExportDialog
        data={[cnpj]}
        title={`CNPJ_${cnpj.cnpj.replace(/\D/g, "")}`}
        open={exportOpen}
        onClose={() => setExportOpen(false)}
      />
    </>
  );
}
