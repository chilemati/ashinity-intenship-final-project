// src/hooks/useProducts.ts
import { useEffect, useState } from 'react';
import type { BlogInterface } from '../types/blog';



export function useBlogGetById(id: string ) {
  const [data, setData] = useState<BlogInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/blog/${id}`);
        if (!res.ok) throw new Error(`'Failed to fetch blog with id ${id}'`);
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  return { data, loading, error };
}
