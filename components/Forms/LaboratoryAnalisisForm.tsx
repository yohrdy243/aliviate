"use client";
import React, { useEffect, useRef } from "react";
import { Form, Formik, FormikErrors, FormikProps } from "formik";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { TLaboratoryAnalysis } from "@/models/TLaboratoryAnalysis";
import {
	saveLaboratoryAnalysis,
	updateLaboratoryAnalysis,
} from "@/services/LaboratoryAnalysisService";
import { getRandomNumber } from "@/utils/functions/generate";

const emptyLaboratoryAnalysisForm: TLaboratoryAnalysis = {
	id: "",
	idHistoriaClinica: "",
	colesterol: getRandomNumber(90, 220),
	trigliceridos: getRandomNumber(20, 220),
	colesterolHdl: getRandomNumber(25, 80),
	colesterolLdl: getRandomNumber(100, 250),
	colesterolVldl: getRandomNumber(20, 50),
	riesgo1: getRandomNumber(1, 5),
	riesgo2: getRandomNumber(1, 4),
	glucosa: getRandomNumber(60, 150),
	hematrocito: getRandomNumber(30, 62),
	hemoglobina: getRandomNumber(10.6, 22),
	tipoExamen: "",
	muestra: "sangre total",
};

function formDataToLaboratoryAnalysis({
	id,
	idHistoriaClinica,
	colesterol,
	trigliceridos,
	colesterolHdl,
	colesterolLdl,
	colesterolVldl,
	riesgo1,
	riesgo2,
	glucosa,
	hematrocito,
	hemoglobina,
	tipoExamen,
	muestra,
}: TLaboratoryAnalysis): TLaboratoryAnalysis {
	const data: TLaboratoryAnalysis = {
		id: id,
		idHistoriaClinica,
		colesterol: parseFloat(colesterol.toString()),
		trigliceridos: parseFloat(trigliceridos.toString()),
		colesterolHdl: parseFloat(colesterolHdl.toString()),
		colesterolLdl: parseFloat(colesterolLdl.toString()),
		colesterolVldl: parseFloat(colesterolVldl.toString()),
		riesgo1: parseFloat(riesgo1.toString()),
		riesgo2: parseFloat(riesgo2.toString()),
		glucosa: parseFloat(glucosa.toString()),
		hematrocito: parseFloat(hematrocito.toString()),
		hemoglobina: parseFloat(hemoglobina.toString()),
		tipoExamen,
		muestra,
	};

	return data;
}

export function LaboratoryAnalysisForm({
	idClinicHistory,
	laboratoryAnalysisSelected,
	children,
}: {
	idClinicHistory: string;
	dni: string;
	laboratoryAnalysisSelected: TLaboratoryAnalysis | null;
	children: React.ReactNode;
}) {
	const router = useRouter();

	return (
		<Formik
			initialValues={laboratoryAnalysisSelected || emptyLaboratoryAnalysisForm}
			validate={(values: TLaboratoryAnalysis) => {
				let errors: FormikErrors<TLaboratoryAnalysis> = {};

				if (!values.colesterol || values.colesterol <= 0) {
					errors.colesterol = "Es obligatorio";
				}
				if (!values.trigliceridos || values.trigliceridos <= 0) {
					errors.trigliceridos = "Es obligatorio";
				}
				if (!values.colesterolHdl || values.colesterolHdl <= 0) {
					errors.colesterolHdl = "Es obligatorio";
				}
				if (!values.colesterolLdl || values.colesterolLdl <= 0) {
					errors.colesterolLdl = "Es obligatorio";
				}
				if (!values.colesterolVldl || values.colesterolVldl <= 0) {
					errors.colesterolVldl = "Es obligatorio";
				}
				if (!values.riesgo1 || values.riesgo1 <= 0) {
					errors.riesgo1 = "Es obligatorio";
				}
				if (!values.riesgo2 || values.riesgo2 <= 0) {
					errors.riesgo2 = "Es obligatorio";
				}

				if (!values.glucosa || values.glucosa <= 0) {
					errors.glucosa = "Es obligatorio";
				}
				if (!values.hematrocito || values.hematrocito <= 0) {
					errors.hematrocito = "Es obligatorio";
				}
				if (!values.hemoglobina || values.hemoglobina <= 0) {
					errors.hemoglobina = "Es obligatorio";
				}
				if (!values.tipoExamen || values.tipoExamen === "") {
					errors.tipoExamen = "Es obligatorio";
				}
				return errors;
			}}
			onSubmit={async (values: TLaboratoryAnalysis) => {
				const data = formDataToLaboratoryAnalysis(values);

				const response =
					values.id === ""
						? await saveLaboratoryAnalysis({
								...data,
								idHistoriaClinica: idClinicHistory,
						  })
						: await updateLaboratoryAnalysis({
								...data,
								idHistoriaClinica: idClinicHistory,
						  });

				console.log(response);

				if (response !== false) {
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Se guardo correctamente",
						showConfirmButton: false,
						timer: 2000,
					}).then(() => {
						router.refresh();
					});
				} else {
					Swal.fire({
						position: "center",
						icon: "error",
						title: "Ocurrio un error al guardar",
						showConfirmButton: false,
						timer: 2000,
					});
				}
			}}
		>
			{({ values }) => {
				const hasId = values.id !== "";
				return (
					<Form>
						{children}

						<div className="py-4">
							<button
								className="w-full bg-[#00A3D7] text-[#fff] rounded-[10px] py-3 text-[14px] font-[600]"
								type="submit"
							>
								{`${hasId ? "ACTUALIZAR" : "INGRESAR"} ANALISIS DE LABORATORIO`}
							</button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
}
