"use client";
import React, { ChangeEvent } from "react";
import useModal from "@/utils/hooks/useModal";
import LaboratoryAnalisisFilesOffCanvas from "./LaboratoryAnalisisFilesOffCanvas";
import Swal from "sweetalert2";
import { TResponse } from "@/utils/types";
import { useCookies } from "next-client-cookies";

export async function saveFile(
	idClinicHistory: string,
	file: File,
	token: string
): Promise<string | false> {
	const url = `${process.env.NEXT_PUBLIC_URL_DOCUMENT}/${idClinicHistory}`;

	const headers = new Headers();
	headers.append("auth-token", token);

	const formData = new FormData();
	formData.append("documento", file);

	const response = await fetch(url, {
		method: "POST",
		headers,
		body: formData,
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

async function handleFile(
	element: ChangeEvent<HTMLInputElement>,
	idClinicHistory: string,
	token?: string
) {
	const file = element.target.files?.[0];

	if (file || file !== undefined || file !== null) {
		if (file?.type === "application/pdf") {
			const response = await saveFile(idClinicHistory, file, token || "");
			if (response) {
				Swal.fire({
					icon: "success",
					title: "Exito",
					toast: true,
					timer: 2000,
					text: "Se ha cargado el archivo correctamente",
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Error",
					toast: true,
					timer: 2000,
					text: "No se ha podido cargar el archivo",
				});
			}
		} else {
			Swal.fire({
				icon: "error",
				title: "Error",
				timer: 2000,
				toast: true,
				text: "El archivo debe ser PDF",
			});
		}
	} else {
		Swal.fire({
			icon: "error",
			title: "Error",
			timer: 2000,
			toast: true,
			text: "Debe seleccionar un archivo",
		});
	}
}

export default function LaboratotyAnalisisControls({
	idClinicHistory,
}: {
	idClinicHistory: string;
}) {
	const { visible, open, close } = useModal();
	const cookies = useCookies();
	const token = cookies.get("jwt");

	return (
		<>
			<div className="flex gap-4">
				<div className="w-fit bg-[#7800D7] text-white rounded-[10px] py-3 px-4 text-[14px] font-[600]">
					<label>
						<input
							type="file"
							className="hidden"
							multiple={false}
							accept=".pdf"
							onChange={(e) => {
								handleFile(e, idClinicHistory, token);
							}}
						/>
						CARGAR ARCHIVO
					</label>
				</div>
				<button
					className="w-fit bg-[#7800D7] text-white rounded-[10px] py-3 px-4 text-[14px] font-[600]"
					type="button"
					onClick={open}
				>
					VER ARCHIVOS
				</button>
			</div>
			<LaboratoryAnalisisFilesOffCanvas
				visible={visible}
				close={close}
				idClinicHistory={idClinicHistory}
			/>
		</>
	);
}
