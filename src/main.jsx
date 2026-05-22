import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Estilos globais
import './styles/index.css';
import './styles/login.css';
import './styles/header.css';
import './styles/stage.css';
import './styles/uf.css';
import './styles/row-list.css';
import './styles/detail.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
