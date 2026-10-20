import { useI18n, LanguageSwitcher } from "./i18n";
import { useEffect, useState } from "react";
import { LandingHero } from "./LandingHero";
import {
  img,
  nutrients,
  categories,
  flavors,
  defaults,
  loadFormula,
  storageKey,
  readDraft,
  persistDraft,
} from "./data";
import { IngredientDetails } from "./IngredientDetails";
import { additionDecision, evaluateFormula } from "./pairing-engine";
import { PairingDialog } from "./PairingUI";
import {
  Icon,
  Arrow,
  Button,
  Modal,
  FlavorOptions,
  TapePreview,
  NutrientList,
} from "./components";

const bubuWebsite = "https://bubu-care-daily.yvonneniu.chatgpt.site";

export function Header({ onSearch, onSaved, saved }) {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    ["Home", "/"],
    ["Build Your Tape", "/build-your-tape"],
    ["Our Science", "/our-science"],
    ["Reviews", "/reviews"],
    ["Why VITA TAPE", "/about-us"],
  ];
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  useEffect(() => {
    function onEscape(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);
  return (
    <header className="header site-header">
      <a className="logo" href="/" aria-label={t("VITA TAPE home")}>
        <img
          src={img("brand/vita_tape_logo_raster_exact_UPSCALED_2x.png")}
          alt="VITA TAPE"
          width="153"
          height="36"
        />
      </a>
      <nav
        id="main-navigation"
        className={menuOpen ? "nav open" : "nav"}
        aria-label={t("Main navigation")}
      >
        {nav.map(([label, to]) => (
          <a
            key={label}
            href={to}
            aria-current={
              currentPath === to ||
              (to === "/build-your-tape" &&
                currentPath === "/find-out-what-you-need")
                ? "page"
                : undefined
            }
            onClick={() => setMenuOpen(false)}
          >
            {t(label)}
          </a>
        ))}
        <a
          className="mobile-bubu"
          href={bubuWebsite}
          target="_blank"
          rel="noopener noreferrer"
          title={t("Open BUBU补补 website (opens in a new tab)")}
          aria-label={t("Open BUBU补补 website (opens in a new tab)")}
          onClick={() => setMenuOpen(false)}
        >
          BUBU补补 <Arrow />
        </a>
      </nav>
      <div className="header-actions">
        <button
          className="icon-button"
          aria-label={t("Search ingredients")}
          onClick={
            onSearch || (() => window.location.assign("/ingredient-library"))
          }
        >
          <Icon name="search" />
        </button>
        <button
          className="icon-button account-button"
          aria-label={t("View saved formula")}
          onClick={
            onSaved ||
            (() => window.location.assign("/build-your-tape?saved=1"))
          }
        >
          <Icon name="account" />
        </button>
        <button
          className="icon-button bag-button"
          aria-label={t("Open your formula bag")}
          onClick={
            onSaved ||
            (() => window.location.assign("/build-your-tape?saved=1"))
          }
        >
          <Icon name="shopping-bag" />
          {saved && <span className="bag-dot" />}
        </button>
        <a
          className="button nav-cta bubu-entry"
          href={bubuWebsite}
          target="_blank"
          rel="noopener noreferrer"
          title={t("Open BUBU补补 website (opens in a new tab)")}
          aria-label={t("Open BUBU补补 website (opens in a new tab)")}
        >
          BUBU补补 <Arrow />
        </a>
        <LanguageSwitcher />
        <button
          className="menu-button"
          aria-label={t(menuOpen ? "Close navigation" : "Open navigation")}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name="sliders" />
        </button>
      </div>
    </header>
  );
}
function Hero({ onHow }) {
  return <LandingHero kind="home" onHow={onHow} />;
}
function OurWhy() {
  const { t } = useI18n();
  return (
    <section className="our-why" id="our-story" aria-labelledby="why-title">
      <img
        className="why-photo"
        src="/assets/editorial/morning-cup-realistic-v2.webp"
        alt={t(
          "A quiet morning: a woman holding a warm cup in the sunshine. More good days ahead.",
        )}
        loading="lazy"
      />
      <div className="why-copy">
        <h2 id="why-title">
          {t("Because you’re more")}
          <br />
          {t("than one-size-fits-all.")}
        </h2>
        <p>
          {t(
            "Your body. Your goals. Your everyday. Nutrition should fit your life —",
          )}
          <br className="desktop-break" />{" "}
          {t(
            "not the other way around. VITA TAPE makes it easy to get the nutrients you need, in a form that’s simple, beautiful, and uniquely yours.",
          )}
        </p>
        <div className="why-benefits">
          <div>
            <Icon name="sprout" />
            <span>
              {t("Personalized")}
              <br />
              {t("for your journey")}
            </span>
          </div>
          <div>
            <Icon name="sun" />
            <span>
              {t("Supports a brighter,")}
              <br />
              {t("healthier you")}
            </span>
          </div>
          <div>
            <Icon name="heart" />
            <span>
              {t("A small ritual")}
              <br />
              {t("with a bigger impact")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
function Builder({
  formula,
  setFormula,
  onContinue,
  onDetails,
  onIngredient,
  onToggle,
}) {
  const { t } = useI18n();
  const [category, setCategory] = useState("All Nutrients");
  const selected = nutrients.filter((n) => formula.selected.includes(n.id));
  const visible = nutrients.filter((n) =>
    category === "All Nutrients"
      ? !n.extended
      : n.category === category ||
        (category === "Probiotics" && n.category === "Biotics") ||
        n.goals.includes(category),
  );
  return (
    <section
      className="builder-section"
      id="builder"
      aria-labelledby="builder-title"
    >
      <div className="builder-main">
        <div className="builder-heading">
          <p className="eyebrow">{t("Step 1 of 3")}</p>
          <h2 id="builder-title">{t("Build Your Daily Tape.")}</h2>
          <p>
            {t(
              "Choose the nutrients that support your goals. We’ll create your personalized daily tape — uniquely yours.",
            )}
          </p>
        </div>
        <div className="builder-workspace">
          <nav className="categories" aria-label={t("Nutrient categories")}>
            {categories.map(([c, i]) => (
              <button
                key={c}
                aria-pressed={category === c}
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
              >
                <Icon name={i} />
                {t(c)}
              </button>
            ))}
          </nav>
          <div
            className="nutrient-grid"
            aria-label={
              category === "All Nutrients"
                ? t("All ingredients")
                : t("{category} ingredients", { category: t(category) })
            }
          >
            {visible.map((n) => (
              <article
                key={n.id}
                className={`nutrient-card ${formula.selected.includes(n.id) ? "selected" : ""}`}
                style={{ backgroundColor: n.color }}
              >
                <button
                  className="home-card-details"
                  aria-label={t("Nutrition card for {name}", {
                    name: t(n.name),
                  })}
                  aria-haspopup="dialog"
                  onClick={() => onIngredient(n.id)}
                />
                <img
                  className="nutrient-art"
                  src={n.artwork}
                  alt={t(n.artworkAlt)}
                  loading="lazy"
                  decoding="async"
                />
                <Icon name={n.icon} />
                <span className="nutrient-name">{t(n.name)}</span>
                <span className="nutrient-summary">{t(n.summary)}</span>
                <button
                  className="add-circle"
                  aria-label={t(
                    formula.selected.includes(n.id)
                      ? "Remove {name}"
                      : "Add {name}",
                    { name: t(n.name) },
                  )}
                  aria-pressed={formula.selected.includes(n.id)}
                  onClick={() => onToggle(n.id)}
                >
                  <Icon
                    name={formula.selected.includes(n.id) ? "check" : "plus"}
                  />
                </button>
              </article>
            ))}
            {category !== "All Nutrients" && (
              <button
                className="show-all"
                onClick={() => setCategory("All Nutrients")}
              >
                {t("Explore all nutrients")}
                <Arrow />
              </button>
            )}
          </div>
        </div>
      </div>
      <aside
        className="formula-summary"
        aria-label={t("Your daily tape summary")}
      >
        <h3>{t("Your Daily Tape")}</h3>
        <p>{t("A personalized blend for a brighter you.")}</p>
        <div className="formula-visual">
          <TapePreview selected={selected} />
          <NutrientList selected={selected} onRemove={onToggle} />
        </div>
        <span className="layer-count" aria-live="polite">
          {t("{count} of 7 nutrients selected", { count: selected.length })}
        </span>
        <Button onClick={onContinue}>
          {t("Build Your Tape")}
          <Arrow />
        </Button>
        <button className="text-link" onClick={onDetails}>
          {t("View full ingredients & amounts")}
        </button>
      </aside>
      <div className="flavor-strip">
        <div>
          <strong>{t("Choose Your Flavor")}</strong>
          <p>{t("A light, natural taste to make it yours.")}</p>
        </div>
        <FlavorOptions
          value={formula.flavor}
          onChange={(flavor) => setFormula((f) => ({ ...f, flavor }))}
        />
      </div>
    </section>
  );
}
function Reviews() {
  const { t } = useI18n();
  const stories = [
    {
      image: "commute",
      title: "On your way.",
      alt: "An everyday commute in the morning light",
    },
    {
      image: "home-portrait",
      title: "A moment at home.",
      alt: "A relaxed everyday moment at home",
    },
    {
      image: "desk-portrait",
      title: "Between busy days.",
      alt: "A candid pause during the working day",
    },
  ];
  return (
    <section
      className="reviews-section home-reviews"
      id="reviews"
      aria-labelledby="reviews-title"
    >
      <div className="reviews-intro">
        <p className="eyebrow">{t("Everyday rituals. Shared stories.")}</p>
        <h2 id="reviews-title">
          {t("Real people.")}
          <br />
          {t("Brighter days.")}
        </h2>
        <p className="reviews-preview-note">
          {t("Design preview · Real feedback pending.")}
        </p>
        <a className="text-link" href="/reviews">
          {t("Read Reviews")}
          <Arrow />
        </a>
      </div>
      {stories.map(({ image, title, alt }) => (
        <article className="review-card home-review-card" key={image}>
          <img
            className="review-lifestyle-photo"
            src={`/assets/editorial/${image}.webp`}
            alt={t("{scene}. Illustrative imagery.", { scene: t(alt) })}
            loading="lazy"
            width="320"
            height="400"
          />
          <div>
            <h3>{t(title)}</h3>
            <p>{t("Real customer feedback to be added.")}</p>
            <span className="review-note">
              {t("Review layout preview")}
              <br />
              {t("Illustrative imagery")}
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}
function ScienceOverview() {
  const { t } = useI18n();
  const chapters = [
    {
      id: "01-formulation-science",
      image: "formulation",
      title: "Formulation Science",
      description:
        "Ingredient compatibility, form and balance — considered together.",
      alt: "A formulation concept combining research notes and coloured ribbon materials",
    },
    {
      id: "02-precision-dosing",
      image: "precision",
      title: "Precision Dosing",
      description:
        "A defined daily portion, designed around one transverse tear.",
      alt: "A close study of connected nutrient lanes and portioning",
    },
    {
      id: "04-edible-material-science",
      image: "materials",
      title: "Edible Material Science",
      description:
        "Exploring texture, flexibility and multi-material fabrication.",
      alt: "An edible multi-material forming and manufacturing concept",
    },
    {
      id: "06-freshness-engineering",
      image: "freshness",
      title: "Freshness Engineering",
      description:
        "Weekly refill concepts that help protect each daily portion.",
      alt: "The ivory VITA TAPE refill cassette in warm natural light",
    },
  ];
  return (
    <section
      className="ingredients-section home-science"
      id="our-science"
      aria-labelledby="science-overview-title"
    >
      <div className="ingredients-heading">
        <div>
          <p className="eyebrow">{t("Our Science")}</p>
          <h2 id="science-overview-title">{t("Science in every serving.")}</h2>
        </div>
        <div>
          <p>{t("Pure by choice. Precise by design. Fresh by science.")}</p>
          <a className="text-link" href="/our-science">
            {t("Explore Our Science")}
            <Arrow />
          </a>
        </div>
      </div>
      <div className="ingredient-grid science-overview-grid">
        {chapters.map((chapter) => (
          <article
            className="ingredient-card science-overview-card"
            key={chapter.id}
          >
            <a
              className="science-image-link"
              href={`/our-science#${chapter.id}`}
              aria-label={t("Explore {title}", { title: t(chapter.title) })}
            >
              <img
                className="ingredient-photo"
                src={`/assets/editorial/${chapter.image}.webp`}
                alt={t("{scene}. Proposed concept.", { scene: t(chapter.alt) })}
                loading="lazy"
                width="640"
                height="480"
              />
            </a>
            <div>
              <h3>{t(chapter.title)}</h3>
              <p>{t(chapter.description)}</p>
              <div className="science-card-bottom">
                <span>{t("Concept*")}</span>
                <a className="text-link" href={`/our-science#${chapter.id}`}>
                  {t("Learn more")}
                  <Arrow />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="home-concept-note">
        {t(
          "*Proposed capabilities. Academic venture simulation; product performance remains to be validated.",
        )}
      </p>
    </section>
  );
}
function Footer() {
  const { t } = useI18n();
  const standards = [
    ["sprout", "Traceable ingredients*", "Quality and traceability by design"],
    [
      "settings",
      "Precision manufacturing*",
      "Developed around a defined daily portion",
    ],
    ["package", "Flexible subscription*", "A routine that moves with you"],
    ["globe", "Kinder tomorrow*", "Refill-led packaging concepts"],
  ];
  return (
    <>
      <div className="standards">
        {standards.map(([i, title, sub]) => (
          <div key={title}>
            <Icon name={i} />
            <span>
              <strong>{t(title)}</strong>
              <small>{t(sub)}</small>
            </span>
          </div>
        ))}
      </div>
      <footer className="sunset">
        <img
          className="sunset-photo"
          src="/assets/sunset-panorama.webp"
          alt={t(
            "Golden coastal sunset with a woman looking toward the horizon",
          )}
          loading="lazy"
        />
        <div className="sunset-copy">
          <p className="eyebrow">{t("A healthier tomorrow rolls forward")}</p>
          <h2>
            {t("Start Your Personalized")}
            <br />
            {t("Nutrition Today.")}
          </h2>
          <p>{t("Clean ingredients. Real progress. A brighter you.")}</p>
          <a className="button" href="/build-your-tape">
            {t("Build Your Daily Tape")}
            <Arrow />
          </a>
        </div>
      </footer>
      <div className="legal">
        <span>© {new Date().getFullYear()} VITA TAPE</span>
        <span>
          {t(
            "Academic venture simulation · Proposed capabilities · Illustrative imagery",
          )}
        </span>
        <a href="/#home">{t("Back to top ↑")}</a>
      </div>
    </>
  );
}
export function App() {
  const { t, language } = useI18n();
  useEffect(() => {
    document.title = t("VITA TAPE — Nutrition Made Personal");
  }, [language]);
  const [saved, setSaved] = useState(loadFormula);
  const [formula, setFormula] = useState(
    () => readDraft() || loadFormula() || defaults,
  );
  useEffect(() => {
    persistDraft(formula);
  }, [formula]);
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [pairingAttempt, setPairingAttempt] = useState(null);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4800);
    return () => clearTimeout(timer);
  }, [toast]);
  const selected = nutrients.filter((n) => formula.selected.includes(n.id));
  function toggleIngredient(id) {
    if (formula.selected.includes(id)) {
      setFormula((current) => ({
        ...current,
        selected: current.selected.filter((selectedId) => selectedId !== id),
      }));
      return;
    }
    const decision = additionDecision(formula.selected, id);
    if (!decision.ok) {
      setModal(null);
      setPairingAttempt({ id, issues: decision.issues });
      return;
    }
    setFormula((current) => ({
      ...current,
      selected: [...current.selected, id],
    }));
    setPairingAttempt(null);
  }
  function beginBuild() {
    const pairing = evaluateFormula(formula.selected);
    if (!pairing.ok) {
      setPairingAttempt({ id: null, issues: pairing.issues });
      return;
    }
    if (!persistDraft(formula)) {
      setToast(
        "Your browser couldn’t keep your choices. Allow browser storage, then try again. Your selections are still here.",
      );
      return;
    }
    window.location.assign("/build-your-tape");
  }
  const currentIngredient = modal?.startsWith("ingredient:")
    ? nutrients.find((n) => n.id === modal.split(":")[1])
    : null;
  const searchResults = nutrients.filter((n) =>
    `${n.name} ${n.nameZh || ""} ${t(n.name)} ${n.summary} ${t(n.summary)} ${n.goals.join(" ")} ${n.goals.map((goal) => t(goal)).join(" ")} ${n.category} ${t(n.category)}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <>
      <a className="skip-link" href="/build-your-tape">
        {t("Skip to tape builder")}
      </a>
      <div className="site homepage" id="home">
        <div className="opening">
          <Header
            onSearch={() => {
              setSearch("");
              setModal("search");
            }}
            onSaved={() => setModal("saved")}
            saved={saved}
          />
          <Hero onHow={() => setModal("how")} />
        </div>
        <main>
          <OurWhy />
          <Builder
            formula={formula}
            setFormula={setFormula}
            onContinue={beginBuild}
            onDetails={() => setModal("details")}
            onIngredient={(id) => setModal(`ingredient:${id}`)}
            onToggle={toggleIngredient}
          />
          <Reviews />
          <ScienceOverview />
        </main>
        <Footer />
      </div>
      {toast && (
        <div className="toast" role="status">
          <Icon name="sprout" />
          <span>{t(toast)}</span>
          <button
            aria-label={t("Dismiss notification")}
            onClick={() => setToast("")}
          >
            <Icon name="plus" />
          </button>
        </div>
      )}
      {modal === "how" && (
        <Modal
          title={t("A small ritual. Made yours.")}
          onClose={() => setModal(null)}
        >
          <p className="modal-intro">
            {t("A brighter everyday starts with a little personal attention.")}
          </p>
          <ol className="how-steps">
            <li>
              <span>01</span>
              <div>
                <h3>{t("Choose your nutrients")}</h3>
                <p>
                  {t(
                    "Explore the ingredients and choose up to seven for your daily tape.",
                  )}
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>{t("Find your flavor")}</h3>
                <p>
                  {t(
                    "From sunny citrus to fresh mint, make your ritual something to look forward to.",
                  )}
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>{t("Make it personal")}</h3>
                <p>
                  {t(
                    "Name your formula and save it, ready to revisit whenever you like.",
                  )}
                </p>
              </div>
            </li>
          </ol>
          <a
            href="/build-your-tape"
            className="button"
            onClick={() => setModal(null)}
          >
            {t("Let’s build your tape")}
            <Arrow />
          </a>
        </Modal>
      )}
      {modal === "search" && (
        <Modal
          title={t("A little ingredient curiosity?")}
          onClose={() => setModal(null)}
        >
          <label className="search-field">
            <Icon name="search" />
            <input
              autoFocus
              aria-label={t("Search nutrients")}
              placeholder={t("Try magnesium, immunity, or sleep…")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <div className="search-results">
            {searchResults.map((n) => (
              <button key={n.id} onClick={() => setModal(`ingredient:${n.id}`)}>
                <span className="color-dot" style={{ background: n.stripe }} />
                <span>
                  <strong>{t(n.name)}</strong>
                  <small>{t(n.summary)}</small>
                </span>
                <Arrow />
              </button>
            ))}
            {!searchResults.length && (
              <p>{t("No ingredients found. Try “vitamin” or “calm”.")}</p>
            )}
          </div>
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
              <div className="review-formula">
                <TapePreview
                  selected={nutrients.filter((n) =>
                    saved.selected.includes(n.id),
                  )}
                />
                <div>
                  <NutrientList
                    selected={nutrients.filter((n) =>
                      saved.selected.includes(n.id),
                    )}
                  />
                  <p>{t(flavors.find((f) => f.id === saved.flavor)?.name)}</p>
                </div>
              </div>
              <p className="save-note">
                {t("Saved on this device. Your formula is ready to revisit.")}
              </p>
              <a
                className="button"
                href="/build-your-tape"
                onClick={() => {
                  persistDraft(saved);
                  setFormula({ ...saved });
                  setModal(null);
                }}
              >
                {t("Edit my formula")}
                <Arrow />
              </a>
              <button
                className="text-link clear-formula"
                onClick={() => {
                  try {
                    localStorage.removeItem(storageKey);
                    setSaved(null);
                    setModal(null);
                    setToast("Saved formula cleared from this device.");
                  } catch {
                    setToast(
                      "Your browser could not clear the saved formula. Please try again.",
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
                {t("There’s a little room here for your next favorite ritual.")}
              </p>
              <p>
                {t(
                  "Build your daily tape and save your formula to see it here.",
                )}
              </p>
              <a
                className="button"
                href="/build-your-tape"
                onClick={() => setModal(null)}
              >
                {t("Build Your Tape")}
                <Arrow />
              </a>
            </>
          )}
        </Modal>
      )}
      {currentIngredient && (
        <IngredientDetails
          nutrient={currentIngredient}
          chosen={formula.selected.includes(currentIngredient.id)}
          onClose={() => setModal(null)}
          onToggle={toggleIngredient}
        />
      )}
      {pairingAttempt && (
        <PairingDialog
          attemptedId={pairingAttempt.id}
          issues={pairingAttempt.issues}
          selectedIds={formula.selected}
          onClose={() => setPairingAttempt(null)}
          onAlternative={toggleIngredient}
          onRemove={(id) => {
            const next = formula.selected.filter(
              (selectedId) => selectedId !== id,
            );
            setFormula((current) => ({ ...current, selected: next }));
            const check = evaluateFormula(next);
            setPairingAttempt(
              check.ok ? null : { id: null, issues: check.issues },
            );
          }}
        />
      )}
      {(modal === "details" || modal === "library") && (
        <Modal
          title={t(
            modal === "details"
              ? "A closer look at your tape."
              : "Good ingredients. A little closer.",
          )}
          onClose={() => setModal(null)}
        >
          <p className="modal-intro">
            {modal === "details"
              ? t("{count} thoughtfully chosen nutrients, {flavor}.", {
                  count: selected.length,
                  flavor: t(
                    flavors.find((f) => f.id === formula.flavor)?.name,
                  )?.toLowerCase(),
                })
              : t("Explore the ingredients behind a more personal ritual.")}
          </p>
          <div className="ingredient-library">
            {(modal === "details" ? selected : nutrients).map((n) => (
              <button key={n.id} onClick={() => setModal(`ingredient:${n.id}`)}>
                <span className="color-dot" style={{ background: n.stripe }} />
                <span>
                  <strong>{t(n.name)}</strong>
                  <small>{t(n.summary)}</small>
                </span>
                <Arrow />
              </button>
            ))}
          </div>
          <p className="save-note">
            {t(
              "Amounts and product specifications will be confirmed on the finished product label. This explorer does not provide dosing advice.",
            )}
          </p>
        </Modal>
      )}
    </>
  );
}
