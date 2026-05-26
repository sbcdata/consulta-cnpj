import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';

import './styles/index.css';
import './styles/login.css';
import './styles/header.css';
import './styles/stage.css';
import './styles/uf.css';
import './styles/row-list.css';
import './styles/detail.css';
import './styles/dialog.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
