import { createCelebrity, deleteCelebrity, getCelebrities, updateCelebrity } from '@/server/celebrities';
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

export async function GET() {
    try {
        const celebrities = await getCelebrities();

        return NextResponse.json(celebrities);
    } catch (error: any) {
        console.error('Error processing GET request:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams;
    const celebrityId = searchParams.get('celebrityId');

    try {
        if (!celebrityId) {
            return NextResponse.json({ error: 'No celebrity id provided' }, { status: 400 });
        }

        const deletedCelebrity = await deleteCelebrity(Number(celebrityId));

        return new NextResponse(
            JSON.stringify({
                message: 'Celebrity deleted successfully',
                data: deletedCelebrity
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(req: NextRequest, res: NextResponse) {
    const celebrity = await req.json();

    try {
        const updatedCelebrity = await updateCelebrity(celebrity);

        return new NextResponse(
            JSON.stringify({
                message: 'Celebrity updated successfully',
                data: updatedCelebrity
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
