// Page-specific planner controls; the shared Plain app owns the navbar and footer.
(function() {
  const TOTAL_DAYS = 30; // October active days in calendar grid
  let selectedDay = 7;

  // Blank by default; user enters their own budget & expenses
  const dayData = {};

  // DOM Elements
  const budgetInput = document.getElementById('planner-budget');
  const valDailyAvg = document.getElementById('val-daily-avg');
  const valTotalSpent = document.getElementById('val-total-spent');
  const valRemaining = document.getElementById('val-remaining');

  const detailHeading = document.getElementById('detail-heading');
  const dayStatusPill = document.getElementById('day-status-pill');
  const planLocationInput = document.getElementById('plan-location');
  const planSpendInput = document.getElementById('plan-spend');
  const btnSaveDay = document.getElementById('btn-save-day');
  const btnClearDay = document.getElementById('btn-clear-day');
  const saveFeedback = document.getElementById('save-feedback');
  const arrowPosition = document.getElementById('arrow-position');

  const overallSwatch = document.getElementById('overall-swatch');
  const overallStatusText = document.getElementById('overall-status-text');
  const monthSelect = document.getElementById('calendar-month');
  const dayButtons = document.querySelectorAll('.calendar-day[data-day]');

  function getSuffix(d) {
    const n = parseInt(d, 10);
    if (n >= 11 && n <= 13) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  // Calculate and re-render entire state
  function recalculate() {
    const totalBudget = parseFloat(budgetInput.value) || 0;
    const dailyAvg = totalBudget > 0 ? (totalBudget / TOTAL_DAYS) : 0;

    // Update header metric
    valDailyAvg.textContent = totalBudget > 0 ? `$${dailyAvg.toFixed(2)} / day` : '$0.00 / day';

    let totalSpent = 0;

    // Update day button colors and tooltips
    dayButtons.forEach(btn => {
      const day = parseInt(btn.dataset.day, 10);
      const data = dayData[day];
      const hasData = data && data.amount !== undefined && data.amount !== '' && !isNaN(parseFloat(data.amount));

      btn.classList.remove('day-on', 'day-over');

      if (hasData) {
        const amount = parseFloat(data.amount);
        totalSpent += amount;

        if (totalBudget > 0) {
          // If spent > daily allowance -> RED; if spent <= daily allowance -> GREEN
          if (amount > dailyAvg) {
            btn.classList.add('day-over');
            btn.setAttribute('aria-label', `Oct ${day}: $${amount.toFixed(2)} at ${data.location || 'Dining'} (Over Budget)`);
          } else {
            btn.classList.add('day-on');
            btn.setAttribute('aria-label', `Oct ${day}: $${amount.toFixed(2)} at ${data.location || 'Dining'} (On Budget)`);
          }
        } else {
          // Budget not set yet: any spending > 0 is over budget
          if (amount > 0) {
            btn.classList.add('day-over');
            btn.setAttribute('aria-label', `Oct ${day}: $${amount.toFixed(2)} at ${data.location || 'Dining'} (Over Budget)`);
          } else {
            btn.classList.add('day-on');
            btn.setAttribute('aria-label', `Oct ${day}: $0.00 (On Budget)`);
          }
        }
      } else {
        // Blank by default: unlogged days stay clean/neutral
        btn.setAttribute('aria-label', `Oct ${day}: No spend logged`);
      }
    });

    // Metrics Banner
    valTotalSpent.textContent = `$${totalSpent.toFixed(2)}`;

    if (totalBudget > 0) {
      const remaining = totalBudget - totalSpent;
      valRemaining.textContent = `$${Math.abs(remaining).toFixed(2)}${remaining < 0 ? ' over' : ''}`;
      if (remaining >= 0) {
        valRemaining.className = 'metric-value highlight-green';
      } else {
        valRemaining.className = 'metric-value highlight-red';
      }
    } else {
      valRemaining.textContent = `$0.00`;
      valRemaining.className = 'metric-value';
    }

    // Overall budget swatch & text
    if (overallSwatch && overallStatusText) {
      overallSwatch.classList.remove('on-budget', 'over-budget', 'neutral');
      overallStatusText.classList.remove('text-green', 'text-red');

      if (totalBudget <= 0) {
        if (totalSpent > 0) {
          overallSwatch.classList.add('over-budget');
          overallStatusText.classList.add('text-red');
          overallStatusText.textContent = `Over Budget ($${totalSpent.toFixed(2)} spent with no budget)`;
        } else {
          overallSwatch.classList.add('neutral');
          overallStatusText.textContent = 'Enter budget to track';
        }
      } else {
        const remaining = totalBudget - totalSpent;
        if (totalSpent <= totalBudget) {
          overallSwatch.classList.add('on-budget');
          overallStatusText.classList.add('text-green');
          overallStatusText.textContent = `On Budget ($${remaining.toFixed(2)} remaining)`;
        } else {
          overallSwatch.classList.add('over-budget');
          overallStatusText.classList.add('text-red');
          overallStatusText.textContent = `Over Budget by $${Math.abs(remaining).toFixed(2)}`;
        }
      }
    }

    // Update detail card for currently selected day
    updateDetailCard(dailyAvg);
    updateArrowPosition();
  }

  function updateDetailCard(dailyAvg) {
    const month = monthSelect ? monthSelect.value : 'Oct';
    detailHeading.textContent = `For ${month} ${selectedDay}${getSuffix(selectedDay)}:`;

    const totalBudget = parseFloat(budgetInput.value) || 0;
    const data = dayData[selectedDay];
    const hasData = data && data.amount !== undefined && data.amount !== '' && !isNaN(parseFloat(data.amount));

    dayStatusPill.classList.remove('status-on', 'status-over', 'status-neutral');

    if (!hasData) {
      dayStatusPill.classList.add('status-neutral');
      dayStatusPill.textContent = 'Not Logged';
    } else {
      const amount = parseFloat(data.amount);
      if (totalBudget > 0 ? (amount > dailyAvg) : (amount > 0)) {
        dayStatusPill.classList.add('status-over');
        dayStatusPill.textContent = 'Over Budget';
      } else {
        dayStatusPill.classList.add('status-on');
        dayStatusPill.textContent = 'On Budget';
      }
    }
  }

  // Move arrow vertically to align with the selected day's button
  function updateArrowPosition() {
    const selectedBtn = document.querySelector(`.calendar-day[data-day="${selectedDay}"]`);
    const detailBox = document.querySelector('.day-detail-box');
    if (selectedBtn && arrowPosition && detailBox && window.innerWidth > 820) {
      const boxRect = detailBox.getBoundingClientRect();
      const btnRect = selectedBtn.getBoundingClientRect();
      const relativeY = (btnRect.top + btnRect.height / 2) - (boxRect.top + 36);
      const clampedY = Math.max(-10, Math.min(relativeY, boxRect.height - 20));
      arrowPosition.setAttribute('transform', `translate(0 ${clampedY})`);
    } else if (arrowPosition) {
      arrowPosition.removeAttribute('transform');
    }
  }

  // Select a day
  function selectDay(day) {
    selectedDay = day;
    dayButtons.forEach(btn => {
      if (parseInt(btn.dataset.day, 10) === day) {
        btn.classList.add('day-selected');
        btn.setAttribute('aria-current', 'date');
      } else {
        btn.classList.remove('day-selected');
        btn.removeAttribute('aria-current');
      }
    });

    const currentData = dayData[day];
    planLocationInput.value = (currentData && currentData.location) ? currentData.location : '';
    planSpendInput.value = (currentData && currentData.amount !== undefined && currentData.amount !== '') ? currentData.amount : '';

    const totalBudget = parseFloat(budgetInput.value) || 0;
    const dailyAvg = totalBudget > 0 ? (totalBudget / TOTAL_DAYS) : 0;
    updateDetailCard(dailyAvg);
    updateArrowPosition();
  }

  // Save spending for current day
  function saveCurrentDay() {
    const loc = planLocationInput.value.trim();
    const rawAmt = planSpendInput.value.trim();

    if (loc === '' && rawAmt === '') {
      delete dayData[selectedDay];
    } else {
      dayData[selectedDay] = {
        location: loc,
        amount: rawAmt === '' ? '' : (parseFloat(rawAmt) || 0)
      };
    }

    recalculate();

    // Flash save feedback
    if (saveFeedback) {
      saveFeedback.textContent = 'Saved!';
      saveFeedback.classList.add('visible');
      setTimeout(() => saveFeedback.classList.remove('visible'), 1600);
    }
  }

  // Clear spending for current day
  function clearCurrentDay() {
    delete dayData[selectedDay];
    planLocationInput.value = '';
    planSpendInput.value = '';

    recalculate();

    if (saveFeedback) {
      saveFeedback.textContent = 'Cleared!';
      saveFeedback.classList.add('visible');
      setTimeout(() => saveFeedback.classList.remove('visible'), 1600);
    }
  }

  // Attach Event Listeners
  dayButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const day = parseInt(btn.dataset.day, 10);
      selectDay(day);
    });
  });

  if (budgetInput) {
    budgetInput.addEventListener('input', recalculate);
  }

  if (planLocationInput) {
    planLocationInput.addEventListener('input', () => {
      const loc = planLocationInput.value.trim();
      const rawAmt = planSpendInput.value.trim();
      if (loc === '' && rawAmt === '') {
        delete dayData[selectedDay];
      } else {
        if (!dayData[selectedDay]) dayData[selectedDay] = { location: '', amount: '' };
        dayData[selectedDay].location = planLocationInput.value;
      }
    });
  }

  if (planSpendInput) {
    // Auto update on change/input for instant feedback
    planSpendInput.addEventListener('input', () => {
      const raw = planSpendInput.value.trim();
      if (raw === '' && (!planLocationInput.value || planLocationInput.value.trim() === '')) {
        delete dayData[selectedDay];
      } else if (raw !== '') {
        const amt = parseFloat(raw);
        if (!isNaN(amt)) {
          if (!dayData[selectedDay]) dayData[selectedDay] = { location: '', amount: '' };
          dayData[selectedDay].amount = amt;
          dayData[selectedDay].location = planLocationInput.value.trim();
        }
      } else {
        if (dayData[selectedDay]) dayData[selectedDay].amount = '';
      }
      recalculate();
    });
  }

  if (btnSaveDay) {
    btnSaveDay.addEventListener('click', saveCurrentDay);
  }

  if (btnClearDay) {
    btnClearDay.addEventListener('click', clearCurrentDay);
  }

  // Month selector change
  if (monthSelect) {
    monthSelect.addEventListener('change', () => {
      const totalBudget = parseFloat(budgetInput.value) || 0;
      const dailyAvg = totalBudget > 0 ? (totalBudget / TOTAL_DAYS) : 0;
      updateDetailCard(dailyAvg);
    });
  }

  // Month Navigation Buttons
  const prevBtn = document.getElementById('btn-prev-month');
  const nextBtn = document.getElementById('btn-next-month');
  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

  if (monthSelect) {
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const currentIdx = months.indexOf(monthSelect.value);
        if (currentIdx > 0) {
          monthSelect.value = months[currentIdx - 1];
          recalculate();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const currentIdx = months.indexOf(monthSelect.value);
        if (currentIdx < months.length - 1) {
          monthSelect.value = months[currentIdx + 1];
          recalculate();
        }
      });
    }
  }

  window.addEventListener('resize', updateArrowPosition);

  // Initial run - selects default day 7 with clean/blank form
  selectDay(7);
  recalculate();
})();
