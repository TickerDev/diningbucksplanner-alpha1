app.ready().then(() => {
  const theme = getComputedStyle(document.documentElement);
  const color = (token) => theme.getPropertyValue(token).trim();
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dailyTarget = 10.50;
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weeks = [
    { id: 'last-week', spending: [8, 12, 9, 6.5, 15, 9, 9] },
    { id: 'this-week', spending: [11, 8, 6, 12, null, null, null] },
  ];

  const scaleStep = 5;
  const largestAmount = Math.max(dailyTarget, ...weeks.flatMap(week => week.spending));
  const scaleMax = (Math.floor(largestAmount / scaleStep) + 1) * scaleStep;
  const formatAmount = amount => `${amount.toFixed(2)} Dining Bucks`;

  for (const { id, spending } of weeks) {
    const canvas = document.getElementById(id);
    const summary = document.getElementById(`${id}-summary`);
    if (!canvas || !summary) continue;

    const recorded = spending.filter((amount) => amount !== null);
    const total = recorded.reduce((sum, amount) => sum + amount, 0);
    const difference = dailyTarget * recorded.length - total;
    const status = difference === 0 ? 'on target' : `${Math.abs(difference).toFixed(2)} ${difference > 0 ? 'under' : 'over'} target`;
    const dailyTotals = spending.map((amount, day) => `${weekdays[day]}: ${amount === null ? 'no spending recorded' : amount.toFixed(2)}`);
    const spent = document.createElement('strong');
    spent.className = 'weekly-spent';
    spent.textContent = `${formatAmount(total)} spent`;
    const comparison = document.createElement('span');
    comparison.className = 'weekly-target';
    comparison.textContent = status;
    const breakdown = document.createElement('span');
    breakdown.className = 'weekly-breakdown';
    breakdown.textContent = `${dailyTotals.join(', ')}.`;
    summary.replaceChildren(spent, ' · ', comparison, '. ', breakdown);

    if (typeof Chart !== 'function') {
      canvas.hidden = true;
      continue;
    }

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: weekdays,
        datasets: [
          {
            type: 'line',
            label: 'Daily target',
            data: weekdays.map(() => dailyTarget),
            borderColor: color('--muted'),
            borderDash: [5, 4],
            borderWidth: 2,
            pointRadius: 0,
          },
          {
            label: 'Sample spending',
            data: spending,
            backgroundColor: spending.map((amount) => color(amount > dailyTarget ? '--negative' : '--positive')),
            borderRadius: 4,
            maxBarThickness: 40,
          },
        ],
      },
      options: {
        animation: reduceMotion ? false : { duration: 240 },
        font: { family: theme.fontFamily },
        color: color('--muted-strong'),
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { labels: { color: color('--ink'), boxWidth: 16, boxHeight: 8 } },
          tooltip: {
            callbacks: {
              label: ({ dataset, parsed }) => `${dataset.label}: ${formatAmount(parsed.y)}`,
              afterBody: items => spending[items[0]?.dataIndex] === null ? 'No spending recorded' : '',
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { autoSkip: false, maxRotation: 0, callback: index => weekdays[index].slice(0, 3) },
          },
          y: {
            min: 0, max: scaleMax,
            ticks: { stepSize: scaleStep },
            grid: { color: color('--border') },
            title: { display: true, text: 'Dining Bucks' },
          },
        },
      },
    });
  }
});
