'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDeleteCelebrity } from '@/hooks/useFetchCelebrities';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export default function DeleteForm({ id, fullName }: { id: number; fullName: string }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const { mutate: deleteCelebrity, isPending } = useDeleteCelebrity();
    const openDeleteDialog = () => {
        setDeleteDialogOpen(true);
    };

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        deleteCelebrity(id);
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <Button onClick={openDeleteDialog} variant='ghost' tooltip='Delete Celebrity'>
                <Trash2 className='size-5 text-red-500' />
            </Button>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete?</DialogTitle>
                        <DialogDescription>This will delete {fullName} celebrity from the list.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='flex justify-end gap-4 items-center'>
                        <Button onClick={() => setDeleteDialogOpen(false)} variant='outline'>
                            Cancel
                        </Button>

                        <form onSubmit={handleDelete}>
                            <Button type='submit' variant='destructive' disabled={isPending} loading={isPending}>
                                Delete
                            </Button>
                        </form>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
