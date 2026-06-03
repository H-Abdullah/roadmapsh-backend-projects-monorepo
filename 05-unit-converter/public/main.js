import setupEventListener from "./scripts/eventsListener.js";
import formatResult from "./utils/format-result.js";

const form = document.querySelector('form');

setupEventListener();

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();

        const unitCategory = ev.target.dataset.category;
        const currentValue = Number(ev.target.querySelector('#current-value').value);
        const currentUnit = ev.target.querySelector('#current-unit').value;
        const targetUnit = ev.target.querySelector('#target-unit').value;

        const response = await fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                unitCategory: unitCategory,
                currentValue: currentValue,
                currentUnit: currentUnit,
                targetUnit: targetUnit,
            }),
        })

        if (!response.ok) {
            console.log(`error: ${response.status}`);
            return
        }

        const data = await response.json();

        const resultSpan = ev.target.querySelector('.form-result > span');
        const formattedResult = formatResult(data.result);
        resultSpan.textContent = formattedResult + targetUnit;
    })
})