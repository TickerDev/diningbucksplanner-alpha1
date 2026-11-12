# Agent instructions for Your Dining Bucks Planner

These instructions apply to the entire repository. They are intended for coding
agents of any model or age. Read this file before making changes.

## Read first; do not guess the stack

1. Read [vendor/PLAIN.md](vendor/PLAIN.md) before editing application code. It
   documents the vendored Plain runtime and its supported APIs.
2. Inspect the files involved in the request, their callers, and related CSS.
   Read existing code before proposing replacements.
3. Read [README.md](README.md) for project context, but verify implementation
   details against current source. Documentation and comments can be outdated.
4. Check `git status --short` and existing diffs before editing. Preserve work
   already present, even when it overlaps the requested files.
5. Follow the user's explicit task and constraints. These rules guide work;
   they do not authorize unrelated redesigns, framework migrations, or features.

Do not rely on memorized framework syntax. Plain is its own framework, not React,
Vue, Angular, Alpine, Svelte, or a generic name for vanilla JavaScript. When an API
is uncertain, consult the vendored guide and relevant runtime implementation
without modifying the runtime. Do not invent APIs to fill gaps.

## Project facts and file map

- This is an ENGR 1340 student project: Your Dining Bucks Planner for Texas Tech
  students. Preserve its name, Dining Bucks terminology, and existing visual identity.
- The app uses HTML, CSS, browser JavaScript, and the vendored Plain 0.1.1 runtime.
  Confirm the version in `vendor/PLAIN.md` before depending on version details.
- It is a static multipage application. Navigation loads separate `.html`
  documents; it is not a single-page application.
- There is no application build step, package manifest, backend, database, or
  working university authentication service in this checkout.
- `index.html`: dining comparison table and spending projection.
- `balance.html`: sample balance display and weekly Chart.js visualization.
- `planner.html`: standalone planner markup and browser JavaScript. Inspect this
  page directly; it does not currently bootstrap Plain like the shared pages do.
- `dining-info.html`, `login.html`, `signup.html`: page entry documents using
  component templates. Account forms do not implement real authentication.
- `js/app.js`: shared Plain startup, navigation, page metadata, and Home behavior.
- `components/*.html`: Plain component templates; optional sibling `*.js` files
  provide component behavior through default-exported factories.
- `css/styles.css`: shared foundations and existing common/page styles.
  `css/navbar.css` and `css/footer.css` style the shared shell. Other CSS files
  contain the corresponding page or component rules.
- `assets/`: local images and SVG graphics. Reuse existing assets where appropriate.
- `plain.check.json`: metadata for conservative Plain static analysis.
- `vendor/`: distributed runtime, reference guide, license, and notices.

File names and responsibilities can evolve. Inspect the actual checkout rather
than treating this map as permission to overwrite newer work.

## Windows, PowerShell, and cross-platform commands

Most teammates use Windows. Make instructions usable there as well as on macOS
and Linux. Detect the actual shell instead of assuming Bash or zsh.

- Prefer PowerShell examples for Windows. Windows PowerShell 5.1 does not support
  `&&`/`||` command chaining; run commands on separate lines and inspect each result.
  PowerShell 7 and Git Bash are different shells; do not assume either is installed.
- Standard Git commands below work in PowerShell, Git Bash, and macOS/Linux shells
  when Git is installed. `plain check .`, `bunx @tickerdev/plainjs check .`, and
  `node --check path/to/script.js` also use the same arguments across platforms.
- Use `Get-Command git`, `Get-Command bun`, or `Get-Command rg` in PowerShell to
  check availability; use `command -v` in POSIX shells. Do not install tooling or
  change the machine's execution policy just to work around a missing command.
- Quote filesystem paths containing spaces. In PowerShell, use
  `Set-Location -LiteralPath 'C:\path\to\ENGR-1340 Project 2'`; on macOS/Linux,
  use `cd '/path/to/ENGR-1340 Project 2'`. Replace these example paths with the
  verified local checkout path; do not copy another developer's absolute path.
- Use `Get-Content -LiteralPath 'AGENTS.md'` instead of assuming `cat` is available,
  and `Get-ChildItem -Force` to inspect files. Prefer explicit PowerShell cmdlets
  over Unix aliases whose options behave differently on Windows.
- `rg` works in PowerShell if installed; single-quote regexes and globs as shown
  below. If unavailable, use the provided `Select-String` alternative.
