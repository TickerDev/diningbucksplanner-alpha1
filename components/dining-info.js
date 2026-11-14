/**
 * Plain component factory for the Dining Info view.
 * Plain automatically probes this file when <dining-info-component> is registered.
 * Working JavaScript implementation is not required at this stage.
 */
export default () => ({
  state: {
    selectedLocation: '23 at Sneed',
  },
  actions: {
    selectLocation(name) {
      this.selectedLocation = name;
    },
  },
});
