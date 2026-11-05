# Your Dining Bucks Planner

Navbar and footer built as reusable Plain components from the Figma header at
https://www.figma.com/design/KkfFLl02ILCU0fqA46AaDS/Class-Oct.-5th?node-id=1-63.
The footer extends the header's black/red styling; no footer was present in the source.
Text and click targets are larger than the wireframe for usability.

Use `<navbar-component page="{{currentPage}}"></navbar-component>` and
`<footer-component page="{{currentPage}}"></footer-component>` on a page that loads
the shared stylesheet and app settings. Each component loads its own stylesheet
using a standard HTML link in its template. Navbar styles live in `css/navbar.css`,
footer styles in `css/footer.css`, and shared page styles in `css/styles.css`.
These light DOM styles are global, not automatically scoped by Plain.
Both read `settings.navigation` and accept
a string `page` prop for the breadcrumb/current-page indicator. Navigation labels
and destinations are defined once in `js/app.js`.

Each destination is a separate HTML document: `index.html` (Home), `login.html`,
`balance.html`, `planner.html`, and `dining-info.html`. Each loads the same Plain
runtime and `js/app.js`, which reads the URL pathname to set `currentPage`.
Ordinary links load these files; Back, Forward, direct access, and refresh use
normal browser behavior. Page bodies remain placeholders for assignment content.
The profile placeholder links to Login.
The footer stays below content, at the viewport bottom on short pages.

To add a page, copy an existing HTML page, set its title and body content, and add
its filename and label to `navigation` in `js/app.js`. Keep pages alongside
`index.html` so relative CSS, asset, and navigation URLs keep working.
The app resolves component discovery from the location of `js/app.js`, preserving
repository subdirectory paths on GitHub Pages. No rewrite rules or build step
are required. The skip link's `#main-content` is only an accessibility anchor.

Figma SVGs and the Inter font are served locally from `assets/`. The font license
is included. `plain.check.json` declares the shared reactive binding for the static
checker, which cannot infer the external `Plain.reactive()` state object.

Run from this directory with the Bun-based Plain CLI:

```sh
plain dev .
plain check .
```

Or serve the original files with any static HTTP server:

```sh
python3 -m http.server 5173
```

Open http://localhost:5173/. No dependency installation or application build is required.

- Edit index.html, css/styles.css, and js/app.js.
- Components live in components/ as HTML and optional sibling JavaScript modules.
- vendor/plain.js is the prebuilt regular-script runtime exposing Plain globally.
- Deploy these original files together; keep the vendor license and notices.
