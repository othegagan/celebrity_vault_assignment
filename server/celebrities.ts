'use server';

// All these operations simulate a database call

import { promises as fs } from 'fs';
import path from 'node:path';
import { Celebrity } from '@/types';

const filePath = path.join(process.cwd(), 'data', 'celebrities.json');

async function readJSONFile() {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function writeJSONFile(data: any) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function getCelebrities() {
    const celebrities = await readJSONFile();

    // Sorting the celebrities by first name
    const sortedCelebrities = celebrities.sort((a: { first: string }, b: { first: string }) => a.first.localeCompare(b.first));

    // Combine first and last name
    sortedCelebrities.forEach((celebrity: { first: string; last: string; fullName?: string }) => {
        celebrity.fullName = `${celebrity.first} ${celebrity.last}`;
    });

    return sortedCelebrities;
}

export async function updateCelebrity({ id, age, gender, country, description }: Celebrity) {
    const celebrities = await readJSONFile();
    const index = celebrities.findIndex((c: { id: number }) => c.id === id);

    if (index !== -1) {
        celebrities[index] = { ...celebrities[index], ...{ age, gender, country, description } };
        await writeJSONFile(celebrities);
        return celebrities[index];
    }

    throw new Error('Celebrity not found');
}

export async function deleteCelebrity(id: number) {
    const celebrities = await readJSONFile();
    const updatedCelebrities = celebrities.filter((c: { id: number }) => c.id !== id);

    if (updatedCelebrities.length < celebrities.length) {
        await writeJSONFile(updatedCelebrities);
        return updatedCelebrities;
    }

    throw new Error('Celebrity not found');
}
