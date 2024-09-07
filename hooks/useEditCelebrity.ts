import { useState } from 'react';
import { Celebrity } from '../types'; // Assuming the `Celebrity` interface is in a types file

export const useEditCelebrity = () => {
    const [editMode, setEditMode] = useState<number | null>(null);

    const handleEdit = (celebrity: Celebrity) => {
        setEditMode(celebrity.id);
    };

    const handleCancel = () => {
        setEditMode(null);
    };

    return {
        editMode,
        handleEdit,
        handleCancel
    };
};
