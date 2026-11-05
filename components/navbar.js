// Plain calls the factory for each <navbar-component> to get its configuration.
export default () => ({
  props: { // Plain's props configuration describes values supplied by the parent page.
    page: { // Available as props.page in navbar.html.
      type: 'string', // Declares the expected type; Plain reports contract warnings in development mode.
      default: 'Home', // Used when the parent does not supply a page value.
    },
  },
});

// Each HTML page passes the app's currentPage into this prop with page="{{currentPage}}".
// When currentPage changes, Plain updates the prop and the navbar's bound content.
// The links load separate HTML documents using normal browser navigation.
