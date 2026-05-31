import unitMultiplier from "../data/unitMultiplier"

export default function convertUnit(unitCategory, currentValue, currentUnit, targetUnit) {
    const currentUnitMultiplier = unitMultiplier[unitCategory][currentUnit];
    const targetUnitMultiplier = unitMultiplier[unitCategory][targetUnit];

    return currentValue / currentUnitMultiplier * targetUnitMultiplier;
}