// src/hooks/useProducts.ts
import { useEffect, useState } from 'react';
import type { BlogInterface } from '../types/blog';



export function useBlogGet(endpoint: string = 'blog') {
  const [data, setData] = useState<BlogInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchBlogs };
}