- For native command success/failure in PowerShell, inspect `$LASTEXITCODE`
  immediately after the command. For example, Git ancestry checks return 0 for
  an ancestor, 1 for a non-ancestor, and other nonzero codes for errors. Do not
  treat every nonzero exit as evidence that branches have diverged.
- Do not paste Bash heredocs (`<<'EOF'`), `export`, `$(...)` shell substitutions,
  or Bash-style escaping into PowerShell. Use shell-appropriate scripts and
  quoting. PowerShell here-strings have different delimiters and expansion rules.
- Preserve UTF-8 encoding and existing line endings when editing. Windows
  PowerShell 5.1 `>` and `Out-File` can produce UTF-16, and its `-Encoding UTF8`
  writes a BOM. Use an editor/file tool that preserves encoding, or explicitly
  write UTF-8 without a BOM when needed. Avoid rewriting entire files just to
  normalize CRLF/LF, and do not change global Git line-ending settings.
- Use forward slashes in HTML URLs, CSS URLs, and JavaScript module specifiers,
  even on Windows. Match filename case exactly; Windows may conceal mistakes
  that break case-sensitive hosting. Use `git mv` through a temporary name for
  an intentional case-only rename.
- Symlink behavior differs on Windows; follow the maintenance section below.
  Do not substitute a copied instruction file, hard link, or directory junction.
- The no-server rule applies on every OS. PowerShell `Start-Process`,
  `Start-Job`, CMD `start`, and hidden/background processes must not be used to
  launch a server either.

## Preserve the lightweight architecture

- Edit original HTML, CSS, and JavaScript directly. Do not add React, Next.js,
  Vue, TypeScript/JSX compilation, Tailwind, a bundler, a package manager setup,
  or a component library unless the task calls for that architectural change.
- Prefer native HTML controls, browser APIs, and existing Plain features over
  new dependencies. Use `<details>`/`<summary>` for simple disclosure controls.
- Keep ordinary relative `.html` links. Do not introduce a client router or
  rewrite working URLs into framework routes.
- Do not assume Plain includes a router, server rendering, hydration, a backend,
  authentication, offline support, or automatic persistence.
- Do not edit or reformat `vendor/plain.js`. Preserve vendor licenses and notices.
  Do not run `plain update` as a routine fix; it changes the runtime version.
- Keep app startup shared where it is already shared. Do not create a second
  Plain app on a document that already initializes one.
- A standalone page must either remain deliberately standalone or be integrated
  fully. Adding Plain attributes alone does not wire up its controls.
- Do not copy entire navigation/footer implementations into new pages when the
  existing shared components meet the need.

## Styling: external CSS only

**All authored application styling belongs in external `.css` files.**

- Do not add HTML or SVG `style` attributes or `<style>` elements.
- Do not use Plain style bindings, `element.style`, `style.cssText`,
  `style.setProperty()`, or `setAttribute('style', ...)` to write inline styles.
  Setting a CSS custom property through `element.style` is still inline styling.
- Do not inject stylesheets, create `<style>` nodes, or generate CSS rules in
  JavaScript to bypass this requirement.
- Use classes, class toggles, data attributes, and semantic states such as
  `[aria-expanded="true"]` for visual changes. Define their appearance in CSS.
- Keep new behavior in external JavaScript files as well. Prefer sibling component
  modules or deferred page scripts over adding inline `<script>` blocks or HTML
  `onclick`/`onchange` handlers. Existing inline behavior is not a precedent for
  adding more; migrate it when relevant to the task, not through unrelated churn.
- SVG geometry attributes may position and draw graphics: for example `viewBox`,
  `d`, `x`, `y`, `cx`, `cy`, and geometric `transform`. Do not use SVG presentation
  attributes as a workaround for general interface styling. Existing chart
  presentation attributes are legacy code; prefer CSS classes for new color states.
- Canvas drawing settings and chart data are not HTML inline styles. Still inspect
  libraries before adding them; some write inline styles internally. Do not claim
  a source scan proves that a third-party library creates none at runtime.
- Link the appropriate stylesheet from the page or existing component convention.
  Check stylesheet order and relative URLs; moving CSS changes the base URL of
  `url(...)` references to the location of the CSS file.
- Put shared rules in shared files and page rules in their page stylesheet.
  Scope page-specific selectors to avoid changing other pages accidentally.
- Reuse existing design tokens, typography, spacing, and responsive patterns.
  Avoid duplicate selectors, arbitrary overrides, and new `!important` declarations
  when a correctly scoped rule solves the problem.
