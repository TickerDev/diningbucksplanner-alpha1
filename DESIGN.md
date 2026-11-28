# Your Dining Bucks Planner design system

Students use this application to project Dining Bucks spending and compare campus dining options. Lead with the projection, then give the dining table the full content width. Keep published dining information distinct from sample planning and account data.

## Foundations

| Figma variable | CSS token | Value and use |
| --- | --- | --- |
| Brand / Scarlet | `--scarlet` | #CC0000 for primary actions, projection, and Texas Tech accents |
| Canvas and surfaces | `--background`, `--surface` | #FFFFFF |
| Subtle fill | `--soft` | #F5F5F7 for table headers and secondary surfaces |
| Text / Primary | `--ink` | #18181B |
| Text / Secondary | `--muted`, `--muted-strong` | #53535D |
| Structural border | `--border` | #DEDEE3 |
| Control border | `--control-border` | #767680 |
| Positive / Negative | `--positive`, `--negative` | #216743 and #A71B20 with a text or shape indicator |

Use locally served Manrope. Page headings run from 28 to 32px, section headings use 20px, and body text uses 14 to 16px. Use tabular numerals in axes, prices, dates, and totals. Build layouts on an 8px rhythm with 8, 16, 24, 32, and 48px steps. Use one-pixel borders, 6px control corners, and 8px corners on the projection section.

## Components and layout

- Align the Plain navbar, main content, and footer to a shared 1200px maximum with 32px desktop and 16px mobile gutters. Preserve the Double T, linked title, breadcrumb, profile, and current-route underline.
- Put the Home projection first. On desktop, stack the budget inputs and actions beside the wide chart. On narrow screens, place the controls above the plot and the feedback below it. The existing sample amounts of $2,200 and $8 initialize the fields as editable values. Clearing the budget uses $2,200 and clearing daily spending plots zero.
- Label cumulative spending in dollars on the vertical axis and the 112-day semester on the horizontal axis. The dashed target, solid projection, endpoint, and budget-used gauge retain the same model. Use compact tick labels for large budgets while displaying the full amount above the plot.
- Give the location table the full content width in document flow. Let text wrap at narrow widths and let the page handle vertical scrolling. Align prices right and keep building names below their links. Place nutrition directly below in its own ruled section.
- On Planner, put the budget field and three financial statistics above the calendar, with overall status immediately below those figures. Use a three-to-one calendar and editor split on wide screens and stack on smaller screens. Each cell shows its date, amount or unlogged dash, and any location. A scarlet outline selects the date independently of spending state. The editor repeats the full selected date. Balance uses paired weekly figures on a shared scale, followed by dining suggestions. Dining Info is a filterable directory. Each location has a dedicated page with hours and menus alongside its image, expandable description, and map. Account pages use the same type scale and controls.
- Preserve visible keyboard focus, 44px control targets where space allows, Plain loading placeholders, retry controls, and text for error, empty, and stale states.

## Interaction states and data

- Reserve the scrollbar gutter so navigation between long and short pages keeps the same alignment. Use the same main, header, and footer width token on every route.
- Show projected remaining Dining Bucks with cents and a semester-end label. Compare the budget and projected spending in cents when possible so exact-cent scenarios stay exact. For an over-budget scenario, emphasize the projected depletion day instead. Invalid values keep the last valid plot and show corrective text.
- Directory search matches venue names or buildings. Building and scheduled-open filters combine with search and run on the existing dining response. A clear-filters action restores the full directory. Thumbnails come from the API and keep their footprint if an image is missing or fails.
- Availability uses distinct, labeled open, closed, holiday, and unconfirmed states. The API determines schedule precedence. On detail pages, highlight the dated operating-hours row matching the API’s Central Time date.
- Weekly charts use a common Y-axis maximum and interval. Summaries distinguish sample totals, the difference from the daily target across recorded days, and the full daily breakdown. Missing days stay unrecorded.
- Planner opens on the browser’s current local date. An underline marks today independently of the selected date outline and budget state. Keep the full location name in the editor and accessible day label when the cell truncates it. Entries survive month navigation for the current page visit and reset on reload.

## Plain components

