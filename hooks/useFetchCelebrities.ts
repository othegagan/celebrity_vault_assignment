import { deleteCelebrity, getCelebrities, updateCelebrity } from '@/server/celebrities';
import { Celebrity } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useFetchCelebrities() {
    return useQuery({
        queryKey: ['celebrities'],
        queryFn: () => getCelebrities()
    });
}

export function useDeleteCelebrity() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => await deleteCelebrity(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['celebrities'] });
        }
    });
}

export function useEditCelebrity() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Celebrity) => await updateCelebrity(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['celebrities'] });
        }
    });
}
