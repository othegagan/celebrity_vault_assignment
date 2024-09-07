'use client';

import DeleteForm from '@/components/DeleteForm';
import EditForm from '@/components/EditForm';
import ReadOnly from '@/components/ReadOnly';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import DebouncedInput from '@/components/ui/debounce-input';
import { useEditCelebrity } from '@/hooks/useEditCelebrity';
import { useFetchCelebrities } from '@/hooks/useFetchCelebrities';
import { calculateAge } from '@/lib/helpers';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

export default function CelebrityList() {
    const { celebrities, loading, error } = useFetchCelebrities();
    const { editMode, handleEdit, handleCancel } = useEditCelebrity();

    const [searchTerm, setSearchTerm] = useState('');

    const filteredCelebrities = celebrities.filter((celebrity) => celebrity.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

    function handleSearch(value: string) {
        setSearchTerm(value);
    }

    return (
        <div className='container mx-auto p-4'>
            <div className='max-w-2xl mx-auto space-y-5'>
                <DebouncedInput type='text' placeholder='Search Celebrity' value={searchTerm} onChange={handleSearch} className='mb-4' />
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}

                {!loading && !error && filteredCelebrities.length === 0 && <div className='text-center'>No celebrities found</div>}

                <Accordion type='single' collapsible className='w-full space-y-4'>
                    {!loading &&
                        !error &&
                        filteredCelebrities.map((celebrity) => (
                            <AccordionItem key={celebrity.id} value={celebrity.fullName} className='flex flex-col  border rounded-lg hover:dark:bg-muted/60 '>
                                <AccordionTrigger>
                                    <div className='flex items-center'>
                                        <img src={celebrity.picture} alt={celebrity.fullName} className='size-10 rounded-full mr-4' />
                                        <span className='font-semibold'>{celebrity.fullName}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {editMode === celebrity.id ? (
                                        <>
                                            <EditForm celebrity={celebrity} handleCancel={handleCancel} />
                                        </>
                                    ) : (
                                        <>
                                            <ReadOnly celebrity={celebrity} />
                                            <div className='mt-6 flex justify-end space-x-2'>
                                                <DeleteForm id={celebrity.id} fullName={celebrity.fullName} />
                                                <Button onClick={() => handleEdit(celebrity)} disabled={calculateAge(celebrity.dob) < 18}>
                                                    <Pencil className='mr-2 h-4 w-4' /> Edit
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                </Accordion>
            </div>
        </div>
    );
}
