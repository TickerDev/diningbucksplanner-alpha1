import { diningAvailability, diningInfoLink, diningResource, formatPrice, lowestListedPrice } from '../js/dining-data.js';

const weekdayFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' });

function hoursLabel(intervals) {
  if (!intervals) return 'Unavailable';
  if (!intervals.length) return 'Closed';
  return intervals.map(({ type, open, close }) =>
    `${type === 'regular' ? '' : `${type}: `}${open}–${close}`).join(' · ');
}

export default ({ resource }) => {
  const locationId = new URLSearchParams(location.search).get('location');
  const dining = diningResource(resource);

  return {
    props: { view: { type: 'string', default: 'directory' } },
    state: { dining, descriptionExpanded: false, search: '', buildingFilter: '', openOnly: false },
    computed: {
      locations() {
        return (this.dining.value?.locations ?? []).map(location => {
          const { id, name, building } = location;
          const cents = lowestListedPrice(location);
          return {
            id, name, building, href: diningInfoLink(id),
            image: location.images?.[0],
            status: diningAvailability(location),
            price: cents === null ? 'Price unavailable' : formatPrice(cents),
          };
        });
      },
      buildings() {
        return [...new Set(this.locations.map(row => row.building).filter(Boolean))]
          .sort((a, b) => a.localeCompare(b));
      },
      filteredLocations() {
        const search = this.search.trim().toLocaleLowerCase();
        return this.locations.filter(row =>
          (!this.buildingFilter || row.building === this.buildingFilter) &&
          (!this.openOnly || row.status.state === 'open') &&
          `${row.name} ${row.building ?? ''}`.toLocaleLowerCase().includes(search));
      },
      selected() {
        const location = this.dining.value?.locations.find(item => item.id === locationId);
        if (!location) return null;

        const description = location.description?.trim() ?? '';
        const previewLimit = 180;
        const preview = description.length > previewLimit
          ? description.slice(0, previewLimit).replace(/\s+\S*$/, '')
          : description;
        const maps = new URL('https://www.google.com/maps/search/');
        maps.searchParams.set('api', '1');
        const mapQuery = [location.name, location.building, 'Texas Tech University, Lubbock, TX']
          .filter(Boolean).join(', ');
        maps.searchParams.set('query', mapQuery);
        const mapEmbed = new URL('https://www.google.com/maps');
        mapEmbed.searchParams.set('q', mapQuery);
        mapEmbed.searchParams.set('output', 'embed');

        return {
          ...location,
          description,
          descriptionPreview: preview,
          hasMoreDescription: preview.length < description.length,
          mapsUrl: maps.href,
          mapEmbedUrl: mapEmbed.href,
          status: diningAvailability(location),
          image: location.images?.[0],
          menus: location.menus?.map(menu => ({
            ...menu,
            items: menu.items.map(item => ({
              ...item,
              links: item.nutritionMatches?.map((match, index) => ({
                key: `${match.url}#${match.itemId}`,
                label: match.rotation ?? (item.nutritionMatches.length === 1 ? 'Nutrition' : `Nutrition record ${index + 1}`),
                href: `index.html?nutrition=${encodeURIComponent(`${match.url}#${match.itemId}`)}#campus-menu-nutrition`,
              })) ?? [],
            })),
          })),
          weeklyHours: Object.entries(location.hours ?? {}).map(([day, intervals]) => ({
            day: day[0].toUpperCase() + day.slice(1),
            label: hoursLabel(intervals),
          })),
          upcomingHours: (location.exceptions ?? []).filter(record => record.date >= location.availability?.date)
            .sort((a, b) => a.date.localeCompare(b.date))
            .map(record => ({
              ...record,
              // Separate the schedule reason from the published hours heading.
              title: record.title?.replace(/([a-z\d])\s*(Dining Hours)\s*$/i, '$1 | $2'),
              isToday: record.date === location.availability?.date,
              label: hoursLabel(record.hours),
              formattedDate: weekdayFormat.format(new Date(`${record.date}T00:00:00Z`)),
            })),
        };
      },
    },
    actions: {
      clearFilters() {
        this.search = '';
        this.buildingFilter = '';
        this.openOnly = false;
      },
      hideFailedImage(event) {
        event.target.hidden = true;
      },
      toggleDescription() {
        this.descriptionExpanded = !this.descriptionExpanded;
      },
      retry() {
        dining.retry();
      },
    },
  };
};
