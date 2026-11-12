Read [vendor/PLAIN.md](vendor/PLAIN.md) before editing this Plain application. Follow its runtime APIs and authoring conventions.

Keep all application styling in external `.css` files. Do not add inline `style`
attributes, `<style>` elements, Plain style bindings, or JavaScript that writes
inline styles (including `element.style`, `style.cssText`, and
`setAttribute('style', ...)`). Use CSS classes or data attributes for visual
states. SVG geometry attributes may be used for drawing and positioning graphics.
Keep `GEMINI.md` as a symlink to `AGENTS.md` so both agents use the same rules.
