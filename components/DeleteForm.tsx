'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { deleteCelebrity } from '@/server/celebrities';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export default function DeleteForm({ id, fullName }: { id: number; fullName: string }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const openDeleteDialog = () => {
        setDeleteDialogOpen(true);
    };

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = deleteCelebrity(id);
        // setDeleteDialogOpen(false);
    };

    return (
        <>
            <Button onClick={openDeleteDialog} variant='outline' tooltip='Delete Celebrity'>
                <Trash2 className='size-5' />
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
                            <Button type='submit' variant='destructive'>
                                Delete
                            </Button>
                        </form>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
