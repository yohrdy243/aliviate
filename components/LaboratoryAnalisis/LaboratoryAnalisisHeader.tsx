"use client";
import React, { useEffect, useState } from "react";
import LaboratotyAnalisisControls from "./LaboratotyAnalisisControls";

import { TLaboratoryAnalisisType } from "@/models/TLaboratoryAnalysis";
import { getAnalisisList } from "@/services/LaboratoryAnalysisService";

function LaboratoryAnalisisSelect({
	setAnalisisType,
}: {
	setAnalisisType: (idAnalisis: TLaboratoryAnalisisType | undefined) => void;
}) {
	const [analisisList, setAnalisisList] = useState<
		TLaboratoryAnalisisType[] | false
	>(false);

	useEffect(() => {
		getAnalisisList().then((analisisList) => {
			setAnalisisList(analisisList);
		});
	}, []);

	if (analisisList === false)
		return <div>No se encontró tipos de analisis</div>;

	return (
		<div className="flex flex-col justify-start w-full gap-1">
			<label className="text-left text-sm font-[400]">Seleccionar Examen</label>
			<select
				className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				onChange={(e) => {
					const index =
						e.target.value === "" ? undefined : parseInt(e.target.value);
					if (index === undefined) {
						setAnalisisType(undefined);
					} else {
						setAnalisisType(analisisList[index]);
					}
				}}
			>
				<option value={""}>Elegir Examen</option>
				{analisisList.map(
					(analisis: TLaboratoryAnalisisType, index: number) => (
						<option key={analisis.id} value={index}>
							{analisis.nombre}
						</option>
					)
				)}
			</select>
		</div>
	);
}

export default function LaboratoryAnalisisHeader({
	idClinicHistory,
	setAnalisisType,
}: {
	idClinicHistory: string;
	setAnalisisType: (idAnalisis: TLaboratoryAnalisisType | undefined) => void;
}) {
	return (
		<section className="flex flex-col items-center py-8 gap-4">
			<div className="w-full flex justify-between items-center">
				<h3 className="text-[26px] font-[700]">Analisis de Laboratorio</h3>
				<LaboratotyAnalisisControls idClinicHistory={idClinicHistory} />
			</div>

			<LaboratoryAnalisisSelect setAnalisisType={setAnalisisType} />
		</section>
	);
}
