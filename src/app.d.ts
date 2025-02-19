import { ApiService } from '@/services/api';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			apiService: ApiService
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
