import React, { Suspense } from "react";
import OffCanvas from "../Layout/OffCanvas";
import { getClinicHistoryRecords } from "@/services/ClinicHistoryService";

export default function ClinicHistoryOffCanvas({
	visible,
	close,
	idClinicHistory,
}: {
	visible: boolean;
	close: () => void;
	idClinicHistory: string;
}) {
	return (
		<OffCanvas
			title="Historial de Cambios de H.Clinica"
			isOpen={visible}
			handleClose={close}
		>
			<Suspense fallback={<HistorialSkeleton />}>
				<ClincicHistoryHistorial idClinicHistory={idClinicHistory} />
			</Suspense>
		</OffCanvas>
	);
}

async function ClincicHistoryHistorial({
	idClinicHistory,
}: {
	idClinicHistory: string;
}) {
	const historial = await getClinicHistoryRecords(idClinicHistory);

	if (historial === false) return <div>No hay historial</div>;

	return (
		<div className="flex flex-col gap-4">
			{historial.map(({ nombreMedico, actualizadoEl }, key) => (
				<div key={`CLINICAL_HISTORY_RECORD_${key}`}>
					<RecordCard
						nombreMedico={nombreMedico}
						actualizadoEl={actualizadoEl}
					/>
				</div>
			))}
		</div>
	);
}

function RecordCard({
	nombreMedico,
	actualizadoEl,
}: {
	nombreMedico: string;
	actualizadoEl: string;
}) {
	return (
		<div className="border rounded-[10px] p-4 flex flex-col gap-2">
			<p className="text-[14px] font-[600] text-black">{nombreMedico}</p>
			<p className="text-[14px] font-[600] text-black">
				{new Date(actualizadoEl).toLocaleDateString()}
			</p>
		</div>
	);
}

function HistorialSkeleton() {
	return (
		<div className="flex flex-col gap-4 animate-pulse">
			<div className="border rounded-[10px] p-4 flex flex-col gap-2">
				<div className="h-4 w-28 bg-[#0095c4] rounded"></div>
				<div className="h-4 w-20 bg-[#0095c4] rounded"></div>
			</div>
			<div className="border rounded-[10px] p-4 flex flex-col gap-2">
				<div className="h-4 w-28 bg-[#0095c4] rounded"></div>
				<div className="h-4 w-20 bg-[#0095c4] rounded"></div>
			</div>
			<div className="border rounded-[10px] p-4 flex flex-col gap-2">
				<div className="h-4 w-28 bg-[#0095c4] rounded"></div>
				<div className="h-4 w-20 bg-[#0095c4] rounded"></div>
			</div>
			<div className="border rounded-[10px] p-4 flex flex-col gap-2">
				<div className="h-4 w-28 bg-[#0095c4] rounded"></div>
				<div className="h-4 w-20 bg-[#0095c4] rounded"></div>
			</div>
			<div className="border rounded-[10px] p-4 flex flex-col gap-2">
				<div className="h-4 w-28 bg-[#0095c4] rounded"></div>
				<div className="h-4 w-20 bg-[#0095c4] rounded"></div>
			</div>
			<div className="border rounded-[10px] p-4 flex flex-col gap-2">
				<div className="h-4 w-28 bg-[#0095c4] rounded"></div>
				<div className="h-4 w-20 bg-[#0095c4] rounded"></div>
			</div>
		</div>
	);
}
