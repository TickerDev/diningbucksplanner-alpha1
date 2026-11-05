# Plain 0.1.1: guide for AI coding agents

Read this before changing a Plain application. This reference describes the
vendored runtime; application requirements and project instructions take precedence.

## Project and runtime

Plain is an HTML-first reactive frontend framework. Edit original HTML, CSS, and
JavaScript directly. Serve over HTTP(S); no application build or dependency
installation is required. Do not edit the prebuilt vendor/plain.js runtime.

The starter uses the classic distribution, exposing global `Plain`:

```html
<script src="vendor/plain.js" defer></script>
<script src="js/app.js" defer></script>
```

Both external scripts execute in order after parsing. An ordinary inline script
runs before deferred scripts; use an external deferred app script or wait for
DOMContentLoaded. Adding defer to an inline classic script has no effect.

```js
Plain.createApp({
  state: { message: 'Hello' },
  settings: { site: { title: 'My site' } },
  // Capture currentScript synchronously while this classic app script executes.
  base: new URL('../', document.currentScript.src).href,
  development: location.hostname === 'localhost',
});
```

This base assumes js/app.js. For an ESM app, use import.meta.url instead.
Use one runtime distribution per document. The classic vendor/plain.js has no
ESM exports; do not import named APIs from it. Component modules in this starter
can use global Plain when standalone APIs are needed.

## Components

`<counter-component>` automatically loads components/counter.html and probes
components/counter.js. Missing optional sibling JavaScript (404/410) is allowed.
Missing required HTML or explicitly selected behavior is an error. Nonstandard
tags require app.define() or a configured discovery suffix.

components/counter.html:

```html
<section>
  <h2>{{props.title}}</h2>
  <p>Count: {{count}}; doubled: {{doubled}}</p>
  <button type="button" data-on:click="increment">Increment</button>
  <slot></slot>
</section>
```

components/counter.js:

```js
/** Create isolated state for each mounted instance. */
export default () => ({
  props: { title: { type: 'string', default: 'Counter' } },
  events: ['count-change'],
  state: { count: 0 },
  computed: {
    /** Derive a cached value. */
    doubled() {
      return this.count * 2;
    },
  },
  actions: {
    /** Update local state and notify the caller. */
    increment() {
      this.count++;
      this.$emit('count-change', this.count);
    },
  },
});
```

Alternatively put the factory inside one `<script type="module" data-component>`
in the component HTML. Inline behavior wins over sibling JavaScript and needs
CSP permission for blob: scripts. Separate behavior supports script-src 'self'.
Ordinary scripts in dynamically inserted HTML are not a behavior mechanism.

State objects and arrays are isolated and automatically reactive per instance.
Module-level variables are shared native module state. Use method syntax for
this-dependent actions, computed getters, and hooks; arrow functions do not bind
this. Local state, action, and computed names must not collide.

Factory context supplies host, props, state, shared, settings, signal, refs,
resource, onMount, onCleanup, emit, effect, and computed. Methods also expose
state, props, shared, settings, $host, $emit, and $refs. These aliases are reserved.
shared is application state. Prefer explicit custom events for upward communication.
Actions receive the native event as their final argument; custom payloads are in
event.detail.

Props are reactive. Static HTML attributes are strings; use typed dynamic bindings
or Plain.setProps(host, values) for objects, arrays, numbers, and booleans. Contracts
support string, number, boolean, object, array, and function, required, and default.
Contract warnings are development-only; defaults apply in both environments.
Keep attribute names lowercase/kebab-case; no automatic casing conversion occurs.

Light DOM is default; shadow: true enables Shadow DOM and native slots. Default
and named slots retain the caller's scope, including loop variables. Refs inside
a component belong to it; refs on its host and caller-supplied slots belong to
the caller.

## Template syntax and scope

| Syntax                                                          | Meaning                                     |
| --------------------------------------------------------------- | ------------------------------------------- |
| `[[site.title]]`                                                | Global settings only                        |
| `{{user.name}}`                                                 | Scoped binding                              |
| `((count > 0 ? 'Yes' : 'No'))`                                  | Restricted expression                       |
| `<template data-if="enabled">`                                  | Conditional branch                          |
| `<template data-else>`                                          | Alternative immediately after its condition |
| `<template data-for="item, index in items" data-key="item.id">` | Keyed list                                  |
| `data-on:click="select(item.id, $event)"`                       | Named action with arguments                 |
| `data-model="user.name"`                                        | Two-way form binding                        |
| `data-bind:src="image"`                                         | Inert validated attribute binding           |
| `data-ref="dialog"`                                             | Owned native element reference              |

Only template elements own data-if, data-else, and data-for. Use unique stable
string, number, or boolean keys. Keyed moves preserve DOM and component state;
removal disposes the row. `$index` is also available.

Loop bindings take precedence, then component aliases/local state/computed/actions/
props, then enclosing scopes. Root bindings use application state, actions, and
settings. Use props.name or shared.name for intentional collisions.

Expressions support own-property/bracket reads, arithmetic, comparison, logical
operators, nullish coalescing, ternaries, if-then-else, and template literals.
They do not support function calls, assignment, optional chaining, object/array
literals, constructors, or window/document globals. Put ordinary JavaScript in
component behavior. Event action calls are a separate supported directive syntax.

