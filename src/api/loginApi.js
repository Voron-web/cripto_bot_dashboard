import { useFetch } from "./useFetch";

export async function sendLoginData(login, password) {
	return await useFetch("/login", { method: "POST", body: { userName: login, password } });
}
