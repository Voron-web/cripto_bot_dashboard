import { useFetch } from "./useFetch";

export async function runBackTest(param) {
	return await useFetch("/pairtest", { method: "get", options: {} });
}
