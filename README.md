# Your Dining Bucks Planner

Texas Tech University · ENGR 1340 · Fall 2026

Project 2 — Milestone 1

## Project Proposal — Table 1

Statuses describe the current source code. Partially implemented pages have an interface or prototype but lack their full intended functionality.

| Field | Your Answer |
| --- | --- |
| App Name | Your Dining Bucks Planner |
| App Type | Dining budget planner / budget tracker |
| Problem It Solves | Texas Tech students using Dining Bucks need to judge whether their spending pace will make their budget last through the semester. This application helps them explore spending scenarios and compare campus dining options while planning how to use their funds. |
| Page 1 — Name & Description | **Home — [index.html](index.html). Implemented prototype:** users compare seven hardcoded dining locations by sorting location, walking time (labeled “Distance”), or price. Entering a budget and planned daily spending updates a semester spending projection. These are hypothetical inputs, not an imported account balance. |
| Page 2 — Name & Description | **Balance — [balance.html](balance.html). Partially implemented:** displays placeholder balance text and a Chart.js bar chart of hardcoded daily spending for “Last Week.” Users can inspect values through Chart.js hover tooltips; account balance retrieval and transaction entry are not implemented. |
| Page 3 — Name & Description | **Planner — [planner.html](planner.html). Implemented prototype:** uses the shared Plain navbar and footer with budget metrics, day selection, and in-memory spending entry. Its calendar layout and month handling remain a prototype; entries are not saved across page loads. |
| Page 4 — Name & Description | **Dining Info — [dining-info.html](dining-info.html). Partially implemented:** users expand or collapse six campus dining entries to read hardcoded weekly hours. A static map image shows 23 at Sneed; expanding another entry does not update the map or provide routing. |
| Page 5 — Name & Description | **Login — [login.html](login.html). Partially implemented:** users fill in email and password fields. Submitting a valid form clears the password and displays a message explaining that authentication is not connected. The eRaider and Sign Up buttons display similar unavailable-service messages. |
| Page 6 — Name & Description (if applicable) | **Sign Up — [signup.html](signup.html). Partially implemented:** provides required email and password fields, Sign Up and eRaider buttons, and a working link back to Login. No registration handler or eRaider integration exists; submission uses the browser's default form behavior and does not create an account. |
| Key Interactive Feature 1 | **Dining table sorting — Implemented.** On Home, users click Location, Distance, or Price headers. JavaScript reorders existing rows alphabetically or numerically; clicking the same header again reverses the order. Data remains the hardcoded comparison data. |
| Key Interactive Feature 2 | **Live spending projection — Implemented for positive budget inputs.** Users enter a budget and planned daily spending on Home. The SVG line, endpoint, spending gauge, and budget label update immediately for a fixed 112-day semester; a status message reports projected leftover funds or the day the budget runs out. An empty or zero budget falls back to $2,200, and input validation is incomplete. |
| Key Interactive Feature 3 | **Dining hours accordion — Implemented.** Users activate a dining location's summary on Dining Info. Native HTML details elements expand or collapse its weekly opening and closing hours; multiple entries can remain open. Hours are static content, not a live university feed. |
| Key Interactive Feature 4 | **Page navigation — Implemented.** Users select Login, Home, Balance, Planner, or Dining Info in the shared header, or use footer links where present. The browser loads the corresponding HTML document, and Plain marks the current navigation link and updates the breadcrumb. Sign Up has a separate URL and currently displays the Login navigation state. |
| Key Interactive Feature 5 | **Login form feedback — Partially implemented.** Users submit email and password after native required-field/email validation. The interface prevents normal submission, clears the password, and announces that sign-in needs an authentication service. Clicking eRaider or Sign Up shows the corresponding unavailable-service message; no account or session is created, and Sign Up does not navigate to registration. |

## Project Overview

Your Dining Bucks Planner is a multipage web application for Texas Tech students managing campus dining budgets. Its current core is a Home dashboard for comparing dining options and modeling daily spending over 16 weeks, with a separate dining-hours reference page. Account access, personal balance tracking, and the dedicated Planner workflow remain incomplete.

Home prices and walking times, Dining Info hours, and Balance chart values are hardcoded examples rather than verified current campus or account data. Budget inputs are not saved across page loads. The application has no backend, database, or university account connection.

## Project Structure

Application and documentation files in the current checkout are shown below. Git internals, agent instructions (`AGENTS.md`), and local Visual Studio workspace metadata (`.vs/`) are omitted.

