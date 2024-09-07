export async function getCelebrities() {
    // acts as a api call to the celebrities data
    const celebrities = require('./celebrities.json');

    // Sorting the celebrities by first name
    const sortedCelebrities = celebrities.sort((a: { first: string }, b: { first: any }) => a.first.localeCompare(b.first));

    //combine first and last name
    sortedCelebrities.map((celebrity: { first: string; last: string }, index: string | number) => {
        sortedCelebrities[index].fullName = `${celebrity.first} ${celebrity.last}`;
    });

    return sortedCelebrities;
}

export async function updateCelebrity(celebrity: any) {
    // acts as a api call to update the celebrity data
    const celebrities = require('./celebrities.json');
    const celebrityToUpdate = celebrities.find((c: { id: number }) => c.id === celebrity.id);

    celebrityToUpdate.age = celebrity.age;
    celebrityToUpdate.gender = celebrity.gender;
    celebrityToUpdate.country = celebrity.country;
    celebrityToUpdate.description = celebrity.description;

    return celebrityToUpdate;
}

export async function deleteCelebrity(celebrity: any) {
    // acts as a api call to delete the celebrity data
    const celebrities = require('./celebrities.json');
    const celebrityToDelete = celebrities.find((c: { id: number }) => c.id === celebrity.id);
    celebrities.splice(celebrities.indexOf(celebrityToDelete), 1);

    return celebrities;
}
