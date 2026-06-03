export default function formatResult(value) {
    if (Math.abs(value - Math.round(value)) < 1e-10) {
        return Math.round(value);
    }
    return parseFloat(value.toFixed(2));
}