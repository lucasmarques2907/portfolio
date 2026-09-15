import {
  DEFAULT_FLAVOR,
  DEFAULT_PRIMARY,
  FLAVORS,
  PRIMARY_COLORS,
  STORAGE_KEY,
} from "@/lib/theme";

const script = `(function(){
  try {
    var flavors = ${JSON.stringify(FLAVORS)};
    var primaries = ${JSON.stringify(PRIMARY_COLORS)};
    var raw = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    var s = raw ? JSON.parse(raw) : {};
 
    var flavor = flavors.indexOf(s.flavor) > -1 ? s.flavor : ${JSON.stringify(DEFAULT_FLAVOR)};
    var primary = primaries.indexOf(s.primary) > -1 ? s.primary : ${JSON.stringify(DEFAULT_PRIMARY)};
 
    var el = document.documentElement;
    el.classList.remove.apply(el.classList, flavors);
    el.classList.add(flavor);
    el.dataset.primary = primary;
  } catch (e) {}
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
