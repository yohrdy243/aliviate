"use server";
import {
	TClinicHistory,
	TClinicHistoryModification,
	TClinicHistoryTable,
} from "@/models/TClinicHistory";

import { TResponse } from "@/utils/types";
import { cookies } from "next/headers";

const token = cookies().get("jwt")!.value.toString();

export async function getClinicalHistories(
	dni?: string
): Promise<TClinicHistoryTable[] | false> {
	const url =
		dni !== undefined
			? `${process.env.NEXT_PUBLIC_URL_CLINICAL_HISTORIES}?idHistoriaClinica&documentoIdentidadPaciente=${dni}&limit=30&offset=0`
			: `${process.env.NEXT_PUBLIC_URL_CLINICAL_HISTORIES}?limit=5&offset=0`;

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
	}: TResponse<TClinicHistoryTable[]> = await response.json();

	if (hasError) {
		return false;
	}

	if (data) {
		return data;
	}

	return false;
}

export async function saveClinicalHistory(
	clinicalHistory: TClinicHistory
): Promise<string | false> {
	const url = `${process.env.NEXT_PUBLIC_URL_CLINICAL_HISTORIES}`;
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("auth-token", token);
	const response = await fetch(url, {
		method: "POST",
		headers,
		body: JSON.stringify(clinicalHistory),
		cache: "no-store",
	});

	const {
		error: { hasError, detail },
		data,
	}: TResponse<string> = await response.json();

	console.log(hasError, detail, data);
	if (hasError) {
		console.log(detail);
		return false;
	}
	if (data) {
		return data;
	}
	return false;
}

export async function updateClinicalHistory(clinicalHistory: TClinicHistory) {
	const url = `${process.env.NEXT_PUBLIC_URL_CLINICAL_HISTORIES}`;
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("auth-token", token);
	const response = await fetch(url, {
		method: "PUT",
		headers,
		body: JSON.stringify(clinicalHistory),
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

export async function getClinicalHistoryById(id: string) {
	const url = `${process.env.NEXT_PUBLIC_URL_CLINICAL_HISTORIES}/${id}`;

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
	}: TResponse<TClinicHistory> = await response.json();

	if (hasError) {
		console.log(detail);
		return false;
	}

	if (data) {
		return data;
	}

	return false;
}

export async function getClinicHistoryRecords(
	id: string
): Promise<TClinicHistoryModification[] | false> {
	const url = `${process.env.NEXT_PUBLIC_URL_CLINICAL_HISTORIES}/modificaciones?idHistoriaClinica${id}`;

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
	}: TResponse<TClinicHistoryModification[]> = await response.json();

	if (hasError) {
		console.log(detail);
		return false;
	}

	if (data) {
		return data;
	}

	return false;
}
