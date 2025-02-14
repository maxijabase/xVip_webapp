import { env } from '$env/dynamic/private';

class ApiService {
	private baseUrl: string;

	constructor() {
		this.baseUrl = env.API_URL || 'http://localhost:3000';
	}

	private async fetch(endpoint: string, options: RequestInit = {}) {
		const url = `${this.baseUrl}${endpoint}`;
		const response = await fetch(url, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options.headers
			}
		});

		if (!response.ok) {
			throw new Error(`API call failed: ${response.statusText}`);
		}

		return response.json();
	}

	// Example methods
	async get<T>(endpoint: string) {
		return this.fetch(endpoint) as Promise<T>;
	}

	async post<T>(endpoint: string, data: any) {
		return this.fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(data)
		}) as Promise<T>;
	}

	async put<T>(endpoint: string, data: any) {
		return this.fetch(endpoint, {
			method: 'PUT',
			body: JSON.stringify(data)
		}) as Promise<T>;
	}

	async delete<T>(endpoint: string) {
		return this.fetch(endpoint, {
			method: 'DELETE'
		}) as Promise<T>;
	}
}

export const api = new ApiService();
