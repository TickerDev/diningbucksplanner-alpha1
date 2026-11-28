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
const navigationFile = currentFile === 'dining-location.html' ? 'dining-info.html' : currentFile;
const activePage = navigation.find((item) => item.href === navigationFile);
const appBase = new URL('../', document.currentScript.src);

if (currentFile === 'dining-info.html' && new URLSearchParams(location.search).has('location')) {
  const detail = new URL('dining-location.html', appBase);
  detail.search = location.search;
  detail.hash = location.hash;
  location.replace(detail.href);
}

// This client-set cookie only controls the prototype's interface.
const signInCookie = 'dining-bucks-authenticated=true';
const secure = appBase.protocol === 'https:' ? '; Secure' : '';
const signInCookieOptions = `Path=${appBase.pathname}; SameSite=Lax${secure}`;

function isSignedIn() {
  try {
    return document.cookie.split(';').some((cookie) => cookie.trim() === signInCookie);
  } catch {
    return false;
  }
}

// Plain keeps the page label available to reactive bindings and component props.
const state = Plain.reactive({
  currentPage: activePage
    ? activePage.label
    : (currentFile === 'signup.html' ? 'Sign Up' : 'Home'),
  signedIn: isSignedIn(),
});

document.addEventListener('click', (event) => {
  if (event.target.closest('[data-log-out]')) {
    document.cookie = `${signInCookie}; ${signInCookieOptions}; Max-Age=0`;
    location.assign(new URL('login.html', appBase));
    return;
  }

  const openMenu = document.querySelector('.profile-menu[open]');
  if (openMenu && !openMenu.contains(event.target)) openMenu.open = false;
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const openMenu = event.target.closest('.profile-menu[open]');
  if (!openMenu) return;
  openMenu.open = false;
  openMenu.querySelector('summary').focus();
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted) state.signedIn = isSignedIn();
});

const pageTitle = currentFile === 'dining-location.html' ? 'Dining Location' : state.currentPage;
document.title = `${pageTitle} | Your Dining Bucks Planner`;

// Each HTML page starts its own Plain app; ordinary links load a new document.
const app = Plain.createApp({
  state,
  // Known modules can load directly without a discovery request.
  components: {
    'form-field-component': { behavior: false },
    'calendar-frame-component': { behavior: false },
    'financial-statistics-component': { behavior: false },
    'chart-frame-component': { behavior: false },
    'table-frame-component': { behavior: false },
    'page-heading-component': { behavior: './page-heading.js' },
    'loading-skeleton-component': { behavior: false },
    'navbar-component': { behavior: './navbar.js' },
    'footer-component': { behavior: './footer.js' },
    'dining-comparison-component': { behavior: './dining-comparison.js' },
    'dining-suggestions-component': { behavior: './dining-suggestions.js' },
    'dining-info-component': { behavior: './dining-info.js' },
    'dining-signup-component': { behavior: false },
  },
  // Warm the components used by this page.
  preload: [
    'navbar-component',
    ...(currentFile === 'login.html' || currentFile === 'signup.html' ? [] : ['footer-component']),
    ...(activePage?.id === 'dining-info' ? ['dining-info-component'] : []),
  ],
  settings: { // Shared configuration available as settings.navigation in components.
    dates: {
      founded: 2022,
      today: new Date().getFullYear()
    },
    navigation,
  },
  base: appBase.href, // Resolve component files from the project root.
  development: // Enable Plain's development diagnostics when running locally.
    location.hostname === 'localhost' || location.hostname === '127.0.0.1',
});

// --- Interactive Burn-Up Chart Engine ---
let projectionFrame;

function drawProjection(line, point, gauge, x, y, height, gaugeBottom, animate) {
  cancelAnimationFrame(projectionFrame);
  const start = [Number(line.getAttribute('x2')), Number(line.getAttribute('y2')),
    Number(gauge.getAttribute('height'))];
  const end = [x, y, height];

  function draw(progress) {
    const [nextX, nextY, nextHeight] = end.map((value, index) =>
      start[index] + (value - start[index]) * progress);
    line.setAttribute('x2', nextX);
    line.setAttribute('y2', nextY);
    point.setAttribute('x1', nextX);
    point.setAttribute('x2', nextX);
    point.setAttribute('y1', nextY);
    point.setAttribute('y2', nextY);
    gauge.setAttribute('y', gaugeBottom - nextHeight);
    gauge.setAttribute('height', nextHeight);
  }

  if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches || end.every((value, index) => value === start[index])) {
    draw(1);
    return;
  }

  const started = performance.now();
  function tick(now) {
    const progress = Math.max(0, Math.min((now - started) / 190, 1));
    draw(1 - (1 - progress) ** 3);
    if (progress < 1) projectionFrame = requestAnimationFrame(tick);
  }
  projectionFrame = requestAnimationFrame(tick);
}
const projectionAxisMoney = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});
const projectionCompactMoney = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});

function formatProjectionTick(amount) {
  return amount >= 10000 && amount < 1e15
    ? projectionCompactMoney.format(amount)
    : amount >= 1e15 ? `$${amount.toExponential(1)}` : projectionAxisMoney.format(amount);
}

const projectionBalanceMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function showProjectionStatus(state, label, value = '') {
  const status = document.getElementById('status-tag-text');
  const amount = document.getElementById('projection-status-value');
  status.dataset.state = state;
  document.getElementById('projection-status-label').textContent = label;
  amount.textContent = value;
  amount.hidden = !value;
}

function updateSpendingGraph(animate = true) {
  const budgetInput = document.getElementById('dining-budget');
  const spendingInput = document.getElementById('planned-spending');

  const lineProj = document.getElementById('line-projected');
  const pointFinish = document.getElementById('point-finish');
  const gaugeFill = document.getElementById('gauge-spent-fill');
  const labelBudget = document.getElementById('label-max-budget');
  const statusText = document.getElementById('status-tag-text');
  const chartCard = statusText?.closest('.chart-card');

  if (!budgetInput || !spendingInput || !lineProj || !pointFinish || !gaugeFill || !chartCard) return;

  // Configuration Constants matching SVG ViewBox
  const totalDays = 112;      // 16 weeks * 7 days
  const xOrigin = 55.0;       // Left origin of plot area (Day 0)
  const xMax = 330.0;         // Right border of plot area (Day 112)
  const yBase = 190.0;        // Bottom baseline ($0 spent)
  const yCeil = 20.0;         // Top ceiling (Budget limit reached)
  const plotWidth = xMax - xOrigin;
  const plotHeight = yBase - yCeil;

  const gaugeTop = 20.0;
  const gaugeTotalHeight = 170.0;

  // Retrieve user inputs
  const budget = budgetInput.value === '' ? 2200 : budgetInput.valueAsNumber;
  const dailySpend = spendingInput.value === '' ? 0 : spendingInput.valueAsNumber;
  const projectedSpend = dailySpend * totalDays;
  if (!budgetInput.validity.valid || !spendingInput.validity.valid ||
      !Number.isFinite(budget) || !Number.isFinite(projectedSpend)) {
    showProjectionStatus('invalid', 'Enter valid, nonnegative amounts');
    return;
  }

  if (labelBudget) labelBudget.textContent = projectionAxisMoney.format(budget);
  document.getElementById('budget-axis-max').textContent = formatProjectionTick(budget);
  document.getElementById('budget-axis-mid').textContent = formatProjectionTick(budget / 2);
  document.getElementById('line-target').setAttribute('y2', budget > 0 ? yCeil : yBase);

  // Compare in cents when the values fit, so exact-budget projections stay exact.
  const budgetCents = Math.round(budget * 100);
  const dailyCents = Math.round(dailySpend * 100);
  const useCents = Number.isSafeInteger(budgetCents) && Number.isSafeInteger(dailyCents * totalDays);
  const available = useCents ? budgetCents : budget;
  const daily = useCents ? dailyCents : dailySpend;
  const projectedTotal = daily * totalDays;

  // 1. Calculate trajectory line and intersection
  let xTarget = xMax;
  let yTarget = yCeil;
  let isOverBudget = false;

  if (dailySpend <= 0) {
    // Zero spending: flat line at $0
    xTarget = xMax;
    yTarget = yBase;
  } else if (projectedTotal > available) {
    // Budget is exceeded before the end of semester
    isOverBudget = true;
    const daysUntilEmpty = available / daily;
    const progress = Math.max(0, Math.min(1, daysUntilEmpty / totalDays));
    xTarget = xOrigin + (plotWidth * progress);
    yTarget = yCeil; // Reaches full budget ceiling early
  } else {
    // Budget survives the full semester
    const spendFraction = projectedTotal / available;
    xTarget = xMax;
    yTarget = yBase - (plotHeight * spendFraction);
  }

  // The displayed trajectory, endpoint and gauge share one animation.
  const fillFraction = budget > 0 ? Math.min(1, projectedTotal / available) : Number(dailySpend > 0);
  drawProjection(lineProj, pointFinish, gaugeFill, xTarget, yTarget,
    gaugeTotalHeight * fillFraction, gaugeTop + gaugeTotalHeight, animate);
  chartCard.classList.toggle('is-over-budget', isOverBudget);

  if (dailySpend <= 0) {
    showProjectionStatus('neutral', 'Enter daily spend to project');
  } else if (isOverBudget) {
    const daysLeft = Math.floor(available / daily);
    showProjectionStatus('over', 'Projected budget depletion', `Day ${daysLeft}`);
  } else {
    const surplus = (available - projectedTotal) / (useCents ? 100 : 1);
    showProjectionStatus('on', 'Projected balance after 112 days', projectionBalanceMoney.format(surplus));
  }
}

// Bind live events
app.ready().then(() => {
  const loginForm = document.getElementById('login-form');
  loginForm?.addEventListener('submit', () => {
    try {
      document.cookie = `${signInCookie}; ${signInCookieOptions}`;
    } catch {
      // Let the form open Balance even when cookies are unavailable.
    }
    loginForm.reset();
  });

  const bInput = document.getElementById('dining-budget');
  const sInput = document.getElementById('planned-spending');

  if (bInput && sInput) {
    const updateFromInput = () => updateSpendingGraph();
    bInput.addEventListener('input', updateFromInput);
    sInput.addEventListener('input', updateFromInput);
    updateSpendingGraph(false);
  }
});