- Preserve responsive layouts. Do not replace fluid widths with screenshot-sized
  fixed layouts or hide content to make overflow disappear.

## Plain startup and script loading

Shared pages load the classic runtime before the app script:

```html
<script src="vendor/plain.js" defer></script>
<script src="js/app.js" defer></script>
```

- Preserve execution order. Classic external deferred scripts execute after
  parsing in document order; adding `async` breaks that guarantee.
- An inline classic script runs during parsing, before deferred scripts. A
  `defer` attribute on an inline classic script does not defer it.
- Classic `vendor/plain.js` exposes global `Plain`; it does not provide named ESM
  exports. Do not write `import { createApp } from './vendor/plain.js'`.
- Preserve the app base resolution in `js/app.js`. Read `document.currentScript`
  synchronously while the classic script executes, not inside a later callback.
  Use `import.meta.url` only in actual JavaScript modules.
- New page-specific scripts should tolerate being on only their intended page.
  Guard optional DOM lookups; do not dereference missing chart/form elements.
- Plain components load asynchronously. `DOMContentLoaded` does not prove their
  templates are mounted. Use component refs and lifecycle hooks for their DOM.

## Plain component and template rules

- `<navbar-component>` discovers `components/navbar.html` and optionally
  `components/navbar.js`. Preserve the naming convention. A missing optional
  sibling JS file can be valid; a missing required HTML template is an error.
- Prefer sibling behavior modules with `export default () => ({ ... })`.
  Ordinary scripts inserted in dynamically loaded HTML are not component behavior.
- Use method syntax for actions, computed getters, and hooks that access `this`.
  Arrow functions do not bind the component instance.
- Component-local state belongs in the per-instance factory. Module-level mutable
  variables are shared across instances. Use explicit shared state only when needed.
- Keep state, action, and computed names distinct. Do not shadow Plain's reserved
  aliases such as `props`, `shared`, `settings`, `$host`, `$refs`, or `$emit`.
- Use declared props for parent-to-child input and explicit custom events for
  child-to-parent communication. Use `props.name` or `shared.name` when scope
  could otherwise be ambiguous.
- Static HTML attributes are strings. For typed objects, arrays, numbers, and
  booleans, use documented dynamic prop bindings or `Plain.setProps()`.
- Attribute names stay lowercase/kebab-case. Do not assume automatic camel-case
  conversion. Current components use light DOM, so their CSS is not isolated.

Use Plain's syntax, not syntax borrowed from another framework:

| Purpose | Supported pattern |
| --- | --- |
| Scoped text | `{{message}}` |
| Global setting | `[[site.title]]` |
| Restricted expression | `((count > 0 ? 'Yes' : 'No'))` |
| Event action | `data-on:click="select(item.id, $event)"` |
| Prevent form navigation | `data-on:submit.prevent="submit"` |
| Two-way input | `data-model="budget"` |
| Resource URL | `data-bind:src="image"` |
| Owned element reference | `data-ref="password"` |
| Conditional branch | `<template data-if="enabled">...</template>` |
| Alternative branch | `<template data-else>...</template>` immediately after its condition |
| Keyed repetition | `<template data-for="item in items" data-key="item.id">...</template>` |

- Only `<template>` owns `data-if`, `data-else`, and `data-for`. Do not place them
  directly on a `<div>` or other ordinary element.
- Use unique stable keys, not a changing index for reorderable records.
- Template expressions are restricted. They do not support arbitrary calls,
  assignments, optional chaining, object/array literals, constructors, or globals
  such as `window` and `document`. Put that logic in actions or computed values.
  These restrictions apply to templates, not ordinary JavaScript files.
- Event action invocation is a separate documented syntax; do not confuse it with
  general expression evaluation. Native events are the action's final argument;
  custom-event payloads are in `event.detail`.
- Prefer `data-bind:src`, `href`, `srcset`, and `poster` rather than resource URLs
  containing literal interpolation that the browser might request prematurely.
- Text bindings render text. Do not try to turn user text into executable markup.
  `pre`, `code`, `script`, and ignored subtrees are not interpreted as templates.

## State, lifecycle, and asynchronous work

- Mutate reactive proxies or replace their values. Plain tracks nested ordinary
  objects and arrays; do not assume in-place Date/Map/Set mutations are reactive.
- DOM updates flush in a microtask. Use `await Plain.nextTick()` when a measurement
  depends on a preceding reactive render instead of arbitrary timeouts.
