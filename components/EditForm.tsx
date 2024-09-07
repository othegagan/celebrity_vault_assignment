'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { genderOptions } from '@/constants';
import { calculateAge } from '@/lib/helpers';
import { Celebrity } from '@/types';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

export default function EditForm({ celebrity, handleCancel }: { celebrity: Celebrity; handleCancel: () => void }) {
    const [editedCelebrity, setEditedCelebrity] = useState<Celebrity | null>(null);

    const handleSave = () => {
        if (editedCelebrity) {

        }
    };

    return (
        <div className='p-0.5 space-y-4'>
            <div className='grid grid-cols-3 gap-4 '>
                <div className='space-y-2'>
                    <Label className='text-muted-foreground'>Age</Label>
                    <Input type='number' value={calculateAge(celebrity?.dob || '')} readOnly className='mt-1' />
                </div>
                <div className='space-y-2'>
                    <Label>Gender</Label>
                    <Select value={celebrity?.gender} onValueChange={(value) => setEditedCelebrity((prev) => (prev ? { ...prev, gender: value } : null))}>
                        <SelectTrigger>
                            <SelectValue placeholder='Select gender' />
                        </SelectTrigger>
                        <SelectContent>
                            {genderOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Country</Label>
                    <Input
                        type='text'
                        value={celebrity?.country}
                        onChange={(e) => setEditedCelebrity((prev) => (prev ? { ...prev, country: e.target.value } : null))}
                        className='mt-1'
                    />
                </div>
            </div>
            <div>
                <Label>Description</Label>
                <Textarea
                    value={celebrity?.description}
                    onChange={(e) => setEditedCelebrity((prev) => (prev ? { ...prev, description: e.target.value } : null))}
                    className='mt-1'
                    rows={7}
                />
            </div>
            <div className=' flex justify-end space-x-2'>
                <Button onClick={handleCancel} variant='outline'>
                    <X className='mr-2 h-4 w-4' /> Cancel
                </Button>
                <Button onClick={handleSave}>
                    <Check className='mr-2 h-4 w-4' /> Save
                </Button>
            </div>
        </div>
    );
}
