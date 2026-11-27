import { availabilityLabel, diningResource } from '../js/dining-data.js';

const weekdayFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' });

function hoursLabel(intervals) {
  if (!intervals) return 'Unavailable';
  if (!intervals.length) return 'Closed';
  return intervals.map(({ type, open, close }) =>
    `${type === 'regular' ? '' : `${type}: `}${open}–${close}`).join(' · ');
}

export default ({ resource, state }) => {
  state.selectedLocationId = new URLSearchParams(location.search).get('location');
  const dining = diningResource(resource);

  return {
    state: {
      dining,
      arrowDownSrc: 'assets/arrow-down.svg',
      arrowRightSrc: 'assets/arrow-right.svg',
    },
    computed: {
      locations() {
        return this.dining.value?.locations ?? [];
      },
      selected() {
        const location = this.locations.find(item => item.id === this.selectedLocationId);
        if (!location) return null;
        return {
          ...location,
          status: availabilityLabel(location),
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
              ...record, label: hoursLabel(record.hours),
              formattedDate: weekdayFormat.format(new Date(`${record.date}T00:00:00Z`)),
            })),
        };
      },
    },
    actions: {
      toggleLocation(id) {
        this.selectedLocationId = this.selectedLocationId === id ? null : id;
      },
      retry() {
        dining.retry();
      },
    },
  };
};
