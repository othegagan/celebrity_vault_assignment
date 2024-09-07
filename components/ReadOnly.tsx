import { Label } from '@/components/ui/label';
import { calculateAge } from '@/lib/helpers';
import { Celebrity } from '@/types';

export default function ReadOnly({ celebrity }: { celebrity: Celebrity }) {
    return (
        <>
            <div className='grid grid-cols-3 gap-4 mb-4'>
                <div className='space-y-1.5'>
                    <Label className='text-muted-foreground'>Age</Label>
                    <div>{calculateAge(celebrity.dob)} Years</div>
                </div>
                <div className='space-y-1.5'>
                    <Label className='text-muted-foreground'>Gender</Label>
                    <div className='capitalize'>{celebrity.gender}</div>
                </div>
                <div className='space-y-1.5'>
                    <Label className='text-muted-foreground'>Country</Label>
                    <div className='capitalize'>{celebrity.country}</div>
                </div>
            </div>
            <div className='space-y-1.5'>
                <Label className='text-muted-foreground'>Description</Label>
                <div>{celebrity.description}</div>
            </div>
        </>
    );
}
