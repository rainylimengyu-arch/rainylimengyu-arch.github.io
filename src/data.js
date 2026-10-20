import nutrientLibrary from "./nutrient-library.json";
export const img = (path) => `/assets/02_IMAGES/${path}`;
export const icon = (name) => `/assets/03_VECTORS/icons/${name}.svg`;
export const libraryMetadata = nutrientLibrary;
export const nutrients = nutrientLibrary.items;
export const categories = [
  ["All Nutrients", "sun"],
  ["Vitamins", "sun"],
  ["Minerals", "package"],
  ["Botanicals", "bolt"],
  ["Probiotics", "flask"],
  ["Sleep", "moon"],
  ["Beauty", "sprout"],
  ["Focus", "shield"],
  ["Immunity", "shield"],
  ["Heart", "heart"],
];
export const flavors = [
  {
    id: "citrus",
    name: "Citrus Burst",
    description: "A bright, sunny citrus twist.",
  },
  {
    id: "berry",
    name: "Berry Bliss",
    description: "A soft, sweet burst of berries.",
  },
  {
    id: "mint",
    name: "Mint Fresh",
    description: "Cool, fresh and quietly uplifting.",
  },
  {
    id: "tropical",
    name: "Tropical",
    description: "A little sunshine in every ritual.",
  },
  {
    id: "unflavored",
    name: "Unflavored",
    description: "Keep things beautifully simple.",
  },
];
// Design samples supplied in the artwork, not verified customer reviews.
export const reviews = [
  {
    name: "Sarah L.",
    quote:
      "I love how simple and personal this is. My energy and focus have never been better.",
    photo: 1,
    placeholder: true,
  },
  {
    name: "James T.",
    quote:
      "Clean ingredients I trust, and I can finally get all my key nutrients in one easy roll.",
    photo: 2,
    placeholder: true,
  },
  {
    name: "Emily R.",
    quote:
      "It’s like this was made for me. Better sleep, clearer skin, and more balanced days.",
    photo: 3,
    placeholder: true,
  },
];
export const ingredients = [
  {
    id: "vitamin-d3",
    title: "Vitamin D3",
    description: "A daily essential for bone health and immune support.",
  },
  {
    id: "vitamin-b12",
    title: "Vitamin B12",
    description: "A little support for your everyday energy and metabolism.",
  },
  {
    id: "l-theanine",
    title: "L-Theanine",
    description: "An amino acid naturally found in green tea.",
  },
  {
    id: "probiotics",
    title: "Probiotics",
    description: "Get to know the cultures behind your daily ritual.",
  },
];
export const defaults = {
  version: 1,
  selected: ["vitamin-b12", "magnesium", "omega-3"],
  flavor: "citrus",
  name: "",
};
export const storageKey = "vita-tape.formula.v1";
export function loadFormula() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    if (stored?.version !== 1 || !Array.isArray(stored.selected)) return null;
    return {
      version: 1,
      selected: [
        ...new Set(
          stored.selected.filter((id) => nutrients.some((n) => n.id === id)),
        ),
      ].slice(0, 7),
      flavor: flavors.some((f) => f.id === stored.flavor)
        ? stored.flavor
        : "citrus",
      name: typeof stored.name === "string" ? stored.name.slice(0, 40) : "",
    };
  } catch {
    return null;
  }
}

export const draftKey = "vita-tape.draft.v1";
export function readDraft() {
  try {
    const stored = JSON.parse(localStorage.getItem(draftKey));
    if (stored?.version !== 1 || !Array.isArray(stored.selected)) return null;
    return {
      version: 1,
      selected: [
        ...new Set(
          stored.selected.filter((id) => nutrients.some((n) => n.id === id)),
        ),
      ].slice(0, 7),
      flavor: flavors.some((f) => f.id === stored.flavor)
        ? stored.flavor
        : "citrus",
      name: typeof stored.name === "string" ? stored.name.slice(0, 40) : "",
    };
  } catch {
    return null;
  }
}
export function persistDraft(formula) {
  try {
    localStorage.setItem(draftKey, JSON.stringify({ ...formula, version: 1 }));
    return true;
  } catch {
    return false;
  }
}
