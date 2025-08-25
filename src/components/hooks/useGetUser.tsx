// src/hooks/useProducts.ts
import { useEffect, useState } from 'react';
import type { clotheInterface } from '../types/Clothe';



export function useGetUsers(endpoint: string = 'users') {
  const [data, setData] = useState<clotheInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${endpoint}`);
        if (!res.ok) throw new Error(`'Failed to fetch ${endpoint}'`);
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { data, loading, error };
}