```text
.
├── .gitignore
├── README.md
├── index.html
├── balance.html
├── planner.html
├── dining-info.html
├── login.html
├── signup.html
├── plain.check.json
├── assets/
│   ├── arrow-down.svg
│   ├── arrow-right.svg
│   ├── dining-map.png
│   ├── profile-placeholder.svg
│   ├── login/
│   │   ├── eraider.png
│   │   ├── header-divider.svg
│   │   └── signup-divider.svg
│   └── signup/
│       └── login-divider.svg
├── components/
│   ├── dining-info.html
│   ├── dining-info.js
│   ├── dining-login.html
│   ├── dining-login.js
│   ├── dining-signup.html
│   ├── footer.html
│   ├── footer.js
│   ├── navbar.html
│   └── navbar.js
├── css/
│   ├── dining-info.css
│   ├── footer.css
│   ├── login.css
│   ├── navbar.css
│   ├── signup.css
│   └── styles.css
├── js/
│   ├── app.js
│   └── planner.js
└── vendor/
    ├── LICENSE
    ├── PLAIN.md
    ├── THIRD_PARTY_NOTICES.md
    └── plain.js
```

Every page loads the shared Plain runtime and app script and uses the navbar component. Home, Balance, Planner, and Dining Info also use the footer component; Login and Sign Up retain their existing compact layout. Planner-specific native controls live in [js/planner.js](js/planner.js), without duplicate Plain event bindings.

Shared HTML components and optional sibling JavaScript modules live in `components/`. [js/app.js](js/app.js) initializes Plain, defines navigation, sorts the Home table, and updates the SVG projection. [plain.check.json](plain.check.json) supplies binding metadata for the Plain checker.

## Technologies Used

- **HTML, CSS, and JavaScript:** separate HTML documents, responsive CSS, native form validation, and standard browser navigation.
- **Plain frontend framework:** the vendored classic runtime [vendor/plain.js](vendor/plain.js) exposes global `Plain`. The included [Plain 0.1.1 guide](vendor/PLAIN.md) documents reactive bindings and HTML component discovery. Component behaviors use JavaScript modules; there is no application build step.
- **SVG:** the Home spending chart and local interface graphics.
- **Chart.js 4.5.1:** loaded from jsDelivr by `balance.html` for its sample weekly bar chart.
- **Inter font:** imported from Google Fonts by [css/styles.css](css/styles.css), with Arial and sans-serif fallbacks.

There is no package manifest or dependency installation required to run the app. Internet access is needed for the externally hosted Chart.js library and Google font; Plain is included locally. Preserve [vendor/LICENSE](vendor/LICENSE) and [vendor/THIRD_PARTY_NOTICES.md](vendor/THIRD_PARTY_NOTICES.md) when distributing the original files together.

## Getting Started

Use a modern browser and serve the project over HTTP. Opening files directly with `file://` is unsuitable because Plain fetches component templates and imports their behavior modules.

With Python 3 installed, open a terminal in the repository root and run:

```sh
python3 -m http.server 5173 --bind 127.0.0.1
```

Open <http://127.0.0.1:5173/>. Stop the server with `Ctrl+C`. No build step is needed.

Alternatively, if the Bun-based Plain CLI and Bun are already installed, run this from the repository root:

```sh
plain dev . --port 5173
```

Open <http://localhost:5173/>. The optional static checker runs separately:

```sh
plain check .
```

Read [vendor/PLAIN.md](vendor/PLAIN.md) before changing the application. Edit original HTML, CSS, and JavaScript; keep the prebuilt runtime intact.

## Team Contributions

The repository does not contain a confirmed team roster or page assignment list. Comments in [css/login.css](css/login.css) and [css/signup.css](css/signup.css) label the design references “Dor/Login” and “Dor/SignUp”; these labels alone do not establish a full contributor name or assigned ownership.

| Pages / responsibility | Contributor / assignment |
| --- | --- |
| Home | **[Team member name and role — to be confirmed]** |
| Balance | **[Team member name and role — to be confirmed]** |
| Planner | **[Team member name and role — to be confirmed]** |
| Dining Info | **[Team member name and role — to be confirmed]** |
| Login and Sign Up | **[Confirm contributor name, role, and whether “Dor” identifies the assigned owner]** |
| Shared components, styling, and application setup | **[Team member name(s) and role(s) — to be confirmed]** |

## Development Status

- **Implemented:** Home sorting and live spending scenarios, Dining Info expandable hours, shared navigation, and responsive styling.
- **Partial:** Balance contains sample chart data and placeholder totals; Dining Info uses fixed hours and a static map; Login supplies feedback without authentication; Sign Up has a form without registration behavior.
- **Unfinished / needing definition:** Planner calendar/date handling, team ownership, and intended account and personal-budget workflows. There is no saved budget or transaction history. Semester length is fixed at 112 days, and negative or invalid budget/spending inputs lack complete validation.
- **Navigation gaps:** Sign Up is absent from shared navigation, the Login Sign Up button only displays a message, and `js/app.js` falls back to “Home” for the Sign Up document title while its navbar explicitly selects Login.

All 14 requested Table 1 fields are present, covering six existing pages and five specific interactions. The team still needs to confirm contributors and define the Planner page's intended capabilities. The assignment document itself is not included in the repository, so compliance beyond the supplied Table 1 requirements cannot be verified here. If Milestone 1 requires completed content on every proposed page or five fully functional application features, the placeholders and partial login feature require further work.
