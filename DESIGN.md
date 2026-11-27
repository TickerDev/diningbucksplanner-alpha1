# Your Dining Bucks Planner design system

Students use this web application to compare campus dining options, estimate how long their Dining Bucks will last, and plan spending by day. Take cues from Swiss editorial design and campus print publications. A strong masthead establishes the hierarchy, rules connect related material, and tabular details remain easy to scan. The Double T and a scarlet top rule identify Texas Tech at a glance. Keep published dining information distinct from sample account data.

## Foundations

| Figma variable | CSS token | Value and use |
| --- | --- | --- |
| Brand / Scarlet | `--scarlet` | #CC0000 for the masthead rule and primary actions |
| Canvas | `--background` | #F5F2EB, a warm paper tone |
| Control surface | `--surface` | #FDFAF4 for fields and menus |
| Text / Primary | `--ink` | #22201E |
| Text / Secondary | `--muted`, `--muted-strong` | #6C635B and #635A51 |
| Dividers | `--rule`, `--border` | #322923 for section rules and #D3CBC0 for subordinate dividers |
| Positive / Negative | `--positive`, `--negative` | #216743 and #A71B20. Pair color with a text label or a non-color indicator |
| Projection / Canvas | `--chart-paper` | #24201E. Use #FFF7EE for primary text and #DFCFC3 for labels |
| Projection / Series | `--chart-tone` | #FFC1A9 for the projection and #FF897D when it exceeds budget. The target stays dashed |

Use locally served Manrope. Display titles range from roughly 42 to 96px, major section titles from 20 to 26px, and body text from 14 to 16px. Apply tabular numerals to plotted values, prices, dates, and totals. Space on a 4px base with 8, 12, 16, 24, 32, and 48px steps, plus fluid gutters. Use square section edges and 2px control corners. Reserve Lucide glyphs for visible actions, sorting, and wayfinding.

## Components and layout

- Align the masthead, content, and footer to a shared measure capped at 94rem. The Plain navbar combines the Double T, linked title, breadcrumb, profile, and underlined current route. On narrow screens, the links wrap onto a second row.
- On Home, place the live location index in the wider left column with nutrition in its own ruled section below. The dark projection occupies the companion column and groups inputs, chart, status, and next actions. On narrow screens the sections follow document order.
- Keep all location records in a keyboard-focusable scroll region with sticky sort headers. Align prices to the right, and set building names below location links in secondary text.
- Place the planner's ruled budget and day entry beside the calendar. Use a sparse seven-column date grid with visible status and selection states. Balance uses paired weekly figures and a row of dining suggestions. Dining Info uses an index with expanded hours and an adjacent location detail. Account titles and forms sit on opposite sides of a shared rule at wide widths.
- Buttons and fields have visible keyboard focus and a minimum 44px target where space allows. Keep Plain loading placeholders, retry controls, and text feedback for error, empty, and stale data.

## Motion

- Stage the page heading first, primary content after 45ms, and companion content after 90ms. The shared ease-out and short movement keep the composition readable throughout the reveal.
- Draw the active route underline on entry, and use the same underline for hover and keyboard focus. Use cross-document fades where View Transitions are supported.
- Interpolate the projection trajectory, endpoint, and gauge together. Status text updates immediately. Reduced motion skips these animations, the staggered reveals, the underline draw, the page fade, and the skeleton pulse.

## Feature inventory and equivalence

The baseline is the team's working copy at commit `46f3f44`. The comparison below applies to all records returned by the existing API.

| Original surface and elements | Redesigned equivalent |
| --- | --- |
| Shared skip link and main target, application title linked to Home, breadcrumb separator and page, Login, Home, Balance, Planner, Dining Info, current-page indication | Same targets and route labels within the shared responsive shell |
| Signed-out profile image linking to Login, signed-in profile image and native options menu, Log out, Escape and outside-click dismissal | Same two profile states and session behavior in the header |
| Footer brand and all five links with active state on Home, Balance, Planner, and Dining Info | Compact footer with the same Plain navigation and page coverage |
| Home table with location name and deep link, building, scheduled availability, lowest fixed price or unavailable, sortable Location and Price controls, aria-sort and hours/menu footer link | Full table in a scroll region with distinguishable building labels, availability text, sortable headers and the original link |
| Home budget and planned spending inputs, 112-day projection with balance gauge, max budget and zero labels, target line, projected line, endpoint marker, day 0/56/112 labels, timeline caption and live status | Same inputs, SVG geometry and calculations, labeled chart legend and separate readable status below the plot |
| Home Open Planner and View Balance links | Paired primary and secondary links beneath the projection |
| Home nutrition selector including direct query/hash access, serving size, Calories, Protein, Carbohydrates, Fat, Fiber, Sodium, Sugar, published allergens, availability fallbacks | Ruled nutrition section with the same native select, table and fields |
| Comparison, nutrition, dining details and suggestions loading, stale, empty and error text and retry controls | Same Plain states and actions with shared loading placeholders and feedback styling |
| Balance heading, signed-in notice, sample balance disclosure and 10.50 daily target, Last Week and This Week charts, both full daily summaries, spending bars, target line, chart axes and legend | Two ruled weekly figures with complete accessible summaries and unchanged sample data |
| Balance suggestion name and deep link, building, menu item and price, optional image | Same records in a responsive suggestion grid |
| Planner budget, Daily Avg, Total Spent, Remaining, on/over budget key, selected-day date/status, location and spending inputs, Save Day, Clear, saved feedback and pointer | Ruled day entry, aligned metrics and labeled calendar key with the same handlers and pointer |
| Planner month/year selects and options, seven weekday headers, all day buttons and labels/states, Last Month, Next Month, overall budget swatch and status | Full-width calendar and the same month navigation and day state. Entries remain in memory until reload |
| Dining Info title, location/building disclosure controls and indicators, selected/open state, location query deep link, scheduled status, regular weekday hours and timezone, dated hours and source link | Index rows and expanded hours section with original bindings and links |
| Dining menu disclosures, item names/prices or fallback, section, category, days, rotation, allergen notes and nutrition links, meal service/Dining Bucks/guest rates, external links | Same sections inside the expanded location, with ruled native menu disclosures |
| Dining sidebar selected name, image, building caption, description, TTU location link, Double T logo | Companion detail column with the same conditional content and image |
| Login heading/help, email pattern, password, submit, sample Balance redirect and browser-session cookie | Split title and account form with the same native validation and prototype session flow |
| Sign Up heading, registration message, disabled email/password and Sign Up/eRaider buttons, eRaider logo, divider and Login link | Matching account form treatment with original disabled states and Login destination |

Plain 0.1.2 continues to load component templates and behavior modules. Keep relative HTML links, the existing dining API client, local planner state, and prototype account behavior when extending the design.