- Use `refs.name` or `this.$refs.name` for owned elements. Refs can disappear with
  conditional branches; guard access when the branch may be absent.
- `onMount` and owned effect callbacks must not be `async` or return Promises.
  Start asynchronous work inside synchronous callbacks and handle rejection.
- Clean up externally registered listeners, timers, subscriptions, and observers
  with the component lifecycle. Do not attach duplicate handlers on each render.
- Follow the guide for resources. Initialize reactive dependencies first, pass
  the provided abort signal to fetch, and handle pending, empty, error, and retry states.
- Check `response.ok`; fetch does not reject merely because a server returns 404
  or 500. Prevent stale responses from replacing a newly selected record.
- Resource values can retain earlier data during refresh or after failure. Guard
  nullable values and selected-record identity before presenting retained results.
- `app.ready()` waits for component initialization and reactive work, not every
  resource request. Do not use it as a blanket network-completion guarantee.

## JavaScript and data correctness

- Match the surrounding style and use descriptive names. Prefer small focused
  functions to duplicated calculations or broad helper abstractions for one use.
- Keep one owner for an interaction. Do not wire the same click through both a
  Plain action and a native listener unless both effects are intentional.
- Use `addEventListener` or documented Plain actions for new event handling.
  Do not add new global functions solely to support inline event handlers.
- Parse numeric input deliberately. Distinguish blank, zero, invalid, negative,
  and non-finite values. `Number(value) || default` loses valid zero values.
- Validate before division, chart scaling, or date calculations. Never display
  `NaN`, `Infinity`, impossible dates, or negative SVG dimensions.
- For new money calculations, prefer integer cents with explicit rounding and
  format at the display boundary. Avoid repeated rounding during accumulation.
- Derive calendar month length and weekday placement from the chosen month/year.
  Cover leap years and month/year rollover when changing calendar behavior.
- Centralize repeated domain assumptions such as semester length. Do not present
  a hardcoded 112-day scenario as a live university calendar.
- Keep chart labels, totals, statuses, and geometry derived from the same inputs.
  Provide meaningful text alongside a chart; color alone must not convey status.
- Do not introduce persistence silently. If persistence is requested, store only
  appropriate non-sensitive data, handle malformed stored values, and explain its
  device/browser scope. Client storage is not an account database.

## Forms, security, and honest product behavior

- Use labels connected to inputs, suitable types, `name`, `autocomplete`, and
  appropriate required/min/max/step constraints. Validate in JavaScript where
  domain rules exceed native validation.
- Account forms are prototypes until a real service is integrated. Do not show
  successful login, create fake sessions, or imply eRaider authorization works.
- Prevent unimplemented credential forms from navigating with passwords in a
  query string. Do not store or log passwords, tokens, or credential-bearing URLs.
- Do not put secrets, private API keys, database credentials, or service-role keys
  in this static frontend, source files, examples, console output, or Git history.
  Frontend configuration is public; a `.env` file does not make shipped secrets safe.
- Use `textContent` and native DOM construction for untrusted content. Do not
  interpolate user/URL/storage data into `innerHTML`, script, or executable URLs.
  Do not use `eval()` or `new Function()` for application behavior.
- Client validation, hidden buttons, and local-storage flags do not enforce
  authorization. Real account access requires trusted server-side enforcement.
- Treat hardcoded balances, prices, walking times, dining hours, and chart values
  as sample data unless verified. Do not fabricate campus integrations or live data.
- For new external links opening a tab, use an appropriate `rel="noopener"`.
  Use HTTPS resources and avoid unrequested tracking scripts.

## Accessibility and responsive behavior

- Use semantic landmarks and a logical heading hierarchy. Preserve the skip link
  and a valid `#main-content` target on every page using the shared shell.
- Use buttons for actions and anchors for navigation. Set `type="button"` on
  non-submit buttons inside forms.
- All controls must work with a keyboard and retain visible focus. Do not use
  clickable noninteractive elements as substitutes for native controls.
- Give icon-only buttons accessible names. Use meaningful image alt text; mark
  purely decorative images with empty alt text and/or appropriate hiding.
- Keep `aria-current`, `aria-expanded`, and other states synchronized with actual
  behavior. Announce useful form/status feedback without excessive live updates.
- Preserve readable contrast and pair red/green status colors with text or icons.
- Test narrow and wide layouts, zoom/reflow, long labels, and empty/error states.
  Avoid horizontal page overflow; tables may use a deliberate scroll container.
