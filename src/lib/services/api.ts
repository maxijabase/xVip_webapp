import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export class ApiService {
  private baseUrl: string = API_URL;
  private fetch: any;

  constructor(fetch: any) {
    this.fetch = fetch;
  }

  async get<T>(endpoint: string) {
    const res = await this.fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET'
    });
    if (res.ok) {
      return res.json() as Promise<T>;
    }

    if (res.status === 303) {
      redirect(303, '/auth/login');
    }
  }

  async post<T>(endpoint: string, data: any) {
    const res = await this.fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res.ok) {
      return res.json() as Promise<T>;
    }
  }

  async put<T>(endpoint: string, data: any) {
    const res = await this.fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    if (res.ok) {
      return res.json() as Promise<T>;
    }
  }

  async delete<T>(endpoint: string) {
    const res = await this.fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      return res.json() as Promise<T>;
    }
  }
}
