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
    'dining-info-component',
  ],
  settings: { // Shared configuration available as settings.navigation in components.
    dates: {
      founded: 2022,
      today: new Date().getFullYear()
    },
    navigation,
  },
  base: new URL('../', document.currentScript.src).href, // Resolve component files from the project root.
  development: // Enable Plain's development diagnostics when running locally.
    location.hostname === 'localhost' || location.hostname === '127.0.0.1',
});

// --- Table Sorting Helper ---
window.sort = function (colIndex, isNumeric) {
  const tbody = document.querySelector('#t tbody') || document.querySelector('table tbody');
  if (!tbody) return;

  const isAscending = tbody.dataset.sortCol === String(colIndex) && tbody.dataset.sortDir === 'asc';
  tbody.dataset.sortCol = colIndex;
  tbody.dataset.sortDir = isAscending ? 'desc' : 'asc';

  const rows = Array.from(tbody.rows);

  rows.sort((rowA, rowB) => {
    const rawA = rowA.cells[colIndex]?.innerText.trim() || '';
    const rawB = rowB.cells[colIndex]?.innerText.trim() || '';

    if (isNumeric) {
      const valA = parseFloat(rawA.replace(/[^0-9.-]+/g, '')) || 0;
      const valB = parseFloat(rawB.replace(/[^0-9.-]+/g, '')) || 0;
      return isAscending ? valB - valA : valA - valB;
    }

    return isAscending ? rawB.localeCompare(rawA) : rawA.localeCompare(rawB);
  });

  tbody.append(...rows);
};

// --- Interactive Burn-Up Chart Engine ---
function updateSpendingGraph() {
  const budgetInput = document.getElementById('dining-budget');
  const spendingInput = document.getElementById('planned-spending');

  const lineProj = document.getElementById('line-projected');
  const pointFinish = document.getElementById('point-finish');
  const gaugeFill = document.getElementById('gauge-spent-fill');
  const labelBudget = document.getElementById('label-max-budget');
  const statusText = document.getElementById('status-tag-text');
  const statusBg = document.getElementById('status-tag-bg');

  if (!budgetInput || !spendingInput || !lineProj) return;

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
  const budget = parseFloat(budgetInput.value) || 2200;
  const dailySpend = parseFloat(spendingInput.value) || 0;

  if (labelBudget) labelBudget.textContent = `$${budget.toLocaleString()}`;

  const targetRate = budget / totalDays;
  const projectedTotal = dailySpend * totalDays;

  // 1. Calculate trajectory line and intersection
  let xTarget = xMax;
  let yTarget = yCeil;
  let isOverBudget = false;

  if (dailySpend <= 0) {
    // Zero spending: flat line at $0
    xTarget = xMax;
    yTarget = yBase;
  } else if (projectedTotal > budget) {
    // Budget is exceeded before the end of semester
    isOverBudget = true;
    const daysUntilEmpty = budget / dailySpend;
    const progress = Math.max(0, Math.min(1, daysUntilEmpty / totalDays));
    xTarget = xOrigin + (plotWidth * progress);
    yTarget = yCeil; // Reaches full budget ceiling early
  } else {
    // Budget survives the full semester
    const spendFraction = projectedTotal / budget;
    xTarget = xMax;
    yTarget = yBase - (plotHeight * spendFraction);
  }

  // Update line and terminal dot
  lineProj.setAttribute('x1', xOrigin);
  lineProj.setAttribute('y1', yBase);
  lineProj.setAttribute('x2', xTarget);
  lineProj.setAttribute('y2', yTarget);

  pointFinish.setAttribute('cx', xTarget);
  pointFinish.setAttribute('cy', yTarget);

  const themeColor = isOverBudget ? '#D32F2F' : '#2E7D32';
  lineProj.setAttribute('stroke', themeColor);
  pointFinish.setAttribute('fill', themeColor);

  // 2. Update Y-Axis Vertical Balance Bar
  const fillFraction = Math.min(1, projectedTotal / budget);
  const fillHeight = gaugeTotalHeight * fillFraction;
  const fillY = (gaugeTop + gaugeTotalHeight) - fillHeight;

  gaugeFill.setAttribute('y', fillY);
  gaugeFill.setAttribute('height', fillHeight);
  gaugeFill.setAttribute('fill', isOverBudget ? '#EF5350' : '#81C784');

  // 3. Update Status Banner
  if (statusText && statusBg) {
    if (dailySpend <= 0) {
      statusText.textContent = "Enter daily spend to project";
      statusText.setAttribute('fill', '#555555');
    } else if (isOverBudget) {
      const daysLeft = Math.floor(budget / dailySpend);
      statusText.textContent = `Alert: Budget empty on Day ${daysLeft}!`;
      statusText.setAttribute('fill', '#D32F2F');
    } else {
      const surplus = budget - projectedTotal;
      statusText.textContent = `On Track! +$${surplus.toFixed(0)} leftover`;
      statusText.setAttribute('fill', '#2E7D32');
    }
  }
}

// Bind live events
document.addEventListener('DOMContentLoaded', () => {
  const bInput = document.getElementById('dining-budget');
  const sInput = document.getElementById('planned-spending');

  if (bInput && sInput) {
    bInput.addEventListener('input', updateSpendingGraph);
    sInput.addEventListener('input', updateSpendingGraph);
    updateSpendingGraph();
  }
});