'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

export default function DeleteForm({ id, fullName }: { id: number; fullName: string }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDelete = (id: number) => {
        setDeleteDialogOpen(true);
    };

    return (
        <>
            <Button onClick={() => handleDelete(id)} variant='outline' tooltip='Delete Celebrity'>
                <Trash2 className='size-5' />
            </Button>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete?</DialogTitle>
                        <DialogDescription>This will delete {fullName} celebrity from the list.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setDeleteDialogOpen(false)} variant='outline'>
                            Cancel
                        </Button>

                        <form>
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
