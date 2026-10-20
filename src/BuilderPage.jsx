import { useI18n } from "./i18n";
import { useEffect, useMemo, useState } from "react";
import { Header } from "./App";
import { LandingHero, PageFooter } from "./LandingHero";
import { Arrow, Button, FlavorOptions, Icon, Modal } from "./components";
import { RealisticTape } from "./TapePreview";
import { IngredientDetails } from "./IngredientDetails";
import {
  additionDecision,
  evaluateFormula,
  starterIds,
  validateStarter,
} from "./pairing-engine";
import { pairingVersion } from "./pairing-library";
import {
  PairingDialog,
  PairingGuide,
  StarterRainbows,
  StarterReview,
  SuitabilityCheck,
} from "./PairingUI";
import {
  defaults,
  flavors,
  libraryMetadata,
  loadFormula,
  nutrients,
  persistDraft,
  readDraft,
  storageKey,
} from "./data";
import "./builder.css";
import "./pairing.css";
import "./builder-editorial.css";
const filters = [
  ["All Nutrients", "sliders"],
  ["Vitamins", "sun"],
  ["Minerals", "package"],
  ["Performance", "bolt"],
  ["Immunity", "shield"],
  ["Beauty", "sprout"],
  ["Wellness", "heart"],
  ["Sleep & Calm", "moon"],
  ["Botanicals", "sprout"],
  ["Biotics", "flask"],
];
const nutrientById = new Map(nutrients.map((n) => [n.id, n]));
const getSelected = (formula) =>
  formula.selected.map((id) => nutrientById.get(id)).filter(Boolean);
const matchesFilter = (n, category, query, t) =>
  (category === "All Nutrients" ||
    n.category === category ||
    n.goals.includes(category)) &&
  `${n.name} ${n.nameZh} ${n.summary} ${n.category} ${t(n.summary)} ${t(n.category)} ${n.goals.map((goal) => t(goal)).join(" ")}`
    .toLowerCase()
    .includes(query.toLowerCase().trim());
