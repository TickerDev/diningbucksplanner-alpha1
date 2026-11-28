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
| Page 1 — Name & Description | **Home — [index.html](index.html).** Compare campus dining locations by name or lowest published fixed item price, see scheduled availability, look up published nutrition, and project spending from user-entered amounts. |
| Page 2 — Name & Description | **Balance — [balance.html](balance.html). Partially implemented:** displays Chart.js charts of sample daily spending. The charts compare last week and this week against a daily target, with text summaries and sample dining suggestions. Account balance retrieval and transaction entry remain unavailable. |
| Page 3 — Name & Description | **Planner — [planner.html](planner.html). Implemented prototype:** uses the shared Plain navbar and footer with budget metrics, day selection, and in-memory spending entry. The calendar opens on the browser’s current local date and follows the selected month and year, and entries are tracked separately by month until the page reloads. |
| Page 4 — Name & Description | **Dining Info — [dining-info.html](dining-info.html).** Search by name or building, filter by building or scheduled availability, and see the lowest listed price when published. Open a location’s [detail page](dining-location.html) to see published regular and dated hours, menus, item prices, and meal rates where TTU provides them. |
| Page 5 — Name & Description | **Login — [login.html](login.html). Implemented prototype:** users enter a correctly formatted email address and any non-empty password, then submit the form to open the sample Balance page. |
| Page 6 — Name & Description (if applicable) | **Sign Up — [signup.html](signup.html). Partially implemented:** shows disabled registration and eRaider controls with a link back to Login. |
| Key Interactive Feature 1 | **Dining table sorting — Implemented.** Sort by location name or lowest published fixed item price. Locations without a comparable published price are listed last when sorting by price. |
| Key Interactive Feature 2 | **Live spending projection — Implemented for positive budget inputs.** Users enter a budget and planned daily spending on Home. The SVG line, endpoint, spending gauge, and budget label update immediately for a fixed 112-day semester; a status message reports projected leftover funds or the day the budget runs out. The fields start at an editable sample budget of $2,200 and daily spending of $8. Clearing the budget uses $2,200, and clearing daily spending plots zero. Zero is a valid budget. |
| Key Interactive Feature 3 | **Dining location pages — Implemented.** Open any location from the directory, Home comparison, or Balance suggestions to view its hours and menus. Existing Dining Info location links redirect to the detail page. |
| Key Interactive Feature 4 | **Page navigation — Implemented.** Users select Login, Home, Balance, Planner, or Dining Info in the shared header, or use footer links where present. The browser loads the corresponding HTML document, and Plain marks the current navigation link and updates the breadcrumb. Sign Up has a separate URL and currently displays the Login navigation state. |
| Key Interactive Feature 5 | **Login — Implemented.** Submitting the form sets a browser-session cookie and opens Balance. The profile picture opens a menu with a Log out action that clears the cookie. The entered values are discarded. |

## Project Overview

Your Dining Bucks Planner is a multipage web application for Texas Tech students managing campus dining budgets. Its current core is a Home dashboard for comparing dining options and modeling daily spending over 16 weeks, with a separate dining-hours reference page. The Planner supports monthly spending scenarios in memory. University account access and personal balance retrieval remain unavailable.

Home, Dining Info, and Balance dining suggestions read published campus data through the separate TTU Dining API. Its public endpoint is configured in [js/dining-data.js](js/dining-data.js). The API does not supply walking distances or personal account data. Balance chart values are sample spending data, and budget inputs are not saved across page loads.

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
├── dining-location.html
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
│   ├── dining-comparison.html
│   ├── dining-comparison.js
│   ├── dining-info.html
│   ├── dining-info.js
│   ├── dining-signup.html
│   ├── dining-suggestions.html
│   ├── dining-suggestions.js
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
│   ├── dining-data.js
│   └── planner.js
└── vendor/
    ├── LICENSE
    ├── PLAIN.md
    ├── THIRD_PARTY_NOTICES.md
    └── plain.js
```

Every page loads the shared Plain runtime and app script and uses the navbar component. Home, Balance, Planner, Dining Info, and location details also use the footer component; Login and Sign Up retain their existing compact layout. Planner-specific native controls live in [js/planner.js](js/planner.js), without duplicate Plain event bindings.

Shared HTML components and optional sibling JavaScript modules live in `components/`. [js/app.js](js/app.js) initializes Plain, defines navigation, sorts the Home table, and updates the SVG projection. [plain.check.json](plain.check.json) supplies binding metadata for the Plain checker.

## Technologies Used

- **HTML, CSS, and JavaScript:** separate HTML documents, responsive CSS, native form validation, and standard browser navigation.
- **Plain frontend framework:** the vendored classic runtime [vendor/plain.js](vendor/plain.js) exposes global `Plain`. The included [Plain 0.1.2 guide](vendor/PLAIN.md) documents reactive bindings and HTML component discovery. Component behaviors use JavaScript modules; there is no application build step.
- **SVG:** the Home spending chart and local interface graphics.
- **Chart.js 4.5.1:** loaded from jsDelivr by `balance.html` for its sample weekly spending charts.
- **Manrope font:** served locally with a system sans-serif fallback.

There is no package manifest or dependency installation required to run the app. Internet access is needed for the externally hosted Chart.js library and dining API; Plain is included locally. Preserve [vendor/LICENSE](vendor/LICENSE) and [vendor/THIRD_PARTY_NOTICES.md](vendor/THIRD_PARTY_NOTICES.md) when distributing the original files together.

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
