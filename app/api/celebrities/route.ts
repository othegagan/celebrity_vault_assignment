import { createCelebrity, getCelebrities } from '@/server/celebrities';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    const celebrity = await req.json();

    try {
        const createdCelebrity = await createCelebrity(celebrity);

        return new NextResponse(
            JSON.stringify({
                message: 'Celebrity created successfully',
                data: createdCelebrity
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const celebrities = await getCelebrities();

        return NextResponse.json(celebrities);
    } catch (error: any) {
        console.error('Error processing GET request:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