export function NutrientCard({
  nutrient: n,
  chosen,
  onToggle,
  onDetails,
  resourceMode = false,
  pairingHint,
}) {
  const { t, language } = useI18n();
  return (
    <article
      className={`catalog-card ${chosen ? "is-chosen" : ""} ${pairingHint ? "has-pairing-note" : ""}`}
      style={{
        "--card-color": n.color,
        "--nutrient-color": n.stripe,
      }}
      data-nutrient-id={n.id}
    >
      <button
        className="catalog-details-trigger"
        aria-label={t("Nutrition card for {name}", { name: t(n.name) })}
        aria-haspopup="dialog"
        onClick={() => onDetails(n)}
      />
      <img
        className="catalog-art"
        src={n.artwork}
        alt={t(n.artworkAlt)}
        width="320"
        height="320"
        loading="lazy"
        decoding="async"
      />
      <Icon name={n.icon} />
      <h3>{t(n.name)}</h3>
      <p>{t(n.summary)}</p>
      {pairingHint && (
        <span className="card-pairing-note" id={`pairing-${n.id}`}>
          <Icon name={pairingHint.kind === "routine" ? "moon" : "sliders"} />
          {t(pairingHint.label)}
        </span>
      )}
      <div className="catalog-card-bottom">
        <button
          className="amount-link"
          onClick={() => onDetails(n)}
          aria-label={t("Details for {name}", { name: t(n.name) })}
        >
          <span>
            {n.amount.status === "reference"
              ? n.amount.display
              : t("Amount pending")}
          </span>
          <span className="amount-context">
            {t(
              n.amount.status === "reference"
                ? "Reference amount"
                : "Design concept",
            )}
          </span>
        </button>
        {!resourceMode && (
          <button
            className={`catalog-add ${chosen ? "chosen" : ""}`}
            onClick={() => onToggle(n.id)}
            aria-label={t(chosen ? "Remove {name}" : "Add {name}", {
              name: t(n.name),
            })}
            aria-pressed={chosen}
            aria-describedby={pairingHint ? `pairing-${n.id}` : undefined}
          >
            <Icon name={chosen ? "check" : "plus"} />
          </button>
        )}
        {resourceMode && (
          <button
            className="catalog-add"
            aria-label={t("Open {name} details", { name: t(n.name) })}
            onClick={() => onDetails(n)}
          >
            <Icon name="arrow-right" />
          </button>
        )}
      </div>
    </article>
  );
}
export { IngredientDetails };
function FormulaSummary({
  selected,
  formula,
  onRemove,
  onDetails,
  onPairingReview,
}) {
  const { t, language } = useI18n();
  const pairing = evaluateFormula(formula.selected);
  return (
    <aside className="live-formula" aria-label={t("Your daily tape preview")}>
      <div className="live-formula-heading">
        <p className="eyebrow">{t("Made by you. For you.")}</p>
        <h2>{t("Your Daily Tape")}</h2>
        <p>{t("A little ritual. A brighter everyday.")}</p>
      </div>
      <div className="live-product-area">
        <RealisticTape selected={selected} large />
        <div className="selected-ingredients" aria-live="polite">
          {selected.map((n) => (
            <div className="selected-ingredient" key={n.id}>
              <span
                className="ingredient-color"
                style={{
                  backgroundColor: n.stripe,
                }}
              />
              <button className="selected-name" onClick={() => onDetails(n)}>
                {t(n.name)}
              </button>
              <button
                className="selected-remove"
                onClick={() => onRemove(n.id)}
                aria-label={t("Remove {name} from your tape", {
                  name: t(n.name),
                })}
              >
                <Icon name="plus" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="formula-caption">
        <Icon name="sprout" />
        <span>{t("Your ingredients. One simple tape.")}</span>
      </div>
      <div className="formula-flavor">
        <span>{t("YOUR FLAVOR")}</span>
        <strong>{t(flavors.find((f) => f.id === formula.flavor)?.name)}</strong>
      </div>
      <div
        className={`formula-pairing-status ${pairing.ok ? "" : "needs-review"}`}
      >
        <Icon name="sliders" />
        <div>
          <strong>
            {t(
              pairing.ok ? "Pairing rules checked" : "Pairing needs attention",
            )}
          </strong>
          <p>
            {t(
              pairing.ok
                ? "Final amounts & suitability still need review."
                : "Adjust your ingredients before continuing.",
            )}
          </p>
        </div>
        {!pairing.ok && onPairingReview && (
          <button onClick={onPairingReview}>{t("Review")}</button>
        )}
      </div>
      <p className="product-quote">{t("Good nutrition never runs out.")}</p>
    </aside>
  );
}
function SelectionCatalog({
  selectedIds,
  onToggle,
  onDetails,
  resourceMode = false,
}) {
  const { t, language } = useI18n();
  const [category, setCategory] = useState("All Nutrients");
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () => nutrients.filter((n) => matchesFilter(n, category, query, t)),
    [category, query, language],
  );
  return (
    <>
      <nav className="builder-filters" aria-label={t("Filter nutrients")}>
        {filters.map(([label, icon]) => (
          <button
            key={label}
            className={category === label ? "active" : ""}
            aria-pressed={category === label}
            onClick={() => setCategory(label)}
          >
            <Icon name={icon} />
            <span>{t(label)}</span>
          </button>
        ))}
        <a
          href={resourceMode ? "/build-your-tape" : "/ingredient-library"}
          className="library-link"
        >
          {t(resourceMode ? "Back to your tape" : "Explore ingredient library")}
          <Arrow />
        </a>
      </nav>
      <div className="catalog-panel">
        <div className="catalog-toolbar">
          <span>
            {category === "All Nutrients"
              ? t("{count} ingredients", { count: visible.length })
              : t("{count} {category} ingredients", {
                  count: visible.length,
                  category:
                    language === "zh" ? t(category) : category.toLowerCase(),
                })}
          </span>
          <label>
            <Icon name="search" />
            <input
              aria-label={t("Search nutrient library")}
              placeholder={t("Find an ingredient\u2026")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                aria-label={t("Clear ingredient search")}
                onClick={() => setQuery("")}
              >
                <Icon name="plus" />
              </button>
            )}
          </label>
        </div>
        <div
          className="catalog-scroll"
          tabIndex={0}
          aria-label={t("Nutrient cards")}
        >
          <div className="catalog-grid">
            {visible.map((n) => (
              <NutrientCard
                key={n.id}
                nutrient={n}
                chosen={selectedIds.includes(n.id)}
                onToggle={onToggle}
                onDetails={onDetails}
                resourceMode={resourceMode}
                pairingHint={
                  !resourceMode && !selectedIds.includes(n.id)
                    ? additionDecision(selectedIds, n.id).issues.find(
                        (issue) => issue.kind !== "capacity",
                      )
                    : null
                }
              />
            ))}
          </div>
          {!visible.length && (
            <div className="catalog-empty">
              <Icon name="search" />
              <h3>{t("A little more to explore.")}</h3>
              <p>{t("No ingredients match “{query}”.", { query })}</p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All Nutrients");
                }}
              >
                {t("Show all ingredients")}
                <Arrow />
              </button>
            </div>
          )}
        </div>
        <p className="reference-quantity-note">
          {t(
            "Reference amounts are from Nourished UK. Final VITA TAPE specifications are to be confirmed.",
          )}
        </p>
      </div>
    </>
  );
}
function BuilderEngineeringStory() {
  const { t, language } = useI18n();
  return (
    <section
      className="builder-engineering-story"
      aria-labelledby="builder-engineering-title"
    >
      <div className="builder-engineering-copy">
        <p className="eyebrow">{t("Our Science")}</p>
        <h2 id="builder-engineering-title">
          {t("See your choices")}
          <br />
          {t("take shape.")}
        </h2>
        <p>
          {t(
            "A connected ribbon starts with considered choices: ingredient compatibility, texture and a material that can flex, roll and portion.",
          )}
        </p>
        <p>
          {t(
            "Our proposed approach explores edible gels and multi-material fabrication. Final formulation, serving consistency and performance remain to be validated.",
          )}
        </p>
        <a className="text-link" href="/our-science#04-edible-material-science">
          {t("How Our Science Works")}
          <Arrow />
        </a>
      </div>
      <figure className="builder-engineering-figure">
        <img
          src="/assets/editorial/materials.webp"
          alt={t(
            "A conceptual multi-material fabrication process forming a colourful connected ribbon",
          )}
          width="960"
          height="720"
          loading="lazy"
        />
        <figcaption>
          {t("Material engineering concept visualization*")}
        </figcaption>
      </figure>
    </section>
  );
}
function BuilderEditorial({ flavor, onFlavor }) {
  const { t, language } = useI18n();
  const routines = [
    {
      image: "creative-desk",
      title: "A little space in your day.",
      caption: "Explore your ingredients between the things you love.",
      alt: "A bright creative desk and a relaxed everyday routine",
    },
    {
      image: "commute",
      title: "Ready when you are.",
      caption: "A personal ritual that belongs in your everyday.",
      alt: "A candid everyday commute in natural light",
    },
    {
      image: "home-portrait",
      title: "A moment that feels like you.",
      caption: "Make room for a small pause, in your own way.",
      alt: "A relaxed pause at home",
    },
  ];
  const questions = [
    [
      "How many ingredients can I choose?",
      "Choose between one and seven ingredients. Seven is a limit, not a target: a shorter rainbow is welcome too. Every starter is editable, and you can review each ingredient’s nutrition card before choosing.",
    ],
    [
      "What if a combination needs adjusting?",
      "One rainbow is consumed together, so the builder checks the complete next selection. If an addition triggers a listed rule, your existing choices stay in place and the builder explains the issue, with alternatives rechecked against your current selection. No listed conflict establishes personal safety.",
    ],
    [
      "Are final nutrient amounts confirmed?",
      "Not yet. Catalog quantities shown for reference are separate from final VITA TAPE amounts. Formulation, suppliers, serving consistency and suitability still require review; this is an academic venture simulation and an ingredient explorer.",
    ],
    [
      "Will changing the flavour reset my ingredients?",
      "No. Flavour is saved with your current draft on this device. You can change it here or in the dedicated flavour step while retaining your selected ingredients.",
    ],
  ];
  return (
    <div className="builder-editorial">
      <section
        className="builder-flavor-editorial"
        aria-labelledby="builder-flavor-story-title"
      >
        <div className="builder-flavor-story-copy">
          <p className="eyebrow">{t("Your flavour")}</p>
          <h2 id="builder-flavor-story-title">
            {t("A flavour for")}
            <br />
            {t("your ritual.")}
          </h2>
          <p>
            {t(
              "A taste that makes it yours. Explore five flavour directions and keep your current ingredients.",
            )}
          </p>
          <p className="builder-editorial-note">
            {t(
              "Flavour design concepts. Final formulations are to be confirmed.",
            )}
          </p>
        </div>
        <img
          className="builder-flavor-story-photo"
          src="/assets/editorial/rainbow-sculpture.webp"
          alt={t(
            "A bright, sculptural study of the connected rainbow ribbon material",
          )}
          width="960"
          height="720"
          loading="lazy"
        />
        <div className="builder-editorial-flavors">
          <FlavorOptions value={flavor} onChange={onFlavor} />
          <p className="builder-flavor-current" aria-live="polite">
            {t("Your current flavour:")}{" "}
            <strong>
              {t(flavors.find((option) => option.id === flavor)?.name)}
            </strong>
          </p>
        </div>
      </section>
      <section
        className="builder-routine-editorial"
        aria-labelledby="builder-routine-title"
      >
        <div className="builder-routine-heading">
          <div>
            <p className="eyebrow">{t("In real life")}</p>
            <h2 id="builder-routine-title">
              {t("A little personal.")}
              <br />
              {t("A little everyday.")}
            </h2>
          </div>
          <p className="builder-editorial-note">
            {t("Illustrative lifestyle scenes.")}
            <br />
            {t("Generated imagery; no customer testimony is implied.")}
          </p>
        </div>
        <div className="builder-routine-grid">
          {routines.map((routine) => (
            <article className="builder-routine-card" key={routine.image}>
              <img
                src={`/assets/editorial/${routine.image}.webp`}
                alt={t("{description}. Illustrative imagery.", {
                  description: t(routine.alt),
                })}
                width="640"
                height="640"
                loading="lazy"
              />
              <h3>{t(routine.title)}</h3>
              <p>{t(routine.caption)}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        className="builder-faq-editorial"
        aria-labelledby="builder-faq-title"
      >
        <div>
          <p className="eyebrow">{t("Frequently asked questions")}</p>
          <h2 id="builder-faq-title">
            {t("Your questions,")}
            <br />
            {t("answered.")}
          </h2>
          <a className="text-link" href="#tape-workspace">
            {t("Back to your tape")}
            <Arrow />
          </a>
        </div>
        <div className="builder-faq-list">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {t(question)}
                <Icon name="plus" />
              </summary>
              <p>{t(answer)}</p>
            </details>
          ))}
        </div>
      </section>
      <p className="builder-editorial-disclosure">
        {t(
          "*Proposed capabilities for an academic venture simulation. Imagery illustrates design concepts, not independently validated manufacturing or product performance.",
        )}
      </p>
    </div>
  );
}
export function BuilderPage() {
  const { t, language } = useI18n();
  const [initialFormula] = useState(
    () => readDraft() || loadFormula() || defaults,
  );
  const [formula, setFormula] = useState(initialFormula);
  const [saved, setSaved] = useState(loadFormula);
  const [step, setStep] = useState(() => {
    if (
      !getSelected(initialFormula).length ||
      !evaluateFormula(initialFormula.selected).ok
    )
      return 1;
    const requestedStep = new URLSearchParams(location.search).get("step");
    return requestedStep === "flavor" ? 2 : requestedStep === "review" ? 3 : 1;
  });
  const [detail, setDetail] = useState(null);
  const [modal, setModal] = useState(() =>
    new URLSearchParams(window.location.search).get("saved") === "1"
      ? "saved"
      : null,
  );
  const [notice, setNotice] = useState("");
  const [saveError, setSaveError] = useState("");
  const [pairingAttempt, setPairingAttempt] = useState(null);
  const [previewStarter, setPreviewStarter] = useState(null);
  const [suitability, setSuitability] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [undoFormula, setUndoFormula] = useState(null);
  const pairing = evaluateFormula(formula.selected);
  const selected = getSelected(formula);
  useEffect(() => {
    persistDraft(formula);
  }, [formula]);
  useEffect(() => {
    document.title = t("Build Your Tape — VITA TAPE");
  }, [language, t]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4800);
    return () => clearTimeout(timer);
  }, [notice]);
  function toggle(id) {
    if (formula.selected.includes(id)) {
      setUndoFormula(null);
      setFormula((f) => ({
        ...f,
        selected: f.selected.filter((x) => x !== id),
      }));
      return;
    }
    if (suitability === "review") {
      setPendingAction(null);
      setModal("suitability");
      return;
    }
    const decision = additionDecision(formula.selected, id);
    if (!decision.ok) {
      setPairingAttempt({
        id,
        issues: decision.issues,
      });
      return;
    }
    setUndoFormula(null);
    setFormula((f) => ({
      ...f,
      selected: [...f.selected, id],
    }));
  }
  function reviewPairing() {
    setPairingAttempt({
      id: null,
      issues: evaluateFormula(formula.selected).issues,
    });
  }
  function applyStarter() {
    if (suitability !== "explore" || !previewStarter) return;
    const decision = validateStarter(previewStarter.id);
    if (!decision.ok) {
      setPreviewStarter(null);
      setPairingAttempt({
        id: null,
        issues: decision.issues,
      });
      return;
    }
    setUndoFormula(formula);
    setFormula((f) => ({
      ...f,
      selected: starterIds(previewStarter),
    }));
    setNotice({
      key: "{title} is now your starting rainbow. Every ingredient is yours to edit.",
      title: previewStarter.title,
    });
    setPreviewStarter(null);
  }
  function undoStarter() {
    if (!undoFormula) return;
    if (suitability === "review") {
      setPendingAction(null);
      setModal("suitability");
      return;
    }
    const decision = evaluateFormula(undoFormula.selected);
    if (!decision.ok) {
      setNotice(
        "Your previous selection now needs review and cannot be restored automatically. Your current rainbow stays.",
      );
      return;
    }
    setFormula(undoFormula);
    setUndoFormula(null);
    setNotice("Your previous rainbow is back.");
  }
  function changeStep(next) {
    if (next > 1) {
      if (!formula.selected.length) {
        setNotice("Choose at least one ingredient before continuing.");
        return;
      }
      if (!evaluateFormula(formula.selected).ok) {
        reviewPairing();
        return;
      }
      if (suitability !== "explore") {
        setPendingAction({
          type: "step",
          next,
        });
        setModal("suitability");
        return;
      }
    }
    setStep(next);
    window.history.replaceState(
      null,
      "",
      `/build-your-tape${next === 2 ? "?step=flavor" : next === 3 ? "?step=review" : ""}`,
    );
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function save() {
    if (!formula.selected.length) {
      setNotice("Choose at least one ingredient before saving.");
      return;
    }
    if (!evaluateFormula(formula.selected).ok) {
      reviewPairing();
      return;
    }
    if (suitability !== "explore") {
      setPendingAction({
        type: "save",
      });
      setModal("suitability");
      return;
    }
    try {
      const data = {
        ...formula,
        version: 1,
        savedAt: new Date().toISOString(),
        pairingVersion,
        formulationStatus: "concept-not-cleared",
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
      setSaved(data);
      setSaveError("");
      setModal("success");
    } catch {
      setSaveError(
        "Your browser could not save your formula. Allow local storage and try again.",
      );
    }
  }
  return (
    <div className="builder-page has-page-hero" id="top">
      <a className="skip-link" href="#tape-workspace">
        {t("Skip to tape builder")}
      </a>
      <Header
        onSearch={() =>
          document.querySelector(".catalog-toolbar input")?.focus()
        }
        onSaved={() => setModal("saved")}
        saved={saved}
      />
      {step === 1 && <LandingHero kind="build" />}
      <main className="builder-canvas" id="tape-workspace">
        <div className="builder-sheet">
          <div className="tape-page-heading">
            <div>
              <p className="eyebrow">{t("Step {step} of 3", { step })}</p>
              {step === 1 ? (
                <h2 className="workspace-heading">
                  {t("Build Your Daily Tape.")}
                </h2>
              ) : (
                <h1>
                  {t(
                    step === 1
                      ? "Build Your Daily Tape."
                      : step === 2
                        ? "Find your happy flavor."
                        : "Beautifully, uniquely yours.",
                  )}
                </h1>
              )}
              <p>
                {t(
                  step === 1
                    ? "Choose up to 7 ingredients. Make a little more room for you."
                    : step === 2
                      ? "The finishing touch to a ritual that feels like yours."
                      : "Your ingredients. Your flavor. Your kind of everyday.",
                )}
              </p>
            </div>
            <div className="builder-heading-actions">
              <span className="plain-selection-count" aria-live="polite">
                {t("{count} of 7 selected", { count: selected.length })}
              </span>
              {step < 3 ? (
                <Button
                  disabled={!selected.length}
                  onClick={() => changeStep(step + 1)}
                >
                  {t("Next:")}{" "}
                  {t(step === 1 ? "Choose Flavor" : "Review My Tape")} <Arrow />
                </Button>
              ) : (
                <Button onClick={save} disabled={!selected.length}>
                  {t("Save My Formula")}
                  <Arrow />
                </Button>
              )}
            </div>
          </div>
          {step === 1 && (
            <div className={`pairing-ribbon ${pairing.ok ? "" : "has-issues"}`}>
              <Icon name="sliders" />
              <div>
                <strong>
                  {t(
                    pairing.ok
                      ? "Made to mix, with a little care."
                      : "Your saved rainbow needs attention.",
                  )}
                </strong>
                <span>
                  {t(
                    pairing.ok
                      ? "Some ingredients need a different pairing. We’ll help you find one."
                      : "A listed pairing needs review before you continue.",
                  )}
                </span>
              </div>
              <button
                onClick={() =>
                  pairing.ok ? setModal("pairing-guide") : reviewPairing()
                }
              >
                {t(pairing.ok ? "How pairing works" : "Review pairings")}{" "}
                <Arrow />
              </button>
            </div>
          )}
          {step === 1 && undoFormula && (
            <div className="starter-undo" role="status">
              <span>{t("Your starter rainbow is ready to edit.")}</span>
              <button onClick={undoStarter}>{t("Undo rainbow change")}</button>
            </div>
          )}
          {step === 1 ? (
            <div className="dedicated-workspace">
              <SelectionCatalog
                selectedIds={formula.selected}
                onToggle={toggle}
                onDetails={setDetail}
              />
              <FormulaSummary
                selected={selected}
                formula={formula}
                onRemove={toggle}
                onDetails={setDetail}
                onPairingReview={reviewPairing}
              />
            </div>
          ) : (
            <div className="later-step">
              <div className="step-choice-panel">
                {step === 2 ? (
                  <>
                    <button className="back-step" onClick={() => changeStep(1)}>
                      {t("\u2190 Back to ingredients")}
                    </button>
                    <p className="eyebrow">{t("A flavor for your everyday")}</p>
                    <h2>
                      {t("Something to look")}
                      <br />
                      {t("forward to.")}
                    </h2>
                    <FlavorOptions
                      expanded
                      value={formula.flavor}
                      onChange={(flavor) =>
                        setFormula((f) => ({
                          ...f,
                          flavor,
                        }))
                      }
                    />
                    <Button onClick={() => changeStep(3)}>
                      {t("Review My Tape")}
                      <Arrow />
                    </Button>
                  </>
                ) : (
                  <>
                    <button className="back-step" onClick={() => changeStep(2)}>
                      {t("\u2190 Back to flavors")}
                    </button>
                    <p className="eyebrow">{t("Your very own formula")}</p>
                    <h2>
                      {t("A little personal")}
                      <br />
                      {t("attention.")}
                    </h2>
                    <label className="name-label">
                      {t("Give your formula a name")}
                      <span>{t("(optional)")}</span>
                      <input
                        placeholder={t("My brighter days")}
                        maxLength={40}
                        value={formula.name}
                        onChange={(e) =>
                          setFormula((f) => ({
                            ...f,
                            name: e.target.value,
                          }))
                        }
                      />
                    </label>
                    <div className="final-spec-list">
                      {selected.map((n) => (
                        <div key={n.id}>
                          <span
                            className="ingredient-color"
                            style={{
                              backgroundColor: n.stripe,
                            }}
                          />
                          <strong>{t(n.name)}</strong>
                          <span>
                            {n.amount.status === "reference"
                              ? t("{amount} reference", {
                                  amount: n.amount.display,
                                })
                              : t("Amount pending")}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="review-persistence-note">
                      {t(
                        "Save an ingredient concept on this device. Final amounts, formulation and personal suitability still need review.",
                      )}
                    </p>
                    {saveError && (
                      <p role="alert" className="form-error">
                        {t(saveError)}
                      </p>
                    )}
                    <Button onClick={save}>
                      {t("Save My Formula")}
                      <Arrow />
                    </Button>
                  </>
                )}
              </div>
              <FormulaSummary
                selected={selected}
                formula={formula}
                onRemove={toggle}
                onDetails={setDetail}
                onPairingReview={reviewPairing}
              />
            </div>
          )}
          {step === 1 && (
            <div className="builder-flavor-footer">
              <div>
                <strong>{t("Choose Your Flavor")}</strong>
                <p>{t("A light, natural taste to make it yours.")}</p>
              </div>
              <FlavorOptions
                value={formula.flavor}
                onChange={(flavor) =>
                  setFormula((f) => ({
                    ...f,
                    flavor,
                  }))
                }
              />
            </div>
          )}
          {step === 1 && (
            <>
              <BuilderEngineeringStory />
              <StarterRainbows onUse={setPreviewStarter} />
            </>
          )}
        </div>
        <div className="builder-bottom-line">
          <a href="/#home">{t("\u2190 Back to VITA TAPE")}</a>
          <span>{t("Small rituals. Brighter days.")}</span>
          <a href="/ingredient-library">
            {t("Ingredient library")}
            <Arrow />
          </a>
        </div>
      </main>
      {step === 1 && (
        <BuilderEditorial
          flavor={formula.flavor}
          onFlavor={(flavor) =>
            setFormula((current) => ({
              ...current,
              flavor,
            }))
          }
        />
      )}
      <div className="mobile-tape-dock">
        <button
          className="mobile-preview-button"
          onClick={() => setModal("preview")}
          aria-label={t("View final tape preview")}
        >
          <RealisticTape selected={selected} />
          <span>
            <strong>{t("Your Daily Tape")}</strong>
            <small>
              {t("{count} of 7 ingredients", { count: selected.length })}
            </small>
          </span>
        </button>
        <Button
          disabled={!selected.length}
          onClick={() => (step < 3 ? changeStep(step + 1) : save())}
        >
          {t(
            step === 1
              ? "Choose Flavor"
              : step === 2
                ? "Review My Tape"
                : "Save My Formula",
          )}{" "}
          <Arrow />
        </Button>
      </div>
      {pairingAttempt && (
        <PairingDialog
          attemptedId={pairingAttempt.id}
          issues={pairingAttempt.issues}
          selectedIds={formula.selected}
          onClose={() => setPairingAttempt(null)}
          onAlternative={(id) => {
            setPairingAttempt(null);
            toggle(id);
          }}
          onRemove={(id) => {
            toggle(id);
            setPairingAttempt(null);
          }}
        />
      )}
      {previewStarter && (
        <StarterReview
          starter={previewStarter}
          selectedCount={selected.length}
          suitability={suitability}
          onSuitability={setSuitability}
          onApply={applyStarter}
          onClose={() => setPreviewStarter(null)}
        />
      )}
      {modal === "pairing-guide" && (
        <PairingGuide onClose={() => setModal(null)} />
      )}
      {modal === "suitability" && (
        <Modal
          title={t("A little care before you continue.")}
          onClose={() => setModal(null)}
        >
          <p className="modal-intro">
            {t("Ingredient ideas are only a starting point.")}
          </p>
          <SuitabilityCheck value={suitability} onChange={setSuitability} />
          <p className="pairing-boundary">
            {t(
              "Final amounts and suitability still need review. This is an ingredient concept, not a cleared product formula.",
            )}
          </p>
          {pendingAction && (
            <Button
              className="detail-add"
              disabled={suitability !== "explore"}
              onClick={() => {
                setModal(null);
                if (pendingAction.type === "save") save();
                else changeStep(pendingAction.next);
                setPendingAction(null);
              }}
            >
              {t("Continue exploring")}
              <Arrow />
            </Button>
          )}
          <button className="starter-cancel" onClick={() => setModal(null)}>
            {t("Back to browsing")}
          </button>
        </Modal>
      )}
      {modal === "preview" && (
        <Modal title={t("Your Daily Tape")} onClose={() => setModal(null)}>
          <p className="modal-intro">
            {t("Your ingredients. One simple tape.")}
          </p>
          <div className="mobile-tape-detail">
            <RealisticTape selected={selected} large />
            <div className="mobile-tape-ingredient-list">
              {selected.map((n) => (
                <div key={n.id}>
                  <span
                    className="ingredient-color"
                    style={{
                      backgroundColor: n.stripe,
                    }}
                  />
                  <span>{t(n.name)}</span>
                  <button
                    aria-label={t("Remove {name} from preview", {
                      name: t(n.name),
                    })}
                    onClick={() => toggle(n.id)}
                  >
                    <Icon name="plus" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <p>{t(flavors.find((f) => f.id === formula.flavor)?.name)}</p>
          <Button
            disabled={!selected.length}
            onClick={() => {
              setModal(null);
              changeStep(2);
            }}
          >
            {t("Choose Flavor")}
            <Arrow />
          </Button>
        </Modal>
      )}
      {detail && (
        <IngredientDetails
          nutrient={detail}
          onClose={() => setDetail(null)}
          onToggle={toggle}
          chosen={formula.selected.includes(detail.id)}
        />
      )}
      {notice && (
        <div role="status" className="toast">
          <Icon name="sprout" />
          <span>
            {typeof notice === "string"
              ? t(notice)
              : t(notice.key, { title: t(notice.title) })}
          </span>
          <button
            aria-label={t("Dismiss notification")}
            onClick={() => setNotice("")}
          >
            <Icon name="plus" />
          </button>
        </div>
      )}
      <PageFooter />
      {modal === "success" && (
        <Modal
          title={t("Your brighter days, saved.")}
          onClose={() => setModal(null)}
        >
          <div className="success-mark">
            <Icon name="check" />
          </div>
          <p className="modal-intro">
            {t("{name} is saved locally on this device.", {
              name: formula.name || t("Your Daily Tape"),
            })}
          </p>
          <p>
            {t("{count} ingredients, {flavour}, and a little more you.", {
              count: selected.length,
              flavour: t(
                flavors.find((f) => f.id === formula.flavor)?.name,
              ).toLowerCase(),
            })}
          </p>
          <p className="pairing-boundary">
            {t(
              "Saved as an ingredient concept. Final amounts, formulation and personal suitability still need review.",
            )}
          </p>
          <Button onClick={() => setModal(null)}>
            {t("Keep exploring")}
            <Arrow />
          </Button>
        </Modal>
      )}
      {modal === "saved" && (
        <Modal
          title={t("Your little collection.")}
          onClose={() => setModal(null)}
        >
          {saved ? (
            <>
              <p className="modal-intro">
                {saved.name || t("Your Daily Tape")}
              </p>
              <RealisticTape selected={getSelected(saved)} />
              <p>
                {getSelected(saved)
                  .map((n) => t(n.name))
                  .join(" · ")}
              </p>
              <p>{t(flavors.find((f) => f.id === saved.flavor)?.name)}</p>
              <Button
                onClick={() => {
                  setFormula({
                    ...saved,
                  });
                  changeStep(1);
                  setModal(null);
                }}
              >
                {t("Edit my formula")}
                <Arrow />
              </Button>
              <button
                className="text-link clear-formula"
                onClick={() => {
                  try {
                    localStorage.removeItem(storageKey);
                    setSaved(null);
                    setModal(null);
                    setNotice("Saved formula cleared from this device.");
                  } catch {
                    setNotice(
                      "Your browser could not clear the saved formula.",
                    );
                  }
                }}
              >
                {t("Clear saved formula")}
              </button>
            </>
          ) : (
            <>
              <p className="modal-intro">
                {t("Your next favorite ritual has a little space here.")}
              </p>
              <Button
                onClick={() => {
                  changeStep(1);
                  setModal(null);
                }}
              >
                {t("Build Your Tape")}
                <Arrow />
              </Button>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}
export function IngredientLibraryPage() {
  const { t, language } = useI18n();
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    document.title = t("Ingredient Library — VITA TAPE");
  }, [language, t]);
  return (
    <div className="builder-page resource-library-page">
      <Header
        onSearch={() =>
          document.querySelector(".catalog-toolbar input")?.focus()
        }
        onSaved={() => window.location.assign("/build-your-tape")}
        saved={loadFormula()}
      />
      <main className="builder-canvas">
        <div className="builder-sheet">
          <div className="tape-page-heading">
            <div>
              <p className="eyebrow">
                {t("Thoughtfully chosen. Yours to explore.")}
              </p>
              <h1>{t("A little ingredient curiosity.")}</h1>
              <p>
                {t(
                  "{count} ingredients. Their story, their sources, and the details that matter.",
                  { count: libraryMetadata.items.length },
                )}
              </p>
            </div>
            <a className="button" href="/build-your-tape">
              {t("Build Your Tape")}
              <Arrow />
            </a>
          </div>
          <div className="resource-catalog">
            <SelectionCatalog
              selectedIds={[]}
              onToggle={() => {}}
              onDetails={setDetail}
              resourceMode
            />
          </div>
          <div className="resource-downloads">
            <span>{t("Explore the complete ingredient reference")}</span>
            <a href="/resources/nutrients/catalog.json" download>
              {t("JSON resource")}
            </a>
            <a href="/resources/nutrients/catalog.csv" download>
              {t("CSV resource")}
            </a>
          </div>
        </div>
      </main>
      {detail && (
        <IngredientDetails
          nutrient={detail}
          onClose={() => setDetail(null)}
          resourceMode
        />
      )}
    </div>
  );
}
