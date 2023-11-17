"use client";
import { TClinicHistoryTable } from "@/models/TClinicHistory";
import { TSearchParamns } from "./ClinicalHistoryModal";

function ClinicalHistory({
	setSelected,
	data,
}: {
	data: TClinicHistoryTable;
	setSelected: (data: TSearchParamns) => void;
}) {
	const {
		fechaRegistro,
		nombreCompletoPaciente,
		documentoIdentidadPaciente,
		nombreCompletoMedico,
		idAnalisisClinico,
		idsConsultas,
	} = data;

	const dateString = new Date(fechaRegistro).toLocaleDateString("es-PE", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	const haveConsultations = idsConsultas.includes("null") ? false : true;

	return (
		<div className="flex justify-between items-center border rounded-[10px] p-4">
			<div className="flex flex-col">
				<p className="text-[13px] font-[600] text-black">{`${nombreCompletoPaciente} (${documentoIdentidadPaciente})`}</p>
				<p className="text-[13px] font-[600] text-[#0000004D]">{`creado el ${dateString}`}</p>
				<p className="text-[13px] font-[400] text-[#0000004D]">{`Dr. ${nombreCompletoMedico}`}</p>
				<div className="flex gap-1 py-2">
					<span
						className={`${
							idAnalisisClinico === ""
								? "bg-gray-400 text-gray-100"
								: "bg-green-700 text-green-100"
						} text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full`}
					>
						Analisis de Laboratorio
					</span>
					{haveConsultations ? (
						JSON.parse(idsConsultas).map(
							(idConsulta: string, index: number) => (
								<span
									key={idConsulta}
									className={`bg-green-700 text-green-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full`}
								>
									Consulta {index + 1}
								</span>
							)
						)
					) : (
						<span className="bg-gray-400 text-gray-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
							No tiene consultas
						</span>
					)}
				</div>
			</div>
			<div className="flex justify-end items-center pr-8">
				<div className="flex items-center mb-4">
					<input
						id={`clinic-history-radio-${documentoIdentidadPaciente}`}
						type="radio"
						value=""
						name="clinic-history"
						onClick={() =>
							setSelected({
								dni: `${documentoIdentidadPaciente}`,
								idClinicHistory: data.id,
								idLaboratoryAnalisis: idAnalisisClinico,
								haveConsultations: haveConsultations.toString(),
							})
						}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
					/>
				</div>
			</div>
		</div>
	);
}

export default function ClinicalHistories({
	clinicalHistories,
	setSelected,
}: {
	clinicalHistories: TClinicHistoryTable[];
	setSelected: (data: TSearchParamns) => void;
}) {
	if (clinicalHistories.length === 0)
		return (
			<div className="flex w-full justify-center items-center">
				<p className="text-[13px] font-[400] text-black">
					No se encontraron historias clinicas
				</p>
			</div>
		);
	return (
		<div className="flex flex-col gap-2">
			{clinicalHistories.map((clinicalHistory, index) => (
				<ClinicalHistory
					data={clinicalHistory}
					key={`${clinicalHistory}-${index}`}
					setSelected={setSelected}
				/>
			))}
		</div>
	);
}
