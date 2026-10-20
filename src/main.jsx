import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { BuilderPage, IngredientLibraryPage } from "./BuilderPage.jsx";
import { MarketingPage } from "./MarketingPages.jsx";
import { PersonalisationPage } from "./PersonalisationPage.jsx";
import { LanguageProvider } from "./i18n.jsx";
import "./styles.css";
import "./marketing.css";
import "./i18n.css";

const path = window.location.pathname.replace(/\/$/, "") || "/";
const marketingRoutes = {
  "/about-us": "about",
  "/our-science": "science",
  "/reviews": "reviews",
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      {marketingRoutes[path] ? (
        <MarketingPage kind={marketingRoutes[path]} />
      ) : path === "/build-your-tape" ? (
        <BuilderPage />
      ) : path === "/find-out-what-you-need" ? (
        <PersonalisationPage />
      ) : path === "/ingredient-library" ? (
        <IngredientLibraryPage />
      ) : (
        <App />
      )}
    </LanguageProvider>
  </React.StrictMode>,
);