- Respect `prefers-reduced-motion` when adding nonessential animation. Avoid
  autoplay or disruptive movement.

## Scope, collaboration, and Git hygiene

### Keep the working branch current with main

- Before starting implementation, proactively try to fetch the shared repository
  on the user's behalf and check whether remote `main` has newer commits. Do not
  rely on a stale local `main` or ask the user to run a routine fetch for you.
- Inspect the current branch, working tree, and configured remotes first. For
  this repository, normally use `git fetch origin` and compare `HEAD` with
  `origin/main`. If the remote is different, use the verified shared remote;
  do not create or change remotes or guess a replacement branch.
- Fetching updates remote-tracking references; it does not update the working
  branch by itself. If `origin/main` is already an ancestor of `HEAD`, no
  integration is needed. Otherwise, bring its changes into the current working
  branch before implementing the requested work when it is safe to do so.
- With a clean working tree, use `git merge --ff-only origin/main` when a fast
  forward is possible. If the working branch has its own commits and has
  diverged, use a normal merge of `origin/main`, preserving branch history.
  This rule authorizes the merge commit needed for synchronization; it does
  not authorize unrelated commits, pushes, rebases, or history rewrites.
- Preserve uncommitted work. Do not automatically stash, commit, reset, or discard
  it to make an update possible. Fetch and inspect incoming changes, then defer
  integration if the dirty working tree prevents a safe update.
- Review and resolve merge conflicts only when the intended combined behavior
  is clear. Never blindly choose all of "ours" or "theirs". If intent is unclear,
  explain the conflict and request the specific decision needed before proceeding.
- If fetching fails because of network or access problems, report that freshness
  could not be verified; do not claim the branch is current. Continue work that
  can safely proceed with the available checkout.
- After integrating, inspect the result and run checks relevant to the incoming
  changes and requested work. Briefly report whether the branch was updated,
  already contained remote `main`, or could not be synchronized and why.

### Preserve teammates' work

- Make the smallest complete change that satisfies the request. Reuse existing
  patterns and avoid unrelated formatting, renaming, or cleanup.
- Do not discard, reset, stash away, or overwrite teammates' changes to simplify
  your task. Inspect conflicts and preserve intended behavior from both sides.
- Do not run destructive Git operations, force-push, change remotes, or rewrite
  history as routine cleanup. Do not commit or publish unless requested.
- Do not add generated caches, `.DS_Store`, editor workspace state, downloaded
  dependencies, temporary screenshots, or verification artifacts to the project.
- Preserve asset names and case unless updating every reference. Check relative
  paths on case-sensitive hosts, including CSS image paths and component URLs.
- Update documentation when requested work changes actual behavior or setup.
  Do not invent contributor names, assignment criteria, or completion claims.
- If requirements are ambiguous, inspect existing code/context first. Make
  reasonable reversible choices; ask only when missing information materially
  changes the result or cannot be inferred.

## Running and verifying changes

The developer serves the site themselves. **Agents must not start servers.**

- Do not launch development, preview, static-file, or background servers, including
  `plain dev`, `plain preview`, `python3 -m http.server`, `npm run dev`, `npx serve`,
  or equivalents. Do not create server scripts or background processes for testing.
- Use the developer's existing HTTP(S) server for browser verification. Use its
  supplied or verified URL; do not assume a port or start a fallback server.
- Do not stop, restart, reconfigure, or replace the developer's server, kill its
  process, or change its port.
- If the URL is needed and cannot be determined from available context, ask for
  the existing server URL. Continue independent static checks in the meantime.
- If the server is unavailable, report that browser verification could not be
  completed and continue checks that do not require it. Do not launch a server
  to work around the limitation.
- `file://` is unsuitable for Plain component fetching and module loading. No
  application dependency installation is needed.

Run the relevant static checks from the repository root. These commands work
in both PowerShell and POSIX shells (run each separately and inspect its result):

```text
plain check .
git diff --check
```

If the Plain executable is unavailable and Bun is installed, the CLI can be run
with `bunx @tickerdev/plainjs check .`. This may download CLI tooling; it does not
require adding a package manifest to the app. Report unavailable checks honestly.

- Run Plain's checker after application changes and inspect all diagnostics.
  It is conservative static analysis, not a complete JavaScript interpreter.
- Only add `plain.check.json` metadata for real implemented dynamic members.
  Do not whitelist missing actions, delete working bindings, or add empty handlers
  just to obtain a green check.
