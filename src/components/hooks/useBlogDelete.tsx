// src/hooks/useProducts.ts
import { useState } from 'react';
import type { BlogInterface } from '../types/blog';



export function useBlogDeleteById () {
  const [data, setData] = useState<BlogInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchBlogs = async (id: string ) => {
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/blog/${Number(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Failed to delete blog with id ${id}`);
      const json = await res.json();
      setData(json);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, success, sendRequest: fetchBlogs };
}

