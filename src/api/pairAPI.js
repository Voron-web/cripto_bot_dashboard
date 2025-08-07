import { useFetch } from "./useFetch";

export async function getPairList() {
	return await useFetch("/pairs");
}

export async function addNewPair(data) {
	return await useFetch("/addpair", { method: "POST", body: data });
}
export async function editPairApi(data) {
	return await useFetch("/editpair", { method: "PUT", body: data });
}
export async function deletePairApi(data) {
	return await useFetch("/editpair", { method: "DELETE", params: data });
}
