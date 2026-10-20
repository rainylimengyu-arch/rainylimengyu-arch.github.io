import { useI18n } from "./i18n";
import { useState } from "react";
import { nutrients } from "./data";
import { Arrow, Button, Icon, Modal } from "./components";
import { RealisticTape } from "./TapePreview";
import { sources, starterRainbows } from "./pairing-library";
import { alternativesFor, starterIds } from "./pairing-engine";
const byId = new Map(nutrients.map((n) => [n.id, n]));
export function EvidenceLinks({ sourceIds }) {
  const { t, language } = useI18n();
  return (
    <div className="pairing-sources">
      {[...new Set(sourceIds)].map((id) => (
        <a key={id} href={sources[id].url} target="_blank" rel="noreferrer">
          {t(sources[id].label)} <Arrow />
        </a>
      ))}
    </div>
  );
}
export function PairingGuide({ onClose }) {
  const { t, language } = useI18n();
  return (
    <Modal title={t("Thoughtful pairings. Clear reasons.")} onClose={onClose}>
      <p className="modal-intro">
        {t("Everything in one rainbow is taken together.")}
      </p>
      <div className="pairing-guide-list">
        <div>
          <Icon name="sliders" />
          <section>
            <h3>{t("Some pairings need a dose check.")}</h3>
            <p>
              {t(
                "For example, iron at 25 mg or more may reduce zinc absorption when taken together. Final amounts are still pending, so this pairing stays on hold.",
              )}
            </p>
          </section>
        </div>
        <div>
          <Icon name="moon" />
          <section>
            <h3>{t("Some belong to different routines.")}</h3>
            <p>
              {t(
                "We keep ginseng separate from evening wind-down candidates. This is a routine choice, not a claim that those pairs are dangerous.",
              )}
            </p>
          </section>
        </div>
        <div>
          <Icon name="heart" />
          <section>
            <h3>{t("Your circumstances matter too.")}</h3>
            <p>
              {t(
                "Medicines, existing supplements, health conditions, allergies, pregnancy, breastfeeding, planning pregnancy, being under 18 or having surgery planned need professional review first. This builder cannot check every interaction.",
              )}
            </p>
          </section>
        </div>
      </div>
      <p className="pairing-boundary">
        {t(
          "No listed conflict does not establish safety. These are ingredient ideas; final amounts, suitability and formulation still need review.",
        )}
      </p>
      <EvidenceLinks sourceIds={["zinc", "ginseng", "supplements"]} />
      <a
        className="pairing-document"
        href="/resources/pairing/README.zh-CN.md"
        target="_blank"
        rel="noreferrer"
      >
        {t("Read the research & flow design (\u4E2D\u6587)")}
        <Arrow />
      </a>
      <Button className="detail-add" onClick={onClose}>
        {t("Back to my rainbow")}
        <Arrow />
      </Button>
    </Modal>
  );
}
export function PairingDialog({
  attemptedId,
  issues,
  selectedIds,
  onClose,
  onAlternative,
  onRemove,
}) {
  const { t, language } = useI18n();
  const attempted = byId.get(attemptedId);
  const alternatives = attemptedId
    ? alternativesFor(selectedIds, attemptedId)
    : [];
  const removable = [
    ...new Set(issues.flatMap((issue) => issue.members)),
  ].filter((id) => selectedIds.includes(id));
  return (
    <Modal
      title={t(
        attempted
          ? "Let’s find a better fit."
          : "A little attention for your rainbow.",
      )}
      onClose={onClose}
    >
      {attempted ? (
        <div className="pairing-attempt">
          <img src={attempted.artwork} alt="" />
          <div>
            <span>{t("NOT ADDED TO YOUR RAINBOW")}</span>
            <h3>{t(attempted.name)}</h3>
            <p>{t("Your current ingredients stay as they are.")}</p>
          </div>
        </div>
      ) : (
        <p className="modal-intro">
          {t(
            "Your saved selection needs a fresh pairing review before you continue.",
          )}
        </p>
      )}
      <div className="pairing-issues">
        {issues.map((issue) => (
          <section key={issue.id}>
            <span className={`pairing-kind kind-${issue.kind}`}>
              {t(issue.label)}
            </span>
            {!!issue.members.length && (
              <h3>
                {issue.members
                  .map((id) => t(byId.get(id)?.name || id))
                  .join(" + ")}
              </h3>
            )}
            <p>{t(issue.message)}</p>
            {issue.evidence && <small>{t(issue.evidence)}</small>}
            <EvidenceLinks sourceIds={issue.sourceIds} />
          </section>
        ))}
      </div>
      {!!alternatives.length && (
        <div className="pairing-alternatives">
          <h3>{t("Other ingredients to explore")}</h3>
          <p>
            {t(
              "These do not trigger a listed pairing rule with your current selection. They are not equivalent substitutes or a personal safety clearance.",
            )}
          </p>
          {alternatives.map((id) => {
            const n = byId.get(id);
            return (
              <button
                key={id}
                onClick={() => onAlternative(id)}
                aria-label={t("Choose {name} instead", { name: t(n.name) })}
              >
                <img src={n.artwork} alt="" />
                <span>
                  <strong>{t(n.name)}</strong>
                  <small>{t(n.summary)}</small>
                </span>
                <Icon name="plus" />
              </button>
            );
          })}
        </div>
      )}
      {!attempted && !!removable.length && (
        <div className="pairing-removals">
          <h3>{t("Adjust your selection")}</h3>
          {removable.map((id) => (
            <button key={id} onClick={() => onRemove(id)}>
              {t("Remove")} {t(byId.get(id)?.name)}
              <Icon name="plus" />
            </button>
          ))}
        </div>
      )}
      <Button secondary className="detail-add" onClick={onClose}>
        {t("Back to my rainbow")}
        <Arrow />
      </Button>
    </Modal>
  );
}
export function StarterRainbows({ onUse }) {
  const { t, language } = useI18n();
  const [activeId, setActiveId] = useState("energy");
  const active = starterRainbows.find((s) => s.id === activeId);
  return (
    <section className="starter-rainbows" aria-labelledby="starter-title">
      <div className="starter-heading">
        <div>
          <p className="eyebrow">{t("A LITTLE INSPIRATION, JUST BELOW")}</p>
          <h2 id="starter-title">{t("Find your kind of rainbow.")}</h2>
          <p>
            {t(
              "Seven themed starting points. Seven ingredients in each. Yours to edit.",
            )}
          </p>
        </div>
        <span className="starter-concept-label">
          {t("Ingredient ideas")}
          <br />
          {t("Final amounts pending")}
        </span>
      </div>
      <div className="starter-tabs" aria-label={t("Explore starter rainbows")}>
        {starterRainbows.map((starter) => (
          <button
            key={starter.id}
            onClick={() => setActiveId(starter.id)}
            aria-pressed={starter.id === activeId}
            aria-label={t("Explore {title} rainbow", {
              title: t(starter.title),
            })}
          >
            <Icon name={starter.icon} />
            {t(starter.title)}
          </button>
        ))}
      </div>
      <div
        className="starter-panel"
        style={{
          "--starter-color": active.color,
        }}
      >
        <div className="starter-story">
          <span className="starter-time">
            <Icon name={active.icon} />
            {t(active.time)}
          </span>
          <p className="eyebrow">{t(active.kicker)}</p>
          <h3>{t(active.title)}</h3>
          <p>{t(active.description)}</p>
          <Button onClick={() => onUse(active)}>
            {t("Preview this rainbow")}
            <Arrow />
          </Button>
          <span className="starter-edit-note">
            {t("Review first. Then make it yours.")}
          </span>
        </div>
        <div
          className="starter-ingredients"
          aria-label={t("{title}: seven ingredient ideas", {
            title: t(active.title),
          })}
        >
          {active.ingredients.map(([id, role], i) => {
            const n = byId.get(id);
            return (
              <div key={id} className="starter-ingredient">
                <span className="starter-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <img
                  src={n.artwork}
                  alt=""
                  width="72"
                  height="72"
                  loading="lazy"
                />
                <div>
                  <h4>{t(n.name)}</h4>
                  <p>{t(role)}</p>
                </div>
              </div>
            );
          })}
          <div className="starter-mini-preview">
            <RealisticTape
              selected={starterIds(active).map((id) => byId.get(id))}
            />
            <p>
              {t("One rainbow.")}
              <br />
              <strong>{t("Your own daily ritual.")}</strong>
            </p>
          </div>
        </div>
      </div>
      <details className="starter-rationale" key={active.id}>
        <summary>
          {t("Why these seven?")}
          <Icon name="plus" />
        </summary>
        <div>
          <p>{t(active.rationale)}</p>
          <p>
            <strong>{t("Food first.")}</strong> {t(active.food)}
          </p>
          <p className="pairing-boundary">{t(active.caveat)}</p>
          <EvidenceLinks sourceIds={active.sourceIds} />
        </div>
      </details>
      <p className="starter-footnote">
        {t(
          "A starting idea, not a personal recommendation. Seven is optional. Every edit is checked against the same pairing rules.",
        )}
      </p>
    </section>
  );
}
export function SuitabilityCheck({ value, onChange }) {
  const { t, language } = useI18n();
  return (
    <fieldset className="suitability-check">
      <legend>{t("Before making this yours")}</legend>
      <p>
        {t(
          "Do you take medicines or other supplements, have a health condition, allergies, abnormal test results or dietary restrictions, have surgery planned, or are you pregnant, breastfeeding, planning pregnancy or under 18?",
        )}
      </p>
      <label>
        <input
          type="radio"
          name="suitability"
          value="explore"
          checked={value === "explore"}
          onChange={() => onChange("explore")}
        />
        <span>{t("I\u2019m 18+ and none of these apply.")}</span>
      </label>
      <label>
        <input
          type="radio"
          name="suitability"
          value="review"
          checked={value === "review"}
          onChange={() => onChange("review")}
        />
        <span>{t("At least one applies, or I\u2019m not sure.")}</span>
      </label>
      {value === "review" && (
        <p className="suitability-hold" role="status">
          {t(
            "Please review ingredients with a pharmacist or clinician first. You can keep browsing ideas here; automatic selection and the next step are paused.",
          )}
        </p>
      )}
      <small>
        {t(
          "Your answer stays in this page session. No health details are collected or saved.",
        )}
      </small>
    </fieldset>
  );
}
export function StarterReview({
  starter,
  selectedCount,
  suitability,
  onSuitability,
  onApply,
  onClose,
}) {
  const { t, language } = useI18n();
  return (
    <Modal
      title={t("{title}, made yours.", { title: t(starter.title) })}
      onClose={onClose}
    >
      <p className="modal-intro">
        {t("Seven ingredient ideas. A starting point to personalise.")}
      </p>
      <div className="starter-review-ingredients">
        {starter.ingredients.map(([id]) => {
          const n = byId.get(id);
          return (
            <div key={id}>
              <span
                style={{
                  background: n.stripe,
                }}
              />
              {t(n.name)}
            </div>
          );
        })}
      </div>
      <p>{t(starter.caveat)}</p>
      <SuitabilityCheck value={suitability} onChange={onSuitability} />
      <p className="starter-replace-note">
        {selectedCount
          ? t(
              selectedCount === 1
                ? "This will replace your current {count} ingredient. Your flavour stays. You can undo the change."
                : "This will replace your current {count} ingredients. Your flavour stays. You can undo the change.",
              { count: selectedCount },
            )
          : t(
              "This will add all seven ideas to your rainbow. You can edit or undo afterwards.",
            )}
      </p>
      <Button
        className="detail-add"
        disabled={suitability !== "explore"}
        onClick={onApply}
      >
        {t(selectedCount ? "Replace with this rainbow" : "Use this rainbow")}{" "}
        <Arrow />
      </Button>
      <button className="starter-cancel" onClick={onClose}>
        {t("Keep browsing")}
      </button>
    </Modal>
  );
}
