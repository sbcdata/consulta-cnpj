import { useState, useEffect } from "react";

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isMobile() {
  return /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
}

function isInStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
}

export default function InstallButton() {
  const [prompt, setPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (isInStandaloneMode()) {
      setInstalled(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (installed || !isMobile()) return null;
  if (!prompt && !isIOS()) return null;

  const install = async () => {
    if (isIOS()) {
      setIosHint((v) => !v);
      return;
    }
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setPrompt(null);
  };

  return (
    <div className="install-wrap">
      <button className="install-btn" onClick={install}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="12" y1="18" x2="12" y2="18" strokeWidth="3" strokeLinecap="round" />
        </svg>
        Adicionar à tela inicial
      </button>

      {iosHint && (
        <div className="ios-hint">
          <div className="ios-hint-arrow" />
          Toque em{" "}
          <strong>
            Compartilhar{" "}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle" }}>
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </strong>{" "}
          e depois em <strong>"Adicionar à Tela de Início"</strong>
        </div>
      )}
    </div>
  );
}
