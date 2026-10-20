import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react/dist/csr/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { UploadSimple } from "@phosphor-icons/react/dist/csr/UploadSimple";
import { FileText } from "@phosphor-icons/react/dist/csr/FileText";
import { X } from "@phosphor-icons/react/dist/csr/X";
import { LockSimple } from "@phosphor-icons/react/dist/csr/LockSimple";
import { Clock } from "@phosphor-icons/react/dist/csr/Clock";
import { ListChecks } from "@phosphor-icons/react/dist/csr/ListChecks";
import { Leaf } from "@phosphor-icons/react/dist/csr/Leaf";
import { ShieldCheck } from "@phosphor-icons/react/dist/csr/ShieldCheck";
import { Header } from "./App";
import { PageFooter } from "./LandingHero";
import { Modal } from "./components";
import {
  goals,
  healthOptions,
  ageRanges,
  diets,
  initialAnswers,
  intakeQuestions,
  formIssues,
  selectAttachments,
  createDraftReport,
  reportText,
} from "./personalisation";
import { useI18n } from "./i18n";
import "./personalisation.css";

const sections = [
  ["goals", "Your goals"],
  ["everyday", "Your everyday"],
  ["health", "Your health context"],
  ["review", "Your supplement report"],
];

function SectionTitle({ number, children, id }) {
  return (
    <h2 id={id} className="needs-section-title">
      <span>{number}</span>
      {children}
    </h2>
  );
}

function Choices({
  label,
  name,
  options,
  value,
  onChange,
  error,
  hint,
  segmented = false,
}) {
  const { t } = useI18n();
  return (
    <fieldset
      className={`needs-choice-field ${segmented ? "is-segmented" : ""}`}
    >
      <legend>{t(label)}</legend>
      {hint && <p className="needs-field-hint">{t(hint)}</p>}
      <div className="needs-radio-options">
        {options.map((option) => (
          <label key={option} className={value === option ? "is-selected" : ""}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(name, option)}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            />
            <span>{t(option)}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="needs-error" id={`${name}-error`}>
          {t(error)}
        </p>
      )}
    </fieldset>
  );
}

function translateAttachmentError(error, t, language) {
  if (language !== "zh") return error;
  const suffixes = [
    [": please choose a PDF, JPG or PNG.", "Please choose a PDF, JPG or PNG."],
    [
      ": files must be non-empty and no larger than 10 MB.",
      "Files must be non-empty and no larger than 10 MB.",
    ],
    [" is already added.", "This file is already added."],
  ];
  const match = suffixes.find(([suffix]) => error.endsWith(suffix));
  if (!match) return t(error);
  const [suffix, message] = match;
  return `${error.slice(0, -suffix.length)}: ${t(message)}`;
}

