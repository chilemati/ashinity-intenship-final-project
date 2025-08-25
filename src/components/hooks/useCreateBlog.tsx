// src/hooks/useProducts.ts
import { useState } from 'react';
import type { BlogInterface } from '../types/blog';



export function useBlogCreate () {
  const [data, setData] = useState<BlogInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchBlogs = async (body:any) => {
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/blog`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Failed to create blog`);
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

