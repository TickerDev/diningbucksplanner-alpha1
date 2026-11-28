import { diningAvailability, diningInfoLink, diningResource, formatPrice, lowestListedPrice } from '../js/dining-data.js';

const nutrients = [
  ['calories', 'Calories', 'kcal'],
  ['protein', 'Protein', 'g'],
  ['carbs', 'Carbohydrates', 'g'],
  ['fat', 'Fat', 'g'],
  ['fiber', 'Fiber', 'g'],
  ['sodium', 'Sodium', 'mg'],
  ['sugar', 'Sugar', 'g'],
];

export default ({ resource, state }) => {
  state.sortColumn = 'name';
  state.sortDirection = 'ascending';
  state.nutritionId = new URLSearchParams(location.search).get('nutrition') ?? '';
  const dining = diningResource(resource);
  const nutrition = diningResource(resource, (api, signal) => api.getNutrition({ signal }));

  return {
    state: { dining, nutrition },
    computed: {
      rows() {
        const direction = this.sortDirection === 'ascending' ? 1 : -1;
        return (this.dining.value?.locations ?? []).map(location => {
          const cents = lowestListedPrice(location);
          return {
            id: location.id, name: location.name, building: location.building,
            status: diningAvailability(location), cents,
            price: cents === null ? 'Unavailable' : formatPrice(cents),
            href: diningInfoLink(location.id),
          };
        }).sort((a, b) => {
          if (this.sortColumn === 'price') {
            if (a.cents === null && b.cents !== null) return 1;
            if (a.cents !== null && b.cents === null) return -1;
            if (a.cents !== null && a.cents !== b.cents) return (a.cents - b.cents) * direction;
          }
          return (a.name.localeCompare(b.name) || (a.building ?? '').localeCompare(b.building ?? '')) *
            (this.sortColumn === 'name' ? direction : 1);
        });
      },
      nutritionOptions() {
        return (this.nutrition.value?.documents ?? []).flatMap(document => document.items.map(item => ({
          ...item, key: `${document.url}#${item.id}`, label: `${item.name} — ${document.title}`,
        })));
      },
      nutritionItem() {
        return this.nutritionOptions.find(item => item.key === this.nutritionId) ?? null;
      },
      nutrientRows() {
        const item = this.nutritionItem;
        if (!item) return [];
        return nutrients.map(([key, label, unit]) => ({
          key, label, amount: item.nutrition[key] == null ? 'Unavailable' : `${item.nutrition[key]} ${unit}`,
        }));
      },
    },
    actions: {
      sort(column) {
        this.sortDirection = this.sortColumn === column && this.sortDirection === 'ascending' ? 'descending' : 'ascending';
        this.sortColumn = column;
      },
      retryDining() {
        dining.retry();
      },
      retryNutrition() {
        nutrition.retry();
      },
    },
  };
};
