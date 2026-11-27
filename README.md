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
| Page 2 — Name & Description | **Balance — [balance.html](balance.html). Partially implemented:** displays Chart.js charts of sample daily spending. The charts compare last week and this week against a daily target, with text summaries and sample dining suggestions. Account balance retrieval and transaction entry remain unavailable. |
| Page 3 — Name & Description | **Planner — [planner.html](planner.html). Implemented prototype:** uses the shared Plain navbar and footer with budget metrics, day selection, and in-memory spending entry. The calendar follows the selected month and year, and entries are tracked separately by month until the page reloads. |
| Page 4 — Name & Description | **Dining Info — [dining-info.html](dining-info.html). Partially implemented:** users expand or collapse six campus dining entries to read sample weekly hours. The page shows a sample route to 23 at Sneed. |
| Page 5 — Name & Description | **Login — [login.html](login.html). Implemented prototype:** opening the page activates a demo flag for the browser session and opens the sample Balance page. |
| Page 6 — Name & Description (if applicable) | **Sign Up — [signup.html](signup.html). Partially implemented:** shows disabled registration and eRaider controls with a link back to the demo login. |
| Key Interactive Feature 1 | **Dining table sorting — Implemented.** On Home, users click Location, Distance, or Price headers. JavaScript reorders existing rows alphabetically or numerically; clicking the same header again reverses the order. Data remains the hardcoded comparison data. |
| Key Interactive Feature 2 | **Live spending projection — Implemented for positive budget inputs.** Users enter a budget and planned daily spending on Home. The SVG line, endpoint, spending gauge, and budget label update immediately for a fixed 112-day semester; a status message reports projected leftover funds or the day the budget runs out. An empty budget uses $2,200 as the sample default. Zero is a valid budget. |
| Key Interactive Feature 3 | **Dining hours accordion — Implemented.** Users activate a dining location's summary on Dining Info. Plain expands one weekly schedule at a time. Hours are static content, not a live university feed. |
| Key Interactive Feature 4 | **Page navigation — Implemented.** Users select Login, Home, Balance, Planner, or Dining Info in the shared header, or use footer links where present. The browser loads the corresponding HTML document, and Plain marks the current navigation link and updates the breadcrumb. Sign Up has a separate URL and currently displays the Login navigation state. |
| Key Interactive Feature 5 | **Demo login — Implemented.** Login stores a demo flag in the browser tab’s session storage and opens Balance. The flag controls the demo status message. |

## Project Overview

Your Dining Bucks Planner is a multipage web application for Texas Tech students managing campus dining budgets. Its current core is a Home dashboard for comparing dining options and modeling daily spending over 16 weeks, with a separate dining-hours reference page. The Planner supports monthly spending scenarios in memory. University account access and personal balance retrieval remain unavailable.

Home prices and walking times, Dining Info hours, and Balance chart values are hardcoded examples rather than verified current campus or account data. Budget inputs are not saved across page loads. The application has no backend, database, or university account connection. The included dining API client is available for a future integration.

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
│   ├── dining-signup.html
│   ├── footer.html
│   ├── footer.js
│   ├── navbar.html
│   └── navbar.js
├── css/
│   ├── balance.css
│   ├── dining-info.css
│   ├── index.css
│   ├── planner.css
│   ├── footer.css
│   ├── login.css
│   ├── navbar.css
│   ├── signup.css
│   └── styles.css
├── js/
│   ├── app.js
│   ├── balance.js
│   ├── dining-api.js
│   ├── dining-api.md
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
- **Chart.js 4.5.1:** loaded from jsDelivr by `balance.html` for its sample weekly spending charts.
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
