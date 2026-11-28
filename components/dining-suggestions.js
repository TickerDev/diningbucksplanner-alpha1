import { diningInfoLink, diningResource, pricedItems } from '../js/dining-data.js';

export default ({ resource }) => {
  const dining = diningResource(resource);

  return {
    state: { dining },
    computed: {
      suggestions() {
        return (this.dining.value?.locations ?? []).flatMap(location => {
          const item = pricedItems(location)[0];
          if (!item) return [];
          return [{
            id: location.id, name: location.name, building: location.building,
            item: item.name, price: item.price, image: location.images?.[0],
            href: diningInfoLink(location.id),
          }];
        }).slice(0, 3);
      },
    },
    actions: {
      hideFailedImage(event) {
        event.target.hidden = true;
      },
      retry() {
        dining.retry();
      },
    },
  };
};
