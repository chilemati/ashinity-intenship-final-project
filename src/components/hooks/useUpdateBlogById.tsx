// src/hooks/useProducts.ts
import { useState } from 'react';
import type { Blog } from '../BlogModal';



export function useBlogUpdateById () {
  const [data, setData] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchBlogs = async (id: string,updatedFields: Partial<Blog> ) => {
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL2}/blog/${Number(id)}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFields),
      });
      if (!res.ok) throw new Error(`Failed to update blog with id ${id}`);
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

