export {
  initialAnswers,
  formIssues,
  createDraftReport,
  reportText,
  reportView,
  selectionConflict,
  questionPlan,
  reconcileAnswers,
  validateQuestion,
  answerLines,
  getSafetyDisposition,
  localQuestion,
  toggleOption,
} from "./supplement-recommendations.js";

const allowedFiles = {
  pdf: ["application/pdf"],
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  png: ["image/png"],
};
export const maxFileBytes = 10 * 1024 * 1024;
export function selectAttachments(current, incoming) {
  const files = [...current];
  const errors = [];
  for (const file of incoming) {
    const extension = file.name.split(".").pop().toLowerCase();
    const mimeTypes = allowedFiles[extension];
    if (!mimeTypes || (file.type && !mimeTypes.includes(file.type))) {
      errors.push(`${file.name}: please choose a PDF, JPG or PNG.`);
    } else if (!file.size || file.size > maxFileBytes) {
      errors.push(
        `${file.name}: files must be non-empty and no larger than 10 MB.`,
      );
    } else if (
      files.some(
        (item) =>
          item.name === file.name &&
          item.size === file.size &&
          item.lastModified === file.lastModified,
      )
    ) {
      errors.push(`${file.name} is already added.`);
    } else if (files.length >= 3) {
      errors.push("You can add up to 3 files. Remove a file to add another.");
    } else {
      files.push(file);
    }
  }
  return { files, errors: [...new Set(errors)] };
}
