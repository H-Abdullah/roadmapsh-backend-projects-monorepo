// import fs from 'fs';
import { setupEventListener } from "./eventsListener.js";
import { unitMultiplier } from "./unitMultiplier.js";

function convertUnit(data, category, currentValue, currentUnit, targetUnit) {
    const currentMultiplier = data[category][currentUnit];
    const targetMultiplier = data[category][targetUnit];

    const result = currentValue / currentMultiplier * targetMultiplier;
    return `${result.toFixed(2)}${targetUnit}`    
}

const unitCategory = 'length';
const currentValue = 30;
const currentUnit = 'km';
const targetUnit = 'm';

setupEventListener();
console.log(convertUnit(unitMultiplier, unitCategory, currentValue, currentUnit, targetUnit));
