"use server"
import { TLaboratoryAnalsisFile } from "@/models/TLaboratoryAnalysis";
import { TResponse } from "@/utils/types";
import { cookies } from "next/headers";

const token = cookies().get("jwt")!.value.toString();

export async function getFilesReference(
	idClinicHistory: string
): Promise<TLaboratoryAnalsisFile[] | false> {
	const url = `${process.env.NEXT_PUBLIC_URL_DOCUMENT}?idHistoriaClinica=${idClinicHistory}`;
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("auth-token", token);

	const response = await fetch(url, {
		method: "GET",
		headers,
		cache: "no-store",
	});

	if (!response.ok) {
		return false;
	}

	const {
		error: { hasError, detail },
		data,
	}: TResponse<TLaboratoryAnalsisFile[]> = await response.json();

	if (hasError) {
		console.log(detail);
		return false;
	}

	if (data) {
		return data;
	}
	return false;
}

