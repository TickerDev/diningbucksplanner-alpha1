// Shared links for the navbar and footer.
const navigation = [
  {
    id: 'login',
    label: 'Login',
    href: 'login.html',
  },
  {
    id: 'home',
    label: 'Home',
    href: 'index.html',
  },
  {
    id: 'balance',
    label: 'Balance',
    href: 'balance.html',
  },
  {
    id: 'planner',
    label: 'Planner',
    href: 'planner.html',
  },
  {
    id: 'dining-info',
    label: 'Dining Info',
    href: 'dining-info.html',
  },
];

// Read the actual HTML filename; a directory URL opens index.html (Home).
const currentFile = location.pathname.split('/').pop() || 'index.html';
const activePage = navigation.find((item) => item.href === currentFile);

// Plain keeps the page label available to reactive bindings and component props.
const state = Plain.reactive({
  currentPage: activePage ? activePage.label : 'Home',
});

document.title = `${state.currentPage} | Your Dining Bucks Planner`;

// Each HTML page starts its own Plain app; ordinary links load a new document.
Plain.createApp({
  state,
  // Warm shared component files early; mounting reuses the HTML and behavior loads.
  preload: [
    'navbar-component',
    'footer-component',
  ],
  settings: { // Shared configuration available as settings.navigation in components.
    navigation,
  },
  base: new URL('../', document.currentScript.src).href, // Resolve component files from the project root.
  development: // Enable Plain's development diagnostics when running locally.
    location.hostname === 'localhost' || location.hostname === '127.0.0.1',
});
