'use client';

import DeleteForm from '@/components/DeleteForm';
import EditForm from '@/components/EditForm';
import ReadOnly from '@/components/ReadOnly';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import DebouncedInput from '@/components/ui/debounce-input';
import { useFetchCelebrities } from '@/hooks/useFetchCelebrities';
import { calculateAge } from '@/lib/helpers';
import { Celebrity } from '@/types';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

export default function CelebrityList() {
    const { data: celebrities, isFetching, error } = useFetchCelebrities();
    const [editMode, setEditMode] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined);

    const filteredCelebrities = celebrities?.filter((celebrity: Celebrity) => celebrity.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

    function handleSearch(value: string) {
        setSearchTerm(value);
    }

    function handleEdit(celebrity: Celebrity) {
        setEditMode(celebrity.id);
        setOpenAccordion(celebrity.fullName);
    }

    function handleCancel() {
        setEditMode(null);
    }

    function handleAccordionChange(value: string) {
        if (editMode === null) {
            setOpenAccordion(value);
        }
    }

    return (
        <div className='container mx-auto p-4'>
            <div className='max-w-2xl mx-auto space-y-5'>
                <DebouncedInput type='text' placeholder='Search Celebrity' value={searchTerm} onChange={handleSearch} className='mb-4' />
                {isFetching && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}

                {!isFetching && !error && filteredCelebrities.length === 0 && <div className='text-center'>No celebrities found</div>}

                <Accordion type='single' collapsible className='w-full space-y-4' value={openAccordion} onValueChange={handleAccordionChange}>
                    {!isFetching &&
                        !error &&
                        filteredCelebrities.map((celebrity: Celebrity) => {
                            const isUnder18 = calculateAge(celebrity.dob) < 18;
                            const isEditing = editMode === celebrity.id;
                            return (
                                <AccordionItem key={celebrity.id} value={celebrity.fullName} className='flex flex-col border rounded-lg hover:dark:bg-muted/60'>
                                    <AccordionTrigger>
                                        <div className='flex items-center'>
                                            <img src={celebrity.picture} alt={celebrity.fullName} className='size-10 rounded-full mr-4' />
                                            <span className='font-semibold'>{celebrity.fullName}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {isEditing ? (
                                            <EditForm celebrity={celebrity} handleCancel={handleCancel} />
                                        ) : (
                                            <>
                                                <ReadOnly celebrity={celebrity} />
                                                <div className='mt-6 flex justify-end'>
                                                    <DeleteForm id={celebrity.id} fullName={celebrity.fullName} />
                                                    <Button
                                                        onClick={() => handleEdit(celebrity)}
                                                        disabled={isUnder18 || editMode !== null}
                                                        variant='ghost'
                                                        title={
                                                            isUnder18
                                                                ? 'Age is under 18'
                                                                : editMode !== null
                                                                  ? 'Another celebrity is being edited'
                                                                  : 'Edit Celebrity'
                                                        }>
                                                        <Pencil className='h-4 w-4 text-blue-500' />
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                </Accordion>
            </div>
        </div>
    );
}
