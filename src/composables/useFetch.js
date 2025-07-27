import axios from "axios";

export async function useFetch(url, options = {}) {
	const apiClient = axios.create({
		baseURL: import.meta.env.VITE_API_BASE_URL,
		timeout: 5000,
	});

	try {
		const response = await apiClient({
			url,
			method: options.url || "GET",
			data: options.body || null,
			params: options.params || null,
			headers: options.headers || {},
		});
		return response.data;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error; // выбрасываем ошибку, чтобы её можно было поймать в компоненте
	}
}
