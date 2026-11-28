import { createDiningApi } from './dining-api.js';

// Public HTTPS base URL for the separately deployed dining API.
const diningApiBaseUrl = 'https://ttudiningapiunofficial.dorelboim.com';

export function diningClient() {
  return createDiningApi({ baseUrl: diningApiBaseUrl });
}

export function diningResource(resource, load = (api, signal) => api.getDining({ signal })) {
  return resource(() => true, (_, { signal }) => load(diningClient(), signal), {
    initialValue: null,
    onError() {},
  });
}

const dollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
export const formatPrice = cents => dollars.format(cents / 100);

export function pricedItems(location) {
  return (location.menus ?? []).flatMap(menu => menu.items).filter(item =>
    Number.isSafeInteger(item.priceCents) && item.priceCents >= 0 && !item.priceUnit);
}

export function availabilityLabel(location) {
  return location.availability?.open === true ? 'Scheduled open' :
    location.availability?.open === false ? 'Scheduled closed' : 'Hours unconfirmed';
}

export function diningInfoLink(id) {
  return `dining-location.html?location=${encodeURIComponent(id)}`;
}
