import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Crumbs from "./components/Crumbs";
import InstallButton from "./components/InstallButton";
import UfScreen from "./components/UfScreen";
import MunicipioScreen from "./components/MunicipioScreen";
import CNPJScreen from "./components/CNPJScreen";
import DetalheScreen from "./components/DetalheScreen";
import TodosScreen from "./components/TodosScreen";
import logoSemFundo from "./assets/logo-sem-fundo-sbcdata.png";

function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <div className="stage">
        <div className="crumbs-bar">
          <Crumbs />
          <InstallButton />
        </div>
        <Outlet />
      </div>
      <img src={logoSemFundo} alt="" className="watermark" aria-hidden="true" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<UfScreen />} />
        <Route path="/todos" element={<TodosScreen />} />
        <Route path="/:uf" element={<MunicipioScreen />} />
        <Route path="/:uf/:municipio" element={<CNPJScreen />} />
        <Route path="/:uf/:municipio/:cnpjId" element={<DetalheScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
