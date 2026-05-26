import { useEffect, useMemo, useState } from "react";
import { UF_NAMES } from "../data/ufNames";

async function doExportExcel(rows, filename) {
  const { utils, writeFile } = await import("xlsx");
  const ws = utils.json_to_sheet(rows);
  ws["!cols"] = Object.keys(rows[0] || {}).map((k) => ({
    wch: Math.max(k.length, ...rows.map((r) => String(r[k] ?? "").length)) + 2,
  }));
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Dados");
  writeFile(wb, `${filename}.xlsx`);
}

async function doExportPDF(headers, body, title, filename) {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");
  const doc = new jsPDF({ orientation: body.length > 15 ? "landscape" : "portrait" });
  doc.setFontSize(14);
  doc.setTextColor(10, 31, 61);
  doc.text(title, 14, 16);
  doc.setFontSize(9);
  doc.setTextColor(106, 122, 146);
  doc.text(`Gerado em ${new Date().toLocaleDateString("pt-BR")}`, 14, 22);
  autoTable(doc, {
    startY: 28,
    head: [headers],
    body,
    styles: { font: "helvetica", fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [10, 31, 61], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [240, 246, 252] },
    margin: { left: 14, right: 14 },
  });
  doc.save(`${filename}.pdf`);
}

function toRows(data) {
  return data.map((e) => ({
    Nome: e.nome,
    CNPJ: e.cnpj,
    UF: e.uf,
    Município: e.municipio,
    Endereço: e.endereco,
    "Contrato de Gestão": e.contrato || "",
  }));
}

export default function ExportDialog({ data, title, open, onClose }) {
  const ufs = useMemo(
    () => [...new Set(data.map((e) => e.uf))].sort(),
    [data]
  );

  const [selected, setSelected] = useState(() => new Set(ufs));
  const [exporting, setExporting] = useState(false);
  const showFilter = ufs.length > 1;

  useEffect(() => {
    if (open) setSelected(new Set(ufs));
  }, [open, ufs.join(",")]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const filtered = useMemo(
    () => (showFilter ? data.filter((e) => selected.has(e.uf)) : data),
    [data, selected, showFilter]
  );

  const filename = useMemo(() => {
    if (!showFilter) return title;
    const sorted = [...selected].sort();
    if (sorted.length === 0 || sorted.length === ufs.length) return "CNPJs_SBCD";
    return `CNPJs_SBCD_${sorted.join("_")}`;
  }, [selected, ufs, showFilter, title]);

  const toggle = (uf) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(uf) ? next.delete(uf) : next.add(uf);
      return next;
    });

  const run = async (fn) => {
    setExporting(true);
    try { await fn(); } finally { setExporting(false); onClose(); }
  };

  const handleExcel = () =>
    run(() => doExportExcel(toRows(filtered), filename));

  const handlePDF = () =>
    run(() =>
      doExportPDF(
        ["Nome", "CNPJ", "UF", "Município", "Endereço", "Contrato"],
        filtered.map((e) => [e.nome, e.cnpj, e.uf, e.municipio, e.endereco, e.contrato || ""]),
        filename,
        filename
      )
    );

  if (!open) return null;

  return (
    <div className="dialog-overlay" onMouseDown={onClose}>
      <div className="dialog-box" onMouseDown={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <span className="dialog-title">Exportar dados</span>
          <button className="dialog-close" onClick={onClose} aria-label="Fechar">×</button>
        </div>

        {showFilter && (
          <div className="dialog-body">
            <div className="dialog-section-label">Filtrar por estado</div>
            <div className="uf-chips">
              {ufs.map((uf) => (
                <button
                  key={uf}
                  className={`uf-chip${selected.has(uf) ? " active" : ""}`}
                  onClick={() => toggle(uf)}
                  title={UF_NAMES[uf] || uf}
                >
                  {selected.has(uf) && <span className="chip-check">✓</span>}
                  {uf}
                </button>
              ))}
            </div>
            <div className="dialog-count">
              <strong>{filtered.length}</strong>{" "}
              registro{filtered.length !== 1 ? "s" : ""} selecionado{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}

        <div className="dialog-footer">
          <button
            className="dialog-export-btn excel"
            onClick={handleExcel}
            disabled={filtered.length === 0 || exporting}
          >
            <span className="deb-icon">⊞</span>
            <span>Excel (.xlsx)</span>
          </button>
          <button
            className="dialog-export-btn pdf"
            onClick={handlePDF}
            disabled={filtered.length === 0 || exporting}
          >
            <span className="deb-icon">⎙</span>
            <span>PDF (.pdf)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
