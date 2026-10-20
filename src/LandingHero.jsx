import { useI18n } from "./i18n";
import { PlayCircle } from "@phosphor-icons/react/dist/csr/PlayCircle";
import { Arrow, Icon } from "./components";

const content = {
  home: {
    eyebrow: "Small rituals. Brighter days.",
    title: ["Nutrition", "Made Personal."],
    description: [
      "Clean ingredients. Real progress.",
      "A simple way to get the nutrients you need,",
      "for a brighter, healthier tomorrow.",
    ],
    primary: "Build Your Personalized Tape",
    href: "/build-your-tape",
    secondary: "How It Works",
    alt: "Open VITA TAPE and its refill on a sunny breakfast table beside coffee, fruit and green plants",
  },
  about: {
    eyebrow: "About Us",
    title: ["Small rituals.", "Brighter days."],
    description: [
      "Thoughtfully designed nutrition,",
      "made to fit the way you live.",
    ],
    primary: "Discover Our Story",
    href: "#our-purpose",
    alt: "A relaxed morning at home, preparing breakfast beside the closed VITA TAPE case",
  },
  build: {
    image: "/assets/page-heroes/build-precision-v3.webp",
    eyebrow: "Build Your Tape",
    title: ["Your routine.", "Your rainbow."],
    description: [
      "Explore the ingredients.",
      "Create a Tape that fits your everyday.",
    ],
    primary: "Start Building",
    href: "#tape-workspace",
    secondary: "Find Out What You Need",
    secondaryHref: "/find-out-what-you-need",
    alt: "Concept visualization of seven separate nutrient strips joining into one rainbow gummy tape on a precision glass fabrication bed",
  },
  science: {
    eyebrow: "Our Science",
    title: ["Science in", "every serving."],
    description: ["Pure by choice. Precise by design.", "Fresh by science."],
    primary: "Discover the Science",
    href: "#01-formulation-science",
    alt: "Ingredient books, ginger, citrus and observation tools beside VITA TAPE on a bright research tabletop",
  },
  reviews: {
    eyebrow: "Reviews",
    title: ["Everyday rituals.", "Shared stories."],
    description: [
      "The moments, routines and experiences",
      "behind a more personal approach to nutrition.",
    ],
    primary: "Read the Stories",
    href: "#community-stories",
    secondary: "Share Your Story",
    secondaryHref: "#share-your-story",
    alt: "Two friends talking over tea at home, with a VITA TAPE case on the table; illustrative lifestyle scene",
  },
};
const benefits = [
  ["sprout", "Clean ingredients"],
  ["sun", "Real benefits"],
  ["heart", "Personalized for you"],
  ["globe", "A kinder tomorrow"],
];

export function LandingHero({ kind = "home", onHow }) {
  const { t } = useI18n();
  const c = content[kind];
  return (
    <section
      className={`page-hero hero--${kind}`}
      aria-labelledby={`${kind}-hero-title`}
    >
      <img
        className="page-hero-photo"
        src={c.image || `/assets/page-heroes/${kind}.png`}
        alt={t(c.alt)}
        fetchPriority="high"
        width="1672"
        height="941"
      />
      <div className="hero-inner">
        <div className="hero-content">
          <p className="eyebrow">{t(c.eyebrow)}</p>
          <h1 id={`${kind}-hero-title`}>
            {c.title.map((line, index) => (
              <span key={line}>
                {t(line)}
                {index < c.title.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p className="hero-lead">
            {c.description.map((line, index) => (
              <span key={line}>
                {t(line)}
                {index < c.description.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
          {kind === "science" && (
            <p className="hero-serving">
              {t(
                "Seven selected nutrients. One precisely defined daily ribbon.",
              )}
              <a
                href="#science-disclaimer"
                aria-label={t("Read proposed product capability disclosure")}
              >
                *
              </a>
            </p>
          )}
          <div className="hero-actions">
            <a className="button" href={c.href}>
              {t(c.primary)} <Arrow />
            </a>
            {c.secondary &&
              (onHow ? (
                <button className="button button-secondary" onClick={onHow}>
                  <PlayCircle size={24} aria-hidden="true" />
                  {t(c.secondary)}
                </button>
              ) : (
                <a className="button button-secondary" href={c.secondaryHref}>
                  {t(c.secondary)} <Arrow />
                </a>
              ))}
          </div>
          {kind === "home" && (
            <div className="hero-principles">
              {benefits.map(([icon, label]) => (
                <div key={icon}>
                  <Icon name={icon} />
                  <span>{t(label)}</span>
                </div>
              ))}
            </div>
          )}
          {kind === "science" && (
            <a className="hero-disclosure" href="#science-disclaimer">
              {t("Academic venture simulation · Proposed capabilities*")}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function PageFooter() {
  const { t } = useI18n();
  return (
    <footer className="page-footer">
      <a className="footer-wordmark" href="/">
        VITA TAPE
      </a>
      <nav aria-label={t("Footer navigation")}>
        <a href="/about-us">{t("About Us")}</a>
        <a href="/build-your-tape">{t("Build Your Tape")}</a>
        <a href="/our-science">{t("Our Science")}</a>
        <a href="/reviews">{t("Reviews")}</a>
      </nav>
      <div>
        <span>© {new Date().getFullYear()} VITA TAPE</span>
        <span>{t("Academic venture simulation · Not medical advice")}</span>
        <a href="#top">{t("Back to top ↑")}</a>
      </div>
    </footer>
  );
}
