import { getCelebrities } from '@/server/celebrities';
import { Celebrity } from '@/types';
import { useState, useEffect } from 'react';

export const useFetchCelebrities = () => {
    const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCelebrities();
                setCelebrities(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { celebrities, setCelebrities, loading, error };
};
