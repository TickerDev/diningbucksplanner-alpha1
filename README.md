# Your Dining Bucks Planner
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