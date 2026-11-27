{
  const theme = getComputedStyle(document.documentElement);
  const color = (token) => theme.getPropertyValue(token).trim();
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dailyTarget = 10.50;
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weeks = [
    { id: 'last-week', spending: [8, 12, 9, 6.5, 15, 9, 9] },
    { id: 'this-week', spending: [11, 8, 6, 12, null, null, null] },
  ];

  for (const { id, spending } of weeks) {
    const canvas = document.getElementById(id);
    const summary = document.getElementById(`${id}-summary`);
    if (!canvas || !summary) continue;

    const recorded = spending.filter((amount) => amount !== null);
    const total = recorded.reduce((sum, amount) => sum + amount, 0);
    const difference = dailyTarget * recorded.length - total;
    const status = difference === 0 ? 'on target' : `${Math.abs(difference).toFixed(2)} ${difference > 0 ? 'under' : 'over'} target`;
    const dailyTotals = spending.map((amount, day) => `${weekdays[day]}: ${amount === null ? 'no spending recorded' : amount.toFixed(2)}`);
    summary.textContent = `${total.toFixed(2)} Dining Bucks spent, ${status}. ${dailyTotals.join(', ')}.`;

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
            label: 'Spent',
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
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: color('--border') }, title: { display: true, text: 'Dining Bucks' } },
        },
      },
    });
  }
}