function ReportUpload({ files, onAdd, onRemove, errors }) {
  const { t, language } = useI18n();
  const input = useRef(null);
  const [dragging, setDragging] = useState(false);
  return (
    <div className="needs-upload-area">
      <div
        className={`needs-dropzone ${dragging ? "is-dragging" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          onAdd(Array.from(event.dataTransfer.files));
        }}
      >
        <UploadSimple size={38} weight="light" aria-hidden="true" />
        <h3>{t("Add your health report")}</h3>
        <p>
          {t("Drag & drop, or")}{" "}
          <button type="button" onClick={() => input.current.click()}>
            {t("choose files")}
          </button>
        </p>
        <span>{t("PDF, JPG or PNG · Up to 3 files · 10 MB each")}</span>
        <input
          ref={input}
          type="file"
          className="needs-file-input"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          multiple
          aria-label={t("Add health reports")}
          onChange={(event) => {
            onAdd(Array.from(event.target.files));
            event.target.value = "";
          }}
          tabIndex={-1}
        />
      </div>
      <p className="needs-field-hint">
        {t(
          "Optional. Files stay in this tab and are not uploaded or analysed in this demo. You may remove identifying details before adding a report.",
        )}
      </p>
      <div aria-live="polite">
        {files.length > 0 && (
          <ul
            className="needs-file-list"
            aria-label={t("Selected health reports")}
          >
            {files.map((file, index) => (
              <li key={`${file.name}-${file.lastModified}-${file.size}`}>
                <FileText size={23} aria-hidden="true" />
                <div>
                  <strong>{file.name}</strong>
                  <span>
                    {file.size < 1024 * 1024
                      ? `${Math.ceil(file.size / 1024)} KB`
                      : `${(file.size / 1024 / 1024).toFixed(1)} MB`}{" "}
                    {t("· Added locally")}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label={`${t("Remove file")}: ${file.name}`}
                  onClick={() => onRemove(index)}
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors.map((error) => (
          <p key={error} className="needs-error">
            {translateAttachmentError(error, t, language)}
          </p>
        ))}
      </div>
    </div>
  );
}

function NutritionistReview() {
  const { t } = useI18n();
  return (
    <section
      className="needs-nutritionist"
      aria-labelledby="nutritionist-title"
    >
      <div className="needs-nutritionist-inner">
        <div className="needs-review-copy">
          <h2 id="nutritionist-title">
            {t("Personalised for you.")}
            <br />
            {t("Reviewed with BUBU补补.")}
          </h2>
          <p className="needs-demo-label">
            {t(
              "Plus with BUBU补补 · Proposed nutritionist review · Demonstration",
            )}
          </p>
          <p>
            {t(
              "Your Plus recommendation report will be released only after a BUBU nutritionist reviews your questionnaire. Adding a health report is entirely optional.",
            )}
          </p>
          <p className="needs-field-hint">
            {t(
              "This prototype illustrates the review process. No nutritionist is assigned, and no report is professionally approved here.",
            )}
          </p>
        </div>
        <div
          className="needs-report-sample"
          aria-label={t("Example report awaiting nutritionist review")}
        >
          <p className="needs-report-wordmark">
            {t("VITA TAPE Plus × BUBU补补")}
          </p>
          <div className="needs-sample-heading">
            <h3>{t("Your nutrition report")}</h3>
            <span className="needs-pending">
              <Clock size={16} aria-hidden="true" />
              {t("Pending BUBU nutritionist review")}
            </span>
          </div>
          <ul>
            <li>
              <ListChecks size={21} aria-hidden="true" />
              <span>{t("Your priorities")}</span>
            </li>
            <li>
              <Leaf size={21} aria-hidden="true" />
              <span>{t("Food-first opportunities")}</span>
            </li>
            <li>
              <ShieldCheck size={21} aria-hidden="true" />
              <span>{t("Suitability & safety check")}</span>
            </li>
          </ul>
          <div className="needs-signoff">
            <span>{t("Reviewer sign-off")}</span>
            <i />
            <span>{t("Not yet reviewed")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupplementReport({ report }) {
  const { t } = useI18n();
  const items = report.needsReview
    ? report.discussionItems
    : report.recommendations;
  return (
    <>
      <section className="needs-supplement-results">
        <h3>
          {t(
            report.needsReview
              ? "Supplements to discuss after review"
              : "Your supplement suggestions",
          )}
        </h3>
        <p className={report.needsReview ? "needs-review-hold" : ""}>
          {t(report.overview)}
        </p>
        <div className="needs-supplement-list">
          {items.map((item, index) => (
            <article className="needs-supplement-card" key={item.id}>
              <div className="needs-supplement-heading">
                <span className="needs-supplement-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4>{t(item.name)}</h4>
                <span className="needs-supplement-priority">
                  {t(report.needsReview ? "Review before use" : item.priority)}
                </span>
              </div>
              <p>
                <strong>{t("Why this matches")}</strong>
                <br />
                {t(item.reason)}
              </p>
              <details>
                <summary>{t("Food options, safety & next step")}</summary>
                <dl>
                  <dt>{t("Food first")}</dt>
                  <dd>{t(item.food)}</dd>
                  <dt>{t("Before you start")}</dt>
                  <dd>{t(item.caution)}</dd>
                  <dt>{t("Next step")}</dt>
                  <dd>{t(item.next)}</dd>
                </dl>
              </details>
              <a
                className="needs-evidence-link"
                href={item.source.url}
                target="_blank"
                rel="noreferrer"
              >
                {t(item.source.title)} ↗
              </a>
            </article>
          ))}
        </div>
      </section>
      {report.followUp.length > 0 && (
        <section>
          <h3>{t("Check before deciding")}</h3>
          <ul>
            {report.followUp.map((item) => (
              <li key={item}>{t(item)}</li>
            ))}
          </ul>
        </section>
      )}
      {report.notSelected.length > 0 && (
        <section>
          <h3>{t("Not automatically suggested")}</h3>
          <ul className="needs-report-priorities">
            {report.notSelected.map((item) => (
              <li key={item.name}>
                <strong>{t(item.name)}</strong>
                <p>{t(item.reason)}</p>
                {item.source && (
                  <a
                    className="needs-evidence-link"
                    href={item.source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t(item.source.title)} ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
      <section>
        <h3>{t("Amounts & combinations")}</h3>
        <p>
          {t(
            "No personal dose, treatment duration or combined Tape formula is prescribed. Check all existing products for overlap; final VITA TAPE forms and amounts remain unconfirmed.",
          )}
        </p>
      </section>
    </>
  );
}

function DraftReport({ report, onClose }) {
  const { t, language } = useI18n();
  function download() {
    const url = URL.createObjectURL(
      new Blob([reportText(report, language)], {
        type: "text/plain;charset=utf-8",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download =
      language === "zh"
        ? report.isPlus
          ? "VITA-TAPE-Plus-营养报告草稿.txt"
          : "VITA-TAPE-补剂建议报告.txt"
        : report.isPlus
          ? "VITA-TAPE-Plus-draft-nutrition-report.txt"
          : "VITA-TAPE-supplement-recommendations.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <Modal
      title={t(
        report.isPlus
          ? t("Your nutrition report")
          : t("Your supplement recommendation report"),
      )}
      onClose={onClose}
      className="nutrition-report-modal"
    >
      <span
        className={`needs-pending ${report.isPlus ? "" : "needs-summary-status"}`}
      >
        {report.isPlus ? (
          <Clock size={17} aria-hidden="true" />
        ) : (
          <ListChecks size={17} aria-hidden="true" />
        )}
        {t(report.status)}
      </span>
      <p className="needs-report-notice">
        {report.isPlus
          ? t(
              "Plus with BUBU补补 · Draft supplement suggestions pending review. No review request has been sent, and this is not an approved plan.",
            )
          : t(
              "Standard · Supplement suggestions based on your questionnaire. This is not medical advice, and no professional review is included.",
            )}
      </p>
      <SupplementReport report={report} />
      <section>
        <h3>{t("Your everyday")}</h3>
        <p>
          {t(report.profile.age)}
          {t(" · ")}
          {t(report.profile.diet)}
        </p>
        <p>
          {t("Plant foods: ")}
          {t(report.profile.plants || "Not provided")}
          <br />
          {t("Activity: ")}
          {t(report.profile.activity || "Not provided")}
          <br />
          {t("Sleep: ")}
          {t(report.profile.sleep || "Not provided")}
        </p>
        <dl className="needs-intake-snapshot">
          {intakeQuestions.map((question) => (
            <div key={question.name}>
              <dt>{t(question.label)}</dt>
              <dd>{t(report.profile[question.name])}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section>
        <h3>{t("Your priorities")}</h3>
        <ul className="needs-report-priorities">
          {report.priorities.map((item) => (
            <li key={item.id}>
              <strong>{t(item.label)}</strong>
              <p>{t(item.discussion)}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>{t("Food-first opportunities")}</h3>
        <p>{t(report.foodFirst)}</p>
      </section>
      <section>
        <h3>
          {report.isPlus ? t("Health & reports") : t("Your health context")}
        </h3>
        <p>
          {report.healthContext.length
            ? report.healthContext.map((label) => t(label)).join(t("; "))
            : t("Optional health context not provided.")}
        </p>
        {report.profile.notes && (
          <p className="needs-report-user-notes">
            {t("Your notes: ")}
            {report.profile.notes}
          </p>
        )}
        {report.isPlus && (
          <ul>
            {report.attachments.length ? (
              report.attachments.map((file, index) => (
                <li key={index}>
                  {file.name}
                  {t(" — selected locally, not uploaded or analysed")}
                </li>
              ))
            ) : (
              <li>
                {t(
                  "No health reports added. Uploading a report is optional for Plus members too.",
                )}
              </li>
            )}
          </ul>
        )}
      </section>
      <section>
        <h3>{t("Suitability & safety check")}</h3>
        <p>{t(report.reviewNote)}</p>
      </section>
      {report.isPlus && (
        <div className="needs-report-approval">
          <ShieldCheck size={26} aria-hidden="true" />
          <div>
            <strong>{t("BUBU reviewer sign-off: not yet reviewed")}</strong>
            <p>
              {t(
                "Reviewer identity and credentials will appear with a professionally reviewed report. Final suitability and amounts require professional sign-off.",
              )}
            </p>
          </div>
        </div>
      )}
      <div className="needs-report-actions">
        <button className="button" onClick={download}>
          {report.isPlus
            ? t("Download Demo Draft")
            : t("Download My Supplement Report")}{" "}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
        <button className="needs-text-button" onClick={onClose}>
          {t("Edit My Answers")}
        </button>
      </div>
      <p className="needs-field-hint">
        {t("No ingredients have been added to your Tape.")}
      </p>
    </Modal>
  );
}

export function PersonalisationPage() {
  const { t } = useI18n();
  const [tier, setTier] = useState("standard");
  const isPlus = tier === "plus";
  const [answers, setAnswers] = useState(initialAnswers);
  const [files, setFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);
  const [issues, setIssues] = useState({});
  const [report, setReport] = useState(null);
  const form = useRef(null);
  useEffect(() => {
    document.title = t("Find Out What You Need — VITA TAPE");
  }, [t]);

  function update(name, value) {
    setAnswers((previous) => ({ ...previous, [name]: value }));
    setIssues((previous) => ({ ...previous, [name]: undefined }));
    setReport(null);
  }
  function changeTier(nextTier) {
    if (nextTier === tier) return;
    setTier(nextTier);
    setFiles([]);
    setFileErrors([]);
    setReport(null);
    setIssues({});
    setAnswers((previous) => ({ ...previous, consent: false }));
  }
  function toggle(name, id) {
    const selected = answers[name];
    const exclusive = name === "health" && (id === "none" || id === "private");
    update(
      name,
      selected.includes(id)
        ? selected.filter((item) => item !== id)
        : exclusive
          ? [id]
          : [
              ...selected.filter(
                (item) =>
                  name !== "health" || !["none", "private"].includes(item),
              ),
              id,
            ],
    );
  }
  function addFiles(incoming) {
    if (!isPlus) return;
    const selection = selectAttachments(files, incoming);
    setFiles(selection.files);
    setFileErrors(selection.errors);
    setReport(null);
  }
  function preview(event) {
    event.preventDefault();
    const nextIssues = formIssues(answers);
    setIssues(nextIssues);
    if (Object.keys(nextIssues).length) {
      const first = Object.keys(nextIssues)[0];
      form.current.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setReport(createDraftReport(answers, files, { tier }));
  }

  return (
    <div className="needs-page" id="top">
      <a className="skip-link" href="#needs-questionnaire">
        {t("Skip to questionnaire")}
      </a>
      <Header />
      <main>
        <div className="needs-main">
          <a href="/build-your-tape" className="needs-back">
            <ArrowLeft size={17} aria-hidden="true" />
            {t("Back to Build Your Tape")}
          </a>
          <div className="needs-intro">
            <h1>
              {t("Find out what")}
              <br className="needs-title-break" />
              {t(" you need.")}
            </h1>
            <p>
              {t("A little about you. A more personal starting point.")}
              <br />
              {t("Tell us about your goals and everyday routine.")}
              <br />
              {isPlus
                ? t("Add a health report only if you choose.")
                : t("A questionnaire is all you need to get started.")}
            </p>
          </div>
          <div className="needs-experience" id="needs-experience">
            <fieldset>
              <legend>{t("Choose your experience")}</legend>
              <div className="needs-experience-options">
                <label className={!isPlus ? "is-selected" : ""}>
                  <input
                    type="radio"
                    name="experience"
                    value="standard"
                    aria-label={t("Standard — self-guided questionnaire")}
                    checked={!isPlus}
                    onChange={() => changeTier("standard")}
                  />
                  <span>
                    <strong>{t("Standard")}</strong>
                    <span>
                      {t("Supplement suggestions · No upload needed")}
                    </span>
                  </span>
                </label>
                <label className={isPlus ? "is-selected" : ""}>
                  <input
                    type="radio"
                    name="experience"
                    value="plus"
                    aria-label={t(
                      "Plus with BUBU补补 — optional reports and nutritionist review",
                    )}
                    checked={isPlus}
                    onChange={() => changeTier("plus")}
                  />
                  <span>
                    <strong>{t("Plus with BUBU补补")}</strong>
                    <span>
                      {t("Optional report upload · Nutritionist review")}
                    </span>
                  </span>
                </label>
              </div>
            </fieldset>
            <p className="needs-field-hint">
              {t(
                "Experience preview only. Switching here does not activate a membership or send information to BUBU补补.",
              )}
            </p>
          </div>
          <div className="needs-layout">
            <aside className="needs-sidebar">
              <div className="needs-sidebar-inner">
                <h2>
                  {t("A clearer")}
                  <br />
                  {t("picture of you.")}
                </h2>
                <p>
                  {isPlus
                    ? t(
                        "Your answers shape a draft nutrition report for a BUBU nutritionist to review. Health reports are optional.",
                      )
                    : t(
                        "Get a supplement shortlist with reasons, food alternatives and safety checks. No report upload or Plus membership is required.",
                      )}
                </p>
                <nav aria-label={t("Questionnaire sections")}>
                  {sections.map(([id, label], index) => (
                    <a href={`#needs-${id}`} key={id}>
                      <span>
                        {t("0")}
                        {index + 1}
                      </span>
                      {id === "health" && isPlus
                        ? t("Health & reports")
                        : id === "review" && isPlus
                          ? t("Your review")
                          : t(label)}
                    </a>
                  ))}
                </nav>
                <p className="needs-time">
                  {t("About 5 minutes · For adults 18+")}
                </p>
                <div className="needs-privacy">
                  <LockSimple size={21} aria-hidden="true" />
                  <p>
                    {t("Your answers stay with you.")}
                    <br />
                    {t(
                      "This demo does not save your health information. Reloading clears your answers and files.",
                    )}
                  </p>
                </div>
              </div>
            </aside>
            <form
              className="needs-form"
              id="needs-questionnaire"
              ref={form}
              onSubmit={preview}
              noValidate
            >
              <section id="needs-goals" aria-labelledby="needs-goals-title">
                <SectionTitle number="01" id="needs-goals-title">
                  {t("What would you like to focus on?")}
                </SectionTitle>
                <p className="needs-section-help" id="needs-goal-help">
                  {t("Choose up to 3 priorities. ")}
                  <span>{t("Required")}</span>
                </p>
                <fieldset className="needs-goals-field">
                  <legend className="needs-sr-only">
                    {t("Your priorities")}
                  </legend>
                  <div className="needs-check-grid">
                    {goals.map((goal) => (
                      <label
                        key={goal.id}
                        className={
                          answers.goals.includes(goal.id) ? "is-selected" : ""
                        }
                      >
                        <input
                          type="checkbox"
                          name="goals"
                          value={goal.id}
                          checked={answers.goals.includes(goal.id)}
                          disabled={
                            answers.goals.length === 3 &&
                            !answers.goals.includes(goal.id)
                          }
                          onChange={() => toggle("goals", goal.id)}
                          aria-describedby={
                            issues.goals
                              ? "needs-goal-error"
                              : "needs-goal-help"
                          }
                          aria-invalid={!!issues.goals}
                        />
                        <span>{t(goal.label)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {issues.goals && (
                  <p className="needs-error" id="needs-goal-error">
                    {t(issues.goals)}
                  </p>
                )}
              </section>
              <section
                id="needs-everyday"
                aria-labelledby="needs-everyday-title"
              >
                <SectionTitle number="02" id="needs-everyday-title">
                  {t("Your everyday")}
                </SectionTitle>
                <div className="needs-age-field">
                  <label htmlFor="needs-age">
                    {t("Age range ")}
                    <span>{t("Required")}</span>
                  </label>
                  <select
                    id="needs-age"
                    name="age"
                    value={answers.age}
                    onChange={(event) => update("age", event.target.value)}
                    aria-invalid={!!issues.age}
                    aria-describedby={
                      issues.age ? "needs-age-error" : undefined
                    }
                  >
                    <option value="">{t("Select your age range")}</option>
                    {ageRanges.map((age) => (
                      <option key={age} value={age}>
                        {t(age)}
                      </option>
                    ))}
                  </select>
                  {issues.age && (
                    <p className="needs-error" id="needs-age-error">
                      {t(issues.age)}
                    </p>
                  )}
                </div>
                <Choices
                  label={t("How do you usually eat?")}
                  name="diet"
                  options={diets}
                  value={answers.diet}
                  onChange={update}
                  segmented
                  error={issues.diet}
                  hint={t("Required")}
                />
                <Choices
                  label={t("How often do you include plant foods?")}
                  hint={t(
                    "Fruit, vegetables, whole grains and legumes · Optional",
                  )}
                  name="plants"
                  options={["Rarely", "Sometimes", "Often", "Most meals"]}
                  value={answers.plants}
                  onChange={update}
                />
                <div className="needs-intake-intro">
                  <h3>{t("A few details for your supplement suggestions")}</h3>
                  <p className="needs-section-help">
                    {t(
                      "These food and routine answers determine the shortlist. A goal alone does not identify a nutrient gap.",
                    )}
                  </p>
                </div>
                {intakeQuestions.map((question) => (
                  <Choices
                    key={question.name}
                    {...question}
                    value={answers[question.name]}
                    onChange={update}
                    error={issues[question.name]}
                  />
                ))}
                <Choices
                  label={t("What does your usual activity look like?")}
                  hint={t("Optional")}
                  name="activity"
                  options={[
                    "Mostly sitting",
                    "Lightly active",
                    "Moderately active",
                    "Very active",
                  ]}
                  value={answers.activity}
                  onChange={update}
                />
                <Choices
                  label={t("How would you describe your sleep?")}
                  hint={t("Optional")}
                  name="sleep"
                  options={["Poor", "Fair", "Good", "Very good"]}
                  value={answers.sleep}
                  onChange={update}
                />
              </section>
              <section id="needs-health" aria-labelledby="needs-health-title">
                <SectionTitle number="03" id="needs-health-title">
                  {isPlus ? t("Health & reports") : t("Your health context")}
                </SectionTitle>
                <p className="needs-section-help">
                  {t(
                    "Choose the factors that apply, None of these apply, or Unsure / private. Details remain optional; a safety flag pauses recommendations for professional review.",
                  )}
                </p>
                <fieldset className="needs-health-field">
                  <legend className="needs-sr-only">
                    {t("Health context — required")}
                  </legend>
                  <div className="needs-check-grid">
                    {healthOptions.map(([id, label]) => (
                      <label
                        key={id}
                        className={
                          answers.health.includes(id) ? "is-selected" : ""
                        }
                      >
                        <input
                          type="checkbox"
                          name="health"
                          value={id}
                          checked={answers.health.includes(id)}
                          onChange={() => toggle("health", id)}
                          aria-invalid={!!issues.health}
                          aria-describedby={
                            issues.health ? "needs-health-error" : undefined
                          }
                        />
                        <span>{t(label)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {issues.health && (
                  <p className="needs-error" id="needs-health-error">
                    {t(issues.health)}
                  </p>
                )}
                <label className="needs-notes-label" htmlFor="needs-notes">
                  {t("Anything else you would like us to know?")}{" "}
                  <span>{t("(optional)")}</span>
                </label>
                <textarea
                  id="needs-notes"
                  name="notes"
                  rows={3}
                  maxLength={2000}
                  value={answers.notes}
                  placeholder={
                    isPlus
                      ? t(
                          "Your current routine, food preferences, or questions for a BUBU nutritionist…",
                        )
                      : t(
                          "Your current routine, food preferences, or anything you would like to note…",
                        )
                  }
                  onChange={(event) => update("notes", event.target.value)}
                />
                <p className="needs-character-count">
                  {answers.notes.length}
                  {t(" / 2,000")}
                </p>
                {isPlus && (
                  <div className="needs-plus-upload">
                    <div className="needs-plus-heading">
                      <span>{t("PLUS × BUBU补补")}</span>
                      <strong>{t("Health report · Optional")}</strong>
                    </div>
                    <p className="needs-section-help">
                      {t(
                        "Plus members can add a report for a BUBU nutritionist to consider alongside the questionnaire. You can continue without a file.",
                      )}
                    </p>
                    <ReportUpload
                      files={files}
                      onAdd={addFiles}
                      onRemove={(index) => {
                        setFiles((previous) =>
                          previous.filter((_, i) => index !== i),
                        );
                        setFileErrors([]);
                        setReport(null);
                      }}
                      errors={fileErrors}
                    />
                  </div>
                )}
              </section>
              <section id="needs-review" aria-labelledby="needs-review-title">
                <SectionTitle number="04" id="needs-review-title">
                  {isPlus ? t("Your review") : t("Your supplement report")}
                </SectionTitle>
                <p className="needs-section-help">
                  {isPlus
                    ? t(
                        "Your Plus report will need a BUBU nutritionist’s approval before any final recommendation is released. A health report is not required.",
                      )
                    : t(
                        "Your report will show supplements worth considering, why they match, what to check first, and which options are not suggested. You can finish without an upload or Plus.",
                      )}
                </p>
                <label
                  className={`needs-consent ${answers.consent ? "is-selected" : ""}`}
                >
                  <input
                    type="checkbox"
                    name="consent"
                    checked={answers.consent}
                    onChange={(event) =>
                      update("consent", event.target.checked)
                    }
                    aria-invalid={!!issues.consent}
                    aria-describedby={
                      issues.consent ? "needs-consent-error" : undefined
                    }
                  />
                  <span>
                    {isPlus
                      ? t(
                          "I understand this is a local demo draft and needs professional review. It is not medical advice.",
                        )
                      : t(
                          "I understand these are questionnaire-based supplement suggestions, not a diagnosis or prescription. Personal suitability and amounts need checking.",
                        )}
                  </span>
                </label>
                {issues.consent && (
                  <p className="needs-error" id="needs-consent-error">
                    {t(issues.consent)}
                  </p>
                )}
                {Object.values(issues).some(Boolean) && (
                  <p className="needs-error" role="alert">
                    {t(
                      "Please complete the highlighted fields before previewing your report.",
                    )}
                  </p>
                )}
                <button className="button needs-submit" type="submit">
                  {isPlus
                    ? t("Preview My Nutrition Report")
                    : t("View My Supplement Report")}{" "}
                  <ArrowRight size={20} aria-hidden="true" />
                </button>
                <p className="needs-field-hint">
                  {isPlus
                    ? t(
                        "Preview only. Your answers and files are not sent to BUBU补补 or a nutritionist in this demo.",
                      )
                    : t(
                        "Questionnaire only. Your answers stay in this tab; no review request is sent.",
                      )}
                </p>
              </section>
            </form>
          </div>
        </div>
        {isPlus ? (
          <NutritionistReview />
        ) : (
          <section
            className="needs-plus-offer"
            aria-labelledby="needs-plus-title"
          >
            <div>
              <p className="needs-demo-label">{t("Plus with BUBU补补")}</p>
              <h2 id="needs-plus-title">
                {t("A little more guidance, if you want it.")}
              </h2>
              <p>
                {t(
                  "Explore optional health-report upload and a proposed BUBU nutritionist review with Plus. Your standard questionnaire works on its own.",
                )}
              </p>
            </div>
            <button
              className="button"
              onClick={() => {
                changeTier("plus");
                document
                  .getElementById("needs-experience")
                  ?.scrollIntoView({ block: "start" });
              }}
            >
              {t("Explore Plus with BUBU补补")}{" "}
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </section>
        )}
      </main>
      <PageFooter />
      {report && (
        <DraftReport report={report} onClose={() => setReport(null)} />
      )}
    </div>
  );
}
