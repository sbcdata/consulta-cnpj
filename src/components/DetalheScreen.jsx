import { useState } from "react";
import StepHead from "./StepHead";
import { UF_NAMES } from "../data/ufNames";

export default function DetalheScreen({ cnpj, onNova, onVoltar }) {
  const [copied, setCopied] = useState(false);

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
        title="Dados da cnpj"
        desc="Informações completas do CNPJ selecionado em nossa base."
      />

      <div className="detail-grid">
        <div className="detail-hero">
          <div className="detail-eyebrow">CNPJ consultada</div>
          <h2 className="detail-name">{cnpj.nome}</h2>
          <div className="detail-cnpj">{cnpj.cnpj}</div>

          <div className="detail-actions">
            <button className="btn-detail solid" onClick={onNova}>
              <span>Nova consulta</span>
              <span className="arrow">→</span>
            </button>
            <button className="btn-detail outline" onClick={copiar}>
              <span>{copied ? "CNPJ copiado" : "Copiar CNPJ"}</span>
              <span className="arrow">{copied ? "✓" : "⎘"}</span>
            </button>
            <button className="btn-detail outline" onClick={onVoltar}>
              <span>Voltar à lista</span>
              <span className="arrow">←</span>
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
            <div className="v mono-v">{cnpj.cnpj}</div>
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
    </>
  );
}
