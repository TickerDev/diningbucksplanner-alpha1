/** Frontend-only until the project has an authentication service. */
export default () => ({
  state: { message: '' },
  actions: {
    login() {
      // Never persist credentials or simulate an authenticated session.
      this.$refs.password.value = '';
      this.message = 'Sign-in isn’t connected yet. An authentication service is needed to log in.';
    },
    continueWithEraider() {
      this.message = 'eRaider sign-in isn’t connected yet. The university sign-in integration needs to be configured.';
    },
    signUp() {
      this.message = 'Registration isn’t connected yet. Account creation will be available once an authentication service is configured.';
    },
  },
});
