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

The Figma login screen is implemented at `login.html`, with page-specific styling
in `css/login.css` and form behavior in `components/dining-login.js`. It follows
[Figma frame 1:2](https://www.figma.com/design/KkfFLl02ILCU0fqA46AaDS/Class-Oct.-5th?node-id=1-2)
at 385px wide and expands the controls on desktop. The logo and divider assets
in `assets/login/` come from that frame; the identical profile SVG already in
`assets/profile-placeholder.svg` is reused.

Authentication is not connected. Login uses native required/email validation,
clears the password on submission, and explains the missing integration. eRaider
and Sign Up also show integration status. No credentials are stored or sent;
connect a server-side authentication service before enabling account access.
