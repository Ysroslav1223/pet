import { useState } from "react";

export enum METHODS{
    get="GET",
    post="POST",
    delete="DELETE",
    put='PUT',
    patch="PATCH"
}

interface FetchOptions {
  url: string;
  method: METHODS;
  headers?: Record<string, string>;
  data?: unknown;
}
interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

export const useFetch = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const request = async <T>({ url, method, headers = {}, data }: FetchOptions): Promise<T | null> => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: data ? JSON.stringify(data) : undefined,
      })
      const res: ApiResponse<T> = await response.json()


      if (!response.ok) {
        throw new Error(res?.message || 'Ошибка при запросе')
      }else if(!res.success){
        throw new Error(res?.message || 'Ошибка при запросе')
      }
      return res.data??null
    } catch (err) {
      setError((err as Error).message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { request, loading, error }
}