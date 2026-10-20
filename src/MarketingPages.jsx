import { useI18n } from "./i18n";
import { useEffect, useState } from "react";
import { Header } from "./App";
import { LandingHero, PageFooter } from "./LandingHero";
import { Arrow, Icon, Modal } from "./components";
import science from "./science-content.json";
import "./editorial.css";

const institutions = [
  {
    id: "ntu",
    name: "Nanyang Technological University (NTU), Singapore",
    image: "ntu.png",
    url: "https://www.ntu.edu.sg/",
    area: "Edible hydrogel engineering, biofabrication and multi-material food printing.",
  },
  {
    id: "sutd",
    name: "Singapore University of Technology and Design (SUTD)",
    image: "sutd.png",
    url: "https://www.sutd.edu.sg/",
    area: "Precision multi-material food fabrication, edible material flow and advanced forming technologies.",
  },
  {
    id: "jiangnan",
    name: "Jiangnan University, China",
    image: "jiangnan.jpg",
    url: "https://www.jiangnan.edu.cn/",
    area: "Food colloids, edible gel systems, food texture engineering and functional food manufacturing.",
  },
  {
    id: "nus",
    name: "National University of Singapore (NUS)",
    image: "nus-horizontal.png",
    url: "https://www.nus.edu.sg/",
    area: "Food bioactive compounds, functional ingredient science and edible biomanufacturing.",
  },
];

function Inline({ text }) {
  const { t } = useI18n();
  return t(text)
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .map((part, i) =>
      part.startsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
        <em key={i}>{part.slice(1, -1)}</em>
      ) : (
        part
      ),
    );
}

