import axios from "axios";
import router from "../router/router";

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 5000,
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && (error.response.status === 401 || error.response.status === 403)) {
			localStorage.removeItem("token");
			router.push("/login");
		}
		return Promise.reject(error); // пробрасываем ошибку дальше
	}
);

export async function useFetch(url, options = {}) {
	try {
		const reqOptions = {
			url,
			method: options.method || "GET",
			data: options.body || null,
			params: options.params || null,
			headers: options.headers || {},
		};
		reqOptions.headers.authorization = `Bearer ${localStorage.getItem("token") || ""}`;
		const response = await apiClient(reqOptions);
		return response.data;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
}