- Navbar and footer own the shared shell. The page-heading component owns the page title.
- Form fields, calendar controls and grid, financial statistics, chart content, and the comparison table use reusable slotted frames. Caller-owned slots retain their native labels, IDs, bindings, and event handlers. Initialize page behavior after Plain mounts the slots.
- The calendar keeps one native button per day. Each button has an accessible name with the full location and spending state even when the visible location is shortened.

## Motion

- Use a brief heading entrance and a four-pixel content reveal staggered by 40 to 60ms. Maintain the active route underline and short cross-document fade where supported.
- Render the initial projection immediately, then animate edits over 190ms. Update the status and axis labels immediately. Calendar cells reveal briefly after month changes, and the selected date heading transitions when the selection changes. Menu contents enter briefly on open. Reduced motion skips these animations and chart interpolation.

## Feature inventory and equivalence

The baseline is the team's working copy at commit `46f3f44`. The comparison below applies to all records returned by the existing API.

| Original surface and elements | Redesigned equivalent |
| --- | --- |
| Shared skip link and main target, application title linked to Home, breadcrumb separator and page, Login, Home, Balance, Planner, Dining Info, current-page indication | Same targets and route labels within the shared responsive shell |
| Signed-out profile image linking to Login, signed-in profile image and native options menu, Log out, Escape and outside-click dismissal | Same two profile states and session behavior in the header |
| Footer brand and all five links with active state on Home, Balance, Planner, and Dining Info | Compact footer with the same Plain navigation and page coverage |
| Home table with location name and deep link, building, scheduled availability, lowest fixed price or unavailable, sortable Location and Price controls, aria-sort and hours/menu footer link | Full-width table in document flow with building labels, availability text, sortable headers and the original links |
| Home budget and planned spending inputs, 112-day projection with balance gauge, max budget and zero labels, target line, projected line, endpoint marker, day 0/56/112 labels, timeline caption and live status | Same editable inputs and calculations, wider plot, labeled axes, legend, and readable live status |
| Home Open Planner and View Balance links | Paired primary and secondary links beneath the projection |
| Home nutrition selector including direct query/hash access, serving size, Calories, Protein, Carbohydrates, Fat, Fiber, Sodium, Sugar, published allergens, availability fallbacks | Ruled nutrition section with the same native select, table and fields |
| Comparison, nutrition, dining details and suggestions loading, stale, empty and error text and retry controls | Same Plain states and actions with shared loading placeholders and feedback styling |
| Balance heading, signed-in notice, sample balance disclosure and 10.50 daily target, Last Week and This Week charts, both full daily summaries, spending bars, target line, chart axes and legend | Two ruled weekly figures with complete accessible summaries and unchanged sample data |
| Balance suggestion name and deep link, building, menu item and price, optional image | Same records in a responsive suggestion grid |
| Planner budget, Daily Avg, Total Spent, Remaining, on/over budget key, selected-day date/status, location and spending inputs, Save Day, Clear, saved feedback and pointer | Separate dated editor, top-level financial statistics, and labeled calendar key. The full date heading replaces the visual pointer. |
| Planner month/year selects and options, seven weekday headers, all day buttons and labels/states, Last Month, Next Month, overall budget swatch and status | Large calendar grid with visible spending and location, the same month navigation and day state, and the overall budget summary above. Entries remain in memory until reload |
| Dining Info title, location/building disclosure controls and indicators, selected/open state, location query deep link, scheduled status, regular weekday hours and timezone, dated hours and source link | Directory links open dedicated location pages with the original hours and source links. Existing query links redirect to the new detail route. |
| Dining menu disclosures, item names/prices or fallback, section, category, days, rotation, allergen notes and nutrition links, meal service/Dining Bucks/guest rates, external links | Same sections inside the expanded location, with ruled native menu disclosures |
| Dining sidebar selected name, image, building caption, description, TTU location link, Double T logo | Companion detail column with the same conditional content and image, inline Read More and Read Less, and a map and link |
| Login heading/help, email pattern, password, submit, sample Balance redirect and browser-session cookie | Compact account workspace with the same native validation and prototype session flow |
| Sign Up heading, registration message, disabled email/password and Sign Up/eRaider buttons, eRaider logo, divider and Login link | Matching account form treatment with original disabled states and Login destination |

Plain 0.1.2 continues to load component templates and behavior modules. Keep relative HTML links, the existing dining API client, local planner state, and prototype account behavior when extending the design.
