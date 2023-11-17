"use server";
import { TIADiagnosticProps } from "@/models/TDiagnostic";
import { TPredictionsData, TPredictionsResponse } from "@/models/TPredictions";
import { TResponse } from "@/utils/types";
import { cookies } from "next/headers";

const token = cookies().get("jwt")!.value.toString();

export async function getPredictions(
	iaDiagnosticProps: TIADiagnosticProps
): Promise<{ enfermedad: string; probabilidad: number }[] | false> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL_PREDICTION}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
		body: JSON.stringify(iaDiagnosticProps),
		cache: "no-store",
	});
	if (!response.ok) {
		return false;
	}
	const {
		error: { hasError, detail },
		data,
	}: TResponse<{ enfermedad: string; probabilidad: number }[]> =
		await response.json();

	if (hasError) {
		console.log(detail);
		return false;
	}
	if (data) {
		return data;
	}
	return false;
}

export async function getPredictionsDataToChart(): Promise<
	TPredictionsData[] | false
> {
	const url = `${process.env.NEXT_PUBLIC_URL_ESTADISTICA}/predicciones-enfermedades`;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token,
		},
		cache: "no-store",
	});

	const {
		error: { hasError, detail },
		data,
	}: TResponse<TPredictionsResponse[]> = await response.json();

	if (hasError) {
		console.log(detail);
		return false;
	}
	if (data) {
		return data.map((prediction) => ({
			name: prediction.enfermedad,
			"Predicciones Correctas": prediction.prediccionesCorrectas,
		}));
	}
	return false;
}