function ScienceBlock({ block }) {
  const { t } = useI18n();
  if (block.type === "list")
    return (
      <ul className="science-list">
        {block.items.map((item) => (
          <li key={item}>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    );
  const text = block.text;
  if (text.includes("Explore Research References"))
    return (
      <a
        className="text-link science-reference-link"
        href="#research-resources"
      >
        {t("Explore Research References")}
        <Arrow />
      </a>
    );
  if (text.includes("Build Your Rainbow"))
    return (
      <a className="button" href="/build-your-tape">
        {t("Build Your Rainbow")}
        <Arrow />
      </a>
    );
  return (
    <p className={text.startsWith("**") ? "science-emphasis" : undefined}>
      <Inline text={text} />
    </p>
  );
}

function Universities() {
  const { t } = useI18n();
  return (
    <div className="academic-ecosystem">
      <div className="academic-label">
        <h3>{t("Potential academic collaborators*")}</h3>
        <p>
          {t(
            "Proposed research connections. No established partnership or institutional endorsement is implied.",
          )}
        </p>
      </div>
      <div className="university-grid">
        {institutions.map((u) => (
          <article className={`university university--${u.id}`} key={u.id}>
            <a
              className="university-mark"
              href={u.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${t(u.name)}${t(" official website")}`}
            >
              <img
                src={`/assets/universities/${u.image}`}
                alt={t(u.name)}
                loading="lazy"
              />
            </a>
            <h4>{t(u.name)}</h4>
            <p>{t(u.area)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

const scienceIllustrations = {
  "01-formulation-science": {
    image: "formulation",
    alt: "A formulation development concept combining research and colourful ribbon materials",
    caption:
      "Formulation framework concept. Ingredient compatibility and final amounts remain to be validated.",
  },
  "02-precision-dosing": {
    image: "precision",
    alt: "A macro study of the connected nutrient ribbon and daily portioning concept",
    caption:
      "Daily portion concept. Illustration does not demonstrate verified nutrient content or serving consistency.",
  },
  "03-ingredient-purity": {
    image: "purity",
    alt: "A conceptual laboratory quality study with analytical materials",
    caption:
      "Quality framework visualization. Final suppliers, quality systems and test results are not established.",
  },
  "04-edible-material-science": {
    image: "materials",
    alt: "A conceptual multi-material fabrication process for a connected edible ribbon",
    caption:
      "Edible-material engineering concept. Texture, flexibility and manufacturing performance require validation.",
  },
  "05-zero-sugar-taste-technology": {
    image: "taste",
    alt: "An illustrative study of flavour experience and colourful edible ribbon texture",
    caption:
      "Flavour experience concept. Sugar-free is not calorie-free; final declarations depend on formulation and testing.",
  },
  "06-freshness-engineering": {
    image: "freshness",
    alt: "The ivory refill cassette and proposed protective refill packaging",
    caption:
      "Protective refill concept. Packaging barriers, shelf life and nutrient retention remain to be validated.",
  },
};

function EditorialPhoto({ image, alt, caption, className = "" }) {
  const { t } = useI18n();
  return (
    <figure className={`editorial-photo ${className}`}>
      <img
        src={`/assets/editorial/${image}.webp`}
        alt={t(alt)}
        width="1200"
        height="900"
        loading="lazy"
      />
      {caption && <figcaption>{t(caption)}</figcaption>}
    </figure>
  );
}

function SciencePageContent() {
  const { t } = useI18n();
  const intro = science.sections[0];
  return (
    <>
      <div className="science-intro content-width">
        <p className="eyebrow">{t("The thinking behind the Tape")}</p>
        <div>
          {intro.blocks.slice(1, 3).map((block, i) => (
            <ScienceBlock block={block} key={i} />
          ))}
        </div>
      </div>
      <nav className="science-index" aria-label={t("Science chapters")}>
        {science.sections.slice(1, 7).map((s, i) => (
          <a href={`#${s.id}`} key={s.id}>
            <span>0{i + 1}</span>
            {t(s.title)
              .replace(/^\d+\. /, "")
              .toLowerCase()}
          </a>
        ))}
        <a href="#technology-academic-r-d">{t("Academic R&D")}</a>
      </nav>
      {science.sections.slice(1).map((s, chapterIndex) => {
        const illustration = scienceIllustrations[s.id];
        const isAcademic = s.id === "technology-academic-r-d";
        const isFuture = s.id === "the-future-of-daily-nutrition";
        const blocks = isAcademic
          ? s.blocks.filter(
              (b) =>
                !institutions.some((u) => b.text?.startsWith(`**${u.name}`)),
            )
          : s.blocks;
        return (
          <section
            className={`science-chapter ${isFuture ? "science-future" : ""} ${illustration ? `science-illustrated ${chapterIndex % 2 ? "science-illustrated--reverse" : ""}` : ""}`}
            id={s.id}
            key={s.id}
            aria-labelledby={`${s.id}-title`}
          >
            <div className="content-width science-chapter-layout">
              <div className="science-chapter-heading">
                <p className="eyebrow">{t(s.title)}</p>
                <h2 id={`${s.id}-title`}>{t(s.subtitle)}</h2>
              </div>
              {illustration && (
                <EditorialPhoto
                  {...illustration}
                  className="science-chapter-photo"
                />
              )}
              {isFuture && (
                <EditorialPhoto
                  image="rainbow-sculpture"
                  alt={t(
                    "A bright sculptural study of connected rainbow ribbon material",
                  )}
                  caption="Proposed edible-material concept visualization."
                  className="science-future-photo"
                />
              )}
              <div className="science-chapter-body">
                {(isAcademic ? blocks.slice(0, -1) : blocks).map((block, i) => (
                  <ScienceBlock block={block} key={i} />
                ))}
              </div>
              {isAcademic && (
                <>
                  <Universities />
                  <div className="academic-closing">
                    <ScienceBlock block={blocks.at(-1)} />
                  </div>
                </>
              )}
            </div>
          </section>
        );
      })}
      <section
        className="research-resources content-width"
        id="research-resources"
      >
        <p className="eyebrow">{t("Research resources")}</p>
        <h2>{t("Read further.")}</h2>
        <p>
          {t(
            "Foundational resources for exploring nutrition, ingredient quality and food materials. These resources do not validate VITA TAPE’s proposed product performance.",
          )}
        </p>
        <div className="reference-links">
          <a
            href="https://ods.od.nih.gov/HealthInformation/nutrientrecommendations.aspx"
            target="_blank"
            rel="noreferrer"
          >
            {t("NIH Office of Dietary Supplements — nutrient recommendations")}{" "}
            <Arrow />
          </a>
          <a
            href="https://www.fda.gov/food/dietary-supplements"
            target="_blank"
            rel="noreferrer"
          >
            {t("U.S. FDA — dietary supplements and quality information")}
            <Arrow />
          </a>
          <a
            href="https://www.ntu.edu.sg/research"
            target="_blank"
            rel="noreferrer"
          >
            {t("NTU — research")}
            <Arrow />
          </a>
          <a
            href="https://www.sutd.edu.sg/research/"
            target="_blank"
            rel="noreferrer"
          >
            {t("SUTD — research")}
            <Arrow />
          </a>
        </div>
      </section>
      <aside
        className="science-disclaimer content-width"
        id="science-disclaimer"
      >
        <strong>{t("*Academic venture simulation")}</strong>
        <p>{t(science.disclaimer)}</p>
      </aside>
    </>
  );
}

function AboutContent() {
  const { t } = useI18n();
  const lives = [
    {
      image: "commute",
      title: "Thoughtfully chosen.",
      text: "Explore ingredients, their purpose and the evidence behind them.",
      label: "In between things",
      alt: "A candid everyday moment during a commute",
    },
    {
      image: "home-portrait",
      title: "Made personal.",
      text: "Build an ingredient concept around the things that matter to you.",
      label: "Making time",
      alt: "A relaxed person pausing at home",
    },
    {
      image: "desk-portrait",
      title: "An everyday ritual.",
      text: "A small moment to make your routine a little more your own.",
      label: "Finding your rhythm",
      alt: "A person taking a moment at their desk",
    },
  ];
  return (
    <div className="about-editorial">
      <section
        className="about-purpose editorial-width"
        id="our-purpose"
        aria-labelledby="about-purpose-title"
      >
        <div className="about-purpose-copy">
          <h2 id="about-purpose-title">
            {t("Your day")}
            <br />
            {t("isn’t a template.")}
          </h2>
          <p>
            <strong>{t("Because you’re more than one-size-fits-all.")}</strong>
          </p>
          <p>
            {t(
              "Your body. Your goals. Your everyday. Nutrition should fit your life — not the other way around.",
            )}
          </p>
          <p>
            {t(
              "VITA TAPE explores a simpler daily ritual: thoughtfully chosen ingredients, a personal approach and a little more room for you.",
            )}
          </p>
          <p className="editorial-caption">
            {t(
              "An academic venture simulation, designed to explore what daily nutrition could become.",
            )}
          </p>
        </div>
        <EditorialPhoto
          image="creative-desk"
          alt={t(
            "A sunlit creative workspace with everyday notes, colour and personal objects",
          )}
          caption="Illustrative lifestyle imagery."
        />
      </section>
      <section className="about-lives" aria-labelledby="about-lives-title">
        <div className="about-lives-heading editorial-width">
          <div>
            <p className="eyebrow">{t("Real life, in all its colours")}</p>
            <h2 id="about-lives-title">
              {t("Different lives.")}
              <br />
              {t("Room for you.")}
            </h2>
          </div>
          <p>
            {t(
              "From early mornings to quiet evenings, work and moments in between — life looks different for everyone. That’s the thinking behind a more flexible, personal approach.",
            )}
          </p>
        </div>
        <div className="about-life-grid editorial-width">
          {lives.map((life) => (
            <article
              key={life.image}
              className={`about-life-card about-life-card--${life.image}`}
            >
              <img
                src={`/assets/editorial/${life.image}.webp`}
                alt={t("{scene}. Illustrative imagery.", {
                  scene: t(life.alt),
                })}
                width="640"
                height="640"
                loading="lazy"
              />
              <div>
                <span>{t(life.label)}</span>
                <h3>{t(life.title)}</h3>
                <p>{t(life.text)}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="editorial-caption editorial-width about-life-note">
          {t(
            "Generated lifestyle scenes. The people pictured are illustrative and are not identified customers or founders.",
          )}
        </p>
      </section>
      <section
        className="about-design-question editorial-width"
        aria-labelledby="about-design-title"
      >
        <EditorialPhoto
          image="design-study"
          alt={t(
            "A concept design study of the compact dispenser, connected ribbon and daily use",
          )}
          caption="Design exploration visualization. Product specifications remain proposed."
        />
        <div>
          <p className="eyebrow">{t("The design question")}</p>
          <h2 id="about-design-title">
            {t("What if nutrition could take a different shape?")}
          </h2>
          <p>
            {t(
              "We’re exploring connected, edible materials and personal ingredient choices, brought together in a simple, everyday format.",
            )}
          </p>
          <div className="about-design-principles">
            {[
              ["package", "Material", "Exploring edible matrices"],
              ["settings", "Form", "A compact personal format"],
              ["heart", "Daily use", "Designed around real routines"],
            ].map(([icon, title, text]) => (
              <div key={title}>
                <Icon name={icon} />
                <strong>{t(title)}</strong>
                <span>{t(text)}</span>
              </div>
            ))}
          </div>
          <a className="button" href="/our-science">
            {t("Explore Our Science")}
            <Arrow />
          </a>
        </div>
      </section>
      <section
        className="about-material-story"
        aria-labelledby="about-material-title"
      >
        <div className="about-material-copy">
          <p className="eyebrow">{t("Curious by design")}</p>
          <h2 id="about-material-title">
            {t("Thoughtful choices.")}
            <br />
            {t("A fresh perspective.")}
          </h2>
          <p>
            {t(
              "We explore ingredient combinations, material compatibility and a refill concept designed to make personal nutrition feel simple, enjoyable and part of everyday life.",
            )}
          </p>
          <p className="editorial-caption">
            {t(
              "An edible-material design concept. Final formulation, quantities and performance remain to be validated.",
            )}
          </p>
        </div>
        <EditorialPhoto
          image="rainbow-sculpture"
          alt={t(
            "A colourful sculptural ribbon study showing the connected edible-material concept",
          )}
        />
      </section>
      <section
        className="about-quiet-closing editorial-width"
        aria-labelledby="about-closing-title"
      >
        <p className="eyebrow">{t("The next chapter")}</p>
        <h2 id="about-closing-title">
          {t("A small ritual.")}
          <br />
          {t("A more personal day.")}
        </h2>
        <p>
          {t(
            "We’re continuing to explore what daily nutrition could become — with more choice, more flexibility and a format designed around you.",
          )}
        </p>
        <a className="button" href="/build-your-tape">
          {t("Build Your Tape")}
          <Arrow />
        </a>
      </section>
    </div>
  );
}

function ReviewContent() {
  const { t } = useI18n();
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState(() => {
    try {
      const value = JSON.parse(
        localStorage.getItem("vita-tape.story-draft.v1"),
      );
      return {
        name: typeof value?.name === "string" ? value.name : "",
        story: typeof value?.story === "string" ? value.story : "",
      };
    } catch {
      return { name: "", story: "" };
    }
  });
  function saveStory(event) {
    event.preventDefault();
    try {
      localStorage.setItem("vita-tape.story-draft.v1", JSON.stringify(draft));
      setStatus(
        "Your story draft is saved on this device. It has not been submitted or published.",
      );
    } catch {
      setStatus(
        "Your browser could not save this draft. Keep a copy of your text before leaving this page.",
      );
    }
  }
  const [topic, setTopic] = useState("all");
  const [photo, setPhoto] = useState(null);
  const moments = [
    {
      id: "commute",
      topic: "on-the-go",
      title: "On the commute",
      label: "On the go",
      alt: "An everyday commute in natural light",
    },
    {
      id: "home-portrait",
      topic: "daily-routine",
      title: "A moment at home",
      label: "Daily routine",
      alt: "A relaxed pause at home",
    },
    {
      id: "desk-portrait",
      topic: "daily-routine",
      title: "At my desk",
      label: "Daily routine",
      alt: "A candid everyday desk scene",
    },
    {
      id: "design-study",
      topic: "design-refills",
      title: "The shape of a ritual",
      label: "Design & refills",
      alt: "A concept study of product form and daily use",
    },
  ];
  const visibleMoments = moments.filter(
    (moment) => topic === "all" || moment.topic === topic,
  );
  return (
    <div className="reviews-editorial">
      <section
        className="review-community editorial-width"
        id="community-stories"
        aria-labelledby="review-community-title"
      >
        <div>
          <p className="eyebrow">{t("Community")}</p>
          <h2 id="review-community-title">
            {t("Everyday stories.")}
            <br />
            {t("In their own words.")}
          </h2>
          <p>
            {t(
              "This academic venture concept has not yet collected verified customer reviews. The people pictured are illustrative lifestyle imagery.",
            )}
          </p>
        </div>
        <aside className="review-pending-panel">
          <Icon name="heart" />
          <div>
            <strong>{t("Real feedback, when it’s ready.")}</strong>
            <p>
              {t(
                "Customer experiences will appear here after collection and permission.",
              )}
            </p>
            <a className="button" href="#share-your-story">
              {t("Write a Story Draft")}
              <Arrow />
            </a>
          </div>
        </aside>
      </section>
      <section
        className="review-photo-gallery"
        aria-labelledby="review-moments-title"
      >
        <div className="editorial-width">
          <div className="review-gallery-heading">
            <h2 id="review-moments-title">
              {t("The little moments")}
              <br />
              {t("behind a routine.")}
            </h2>
            <p>
              {t("Illustrative photo concepts.")}
              <br />
              {t("These are not customer reviews or recorded videos.")}
            </p>
          </div>
          <div
            className="review-gallery-filters"
            role="group"
            aria-label={t("Filter illustrative photo topics")}
          >
            {[
              ["all", "All moments"],
              ["daily-routine", "Daily routine"],
              ["on-the-go", "On the go"],
              ["design-refills", "Design & refills"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTopic(id)}
                aria-pressed={topic === id}
              >
                {t(label)}
              </button>
            ))}
          </div>
          <p className="review-gallery-count" aria-live="polite">
            {t(
              visibleMoments.length === 1
                ? "Showing {count} illustrative photo"
                : "Showing {count} illustrative photos",
              { count: visibleMoments.length },
            )}
          </p>
          <div className="review-photo-grid">
            {visibleMoments.map((moment) => (
              <article key={moment.id}>
                <button
                  className="review-photo-open"
                  onClick={() => setPhoto(moment)}
                  aria-label={`${t("View photo:")} ${t(moment.title)}`}
                  aria-haspopup="dialog"
                >
                  <img
                    src={`/assets/editorial/${moment.id}.webp`}
                    alt={t("{scene}. Illustrative imagery.", {
                      scene: t(moment.alt),
                    })}
                    width="640"
                    height="800"
                    loading="lazy"
                  />
                  <span>
                    <Icon name="search" />
                    {t("View photo")}
                  </span>
                </button>
                <p className="editorial-caption">
                  {t("Illustrative photo ·")} {t(moment.label)}
                </p>
                <h3>{t(moment.title)}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="review-list-preview editorial-width"
        aria-labelledby="review-list-title"
      >
        <div>
          <p className="eyebrow">{t("Customer reviews")}</p>
          <h2 id="review-list-title">{t("Read the details.")}</h2>
        </div>
        <div className="review-empty-state">
          <Icon name="heart" />
          <div>
            <h3>{t("Your everyday experiences belong here.")}</h3>
            <p>
              {t(
                "No customer reviews have been collected yet. There are no ratings, scores or testimonials to display.",
              )}
            </p>
            <p>
              {t(
                "Future entries can include the original story, routine context, date and an optional photo, with permission to publish.",
              )}
            </p>
            <a className="text-link" href="#share-your-story">
              {t("Start a private story draft")}
              <Arrow />
            </a>
          </div>
        </div>
      </section>
      <section
        className="review-rainbow-interlude"
        aria-labelledby="review-interlude-title"
      >
        <div>
          <p className="eyebrow">{t("A little everyday colour")}</p>
          <h2 id="review-interlude-title">
            {t("A ritual,")}
            <br />
            {t("your way.")}
          </h2>
          <p className="editorial-caption">
            {t("Proposed material concept.")}
            <br />
            {t("Illustrative imagery.")}
          </p>
        </div>
        <img
          src="/assets/editorial/rainbow-sculpture.webp"
          alt={t(
            "A lively sculptural study of colourful connected ribbon material",
          )}
          width="1200"
          height="720"
          loading="lazy"
        />
      </section>
      <section
        className="review-story-section editorial-width"
        id="share-your-story"
        aria-labelledby="review-story-title"
      >
        <EditorialPhoto
          image="creative-desk"
          alt={t(
            "A bright creative workspace with a laptop, notes and everyday objects",
          )}
          caption="Illustrative lifestyle scene."
        />
        <div className="review-story-copy">
          <p className="eyebrow">{t("Share your perspective")}</p>
          <h2 id="review-story-title">
            {t("What does your everyday look like?")}
          </h2>
          <p>
            {t(
              "What would make your daily routine simpler? Which ingredients would you like to understand better? Try putting your thoughts into words.",
            )}
          </p>
          <p className="editorial-caption">
            {t(
              "This prototype saves a draft on your device. It does not send, submit or publish your story.",
            )}
          </p>
          <form className="story-form" onSubmit={saveStory}>
            <label>
              {t("Your first name")} <span>{t("(optional)")}</span>
              <input
                name="name"
                autoComplete="given-name"
                maxLength={80}
                value={draft.name}
                onChange={(event) =>
                  setDraft((d) => ({ ...d, name: event.target.value }))
                }
              />
            </label>
            <label>
              {t("Your everyday ritual")}
              <textarea
                name="story"
                required
                minLength={10}
                maxLength={3000}
                rows={5}
                placeholder={t(
                  "Tell us what matters in your everyday routine…",
                )}
                value={draft.story}
                onChange={(event) =>
                  setDraft((d) => ({ ...d, story: event.target.value }))
                }
              />
            </label>
            <div className="review-story-actions">
              <button className="button" type="submit">
                {t("Save My Draft")}
                <Arrow />
              </button>
              <button
                className="text-link"
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem("vita-tape.story-draft.v1");
                    setDraft({ name: "", story: "" });
                    setStatus("Your draft has been cleared from this device.");
                  } catch {
                    setStatus("Your browser could not clear this draft.");
                  }
                }}
              >
                {t("Clear Draft")}
              </button>
            </div>
            {status && <p role="status">{t(status)}</p>}
          </form>
        </div>
      </section>
      <section
        className="review-trust-context editorial-width"
        aria-labelledby="review-trust-title"
      >
        <div>
          <p className="eyebrow">{t("Trust in context")}</p>
          <h2 id="review-trust-title">
            {t("Good stories deserve")}
            <br />
            {t("clear context.")}
          </h2>
        </div>
        <div className="review-trust-grid">
          {[
            [
              "heart",
              "Original words",
              "Real experiences, in each person’s own words.",
            ],
            [
              "shield",
              "Permission to publish",
              "Stories and photographs would only be shared with permission.",
            ],
            [
              "sprout",
              "Individual experiences",
              "No guaranteed outcomes. Everyone’s experience is unique.",
            ],
          ].map(([icon, title, text]) => (
            <article key={title}>
              <Icon name={icon} />
              <h3>{t(title)}</h3>
              <p>{t(text)}</p>
            </article>
          ))}
        </div>
      </section>
      {photo && (
        <Modal
          title={t(photo.title)}
          className="review-photo-modal"
          onClose={() => setPhoto(null)}
        >
          <img
            className="review-modal-image"
            src={`/assets/editorial/${photo.id}.webp`}
            alt={t("{scene}. Illustrative imagery.", { scene: t(photo.alt) })}
          />
          <p className="review-modal-caption">
            {t(
              "Illustrative photo concept. The person or scene pictured is not a verified customer review; no testimonial is implied.",
            )}
          </p>
        </Modal>
      )}
    </div>
  );
}

export function MarketingPage({ kind }) {
  const { t, language } = useI18n();
  const title = {
    about: "About Us",
    science: "Our Science",
    reviews: "Reviews",
  }[kind];
  useEffect(() => {
    document.title = `${t(title)} — VITA TAPE`;
  }, [title, language]);
  return (
    <div
      className={`marketing-page editorial-page editorial-page--${kind}`}
      id="top"
    >
      <a className="skip-link" href="#page-content">
        {t("Skip to content")}
      </a>
      <Header />
      <LandingHero kind={kind} />
      <main id="page-content">
        {kind === "science" ? (
          <SciencePageContent />
        ) : kind === "about" ? (
          <AboutContent />
        ) : (
          <ReviewContent />
        )}
      </main>
      <PageFooter />
    </div>
  );
}
