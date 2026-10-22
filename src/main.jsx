import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { BuilderPage, IngredientLibraryPage } from "./BuilderPage.jsx";
import { MarketingPage } from "./MarketingPages.jsx";
const PersonalisationPage = React.lazy(() =>
  import("./PersonalisationPage.jsx").then((module) => ({
    default: module.PersonalisationPage,
  })),
);
import { LanguageProvider, useI18n } from "./i18n.jsx";
import "./styles.css";
import "./marketing.css";
import "./i18n.css";

function QuestionnaireLoading() {
  const { language } = useI18n();
  return (
    <p className="needs-main">
      {language === "zh"
        ? "正在加载营养问卷…"
        : "Loading your nutrition questionnaire…"}
    </p>
  );
}

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
        <React.Suspense fallback={<QuestionnaireLoading />}>
          <PersonalisationPage />
        </React.Suspense>
      ) : path === "/ingredient-library" ? (
        <IngredientLibraryPage />
      ) : (
        <App />
      )}
    </LanguageProvider>
  </React.StrictMode>,
);
