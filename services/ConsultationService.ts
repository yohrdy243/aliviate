"use server";
import { TResponse } from "@/utils/types";
import { cookies } from "next/headers";

const token = cookies().get("jwt")!.value.toString();

export async function getConsultations(
	dni?: string
): Promise<TConsultation[] | false> {
	const url =
		dni !== undefined
			? `${process.env.NEXT_PUBLIC_URL_CONSULTATION}?idHistoriaClinica&documentoIdentidad=${dni}&limit=30&offset=0`
			: `${process.env.NEXT_PUBLIC_URL_CONSULTATION}?idHistoriaClinica&documentoIdentidad&limit=30&offset=0`;

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
		error: { hasError },
		data,
	}: TResponse<TConsultation[]> = await response.json();

	if (hasError) {
		return false;
	}
	if (data) {
		return data;
	} else if (data === null) {
		return [];
	}
	return false;
}

export async function getConsultationsByClinicHistory(
	clinicHistoryID: string
): Promise<TConsultation[] | false> {
	const url = `${process.env.NEXT_PUBLIC_URL_CONSULTATION}?idHistoriaClinica=${clinicHistoryID}&limit=20&offset=0`;

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
		error: { hasError },
		data,
	}: TResponse<TConsultation[]> = await response.json();

	if (hasError) {
		return false;
	}
	if (data) {
		return data;
	}
	return false;
}

export async function saveConsultation(
	consultation: TConsultation
): Promise<string | false> {
	const url = `${process.env.NEXT_PUBLIC_URL_CONSULTATION}`;
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("auth-token", token);

	const response = await fetch(url, {
		method: "POST",
		headers,
		body: JSON.stringify({
			...consultation,
			id: undefined,
			fechaRegistro: undefined,
		}),
		cache: "no-store",
	});

	const {
		error: { hasError, detail },
		data,
	}: TResponse<string> = await response.json();

	if (hasError) {
		console.log(detail);
		return false;
	}
	if (data) {
		return data;
	}
	return false;
}
