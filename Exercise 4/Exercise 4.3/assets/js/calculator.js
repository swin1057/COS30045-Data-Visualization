document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calculator-form');
  const wattageInput = document.getElementById('wattage');
  const hoursInput = document.getElementById('hours');
  const rateInput = document.getElementById('rate');

  const errorBox = document.getElementById('calc-error');
  const resultsBox = document.getElementById('calc-results');

  const dailyKwhEl = document.getElementById('res-daily-kwh');
  const monthlyKwhEl = document.getElementById('res-monthly-kwh');
  const yearlyCostEl = document.getElementById('res-yearly-cost');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculateEnergy();
  });

  // Real-time calculation on input change
  form.addEventListener('input', () => {
    calculateEnergy();
  });

  function calculateEnergy() {
    const wattage = parseFloat(wattageInput.value);
    const hours = parseFloat(hoursInput.value);
    const rate = parseFloat(rateInput.value);

    // Input Validation
    if (isNaN(wattage) || wattage <= 0 || isNaN(hours) || hours <= 0 || hours > 24 || isNaN(rate) || rate < 0) {
      errorBox.classList.remove('d-none');
      resultsBox.classList.add('d-none');
      errorBox.textContent = 'Please enter valid positive values (Hours per day must be between 0.1 and 24).';
      return;
    }

    errorBox.classList.add('d-none');

    // Calculation Logic
    const dailyKwh = (wattage * hours) / 1000;
    const monthlyKwh = dailyKwh * 30.4375; // Average days in month
    const yearlyKwh = dailyKwh * 365;
    const yearlyCost = yearlyKwh * (rate / 100);

    // Dynamic UI Update
    dailyKwhEl.textContent = `${dailyKwh.toFixed(2)} kWh`;
    monthlyKwhEl.textContent = `${monthlyKwh.toFixed(2)} kWh`;
    yearlyCostEl.textContent = `$${yearlyCost.toFixed(2)} AUD`;

    resultsBox.classList.remove('d-none');
  }
});