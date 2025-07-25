// main.tsx
import { InternetIdentityProvider } from "ic-use-internet-identity";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import './config/i18n'; // Importar configuración de i18n
import Actors from "./components/ic/Actors";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InternetIdentityProvider>
      <Actors>
        <App />
      </Actors>
    </InternetIdentityProvider>
  </React.StrictMode>
);