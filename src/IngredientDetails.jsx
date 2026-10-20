import { useI18n } from "./i18n";
import { Arrow, Button, Icon, Modal } from "./components";
import "./nutrition-card.css";
export function IngredientDetails({
  nutrient: n,
  onClose,
  onToggle,
  chosen,
  resourceMode = false,
}) {
  const { t, language } = useI18n();
  const profile = n.profile;
  const sources = [...profile.sources];
  if (
    n.reference.url &&
    !sources.some((source) => source.url === n.reference.url)
  ) {
    sources.push({
      label: "Original catalog quantity",
      url: n.reference.url,
      type: "reference-catalog",
    });
  }
  return (
    <Modal title={t(n.name)} onClose={onClose} className="nutrition-modal">
      <div className="nutrition-card-meta">
        <span>{t("Nutrition card")}</span>
        <span>{language === "zh" ? n.name : n.nameZh}</span>
      </div>
      <div className="nutrition-overview">
        <div
          className="nutrition-artwork"
          style={{
            backgroundColor: n.color,
          }}
        >
          <img src={n.artwork} alt={t(n.artworkAlt || n.name)} />
          <span>{t(n.category)}</span>
        </div>
        <div className="nutrition-introduction">
          <p>{t(profile.overview)}</p>
          <dl className="nutrition-identity">
            <div>
              <dt>{t("Ingredient form")}</dt>
              <dd>{t(profile.form)}</dd>
            </div>
            <div>
              <dt>{t("Ingredient source")}</dt>
              <dd>{t(profile.source)}</dd>
            </div>
          </dl>
        </div>
      </div>
      <section
        className="nutrition-benefits"
        aria-label={t("Ingredient functions")}
      >
        <h3>{t("What it does")}</h3>
        <ul>
          {profile.benefits.map((benefit) => (
            <li key={benefit}>{t(benefit)}</li>
          ))}
        </ul>
      </section>
      <section className="nutrition-quantity" aria-label={t("Addition amount")}>
        <div className="nutrition-section-heading">
          <h3>{t("Addition amount")}</h3>
          <span className="nutrition-status">
            {t(
              n.amount.vitaTapeAmount == null
                ? "Formula pending"
                : "Confirmed amount",
            )}
          </span>
        </div>
        <dl>
          <div>
            <dt>{t("VITA TAPE amount")}</dt>
            <dd>{n.amount.vitaTapeAmount ?? t("To be confirmed")}</dd>
          </div>
          {n.amount.status === "reference" && (
            <div>
              <dt>{t("Reference catalog amount")}</dt>
              <dd>{n.amount.display}</dd>
            </div>
          )}
          {n.amount.status === "reference" && n.amount.sourceNrv !== "N/A" && (
            <div className="nutrition-nrv">
              <dt>{t("Reference label NRV")}</dt>
              <dd>{n.amount.sourceNrv}</dd>
            </div>
          )}
        </dl>
        {profile.quantityNote && <p>{t(profile.quantityNote)}</p>}
        <p className="nutrition-amount-note">
          {t(
            n.amount.status === "reference"
              ? "Reference quantities are from the Nourished UK catalog. They are not final VITA TAPE amounts or personal intake recommendations."
              : "No addition amount has been set for this design ingredient.",
          )}
        </p>
      </section>
      <details className="nutrition-disclosure">
        <summary>
          {t("Evidence & things to know")}
          <Icon name="plus" />
        </summary>
        <div>
          <p>{t(profile.evidence)}</p>
          <p>{t(profile.considerations)}</p>
          <p className="nutrition-sourcing-note">
            {t(
              "Final VITA TAPE form, supplier, country of origin and allergen status are to be confirmed.",
            )}
          </p>
          <p className="artwork-note">{t(n.artworkNote)}</p>
        </div>
      </details>
      <details className="nutrition-disclosure nutrition-sources">
        <summary>
          {t("Sources & references")}
          <Icon name="plus" />
        </summary>
        <div>
          <ul>
            {sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  <span>{t(source.label)}</span>
                  <Arrow />
                </a>
                <small>
                  {t(
                    source.type === "ingredient-manufacturer"
                      ? "Manufacturer information"
                      : source.type === "reference-catalog"
                        ? "Reference catalog"
                        : "Independent reference",
                  )}
                </small>
              </li>
            ))}
          </ul>
          <p>
            {t(
              "Reviewed {date}. Ingredient research does not establish the effects of a finished VITA TAPE product.",
              { date: profile.reviewedAt },
            )}
          </p>
        </div>
      </details>
      <div className="nutrition-card-actions">
        {!resourceMode ? (
          <Button
            className="detail-add"
            onClick={() => {
              onToggle(n.id);
              onClose();
            }}
          >
            {t(chosen ? "Remove from my tape" : "Add to my tape")}
            <Icon name={chosen ? "check" : "plus"} />
          </Button>
        ) : (
          <Button className="detail-add" onClick={onClose}>
            {t("Back to ingredients")}
            <Arrow />
          </Button>
        )}
      </div>
    </Modal>
  );
}
