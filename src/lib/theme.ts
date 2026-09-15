export const FLAVORS = ["latte", "frappe", "macchiato", "mocha"] as const;
export type Flavor = (typeof FLAVORS)[number];

export const FLAVOR_LABELS: Record<Flavor, string> = {
  latte: "Latte",
  frappe: "Frappe",
  macchiato: "Macchiato",
  mocha: "Mocha",
};

export const PRIMARY_COLORS = [
  "rosewater",
  "flamingo",
  "pink",
  "mauve",
  "red",
  "maroon",
  "peach",
  "yellow",
  "green",
  "teal",
  "sky",
  "sapphire",
  "blue",
  "lavender",
] as const;

export type PrimaryColor = (typeof PRIMARY_COLORS)[number];

export const DEFAULT_FLAVOR: Flavor = "mocha";
export const DEFAULT_PRIMARY: PrimaryColor = "lavender";

export const STORAGE_KEY = "portfolio:theme";

export type ThemeState = {
  flavor: Flavor;
  primary: PrimaryColor;
};

export const DEFAULT_THEME: ThemeState = {
  flavor: DEFAULT_FLAVOR,
  primary: DEFAULT_PRIMARY,
};

const TRANSITION_MS = 200;
let transitionTimer: number | undefined;

function applyTheme(state: ThemeState): void {
  const el = document.documentElement;

  el.classList.remove(...FLAVORS);
  el.classList.add(state.flavor);
  el.dataset.primary = state.primary;
}

export function applyThemeAnimated(state: ThemeState): void {
  const el = document.documentElement;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    applyTheme(state);
    return;
  }

  el.dataset.themeTransition = "";
  applyTheme(state);

  window.clearTimeout(transitionTimer);
  transitionTimer = window.setTimeout(() => {
    delete el.dataset.themeTransition;
  }, TRANSITION_MS);
}

export function readThemeFromDom(): ThemeState {
  const el = document.documentElement;

  return {
    flavor: FLAVORS.find((f) => el.classList.contains(f)) ?? DEFAULT_FLAVOR,
    primary:
      PRIMARY_COLORS.find((p) => p === el.dataset.primary) ?? DEFAULT_PRIMARY,
  };
}
