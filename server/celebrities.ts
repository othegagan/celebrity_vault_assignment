export async function getCelebrities() {
    // acts as a api call to the celebrities data
    const celebrities = require('./celebrities.json');

    // Sorting the celebrities by first name
    const sortedCelebrities = celebrities.sort((a: { first: string }, b: { first: any }) => a.first.localeCompare(b.first));

    return sortedCelebrities;
}
