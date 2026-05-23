import fs from 'fs';

function getMultiplierValues() {
    try {
        const data = fs.readFileSync('measurement_multiplier.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

const data = getMultiplierValues()
let category = 'length';
let current_value = 1;
let current_unit = 'm';
let current_multiplier = data[category][current_unit];
let target_value;
let target_unit = 'cm';
let target_multiplier = data[category][target_unit];

function unitConverter(current_value, current_multiplier, target_multiplier, target_unit) {
    const result = current_value / current_multiplier * target_multiplier;
    return `${result.toFixed(2)}${target_unit}`
}

target_value = unitConverter(current_value, current_multiplier, target_multiplier, target_unit);

console.log(target_value);
