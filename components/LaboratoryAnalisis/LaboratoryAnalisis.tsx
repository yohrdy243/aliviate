"use client";
import { useEffect, useState } from "react";

import {
	TLaboratoryAnalisisType,
	TLaboratoryAnalisisValue,
} from "@/models/TLaboratoryAnalysis";
import LaboratoryAnalisisHeader from "./LaboratoryAnalisisHeader";
import LaboratoryAnalisisDynamicForm from "./LaboratoryAnalisisDynamicForm";
import { getAnalisisValues } from "@/services/LaboratoryAnalysisService";

export default function LaboratoryAnalisis({
	dni,
	idLaboratoryAnalisis,
	idClinicHistory,
}: {
	dni: string;
	idClinicHistory: string;
	idLaboratoryAnalisis?: string;
}) {
	const [analisisType, setAnalisisType] = useState<
		TLaboratoryAnalisisType | undefined
	>();

	const [analisisValues, setAnalisisValues] = useState<
		TLaboratoryAnalisisValue[]
	>([]);

	useEffect(() => {
		getAnalisisValues(idClinicHistory).then((analisisValues) => {
			if (analisisValues !== false) {
				setAnalisisValues(analisisValues);
			} else {
				setAnalisisValues([]);
			}
		});
	}, [idClinicHistory]);

	return (
		<div className="px-16">
			<LaboratoryAnalisisHeader
				setAnalisisType={setAnalisisType}
				idClinicHistory={idClinicHistory}
			/>
			{analisisType === undefined ? (
				<div className="flex justify-center text-3xl text-black font-[600]">
					Selecciona un tipo de examen
				</div>
			) : (
				<section>
					<div className="flex justify-center text-3xl text-black font-[600]">
						{analisisType.nombre}
					</div>
					<div className="mt-10">
						<LaboratoryAnalisisDynamicForm
							idAnalisisType={analisisType.id}
							idClinicHistory={idClinicHistory}
							analisisValues={analisisValues}
						/>
					</div>
				</section>
			)}
		</div>
	);
}
