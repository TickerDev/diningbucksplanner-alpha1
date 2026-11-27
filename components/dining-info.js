/**
 * Dining Info Component
 * Provides state and actions for campus dining locations, operating hours,
 * route maps, and campus identity for Texas Tech University.
 */
export default () => ({
  state: {
    selectedLocationId: '23-at-sneed',
    arrowDownSrc: 'assets/arrow-down.svg',
    arrowRightSrc: 'assets/arrow-right.svg',
    daysOfWeek: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    locations: [
      {
        id: '23-at-sneed',
        name: '23 at Sneed',
        building: '@Sneed Hall',
        openHours: ['7am', '7am', '7am', '7am', '7am', '10am', '10am'],
        closeHours: ['9pm', '9pm', '9pm', '9pm', '9pm', '8pm', '8pm'],
      },
      {
        id: 'boars-head-deli',
        name: "Boar's Head Deli",
        building: '@Student Union Building',
        openHours: ['8am', '8am', '8am', '8am', '8am', '11am', 'Closed'],
        closeHours: ['8pm', '8pm', '8pm', '8pm', '5pm', '4pm', 'Closed'],
      },
      {
        id: 'the-break',
        name: 'The Break',
        building: '@Student Union Building',
        openHours: ['7:30am', '7:30am', '7:30am', '7:30am', '7:30am', '10am', '11am'],
        closeHours: ['9pm', '9pm', '9pm', '9pm', '7pm', '6pm', '6pm'],
      },
      {
        id: 'burkhart-cafe',
        name: 'Burkhart Cafe',
        building: '@Burkhart Center',
        openHours: ['8am', '8am', '8am', '8am', '8am', 'Closed', 'Closed'],
        closeHours: ['3pm', '3pm', '3pm', '3pm', '2pm', 'Closed', 'Closed'],
      },
      {
        id: 'chick-fil-a-sub',
        name: 'Chick-fil-A',
        building: '@Student Union Building',
        openHours: ['7:30am', '7:30am', '7:30am', '7:30am', '7:30am', '10am', 'Closed'],
        closeHours: ['8pm', '8pm', '8pm', '8pm', '7pm', '6pm', 'Closed'],
      },
      {
        id: 'chick-fil-a-rawls',
        name: 'Chick-fil-A',
        building: '@Rawls CoB',
        openHours: ['7:30am', '7:30am', '7:30am', '7:30am', '7:30am', 'Closed', 'Closed'],
        closeHours: ['5pm', '5pm', '5pm', '5pm', '2pm', 'Closed', 'Closed'],
      },
    ],
  },
  actions: {
    toggleLocation(locationId) {
      this.selectedLocationId =
        this.selectedLocationId === locationId ? null : locationId;
    },
  },
});
