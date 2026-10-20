import { useI18n } from "./i18n";
import { icon } from "./data";
function Icon({ name }) {
  return <img className="icon" src={icon(name)} alt="" aria-hidden="true" />;
}

// The product face uses a generated macro photograph, not a stretched screenshot
// or a progress meter. Selected lanes are composited under one continuous material.
export function RealisticTape({ selected, large = false }) {
  const { t, language } = useI18n();
  const empty = !selected.length;
  return (
    <div
      className={`realistic-tape-stage ${large ? "large" : ""} ${empty ? "is-empty" : ""}`}
    >
      <div
        className="realistic-tape"
        role="img"
        aria-label={
          empty
            ? t("Your tape preview, waiting for your ingredients")
            : t(
                selected.length === 1
                  ? "Final tape preview with {count} nutrient lane: {ingredients}"
                  : "Final tape preview with {count} nutrient lanes: {ingredients}",
                {
                  count: selected.length,
                  ingredients: selected
                    .map((n) => t(n.name))
                    .join(language === "zh" ? "、" : ", "),
                },
              )
        }
        style={{
          "--lane-count": Math.max(1, selected.length),
        }}
      >
        <div className="tape-face" data-testid="tape-face">
          {empty ? (
            <span className="material-lane blank-lane" />
          ) : (
            selected.map((n) => (
              <span
                key={n.id}
                className="material-lane"
                data-nutrient={n.id}
                style={{
                  backgroundColor: n.stripe,
                }}
              />
            ))
          )}
          <img
            className="tape-material-light"
            src="/assets/tape-realistic/material-preview.webp"
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
      {empty && (
        <div className="tape-empty-caption">
          <Icon name="sprout" />
          <p>
            {t("A little space")}
            <br />
            {t("for your kind of everyday.")}
          </p>
        </div>
      )}
    </div>
  );
}
