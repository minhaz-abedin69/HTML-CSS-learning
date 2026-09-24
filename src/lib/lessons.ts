export type Track = "html" | "css";

import { referenceLessons } from "./reference-lessons";

export type Lesson = {
  id: string;
  track: Track;
  category: string;
  title: string;
  label: string;
  summary: string;
  explanation: string;
  syntax: string;
  html: string;
  css: string;
  note: string;
  tags: string[];
  attributes?: string[];
  related?: string[];
  obsolete?: boolean;
};

const coreLessons: Lesson[] = [
  {
    id: "html-document",
    track: "html",
    category: "Foundations",
    title: "Document structure",
    label: "<!doctype> · html · head · body",
    summary: "Build the reliable skeleton every web page starts with.",
    explanation: "A browser reads an HTML document from the outside in. The doctype selects modern HTML, the head describes the page, and the body contains everything visitors see.",
    syntax: "<!doctype html>\n<html lang=\"en\">\n  <head>…</head>\n  <body>…</body>\n</html>",
    html: "<main>\n  <p class=\"eyebrow\">A valid document</p>\n  <h1>Hello, web.</h1>\n  <p>The visible page belongs inside the body.</p>\n</main>",
    css: "body {\n  font-family: system-ui;\n  padding: 2rem;\n}\n.eyebrow {\n  color: #0891b2;\n  text-transform: uppercase;\n  letter-spacing: .12em;\n}",
    note: "Set the lang attribute so screen readers use the correct pronunciation rules.",
    tags: ["doctype", "html", "head", "body", "meta", "title"],
  },
  {
    id: "html-text",
    track: "html",
    category: "Content",
    title: "Text & headings",
    label: "h1–h6 · p · strong · em",
    summary: "Create readable hierarchy and meaningful emphasis.",
    explanation: "Headings describe a page outline, while paragraphs group related sentences. Strong and emphasis carry meaning—not just bold or italic styling.",
    syntax: "<h1>Main topic</h1>\n<p>A paragraph with <strong>importance</strong>.</p>",
    html: "<article>\n  <h1>Designing for clarity</h1>\n  <p>Good hierarchy helps readers <strong>scan quickly</strong> and understand what matters.</p>\n  <h2>Start with meaning</h2>\n  <p>Choose elements for their purpose, <em>then</em> style them.</p>\n</article>",
    css: "article { max-width: 34rem; font-family: system-ui; }\nh1 { font-size: 2.4rem; line-height: 1.05; }\nh2 { margin-top: 2rem; color: #0e7490; }\np { color: #475569; line-height: 1.7; }",
    note: "Most pages should have one clear h1. Do not pick heading levels just to get a smaller font.",
    tags: ["heading", "paragraph", "strong", "em", "text"],
  },
  {
    id: "html-links-lists",
    track: "html",
    category: "Content",
    title: "Links & lists",
    label: "a · ul · ol · li",
    summary: "Connect pages and organize related items.",
    explanation: "Anchors make the web navigable. Lists express groups or sequences, giving browsers and assistive technology useful structure.",
    syntax: "<a href=\"/path\">Label</a>\n<ul><li>Item</li></ul>",
    html: "<nav aria-label=\"Learning path\">\n  <p>Start here</p>\n  <ol>\n    <li><a href=\"#structure\">Structure a page</a></li>\n    <li><a href=\"#style\">Add visual style</a></li>\n    <li><a href=\"#ship\">Share your work</a></li>\n  </ol>\n</nav>",
    css: "nav { font-family: system-ui; padding: 1.5rem; }\nli { margin: .75rem 0; color: #64748b; }\na { color: #0891b2; font-weight: 700; text-decoration-thickness: 2px; }",
    note: "Link text should describe its destination. Avoid vague labels such as “click here.”",
    tags: ["anchor", "href", "navigation", "ordered list", "unordered list"],
  },
  {
    id: "html-media",
    track: "html",
    category: "Media",
    title: "Images & media",
    label: "img · figure · picture · video",
    summary: "Add responsive visual content with useful alternatives.",
    explanation: "Images need an accessible text alternative. Figure and figcaption connect media to a caption, while picture can offer formats or crops for different screens.",
    syntax: "<figure>\n  <img src=\"photo.jpg\" alt=\"…\">\n  <figcaption>…</figcaption>\n</figure>",
    html: "<figure>\n  <div class=\"demo-image\" role=\"img\" aria-label=\"Abstract cyan blocks\"></div>\n  <figcaption>A generated stand-in for an image.</figcaption>\n</figure>",
    css: "figure { margin: 0; font-family: system-ui; }\n.demo-image { height: 150px; border-radius: 14px; background: linear-gradient(135deg, #083344, #22d3ee); }\nfigcaption { margin-top: .6rem; color: #64748b; font-size: .85rem; }",
    note: "Use alt=\"\" for decorative images so screen readers can safely skip them.",
    tags: ["image", "img", "alt", "figure", "video", "audio", "picture"],
  },
  {
    id: "html-semantics",
    track: "html",
    category: "Structure",
    title: "Semantic layout",
    label: "header · nav · main · section · footer",
    summary: "Describe each region by what it means.",
    explanation: "Semantic landmarks make a page easier to scan for people and software. They also reduce the number of generic div elements you need.",
    syntax: "<header>…</header>\n<main><section>…</section></main>\n<footer>…</footer>",
    html: "<div class=\"page\">\n  <header>Studio Notes</header>\n  <main>\n    <section><h2>Latest lesson</h2><p>Semantic HTML gives content a clear map.</p></section>\n  </main>\n  <footer>Lesson 05</footer>\n</div>",
    css: ".page { font-family: system-ui; border: 1px solid #cbd5e1; }\nheader, footer { padding: 1rem; background: #ecfeff; }\nmain { padding: 1.5rem; }\nh2 { margin-top: 0; }",
    note: "A section normally needs a heading. Use a div when no semantic element accurately describes the group.",
    tags: ["semantic", "header", "main", "section", "article", "aside", "footer"],
  },
  {
    id: "html-forms",
    track: "html",
    category: "Forms",
    title: "Forms & inputs",
    label: "form · label · input · button",
    summary: "Collect information with accessible controls.",
    explanation: "Forms group inputs for submission. Every field needs a visible label connected with for and id, and the input type should match the information requested.",
    syntax: "<label for=\"email\">Email</label>\n<input id=\"email\" type=\"email\" required>\n<button type=\"submit\">Join</button>",
    html: "<form onsubmit=\"event.preventDefault()\">\n  <label for=\"email\">Email address</label>\n  <input id=\"email\" type=\"email\" placeholder=\"you@example.com\" required>\n  <button type=\"submit\">Join class</button>\n</form>",
    css: "form { display: grid; gap: .75rem; max-width: 22rem; font-family: system-ui; }\nlabel { font-weight: 700; }\ninput { padding: .8rem; border: 1px solid #94a3b8; border-radius: 8px; }\nbutton { padding: .8rem; border: 0; border-radius: 8px; background: #0891b2; color: white; font-weight: 700; }",
    note: "Placeholder text is a hint, not a replacement for a label.",
    tags: ["form", "input", "label", "button", "select", "textarea", "validation"],
  },
  {
    id: "css-selectors",
    track: "css",
    category: "Foundations",
    title: "Selectors & cascade",
    label: "class · element · state",
    summary: "Target elements and understand which rule wins.",
    explanation: "Selectors connect styles to elements. The cascade resolves competing declarations using importance, specificity, and source order.",
    syntax: ".card { … }\n.card strong { … }\n.card:hover { … }",
    html: "<article class=\"card featured\">\n  <span>CSS concept</span>\n  <h2>The cascade</h2>\n  <p>Specific rules can refine broad defaults.</p>\n</article>",
    css: "body { font-family: system-ui; }\n.card { padding: 1.5rem; border: 1px solid #cbd5e1; border-radius: 12px; }\n.featured { border-color: #d97706; }\n.card span { color: #b45309; font-weight: 700; }",
    note: "Prefer reusable class selectors. Highly specific selectors are harder to override later.",
    tags: ["selector", "class", "id", "specificity", "cascade", "pseudo-class"],
  },
  {
    id: "css-color-type",
    track: "css",
    category: "Visual",
    title: "Color & typography",
    label: "color · font · line-height",
    summary: "Set visual tone while keeping text comfortable to read.",
    explanation: "Typography combines family, size, weight, and line-height. Color should create sufficient contrast and reinforce hierarchy rather than decorate every element.",
    syntax: "p {\n  color: oklch(45% .03 250);\n  font: 400 1rem/1.7 system-ui;\n}",
    html: "<div class=\"type-sample\">\n  <p class=\"kicker\">Field notes · 08</p>\n  <h2>Readable by design.</h2>\n  <p>Comfortable line length and generous leading make long lessons easier to absorb.</p>\n</div>",
    css: ".type-sample { max-width: 34rem; font-family: Georgia, serif; }\n.kicker { color: #b45309; font: 700 .75rem/1.2 system-ui; text-transform: uppercase; }\nh2 { font-size: 2.5rem; line-height: 1.05; margin: .5rem 0; }\np { color: #475569; line-height: 1.75; }",
    note: "For body text, a line-height around 1.5–1.8 is often a comfortable starting point.",
    tags: ["color", "font-family", "font-size", "font-weight", "line-height", "text-align"],
  },
  {
    id: "css-box-model",
    track: "css",
    category: "Layout",
    title: "The box model",
    label: "content · padding · border · margin",
    summary: "Understand the space every element occupies.",
    explanation: "Each element is a rectangular box. Padding sits inside its border; margin creates space outside it. Border-box sizing keeps declared width predictable.",
    syntax: "* { box-sizing: border-box; }\n.card { padding: 24px; border: 1px solid; margin: 16px; }",
    html: "<div class=\"stage\"><div class=\"box\"><span>content</span></div></div>",
    css: "* { box-sizing: border-box; }\n.stage { padding: 24px; background: #fef3c7; border: 1px dashed #d97706; }\n.box { padding: 24px; border: 8px solid #22d3ee; background: #cffafe; text-align: center; font-family: monospace; }\n.box span { background: white; padding: 8px; }",
    note: "Using box-sizing: border-box globally makes width include padding and border.",
    tags: ["box model", "margin", "padding", "border", "width", "height", "box-sizing"],
  },
  {
    id: "css-flexbox",
    track: "css",
    category: "Layout",
    title: "Flexbox",
    label: "display: flex · gap · align",
    summary: "Arrange items along one responsive axis.",
    explanation: "Flexbox distributes items in a row or column. The container controls direction, alignment, wrapping, and space between its children.",
    syntax: ".row {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}",
    html: "<div class=\"team\">\n  <div class=\"avatar\">A</div><div class=\"avatar\">B</div><div class=\"avatar\">C</div>\n  <button>Invite</button>\n</div>",
    css: ".team { display: flex; align-items: center; gap: .6rem; font-family: system-ui; }\n.avatar { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: #cffafe; color: #155e75; font-weight: 800; }\nbutton { margin-left: auto; padding: .7rem 1rem; border: 0; border-radius: 8px; background: #0f172a; color: white; }",
    note: "Use gap for spacing between flex children instead of adding margins to every child.",
    tags: ["flexbox", "display", "flex-direction", "justify-content", "align-items", "gap", "wrap"],
  },
  {
    id: "css-grid",
    track: "css",
    category: "Layout",
    title: "CSS Grid",
    label: "grid-template · minmax · gap",
    summary: "Create resilient two-dimensional layouts.",
    explanation: "Grid controls rows and columns together. Fractional units share available space, while minmax and auto-fit make layouts adapt without many breakpoints.",
    syntax: ".grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 1rem;\n}",
    html: "<div class=\"grid\"><div>HTML</div><div>CSS</div><div>Ship</div></div>",
    css: ".grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: .75rem; font-family: system-ui; }\n.grid div { min-height: 90px; display: grid; place-items: center; border-radius: 10px; background: #fef3c7; border: 1px solid #f59e0b; font-weight: 800; }",
    note: "Grid is ideal when alignment across both rows and columns matters.",
    tags: ["grid", "columns", "rows", "fr", "minmax", "auto-fit", "gap"],
  },
  {
    id: "css-position",
    track: "css",
    category: "Layout",
    title: "Positioning",
    label: "relative · absolute · sticky · z-index",
    summary: "Control where elements sit and how they layer.",
    explanation: "Relative positioning establishes a containing block. Absolute elements leave normal flow, while sticky elements switch behavior at a scroll threshold.",
    syntax: ".card { position: relative; }\n.badge { position: absolute; top: 8px; right: 8px; }",
    html: "<article class=\"position-card\">\n  <span class=\"badge\">New</span>\n  <h2>Positioned detail</h2>\n  <p>The badge anchors to this card.</p>\n</article>",
    css: ".position-card { position: relative; padding: 2rem 1.25rem 1.25rem; border: 1px solid #cbd5e1; border-radius: 12px; font-family: system-ui; }\n.badge { position: absolute; top: 10px; right: 10px; padding: .25rem .5rem; border-radius: 99px; background: #f59e0b; font-size: .7rem; font-weight: 800; }",
    note: "Use absolute positioning for overlays and details—not as the default page layout tool.",
    tags: ["position", "relative", "absolute", "fixed", "sticky", "z-index"],
  },
  {
    id: "css-responsive",
    track: "css",
    category: "Responsive",
    title: "Responsive design",
    label: "media queries · fluid sizing",
    summary: "Let layouts adapt to available space.",
    explanation: "Responsive interfaces start with flexible dimensions, then use media or container queries where the content genuinely needs a new arrangement.",
    syntax: ".layout { display: grid; }\n@media (min-width: 48rem) {\n  .layout { grid-template-columns: 1fr 2fr; }\n}",
    html: "<div class=\"responsive-grid\"><aside>Topics</aside><main>Lesson content grows into the available space.</main></div>",
    css: ".responsive-grid { display: grid; gap: 1rem; font-family: system-ui; }\naside, main { padding: 1.25rem; border-radius: 10px; background: #ecfeff; }\n@media (min-width: 520px) { .responsive-grid { grid-template-columns: minmax(100px, 1fr) 2fr; } }",
    note: "Choose breakpoints based on when the content looks cramped, not on a particular device name.",
    tags: ["responsive", "media query", "breakpoint", "min-width", "clamp", "viewport"],
  },
  {
    id: "css-transitions",
    track: "css",
    category: "Motion",
    title: "Transitions & transforms",
    label: "transition · transform · easing",
    summary: "Add motion that explains cause and effect.",
    explanation: "Transitions animate changes between states. Transform and opacity are usually smooth choices because browsers can animate them efficiently.",
    syntax: ".button { transition: transform 180ms ease; }\n.button:hover { transform: translateY(-2px); }",
    html: "<button class=\"motion-button\">Hover or focus me <span>→</span></button>",
    css: ".motion-button { padding: .9rem 1.2rem; border: 0; border-radius: 10px; background: #0891b2; color: white; font: 700 1rem system-ui; transition: transform 180ms ease, box-shadow 180ms ease; }\n.motion-button:hover, .motion-button:focus { transform: translateY(-3px); box-shadow: 0 12px 25px #0891b244; }\n.motion-button span { display: inline-block; transition: transform 180ms ease; }\n.motion-button:hover span { transform: translateX(4px); }",
    note: "Respect prefers-reduced-motion and avoid animating large areas without a clear purpose.",
    tags: ["transition", "transform", "hover", "focus", "easing", "opacity"],
  },
  {
    id: "css-animation",
    track: "css",
    category: "Motion",
    title: "Keyframe animation",
    label: "@keyframes · animation",
    summary: "Design multi-step motion and repeating states.",
    explanation: "Keyframes define named animation stages. The animation shorthand controls duration, easing, delay, direction, and repetition.",
    syntax: "@keyframes pulse {\n  50% { transform: scale(1.08); }\n}\n.dot { animation: pulse 1.5s ease infinite; }",
    html: "<div class=\"signal\"><span></span><p>Live preview running</p></div>",
    css: ".signal { display: flex; align-items: center; gap: .75rem; font-family: system-ui; }\n.signal span { width: 16px; height: 16px; border-radius: 50%; background: #10b981; animation: pulse 1.4s ease-in-out infinite; }\n@keyframes pulse { 50% { transform: scale(1.4); box-shadow: 0 0 0 8px #10b98122; } }\n@media (prefers-reduced-motion: reduce) { .signal span { animation: none; } }",
    note: "Infinite animation should be subtle. Pause or remove it when reduced motion is requested.",
    tags: ["animation", "keyframes", "duration", "iteration", "fill-mode", "reduced motion"],
  },
];

export const lessons: Lesson[] = [...coreLessons, ...referenceLessons];

export const tracks = {
  html: {
    name: "HTML",
    description: "Structure content with meaningful elements.",
  },
  css: {
    name: "CSS",
    description: "Style, arrange, and animate interfaces.",
  },
} as const;

export function createPreviewDocument(html: string, css: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html{color-scheme:light}body{margin:0;padding:28px;background:#fff;color:#172033;min-height:100vh;box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}${css}</style></head><body>${html}</body></html>`;
}