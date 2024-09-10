'use server';

import connectDB from '@/lib/mongodb';
import CelebrityModel from '@/models/celebrity.model';
import { Celebrity } from '@/types';

// Ensure database connection
connectDB();

export async function getCelebrities() {
    try {
        const celebrities = await CelebrityModel.find({}).lean();

        // combine first and last to make fullName field
        const modifiedCelebritiesData = celebrities.map((celebrity) => ({
            ...celebrity,
            fullName: `${celebrity.first} ${celebrity.last}`
        }));

        // Sort celebrities by fullName
        return modifiedCelebritiesData.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } catch (error: unknown) {
        console.error('Failed to fetch celebrities:', error);
        throw new Error(`Failed to fetch celebrities : ${error}`);
    }
}

export async function updateCelebrity({ id, gender, country, description }: Partial<Celebrity>) {
    try {
        const updatedCelebrity = await CelebrityModel.findOneAndUpdate({ id: id }, { gender, country, description }, { new: true, runValidators: true }).lean();

        if (!updatedCelebrity) {
            throw new Error('Celebrity not found');
        }

        return {
            ...updatedCelebrity
        };
    } catch (error: unknown) {
        console.error('Failed to update celebrity:', error);
        throw new Error(`Failed to update celebrity :${error}`);
    }
}

export async function deleteCelebrity(id: number) {
    try {
        const deletedCelebrity = await CelebrityModel.findOneAndDelete({ id: id });

        if (!deletedCelebrity) {
            throw new Error('Celebrity not found');
        }

        return getCelebrities();
    } catch (error: unknown) {
        console.error('Failed to delete celebrity:', error);
        throw new Error(`Failed to delete celebrity : ${error}`);
    }
}

export async function createCelebrity(celebrityData: any[]) {
    try {
        if (Array.isArray(celebrityData)) {
            const insertedCelebrities = await CelebrityModel.insertMany(celebrityData);
            // console.log(`${insertedCelebrities.length} logs inserted successfully.`);
            return insertedCelebrities;
        }

        const insertedCelebrity = await CelebrityModel.create(celebrityData);
        return insertedCelebrity;
    } catch (error: unknown) {
        console.error('Failed to create celebrity:', error);
        throw new Error(`Failed to create celebrity : ${error}`);
    }
}
