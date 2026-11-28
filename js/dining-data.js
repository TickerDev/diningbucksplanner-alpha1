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

export function lowestListedPrice(location) {
  const prices = pricedItems(location).map(item => item.priceCents);
  return prices.length ? Math.min(...prices) : null;
}

export function diningAvailability(location) {
  const availability = location.availability;
  if (availability?.open === true) return { state: 'open', label: 'Scheduled open' };
  if (availability?.open !== false) return { state: 'unavailable', label: 'Hours unconfirmed' };

  const holidayClosure = availability.basis === 'holiday' && location.exceptions?.some(exception =>
    exception.date === availability.date && exception.kind === 'holiday' &&
    (exception.allClosed === true || exception.hours?.length === 0));
  return holidayClosure
    ? { state: 'holiday', label: 'Closed for the holiday' }
    : { state: 'closed', label: 'Scheduled closed' };
}

export function diningInfoLink(id) {
  return `dining-location.html?location=${encodeURIComponent(id)}`;
}
