---
'@astrojs/starlight': minor
---

Moves route data to `Astro.locals` instead of passing it down via component props

⚠️ **Breaking change:**
Previously, all of Starlight’s templating components, including user or plugin overrides, had access to a data object for the current route via `Astro.props`.
This data is now available as `Astro.locals.starlightRoute` instead.

To update, refactor any component overrides you have:

- Remove imports of `@astrojs/starlight/props`, which is now deprecated.
- Update code that accesses `Astro.props` to use `Astro.locals.starlightRoute` instead.
- Remove any spreading of `{...Astro.props}` into child components, which is no longer required.

In the following example, a custom override for Starlight’s `LastUpdated` component is updated for the new style:

```diff
---
import Default from '@astrojs/starlight/components/LastUpdated.astro';
- import type { Props } from '@astrojs/starlight/props';

- const { lastUpdated } = Astro.props;
+ const { lastUpdated } = Astro.locals.starlightRoute;

const updatedThisYear = lastUpdated?.getFullYear() === new Date().getFullYear();
---

{updatedThisYear && (
-   <Default {...Astro.props}><slot /></Default>
+   <Default><slot /></Default>
)}
```

_Community Starlight plugins may also need to be manually updated to work with Starlight 0.32. If you encounter any issues, please reach out to the plugin author to see if it is a known issue or if an updated version is being worked on._
