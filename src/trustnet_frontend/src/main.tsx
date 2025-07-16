// main.tsx
import { InternetIdentityProvider } from "ic-use-internet-identity";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import './index.css';
import Actors from "./components/ic/Actors"; // ajusta el path según tu estructura
import LandingPage from "./App.js";




ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InternetIdentityProvider>
      <Actors>
      <LandingPage/>
      </Actors>
    </InternetIdentityProvider>
  </React.StrictMode>
);