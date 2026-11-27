# Your Dining Bucks Planner design system

Students use this web application to compare campus dining options, estimate how long their Dining Bucks will last, and plan spending by day. Use the visual discipline of a financial dashboard with Texas Tech identity in the wordmark, Double T, and restrained scarlet accents. Give live campus information and sample planning data distinct, plainly labeled contexts.

## Foundations

| Figma variable | CSS token | Value and use |
| --- | --- | --- |
| Brand / Scarlet | `--scarlet` | #CC0000 for active accents and primary actions |
| Canvas | `--background` | #F8F9FB |
| Surface | `--surface` | #FFFFFF |
| Text / Primary | `--ink` | #18181B |
| Text / Secondary | `--muted` | #71717A on white. Use `--muted-strong` for small text against the canvas or tinted surfaces |
| Border | `--border` | #E4E4E7 for structural rules. Form controls have a stronger outline |
| Positive / Negative | `--positive`, `--negative` | Text and graph colors with corresponding tinted fills. Always pair color with a label or other indicator |

Use Inter with a system sans-serif fallback. Page headings range from 32 to 48px, section headings use 20px, body text uses 14–16px, and labels use 13–14px. Use tabular numerals for prices, dates, and totals. Space on a 4px base with 8, 12, 16, 24, 32, and 48px steps. Use 8px control corners and 16px panel corners. Keep shadows low and confined to elevated surfaces. Use local Lucide glyphs at 16px with visible text labels for actions.

## Components and layout

- Shared Plain navbar and footer use the same page width as the content. The header groups the title and breadcrumb, navigation, and profile. On narrow screens, the navigation wraps onto a second row.
- Reusable Plain page headings establish the page title and optional purpose line. Existing page-specific headings that already carry bindings keep their heading semantics.
- Use one broad content column and a narrower companion column for Home and Dining Info. Planner places the calendar beside the selected-day form. Collapse to one column on narrow screens and allow dense tables to scroll inside their own labeled region.
- Buttons and fields have visible keyboard focus and a minimum 44px target where space allows. Calendar day targets follow the available seven-column grid.
- Render skeletons during initial Plain resource loads with visible status text. Empty, stale, and error messages occupy the same region as loading feedback. Keep the resource retry controls available after failures.
- Use native multipage transitions where supported and short hover, disclosure, and chart transitions. Disable decorative movement and chart animation under reduced motion. Preserve the initial and final states without depending on animation.

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
| Home nutrition selector including direct query/hash access, serving size, Calories, Protein, Carbohydrates, Fat, Fiber, Sodium, Sugar, published allergens, availability fallbacks | Nutrition panel with the same native select, table and fields |
| Comparison, nutrition, dining details and suggestions loading, stale, empty and error text and retry controls | Same Plain states and actions with shared loading placeholders and feedback styling |
| Balance heading, signed-in notice, sample balance disclosure and 10.50 daily target, Last Week and This Week charts, both full daily summaries, spending bars, target line, chart axes and legend | Two chart panels with complete accessible summaries and unchanged sample data |
| Balance suggestion name and deep link, building, menu item and price, optional image | Same records in a responsive suggestion grid |
| Planner budget, Daily Avg, Total Spent, Remaining, on/over budget key, selected-day date/status, location and spending inputs, Save Day, Clear, saved feedback and pointer | Day entry panel, compact metrics and labeled calendar key with the same handlers and pointer |
| Planner month/year selects and options, seven weekday headers, all day buttons and labels/states, Last Month, Next Month, overall budget swatch and status | Full-width calendar and the same month navigation and day state. Entries remain in memory until reload |
| Dining Info title, location/building disclosure controls and indicators, selected/open state, location query deep link, scheduled status, regular weekday hours and timezone, dated hours and source link | Accordion rows and expanded hours panel with original bindings and links |
| Dining menu disclosures, item names/prices or fallback, section, category, days, rotation, allergen notes and nutrition links, meal service/Dining Bucks/guest rates, external links | Same sections inside the expanded location, with bordered native menu disclosures |
| Dining sidebar selected name, image, building caption, description, TTU location link, Double T logo | Companion detail panel with the same conditional content and image |
| Login heading/help, email pattern, password, submit, sample Balance redirect and browser-session cookie | Centered account form with the same native validation and prototype session flow |
| Sign Up heading, registration message, disabled email/password and Sign Up/eRaider buttons, eRaider logo, divider and Login link | Matching account form treatment with original disabled states and Login destination |

Plain 0.1.2 continues to load component templates and behavior modules. Keep relative HTML links, the existing dining API client, local planner state, and prototype account behavior when extending the design.
