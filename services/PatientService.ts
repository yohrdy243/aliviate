"use server";
import { TPatientTable } from "@/models/TPatient";
import { TResponse } from "@/utils/types";
import { cookies } from "next/headers";

const token = cookies().get("jwt")!.value.toString();

export async function getPatients(
	dni?: string
): Promise<TPatientTable[] | false> {
	const url = `${process.env.NEXT_PUBLIC_URL_PATIENT}?idPaciente&dni${
		dni !== "" ? `=${dni}` : ""
	}&limit=30&offset=0`;

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
	}: TResponse<TPatientTable[]> = await response.json();

	if (hasError) {
		return false;
	}
	return data;
}
