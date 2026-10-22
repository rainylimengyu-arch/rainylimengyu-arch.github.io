import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react/dist/csr/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { UploadSimple } from "@phosphor-icons/react/dist/csr/UploadSimple";
import { FileText } from "@phosphor-icons/react/dist/csr/FileText";
import { X } from "@phosphor-icons/react/dist/csr/X";
import { Clock } from "@phosphor-icons/react/dist/csr/Clock";
import { ListChecks } from "@phosphor-icons/react/dist/csr/ListChecks";
import { Leaf } from "@phosphor-icons/react/dist/csr/Leaf";
import { ShieldCheck } from "@phosphor-icons/react/dist/csr/ShieldCheck";
import { Header } from "./App";
import { PageFooter } from "./LandingHero";
import { useI18n } from "./i18n";
import { choose } from "./bubu/report-copy";
import {
  initialAnswers,
  questionPlan,
  localQuestion,
  reconcileAnswers,
  validateQuestion,
  toggleOption,
  getSafetyDisposition,
  createDraftReport,
  reportView,
  reportText,
  formIssues,
  selectAttachments,
  selectionConflict,
  answerLines,
} from "./personalisation";
import "./personalisation.css";
import "./bubu-questionnaire.css";
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

function AnswerOptions({
  id,
  options,
  value,
  multiple = false,
  exclusive,
  onChange,
  error,
}) {
  return (
    <div className="bubu-options">
      {options.map((option) => {
        const checked = multiple
          ? Array.isArray(value) && value.includes(option.id)
          : value === option.id;
        return (
          <label key={option.id} className={checked ? "is-selected" : ""}>
            <input
              type={multiple ? "checkbox" : "radio"}
              name={id}
              value={option.id}
              checked={checked}
              onChange={() =>
                onChange(
                  multiple
                    ? toggleOption(value, option.id, exclusive)
                    : option.id,
                )
              }
              aria-invalid={!!error}
              aria-describedby={error ? "bubu-question-error" : undefined}
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
function QuestionFields({ question, value, onChange, error }) {
  const { language } = useI18n();
  const rows = question.fields || question.rows;
  if (!rows)
    return (
      <AnswerOptions
        id={question.id}
        options={question.options}
        value={value}
        multiple={question.type === "multi"}
        exclusive={question.exclusiveIds || ["none", "unknown"]}
        onChange={onChange}
        error={error}
      />
    );
  function update(field, next) {
    let patch = { ...(value || {}), [field.id]: next };
    if (
      question.id === "training_detail" &&
      field.id === "frequency" &&
      next === "zero"
    )
      patch = {
        ...patch,
        types: [],
        duration: "not_applicable",
        protein_access: "not_applicable",
        stable: "none",
      };
    onChange(patch);
  }
  return (
    <div className="bubu-fields">
      {rows.map((field) => {
        const title = field.title || field.label;
        const inactive =
          question.id === "training_detail" &&
          value?.frequency === "zero" &&
          ["types", "duration", "protein_access", "stable"].includes(field.id);
        if (inactive) return null;
        return (
          <fieldset key={field.id} className="bubu-field">
            <legend>
              {title}
              {field.type === "number" ? null : (
                <span>
                  {field.type === "multi"
                    ? choose(language, " · select all that apply", " · 可多选")
                    : ""}
                </span>
              )}
            </legend>
            {field.type === "number" ? (
              <div className="bubu-number">
                <input
                  aria-label={title}
                  name={`${question.id}.${field.id}`}
                  type="number"
                  inputMode="decimal"
                  value={value?.[field.id] ?? ""}
                  min={field.min}
                  max={field.max}
                  step={field.id === "age" ? 1 : "any"}
                  placeholder={choose(language, "Optional", "可留空")}
                  onChange={(event) => update(field, event.target.value)}
                  aria-invalid={!!error}
                />
                <span>{field.unit}</span>
              </div>
            ) : (
              <AnswerOptions
                id={`${question.id}.${field.id}`}
                options={field.options || field.choices || question.choices}
                value={value?.[field.id]}
                multiple={field.type === "multi"}
                exclusive={field.exclusiveIds || ["none", "unknown"]}
                onChange={(next) => update(field, next)}
                error={error}
              />
            )}
          </fieldset>
        );
      })}
    </div>
  );
}
function Sources({ sources }) {
  const { language } = useI18n();
  return (
    <div className="bubu-sources">
      {sources.map((source, index) => (
        <a
          key={source.url + index}
          href={source.url}
          target="_blank"
          rel="noreferrer"
        >
          {choose(language, "Evidence", "参考依据")} {index + 1} ↗
        </a>
      ))}
    </div>
  );
}
function CandidateCard({
  item,
  selected,
  onSelect,
  held = false,
  conflict = false,
}) {
  const { language } = useI18n();
  const C = (en, zh) => choose(language, en, zh);
  return (
    <article className={`bubu-candidate ${held ? "is-held" : ""}`}>
      <div className="bubu-candidate-top">
        <span className="bubu-rank">
          {String(item.rank || "•").padStart(2, "0")}
        </span>
        <span className="bubu-tag">{item.status}</span>
      </div>
      <h4>{item.name}</h4>
      <p className="bubu-benefit">{item.benefit}</p>
      <strong className="bubu-small-label">
        {C("Why this matches", "推荐依据")}
      </strong>
      <p>{item.reason}</p>
      <p className="bubu-caution">
        <strong>{C("Before use: ", "使用前：")}</strong>
        {item.caution}
      </p>
      <details>
        <summary>
          {C(
            "Matched answers, food options & evidence",
            "对应答案、饮食替代与证据",
          )}
        </summary>
        <dl>
          {item.matchedAnswers.map((a, i) => (
            <div key={i}>
              <dt>{a.label}</dt>
              <dd>{a.value}</dd>
            </div>
          ))}
        </dl>
        <h5>{C("Food first", "饮食替代")}</h5>
        <p>{item.food}</p>
        {item.details.map((d, i) => (
          <div key={i}>
            <h5>{d.title}</h5>
            <p>{d.body}</p>
          </div>
        ))}
        <p className="bubu-availability">{item.availability}</p>
        <Sources sources={item.references} />
      </details>
      {!held && (
        <button
          type="button"
          className={`bubu-select ${selected ? "is-selected" : ""}`}
          aria-pressed={selected}
          onClick={onSelect}
        >
          {selected
            ? C("Remove from discussion shortlist", "移出讨论清单")
            : C("Add to discussion shortlist", "加入讨论清单")}{" "}
          <span aria-hidden="true">{selected ? "−" : "+"}</span>
        </button>
      )}
      {conflict && (
        <p className="bubu-error" role="alert">
          {C(
            "These options overlap or belong to the same alternative group. Remove the existing choice first; nothing has been silently replaced.",
            "这些选项存在重复或属于同组替代方案。请先移除原选择，系统未自动替换任何项目。",
          )}
        </p>
      )}
    </article>
  );
}
function NutritionReport({ report, onEdit }) {
  const { language } = useI18n();
  const C = (en, zh) => choose(language, en, zh);
  const [selected, setSelected] = useState([]),
    [selectionError, setSelectionError] = useState(false),
    [catalogFilter, setCatalogFilter] = useState("all");
  const view = reportView(report, language);
  function toggle(id) {
    if (selected.includes(id)) {
      setSelected((previous) => previous.filter((x) => x !== id));
      setSelectionError(false);
      return;
    }
    if (selectionConflict(report, selected, id)) {
      setSelectionError(id);
      return;
    }
    setSelected((previous) => [...previous, id]);
    setSelectionError(false);
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([reportText(report, language, selected)], {
        type: "text/plain;charset=utf-8",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download =
      language === "zh"
        ? "VITA-TAPE-BUBU-完整营养报告.txt"
        : "VITA-TAPE-BUBU-complete-nutrition-report.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const catalog = view.catalog.filter(
    (x) => catalogFilter === "all" || x.state === catalogFilter,
  );
  return (
    <section className="bubu-result" aria-labelledby="bubu-result-title">
      <div className="bubu-report-header">
        <div>
          <p className="bubu-eyebrow">
            {C("YOUR NUTRITION, IN CONTEXT", "把营养放回你的生活")}
          </p>
          <h2 id="bubu-result-title" tabIndex={-1}>
            {view.title}
          </h2>
          <span className="bubu-status">{view.status}</span>
        </div>
        <div className="bubu-report-actions">
          <button type="button" className="button" onClick={download}>
            {C("Download report", "下载完整报告")} <ArrowRight size={17} />
          </button>
          <button
            type="button"
            className="needs-text-button"
            onClick={() => onEdit()}
          >
            {C("Edit answers", "修改答案")}
          </button>
        </div>
      </div>
      <p className={`bubu-report-intro ${report.needsReview ? "is-held" : ""}`}>
        {view.overview}
      </p>
      <div className="bubu-metrics">
        <div>
          <strong>{report.coverageCount}</strong>
          <span>
            {C("nutrition & food directions reviewed", "项营养与饮食方向")}
          </span>
        </div>
        <div>
          <strong>{view.catalog.length}</strong>
          <span>{C("Tape ingredient decisions", "种 Tape 成分决策")}</span>
        </div>
        <div>
          <strong>{view.cards.length}</strong>
          <span>{C("matched supplement options", "项匹配的补充选项")}</span>
        </div>
      </div>
      <p className="bubu-note">
        {C(
          "Food-source screening is not a deficiency diagnosis. A complete review does not mean you need every supplement.",
          "食物来源筛查不等于营养缺乏诊断。覆盖全面，不代表每种都需要补。",
        )}
      </p>
      {view.checks.length > 0 && (
        <section className="bubu-review-box">
          <h3>{C("Check these before starting", "补充前，先确认这些情况")}</h3>
          {view.checks.map((item) => (
            <details key={item.id}>
              <summary>{item.name}</summary>
              <p>{item.reason}</p>
              <p>{item.action}</p>
            </details>
          ))}
        </section>
      )}
      {view.programs.map((program) => (
        <section className="bubu-report-section" key={program.id}>
          <div className="bubu-section-heading">
            <h3>{program.name}</h3>
            <span>
              {program.items.length} {C("options", "项")}
            </span>
          </div>
          <div className="bubu-candidate-grid">
            {program.items.map((item) => (
              <CandidateCard
                key={item.id}
                item={item}
                selected={selected.includes(item.id)}
                conflict={selectionError === item.id}
                onSelect={() => toggle(item.id)}
              />
            ))}
          </div>
        </section>
      ))}
      {!view.cards.length && (
        <div className="bubu-empty">
          <h3>
            {C(
              "Your next step is specific, even without a new stack",
              "暂不新增补剂，也有明确的下一步",
            )}
          </h3>
          <p>{view.overview}</p>
        </div>
      )}
      {view.discussion.length > 0 && (
        <section className="bubu-report-section">
          <h3>
            {C(
              "Discussion items · review first",
              "可讨论的方向 · 先核查适用性",
            )}
          </h3>
          <div className="bubu-candidate-grid">
            {view.discussion.map((item) => (
              <CandidateCard key={item.id} item={item} held />
            ))}
          </div>
        </section>
      )}
      {view.foodActions.length > 0 && (
        <section className="bubu-report-section">
          <h3>
            {C("Make the food changes practical", "把饮食调整变得可执行")}
          </h3>
          <div className="bubu-food-actions">
            {view.foodActions.map((item) => (
              <article key={item.id}>
                <Leaf size={24} aria-hidden="true" />
                <h4>{item.name}</h4>
                <p>{item.reason}</p>
                <p>{item.action}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="bubu-report-section">
        <div className="bubu-section-heading">
          <div>
            <h3>{C("Your complete nutrition review", "完整营养评估")}</h3>
            <p>
              {C(
                "Each item has a source decision and a next action. Unknowns stay unknown.",
                "每项列出来源判断和下一步，未确认的信息会标出。食物来源用于科普，实际选择请避开过敏食物并遵循已有医嘱。",
              )}
            </p>
          </div>
        </div>
        {view.coverage.map((group) => (
          <details className="bubu-coverage-group" key={group.id} open>
            <summary>
              {group.name}
              <span>
                {group.items.length} {C("items", "项")}
              </span>
            </summary>
            <div className="bubu-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>{C("Nutrient / direction", "营养素／方向")}</th>
                    <th>{C("Source decision", "来源判断")}</th>
                    <th>{C("Food sources & next step", "食物来源与下一步")}</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">{item.name}</th>
                      <td>
                        <span className={`bubu-row-status state-${item.state}`}>
                          {item.status}
                        </span>
                        <p>{item.reason}</p>
                      </td>
                      <td>
                        <p>{item.food}</p>
                        <p>{item.action}</p>
                        <Sources sources={[item.reference]} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        ))}
      </section>
      <section className="bubu-report-section">
        <h3>
          {C(
            "Every Tape ingredient has a decision",
            "每一种 Tape 成分，都有本次决策",
          )}
        </h3>
        <p>
          {C(
            "A related ingredient is not confirmation of the final Tape form, dose or a safe combined formula.",
            "相关成分匹配，不代表 Tape 的最终形态、剂量或组合配方已确认。",
          )}
        </p>
        <div
          className="bubu-catalog-filters"
          role="group"
          aria-label={C("Filter ingredient decisions", "筛选成分决策")}
        >
          {[
            ["all", "All ingredients", "全部成分"],
            ["matched", "Related match", "相关匹配"],
            ["review", "Review first", "先核查"],
            ["not_selected", "Not selected", "本次未选"],
          ].map(([id, en, zh]) => (
            <button
              type="button"
              key={id}
              aria-pressed={catalogFilter === id}
              onClick={() => setCatalogFilter(id)}
            >
              {C(en, zh)}
            </button>
          ))}
        </div>
        <div className="bubu-catalog-grid">
          {catalog.map((item) => (
            <details key={item.id}>
              <summary>
                {item.name}
                <span>
                  {item.state === "matched"
                    ? C("Related match", "相关匹配")
                    : item.state === "review"
                      ? C("Review", "需核查")
                      : item.state === "existing"
                        ? C("Existing", "已补充")
                        : C("Not selected", "本次未选")}
                </span>
              </summary>
              <p>{item.reason}</p>
              <p>{item.evidence}</p>
              <Sources sources={[item.reference]} />
            </details>
          ))}
        </div>
      </section>
      <section className="bubu-report-section">
        <h3>{C("Your discussion shortlist", "你的讨论清单")}</h3>
        <p>
          {selected.length
            ? view.cards
                .filter((c) => selected.includes(c.id))
                .map((c) => c.name)
                .join(language === "zh" ? "、" : ", ")
            : C(
                "Add the options you want to discuss. Nothing is added automatically.",
                "可加入希望进一步讨论的选项，系统不会默认全选。",
              )}
        </p>
        <p className="bubu-note">
          {C(
            "This shortlist is not a daily dosing plan or a checked Tape formula. No order is created.",
            "讨论清单不是每日服用方案或已核查的 Tape 配方，不会自动下单。",
          )}
        </p>
      </section>
      <details className="bubu-answer-review">
        <summary>{C("Your questionnaire record", "查看本次问卷记录")}</summary>
        <dl>
          {answerLines(report.answers, language).map((a, i) => (
            <div key={i}>
              <dt>{a.label}</dt>
              <dd>{a.value}</dd>
            </div>
          ))}
        </dl>
      </details>
      {report.notes && (
        <p className="bubu-user-notes">
          {C(
            "Your notes (not automatically interpreted): ",
            "你的备注（未自动解读）：",
          )}
          {report.notes}
        </p>
      )}
      {report.isPlus && (
        <section className="bubu-review-box">
          <h3>
            {C(
              "BUBU reviewer sign-off: not yet reviewed",
              "BUBU补补审核签署：尚未审核",
            )}
          </h3>
          <p>
            {C(
              "No reviewer has been assigned and no review request was sent. Optional files are selected locally, not uploaded or analysed.",
              "尚未指派审核人员，也未发送审核申请。选填文件仅在本地选择，未上传或分析。",
            )}
          </p>
          <ul>
            {report.attachments.length ? (
              report.attachments.map((f, i) => <li key={i}>{f.name}</li>)
            ) : (
              <li>
                {C(
                  "No files added; upload is optional.",
                  "未添加文件，上传为选填。",
                )}
              </li>
            )}
          </ul>
        </section>
      )}
      <p className="bubu-final-notice">{view.disclaimer}</p>
      <div className="bubu-report-actions">
        <button type="button" className="button" onClick={download}>
          {C("Download complete report", "下载完整报告")}{" "}
          <ArrowRight size={17} />
        </button>
        <a className="needs-text-button" href="/ingredient-library">
          {C("Explore the ingredient library", "查看成分库")}
        </a>
      </div>
    </section>
  );
}
export function PersonalisationPage() {
  const { language, t } = useI18n();
  const C = (en, zh) => choose(language, en, zh);
  const [answers, setAnswers] = useState(initialAnswers),
    [stepId, setStepId] = useState("audience"),
    [tier, setTier] = useState("standard"),
    [files, setFiles] = useState([]),
    [fileErrors, setFileErrors] = useState([]),
    [error, setError] = useState(""),
    [consent, setConsent] = useState(false),
    [notes, setNotes] = useState(""),
    [report, setReport] = useState(null);
  const top = useRef(null);
  const plan = questionPlan(answers),
    index = plan.findIndex((q) => q.id === stepId),
    rawQuestion = plan[index],
    question = rawQuestion && localQuestion(rawQuestion, language),
    isPlus = tier === "plus";
  const urgent = getSafetyDisposition(answers).status === "stop",
    minor = answers.audience === "minor_under_18";
  useEffect(() => {
    document.title = t("Find Out What You Need — VITA TAPE");
  }, [t]);
  function changeTier(next) {
    if (next === tier) return;
    setTier(next);
    setFiles([]);
    setFileErrors([]);
    setConsent(false);
    setReport(null);
    setError("");
  }
  function update(value) {
    setAnswers((previous) =>
      reconcileAnswers({ ...previous, [stepId]: value }),
    );
    setError("");
    setConsent(false);
    setReport(null);
  }
  function move(id) {
    setStepId(id);
    setError("");
    top.current?.scrollIntoView({ block: "start" });
  }
  function next(event) {
    event.preventDefault();
    const check = validateQuestion(rawQuestion, answers[stepId], answers);
    if (!check.valid) {
      setError(
        language === "zh"
          ? check.message
          : "Please complete the required choices. Use Not sure where available, and check any optional numbers.",
      );
      return;
    }
    if (urgent || minor) return;
    move(plan[index + 1]?.id || "review");
  }
  function generate(event) {
    event.preventDefault();
    const issues = formIssues(answers);
    if (Object.keys(issues).length) {
      const first = Object.keys(issues)[0];
      move(first);
      setError(
        language === "zh"
          ? issues[first]
          : "Please complete this answer before viewing your report.",
      );
      return;
    }
    if (!consent) {
      setError(
        C("Please acknowledge the report notice.", "请确认已阅读报告说明。"),
      );
      return;
    }
    setReport(createDraftReport(answers, files, { tier, notes }));
    top.current?.scrollIntoView({ block: "start" });
  }
  return (
    <div className="needs-page bubu-page" id="top">
      <a className="skip-link" href="#bubu-questionnaire">
        {C("Skip to questionnaire", "跳至问卷")}
      </a>
      <Header />
      <main className="needs-main">
        <a href="/build-your-tape" className="needs-back">
          <ArrowLeft size={17} />
          {C("Back to Build Your Tape", "返回定制你的 Tape")}
        </a>
        <div className="needs-intro">
          <h1>
            {C("A clearer picture.", "更完整地了解你。")}
            <br />
            {C("A plan that makes sense.", "让每项建议都有依据。")}
          </h1>
          <p>
            {C(
              "Built on BUBU’s detailed questionnaire and recommendation logic.",
              "复用 BUBU 详细问卷与推荐逻辑。",
            )}
            <br />
            {C(
              "Food sources, daily life and goals, considered together.",
              "把食物来源、日常习惯与目标放在一起考虑。",
            )}
            <br />
            {C(
              "About 12–18 minutes · Adults 18+ · No email required",
              "约 12–18 分钟 · 适用于 18 岁以上成人 · 无需邮箱",
            )}
          </p>
        </div>
        <div className="needs-experience">
          <fieldset>
            <legend>{C("Choose your experience", "选择你的体验")}</legend>
            <div className="needs-experience-options">
              {[
                [
                  "standard",
                  "Standard",
                  "普通用户",
                  "Self-guided complete nutrition report",
                  "自助完整营养报告",
                ],
                [
                  "plus",
                  "Plus with BUBU补补",
                  "Plus × BUBU补补",
                  "Optional files · Proposed nutritionist review",
                  "可选文件 · 拟提供营养师审核",
                ],
              ].map(([id, en, zh, desc, descZh]) => (
                <label key={id} className={tier === id ? "is-selected" : ""}>
                  <input
                    type="radio"
                    name="experience"
                    value={id}
                    checked={tier === id}
                    onChange={() => changeTier(id)}
                  />
                  <span>
                    <strong>{C(en, zh)}</strong>
                    <span>{C(desc, descZh)}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="needs-field-hint">
            {C(
              "Experience preview only. No membership is activated and no questionnaire data is sent to BUBU.",
              "仅供体验预览。不会开通会员，也不会向 BUBU 发送问卷资料。",
            )}
          </p>
        </div>
        <div ref={top} className="bubu-flow-top" id="bubu-questionnaire">
          {report ? (
            <NutritionReport
              report={report}
              onEdit={() => {
                setReport(null);
                move("review");
              }}
            />
          ) : (
            <div className="bubu-question-layout">
              <aside className="bubu-guide">
                <p className="bubu-eyebrow">
                  {C("A COMPLETE STARTING POINT", "完整的营养起点")}
                </p>
                <h2>
                  {C("You first.", "先了解你。")}
                  <br />
                  {C("Then the nutrients.", "再谈怎么补。")}
                </h2>
                <ol>
                  <li>{C("Your context & goals", "个人背景与目标")}</li>
                  <li>{C("Food amounts & variety", "食物份量与种类")}</li>
                  <li>
                    {C("Sleep, movement & preferences", "睡眠、活动与偏好")}
                  </li>
                  <li>
                    {C("Existing supplements & safety", "已有补充与适用性")}
                  </li>
                  <li>
                    {C("Priorities + complete coverage", "重点建议与完整评估")}
                  </li>
                </ol>
                <p>
                  {C(
                    "Answers and optional files stay in this tab. Reloading clears them.",
                    "答案与选填文件只保留在当前标签页，刷新即清除。",
                  )}
                </p>
              </aside>
              <div className="bubu-question-card">
                {urgent || minor ? (
                  <section className="bubu-safety-stop" role="alert">
                    <ShieldCheck size={36} />
                    <h2>
                      {minor
                        ? C("This assessment is for adults", "此问卷适用于成人")
                        : C(
                            "Please prioritise the current concern",
                            "请先处理当前不适",
                          )}
                    </h2>
                    <p>
                      {minor
                        ? C(
                            "Under-18 nutrition needs an age-appropriate professional assessment. No adult supplement report will be generated.",
                            "未成年人应接受适龄的专业评估，此处不会生成成人补剂报告。",
                          )
                        : C(
                            "Seek urgent local medical help for the symptoms selected. Do not wait for questionnaire results or use supplements to manage them.",
                            "已选情况需要及时联系当地急救或急诊，请不要等待问卷结果，也不要用补充剂自行处理。",
                          )}
                    </p>
                    <button
                      type="button"
                      className="button"
                      onClick={() => {
                        const id = minor ? "audience" : "safety";
                        setAnswers((previous) => ({
                          ...previous,
                          [id]: minor ? "" : [],
                        }));
                        move(id);
                      }}
                    >
                      {C("Correct this answer", "修改此答案")}
                    </button>
                  </section>
                ) : stepId === "review" ? (
                  <form onSubmit={generate} noValidate>
                    <p className="bubu-eyebrow">
                      {C("READY TO REVIEW", "准备查看报告")}
                    </p>
                    <h2>
                      {C(
                        "Your answers. Your next steps.",
                        "你的答案，你的下一步。",
                      )}
                    </h2>
                    <p>
                      {C(
                        "Your report includes the full nutrition review, matched supplement options and a decision for every Tape ingredient.",
                        "报告包含完整营养评估、匹配的补充选项，以及每种 Tape 成分的本次决策。",
                      )}
                    </p>
                    <details className="bubu-answer-review">
                      <summary>
                        {C("Check or edit your answers", "核对或修改答案")}
                      </summary>
                      {plan.map((q) => (
                        <div className="bubu-edit-answer" key={q.id}>
                          <span>{localQuestion(q, language).title}</span>
                          <button type="button" onClick={() => move(q.id)}>
                            {C("Edit", "修改")}
                          </button>
                        </div>
                      ))}
                    </details>
                    <label className="bubu-notes-label" htmlFor="bubu-notes">
                      {C(
                        "Notes for a future professional review (optional)",
                        "供后续专业审核参考的备注（选填）",
                      )}
                    </label>
                    <textarea
                      id="bubu-notes"
                      rows={3}
                      maxLength={2000}
                      value={notes}
                      onChange={(event) => {
                        setNotes(event.target.value);
                        setConsent(false);
                      }}
                    />
                    <p className="bubu-note">
                      {C(
                        "Notes and files are not automatically interpreted. Record safety information in the relevant questions.",
                        "备注和文件不会自动解读；涉及安全的信息请在对应题目中明确选择。",
                      )}
                    </p>
                    {isPlus && (
                      <ReportUpload
                        files={files}
                        errors={fileErrors}
                        onAdd={(incoming) => {
                          const result = selectAttachments(files, incoming);
                          setFiles(result.files);
                          setFileErrors(result.errors);
                        }}
                        onRemove={(i) => {
                          setFiles((previous) =>
                            previous.filter((_, index) => index !== i),
                          );
                          setFileErrors([]);
                        }}
                      />
                    )}
                    <label className="needs-consent">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={consent}
                        onChange={(event) => setConsent(event.target.checked)}
                      />
                      <span>
                        {C(
                          "I understand this is an educational questionnaire report, not a diagnosis, dose prescription or approved combined formula.",
                          "我理解这是教育性的问卷报告，不是诊断、个人剂量处方或已获批的组合配方。",
                        )}
                      </span>
                    </label>
                    {error && (
                      <p className="bubu-error" role="alert">
                        {error}
                      </p>
                    )}
                    {isPlus && (
                      <p className="bubu-note">
                        {C(
                          "Plus remains pending BUBU nutritionist review. No actual review request or file upload is sent by this prototype.",
                          "Plus 报告仍待 BUBU补补营养师审核；此原型不会实际发送审核申请或上传文件。",
                        )}
                      </p>
                    )}
                    <div className="bubu-wizard-actions">
                      <button
                        type="button"
                        className="needs-text-button"
                        onClick={() => move(plan.at(-1).id)}
                      >
                        {C("Back", "上一步")}
                      </button>
                      <button type="submit" className="button">
                        {C("View my complete report", "查看我的完整报告")}{" "}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </form>
                ) : question ? (
                  <form onSubmit={next} noValidate>
                    <p className="bubu-eyebrow">
                      {C(
                        `QUESTION ${index + 1} OF ${plan.length}`,
                        `第 ${index + 1} / ${plan.length} 题`,
                      )}
                    </p>
                    <h2 id="bubu-question-title">{question.title}</h2>
                    {question.helper && (
                      <p className="bubu-question-help">{question.helper}</p>
                    )}
                    {question.why && (
                      <details className="bubu-why">
                        <summary>{C("Why we ask", "为什么问这个")}</summary>
                        <p>{question.why}</p>
                      </details>
                    )}
                    <QuestionFields
                      question={question}
                      value={answers[stepId]}
                      onChange={update}
                      error={error}
                    />
                    {error && (
                      <p
                        className="bubu-error"
                        id="bubu-question-error"
                        role="alert"
                      >
                        {error}
                      </p>
                    )}
                    <div className="bubu-wizard-actions">
                      <button
                        type="button"
                        className="needs-text-button"
                        disabled={index === 0}
                        onClick={() => move(plan[index - 1].id)}
                      >
                        <ArrowLeft size={16} /> {C("Back", "上一步")}
                      </button>
                      <button type="submit" className="button">
                        {index === plan.length - 1
                          ? C("Review answers", "核对答案")
                          : C("Continue", "继续")}{" "}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </form>
                ) : null}
              </div>
            </div>
          )}
        </div>
        {isPlus && !report && <NutritionistReview />}
      </main>
      <PageFooter />
    </div>
  );
}
