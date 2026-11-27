# Dining API browser client

Import `createDiningApi` from [dining-api.js](dining-api.js). Pass the deployed Worker URL (or a Node API base URL) before `/api/dining`. The client has no dependencies and can be imported into Plain component modules.

| Method | Returns |
| --- | --- |
| `getHealth(options)` | API process status |
| `getDining(options)` | Dining dataset with locations, menus, weekly and dated schedules, and current availability |
| `getLocation(id, options)` | One location by the ID from `getDining()` |
| `getNutrition(options)` | Nutrition documents and published Nutritionix link |
| `getFreshPlateNutrition(options)` | Fresh Plate daily nutrition document |
| `getCoverage(options)` | Coverage counts and source issues by location |

All methods return promises containing the API's JSON responses. Each accepts an optional `{ signal }`. HTTP failures and unexpected responses throw `DiningApiError` with `status` and `url` properties. Fetch network and cancellation errors retain their original types. See the endpoint schemas in the separate TTU Dining API repository’s README for field details.

## Future Plain component example

In a sibling component module such as `components/dining-info.js`, import the client using a relative path and pass the resource's cancellation signal. Replace the example URL with the deployed API URL.

```js
import { createDiningApi } from '../js/dining-api.js';

const dining = createDiningApi({ baseUrl: 'https://dining-api.example.com/' });

export default ({ resource }) => {
  const diningData = resource(
    () => true,
    (_, { signal }) => dining.getDining({ signal }),
    { initialValue: null },
  );

  return { state: { diningData } };
};
```

In the future template, guard `diningData.value` before reading its locations. Use `diningData.pending` and `diningData.error` for loading and error feedback. A successful dataset can still have `stale: true` and source issues. Handle `location.availability.open` as three states: `true` means scheduled open, `false` means scheduled closed, and `null` means unknown. Menu nutrition links resolve by matching their `url` and `itemId` against the documents from `getNutrition()`.