- When a diagnostic appears unrelated, verify whether it predates the change
  and report it separately. Do not silently claim the checks passed.
- Check JavaScript syntax using tools appropriate to classic scripts versus
  modules. `node --check` does not execute browser behavior or validate Plain templates.
- Review the final diff for accidental changes, missing stylesheet links,
  duplicate IDs, dead selectors, and broken asset paths.
- For application changes, exercise affected flows in a browser when browser
  tooling is available and allowed. Inspect the console and failed network requests.
  Otherwise state that browser verification was not performed.
- Check shared-shell changes across all six pages. For budgets/charts, test blank,
  zero, valid, over-budget, and invalid input. For calendars, test selection,
  saving/clearing, month changes, and year rollover as relevant.
- There is no established automated test suite in this checkout. Do not claim
  `npm test`, lint, build, or end-to-end tests ran without actual evidence.
- Add focused regression tests when meaningful for changed logic; do not introduce
  a new testing stack for a simple documentation or style-only change.
- Scan authored HTML, JavaScript, and SVG for prohibited styling, excluding the
  distributed runtime. This first pass works in PowerShell and POSIX shells
  when ripgrep is installed:

```text
rg -n -i '<style\b|\bstyle\s*=|\.style\b|data-bind:style' --glob '*.html' --glob '*.js' --glob '*.svg' --glob '!vendor/**' .
```

On Windows without ripgrep, run this PowerShell equivalent from the repository root:

```powershell
Get-ChildItem -LiteralPath . -Recurse -File |
  Where-Object {
    $_.Extension -in '.html', '.js', '.svg' -and
    $_.FullName -notmatch '[\\/](vendor|\.git|\.vs)[\\/]'
  } |
  Select-String -Pattern '<style\b|\bstyle\s*=|\.style\b|data-bind:style'
```

`Select-String` produces no matches when the scan is clear; it does not use
ripgrep's native exit-code convention. Inspect output and any PowerShell errors.

This scan is a heuristic: review matches and also look for dynamically constructed
style attributes or injected stylesheets. No matches makes `rg` exit with code 1;
that is normal. Documentation examples are not application styling violations.

## Completion and instruction-file maintenance

- Report what changed, what was actually checked, and any remaining limitations.
  Distinguish implemented behavior, prototypes, and unverified assumptions.
- Do not say a bug is fixed, a flow works, or a visual matches without evidence.
- Keep `AGENTS.md` as the canonical instruction file, tracked in Git.
- Keep `GEMINI.md` as a relative symlink to `AGENTS.md`. Do not replace it with a
  separately maintained copy. Edit this file once to update both entry points.
- On macOS/Linux or Git Bash, verify with `test -L GEMINI.md` and
  `readlink GEMINI.md`; the target should be `AGENTS.md`.
- In Windows PowerShell, inspect the link with:

```powershell
Get-Item -LiteralPath '.\GEMINI.md' -Force |
  Select-Object Name, LinkType, Target
```

- Expect `LinkType` to be `SymbolicLink` and the relative target to be `AGENTS.md`.
  Do not delete and recreate a valid link unnecessarily.
- If the link is genuinely missing, create it from the repository root with
  `ln -s AGENTS.md GEMINI.md` on macOS/Linux or Git Bash, or in PowerShell with:

```powershell
New-Item -ItemType SymbolicLink -Path '.\GEMINI.md' -Target 'AGENTS.md'
```

- Windows symlink creation may require Developer Mode or sufficient privileges.
  Do not silently elevate, change OS settings, or replace the symlink with a
  regular file if creation is denied. Explain the setup limitation to the developer.
- Git for Windows can check symlinks out as plain files containing the target
  path when symlink support is disabled. If `GEMINI.md` is a regular file, inspect
  `git ls-files -s -- GEMINI.md` (tracked symlinks have mode `120000`), its contents,
  and `git config --get core.symlinks` before proposing a repair. An unset config
  value alone is not proof of a broken link. Do not overwrite a teammate's file.
- On a machine capable of creating symlinks, repository-local
  `git config core.symlinks true` can enable Git's symlink handling. This alone
  does not convert an existing plain-file checkout into a link. Preserve local
  edits and repair only the verified link; never reset the whole checkout or
  change global configuration. Until repaired, agents should read `AGENTS.md`
  directly rather than maintaining a second instruction copy.
- Keep these instructions grounded in the current repository. Update outdated
  facts when the project changes; do not accumulate contradictory rules or
  temporary task notes here.
