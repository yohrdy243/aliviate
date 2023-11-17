"use server";
import {
	TLaboratoryAnalisisField,
	TLaboratoryAnalisisType,
	TLaboratoryAnalisisValue,
	TLaboratoryAnalysis,
	TLaboratoryAnalysisForm,
} from "@/models/TLaboratoryAnalysis";
import { TResponse } from "@/utils/types";
import { cookies } from "next/headers";

const token = cookies().get("jwt")!.value.toString();

export async function getLaboratoryAnalysis(
	idLaboratoryAnalysis?: string
): Promise<TLaboratoryAnalysis[] | false> {
	const url =
		idLaboratoryAnalysis !== undefined
			? `${process.env.NEXT_PUBLIC_URL_LABORATORY_ANALYSIS}?idAnalisisClinico=${idLaboratoryAnalysis}`
			: `${process.env.NEXT_PUBLIC_URL_LABORATORY_ANALYSIS}?limit=5&offset=0`;

	const response: Response = await fetch(url || "", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
		cache: "no-store",
	});

	if (!response.ok) {
		return false;
	}

	const {
		error: { hasError, detail },
		data,
	}: TResponse<TLaboratoryAnalysis[]> = await response.json();

	if (hasError) {
		console.log(detail);
		return false;
	}
	if (data) {
		return data;
	}

	return false;
}

export async function getLaboratoryAnalysisByClinicHistory(
	clinicHistoryID: string
): Promise<TLaboratoryAnalysis | false> {
	const url = `${process.env.NEXT_PUBLIC_URL_LABORATORY_ANALYSIS}?idHistoriaClinica=${clinicHistoryID}&limit=20&offset=0`;

	const response: Response = await fetch(url || "", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
		cache: "no-store",
	});
	if (!response.ok) {
		return false;
	}

	const {
		error: { hasError, detail },
		data,
	}: TResponse<TLaboratoryAnalysis[]> = await response.json();

	if (hasError) {
		console.log(detail);
		return false;
	}

	if (data) {
		return data[0];
	}

	return false;
}

export async function saveLaboratoryAnalysis(
	laboratoryAnalysis: TLaboratoryAnalysisForm
) {
	const url = `${process.env.NEXT_PUBLIC_URL_LABORATORY_ANALYSIS}`;
	console.log("Creando Analisis de Laboratorio");
	const response: Response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
		body: JSON.stringify(laboratoryAnalysis),
		cache: "no-store",
	});

	if (!response.ok) {
		return false;
	}

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

export async function updateLaboratoryAnalysis(
	laboratoryAnalysis: TLaboratoryAnalysisForm
) {
	const url = `${process.env.NEXT_PUBLIC_URL_LABORATORY_ANALYSIS}`;
	console.log("URL", url);
	const response: Response = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
		body: JSON.stringify(laboratoryAnalysis),
		cache: "no-store",
	});
	console.log("RESPONSE", response);
	/*
	if (!response.ok) {
		return false;
	}
*/
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

export async function getAnalisisList(): Promise<
	TLaboratoryAnalisisType[] | false
> {
	const url = `${process.env.NEXT_PUBLIC_URL_LABORATORY_ANALYSIS}/list-analisis`;
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
	}: TResponse<TLaboratoryAnalisisType[]> = await response.json();

	if (hasError) {
		console.log(detail);
		return false;
	}

	if (data) {
		return data;
	}
	return false;
}

export async function getAnalisisFields(
	idAnalisisType: string
): Promise<TLaboratoryAnalisisField[] | false> {
	const url = `${process.env.NEXT_PUBLIC_URL_LABORATORY_ANALYSIS}/list-analisis-campo?idAnalisisCodigo=${idAnalisisType}`;
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
	}: TResponse<TLaboratoryAnalisisField[]> = await response.json();

	if (hasError) {
		console.log(detail);
		return false;
	}

	if (data) {
		return data;
	}
	return false;
}

export async function getAnalisisValues(
	idClinicHistory: string
): Promise<TLaboratoryAnalisisValue[] | false> {
	const url = `${process.env.NEXT_PUBLIC_URL_LABORATORY_ANALYSIS}/list-analisis-historia?idAnalisisCodigo=1&idHistoria=${idClinicHistory}`;
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
	}: TResponse<TLaboratoryAnalisisValue[]> = await response.json();

	if (hasError) {
		console.log(detail);
		return false;
	}

	if (data) {
		return data;
	}
	return false;
}

export async function saveAnalisisValues(
	data: TLaboratoryAnalisisValue[]
): Promise<string | false> {
	const url = `${process.env.NEXT_PUBLIC_URL_LABORATORY_ANALYSIS}/register-analisis-historia`;
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("auth-token", token);

	const response = await fetch(url, {
		method: "POST",
		headers,
		body: JSON.stringify(data),
		cache: "no-store",
	});

	if (!response.ok) {
		return false;
	}

	const {
		error: { hasError, detail },
		data: dataResponse,
	}: TResponse<string> = await response.json();

	if (hasError) {
		console.log(detail);
		return false;
	}

	if (dataResponse) {
		return dataResponse;
	}
	return false;
}

