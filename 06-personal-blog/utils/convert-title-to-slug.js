export default function convertTitleToSlug(title) {
    const lowerCase = title.toLowerCase();
    const trimmedText = lowerCase.trim();
    const splitToArr = trimmedText.split(" ");
    const result = splitToArr.join("-");

    return result;
}