/**
 * HTTP or response-format error from the TTU Dining API.
 * Network and cancellation errors from fetch retain their original types.
 */
export class DiningApiError extends Error {
  constructor(message, { status, url, cause }) {
    super(message, { cause });
    this.name = 'DiningApiError';
    this.status = status;
    this.url = url;
  }
}

/**
 * Create a read-only browser client for a deployed TTU Dining API.
 * Pass the API origin or an absolute deployment base URL before /api/dining.
 */
export function createDiningApi({ baseUrl, fetcher = globalThis.fetch.bind(globalThis) } = {}) {
  const base = new URL(baseUrl);
  if (!['https:', 'http:'].includes(base.protocol) || base.username || base.password || base.search || base.hash) {
    throw new TypeError('Use an HTTP(S) dining API base URL without credentials, a query, or a fragment.');
  }
  base.pathname = base.pathname.replace(/\/+$/, '') + '/';

  async function get(path, { signal } = {}, validate) {
    const url = new URL(path, base).href;
    const response = await fetcher(url, {
      headers: { Accept: 'application/json' },
      credentials: 'omit',
      signal,
    });
    const details = { status: response.status, url };
    if (!response.ok) {
      throw new DiningApiError(`Dining API request failed (HTTP ${response.status}).`, details);
    }
    let data;
    try {
      data = await response.json();
    } catch (error) {
      if (signal?.aborted || error.name === 'AbortError') throw error;
      throw new DiningApiError('Dining API returned invalid JSON.', { ...details, cause: error });
    }
    if (!validate(data)) throw new DiningApiError('Dining API returned an unexpected response.', details);
    return data;
  }

  return {
    getHealth: options => get('health', options, data => data?.status === 'ok'),
    getDining: options => get('api/dining', options, data => Array.isArray(data?.locations)),
    getLocation(id, options) {
      if (typeof id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
        throw new TypeError('Use a location ID returned by the dining API.');
      }
      return get(`api/dining/${id}`, options, data => data?.id === id);
    },
    getCoverage: options => get('api/dining/coverage', options, data => Array.isArray(data?.locations)),
    getNutrition: options => get('api/dining/nutrition', options, data => Array.isArray(data?.documents)),
    getFreshPlateNutrition: options => get('api/dining/nutrition/fresh-plate', options, data => Array.isArray(data?.items)),
  };
}