Text values render as text. Prefer data-bind:src/href/srcset/poster for resource
URLs so the browser never requests a literal interpolation. Executable URL schemes,
event attributes, and HTML injection targets are rejected. Templates and behavior
must still be trusted application source. pre/code/script/style and
data-plain-ignore subtrees are not interpreted.

Events support .prevent, .stop, .once, .self, and .enter. data-model supports
text/date-like inputs, textarea, number/range, boolean or array checkboxes, radios,
and single/multiple select, including IME. File inputs need a normal change action.

## Reactivity, lifecycle, and refs

Plain exposes reactive, signal, computed, effect, batch, nextTick, untrack, toRaw,
and onReactiveError. Nested plain objects/arrays are tracked through proxies;
Date, Map, Set, class instances, and frozen/nonextensible values are opaque.
Mutate the proxy or replace values to trigger updates. Computed invalidation is
synchronous; effects/DOM updates flush in a microtask. Await Plain.nextTick().

Factories and setup may be async. onMount and owned effect callbacks must return
undefined or a synchronous cleanup function, never a Promise. Start async work
inside synchronous hooks and handle rejection; use the context signal. Register
external timers/subscriptions with cleanup. Owned effects/computed/resources stop
automatically on unmount. Reconnection creates fresh component-local state.

Use refs.name or this.$refs.name for native DOM methods such as showModal(),
focus(), or pause(). Refs exist before mount hooks and disappear with their
branches. Ref names must be safe identifiers and unique within one owner; use
row components for repeated refs. Parent mount hooks need not await async children.

app.ready() waits for component initialization and reactive work, not application
resource requests. app.stop() disposes the application. app.invalidate(url?) clears
HTML/discovery caches for future mounts, not the native JavaScript module cache.
app.initialize(host) retries a connected failed component.

## Async resources

Initialize reactive source dependencies before creating a resource:

```js
/** Load data owned by this component's lifetime. */
export default ({ state, resource }) => {
  state.selectedId = 1;
  const record = resource(
    () => state.selectedId,
    async (id, { signal }) => {
      const response = await fetch(`/api/records/${id}`, { signal });
      if (!response.ok) throw new Error('Record request failed');
      return response.json();
    },
    { initialValue: null, onError() {} },
  );
  return { state: { record } };
};
```

Resources expose value, error, pending, status (idle/pending/success/error), hasValue,
initialPending, refreshing, retry(), and stop(). Source changes invalidate old
requests; stale success/failure cannot publish. Pass the signal to fetch. Previous
successful values remain during refresh and after refresh failure. initialValue is
a placeholder; successful null/undefined still counts for hasValue. Guard nullable
values and check selected identity before displaying retained data for a new record.

```html
<template data-if="record.value && record.value.id === selectedId">
  <h2>{{record.value.title}}</h2>
</template>
```

resource-boundary accepts resource="{{record}}" and pending/error/default slots.
Hidden slots remain mounted; guard bindings with data-if or provide safe initial
values. A boundary presents resource state; it is not a general error boundary.
Conditional owners dispose branches before descendant bindings run.

Standalone Plain.createResource() requires caller-owned stop(). Explicit
Plain.ResourceCache deduplicates pending requests with the same loader identity
and source key, with per-consumer leases; it does not permanently cache results.
Draft persistence, mutation retries/idempotency, and domain validation are application
responsibilities.

## Navigation and tooling

Ordinary .html links support multipage sites. The optional router is separate and
is NOT included in this starter's vendor/plain.js. Obtain the matching router ESM
from the framework distribution before importing createRouter. It supports history/
hash modes, an outlet, routes with path/render/mount, parameters, wildcard segments,
and notFound. Only data-link anchors are intercepted. Renderers receive params,
url, signal and return trusted HTML or a DOM node, optionally asynchronously. Put
URL/user data into textContent, not interpolated HTML strings. Route mount hooks
can return cleanup. History deep links require server fallback to the entry HTML;
hash routes work without it. A client notFound view does not set HTTP status 404.

CLI (Bun required): plain update refreshes vendor/plain.js and vendor/PLAIN.md
from the CDN release index (plainjs/versions.json). --version selects an indexed
release. This does not update the global CLI; use npm install -g @tickerdev/plainjs@latest
for that. plain dev . serves with full refresh; plain preview . serves
without refresh; plain check . checks without generating files. plain init creates
starters and allows .git/.DS_Store metadata but protects other existing files.

Run plain check . after changes and exercise changed behavior in a browser. The
checker is conservative static analysis, not arbitrary JavaScript inference. It
understands literal state/actions/settings, state.foo assignments, and literal
Object.assign(state, {...}). Dynamic construction may need plain.check.json with
bindings/actions/settings/component metadata. Do not remove valid dynamic code
solely to silence an inference limitation.

No SSR/hydration, component TypeScript transpilation, module HMR, automatic
virtualization, offline service worker, or built-in backend is supplied. Do not
invent APIs or introduce an application build unless the user requests it.
