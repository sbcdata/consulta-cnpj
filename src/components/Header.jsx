import logo from "../assets/logo-sbcd-branco.png";

export default function Header({ onLogout }) {
  return (
    <div className="main-header">
      <div className="header-brand">
        <div className="logo">
          <img src={logo} alt="Logo SBCD" width="120" height="63" />
        </div>
      </div>
      <div className="header-actions">
        <div className="header-brand">
          <div className="name">
            SBC<span className="accent">Data</span>
          </div>
          <div className="divider"></div>
          <div className="tag">Consultor de CNPJs</div>
        </div>
        <button className="btn-ghost" onClick={onLogout}>
          Sair
        </button>
      </div>
    </div>
  );
}
