// lib/api.ts
import logger from './logger';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api';

// Type definitions for API responses
interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Base function for API calls
async function apiCall<T>(
  endpoint: string,
  method: string = 'GET',
  body?: any
): Promise<ApiResponse<T>> {
  const url = `${BACKEND_URL}${endpoint}`;

  try {
    logger.info(`Making ${method} request to ${url}`);

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      // Only include body for non-GET requests
      ...(method !== 'GET' && body ? { body: JSON.stringify(body) } : {})
    };

    const response = await fetch(url, options);

    // Parse the JSON response
    const data = await response.json();

    // Check if the response is successful
    if (!response.ok) {
      logger.error(`API error: ${response.status} - ${data.detail || 'Unknown error'}`);
      return {
        error: data.detail || `Error ${response.status}: ${response.statusText}`
      };
    }

    logger.info(`Successful ${method} request to ${url}`);
    return { data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error(`API call failed: ${errorMessage}`);
    return { error: errorMessage };
  }
}

// Notes API
export const notesApi = {
  getAll: (params?: { skip?: number; limit?: number }) => {
    let query = ''
    if (params) {
      const q = []
      if (typeof params.skip === 'number') q.push(`skip=${params.skip}`)
      if (typeof params.limit === 'number') q.push(`limit=${params.limit}`)
      if (q.length) query = '?' + q.join('&')
    }
    return apiCall<any[]>(`/notes${query}`)
  },
  getById: (id: number) => apiCall<any>(`/notes/${id}`),
  create: (note: any) => apiCall<any>('/notes', 'POST', note),
  update: (id: number, note: any) => apiCall<any>(`/notes/${id}`, 'PUT', note),
  delete: (id: number) => apiCall<any>(`/notes/${id}`, 'DELETE'),
  search: (query: string) => apiCall<any[]>(`/notes/search?query=${encodeURIComponent(query)}`),
};

export default {
  notesApi,
};
