// src/hooks/useProductById.ts
import { useEffect, useState } from 'react';
import type { clotheInterface } from '../types/Clothe';


export function useGetUserById(productId: number | string, endpoint: string = 'users') {
  const [data, setData] = useState<clotheInterface  | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${endpoint}/${productId}`);
        if (!res.ok) throw new Error(`Failed to fetch product with ID ${productId}`);
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { data, loading, error };
}
