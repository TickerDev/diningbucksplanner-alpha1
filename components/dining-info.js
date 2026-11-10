/**
 * Dining Info Component
 * Provides state and actions for campus dining locations, operating hours,
 * route maps, and campus identity for Texas Tech University.
 */
export default () => ({
  state: {
    selectedLocationId: '23-at-sneed',
    arrowDownSrc: 'assets/dining-info/arrow-down.svg',
    arrowRightSrc: 'assets/dining-info/arrow-right.svg',
    daysOfWeek: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    locations: [
      {
        id: '23-at-sneed',
        name: '23 at Sneed',
        building: '@Sneed Hall',
        openHours: ['7am', '7am', '7am', '7am', '7am', '10am', '10am'],
        closeHours: ['9pm', '9pm', '9pm', '9pm', '9pm', '8pm', '8pm'],
        mapImage: 'assets/dining-info/map.png',
        mapAlt: 'Walking directions map to 23 at Sneed at Sneed Hall (6 min, 0.3 miles)',
        mapCaption: 'Walking route from current location to Sneed Hall',
      },
      {
        id: 'boars-head-deli',
        name: "Boar's Head Deli",
        building: '@Student Union Building',
        openHours: ['8am', '8am', '8am', '8am', '8am', '11am', 'Closed'],
        closeHours: ['8pm', '8pm', '8pm', '8pm', '5pm', '4pm', 'Closed'],
        mapImage: 'assets/dining-info/map.png',
        mapAlt: "Walking directions map to Boar's Head Deli at Student Union Building",
        mapCaption: 'Walking route to Student Union Building',
      },
      {
        id: 'the-break',
        name: 'The Break',
        building: '@Student Union Building',
        openHours: ['7:30am', '7:30am', '7:30am', '7:30am', '7:30am', '10am', '11am'],
        closeHours: ['9pm', '9pm', '9pm', '9pm', '7pm', '6pm', '6pm'],
        mapImage: 'assets/dining-info/map.png',
        mapAlt: 'Walking directions map to The Break at Student Union Building',
        mapCaption: 'Walking route to Student Union Building',
      },
      {
        id: 'burkhart-cafe',
        name: 'Burkhart Cafe',
        building: '@Burkhart Center',
        openHours: ['8am', '8am', '8am', '8am', '8am', 'Closed', 'Closed'],
        closeHours: ['3pm', '3pm', '3pm', '3pm', '2pm', 'Closed', 'Closed'],
        mapImage: 'assets/dining-info/map.png',
        mapAlt: 'Walking directions map to Burkhart Cafe at Burkhart Center',
        mapCaption: 'Walking route to Burkhart Center',
      },
      {
        id: 'chick-fil-a-sub',
        name: 'Chick-fil-A',
        building: '@Student Union Building',
        openHours: ['7:30am', '7:30am', '7:30am', '7:30am', '7:30am', '10am', 'Closed'],
        closeHours: ['8pm', '8pm', '8pm', '8pm', '7pm', '6pm', 'Closed'],
        mapImage: 'assets/dining-info/map.png',
        mapAlt: 'Walking directions map to Chick-fil-A at Student Union Building',
        mapCaption: 'Walking route to Student Union Building',
      },
      {
        id: 'chick-fil-a-rawls',
        name: 'Chick-fil-A',
        building: '@Rawls CoB',
        openHours: ['7:30am', '7:30am', '7:30am', '7:30am', '7:30am', 'Closed', 'Closed'],
        closeHours: ['5pm', '5pm', '5pm', '5pm', '2pm', 'Closed', 'Closed'],
        mapImage: 'assets/dining-info/map.png',
        mapAlt: 'Walking directions map to Chick-fil-A at Rawls College of Business',
        mapCaption: 'Walking route to Rawls College of Business',
      },
    ],
  },
  computed: {
    selectedLocation() {
      return (
        this.locations.find((item) => item.id === this.selectedLocationId) ||
        this.locations[0]
      );
    },
  },
  actions: {
    toggleLocation(locationId) {
      this.selectedLocationId =
        this.selectedLocationId === locationId ? null : locationId;
    },
  },
});
