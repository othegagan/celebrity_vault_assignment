'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { genderOptions } from '@/constants';
import { useEditCelebrity } from '@/hooks/useFetchCelebrities';
import { calculateAge } from '@/lib/helpers';
import { Celebrity } from '@/types';
import { CircleCheck, CircleX } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

interface EditFormProps {
    celebrity: Celebrity;
    handleCancel: () => void;
}

export default function EditForm({ celebrity, handleCancel }: EditFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<Celebrity>({
        defaultValues: celebrity
    });

    const { mutate: editMutation, isPending } = useEditCelebrity();

    const onSubmit = async (data: Celebrity) => {
        editMutation(data);
        handleCancel();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='p-0.5 space-y-4'>
            <div className='grid grid-cols-3 gap-4'>
                <div className='space-y-2'>
                    <Label className='text-muted-foreground'>Age</Label>
                    <Input type='number' value={calculateAge(celebrity?.dob || '')} readOnly className='mt-1' />
                </div>
                <div className='space-y-2'>
                    <Label>Gender</Label>
                    <Controller
                        name='gender'
                        control={control}
                        rules={{ required: 'Gender is required' }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
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
                        )}
                    />
                    {errors.gender && <span className='text-red-500'>{errors.gender.message}</span>}
                </div>
                <div>
                    <Label>Country</Label>
                    <Controller
                        name='country'
                        control={control}
                        rules={{ required: 'Country is required' }}
                        render={({ field }) => <Input {...field} className='mt-1' />}
                    />
                    {errors.country && <span className='text-red-500'>{errors.country.message}</span>}
                </div>
            </div>
            <div>
                <Label>Description</Label>
                <Controller
                    name='description'
                    control={control}
                    rules={{ required: 'Description is required' }}
                    render={({ field }) => <Textarea {...field} className='mt-1' rows={7} />}
                />
                {errors.description && <span className='text-red-500'>{errors.description.message}</span>}
            </div>
            <div className='flex justify-end space-x-2'>
                <Button onClick={handleCancel} variant='ghost' type='button'>
                    <CircleX className=' text-red-500' />
                </Button>
                <Button type='submit' variant='ghost' disabled={isPending}>
                    <CircleCheck className=' text-green-500' />
                </Button>
            </div>
        </form>
    );
}
