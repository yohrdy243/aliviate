import { Suspense } from "react";
import OffCanvas from "../Layout/OffCanvas";
import { getFilesReference } from "@/services/DocumentService";


export default function LaboratoryAnalisisFilesOffCanvas({
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
			<Suspense fallback={<FilesSkeleton />}>
				<LaboratoryAnalisisFiles idClinicHistory={idClinicHistory} />
			</Suspense>
		</OffCanvas>
	);
}

async function LaboratoryAnalisisFiles({
	idClinicHistory,
}: {
	idClinicHistory: string;
}) {
	const files = await getFilesReference(idClinicHistory);

	if (files === false) return <div>No hay historial</div>;

	return (
		<div className="flex flex-col gap-4">
			{files.map(({ url }, index) => (
				<div key={`CLINICAL_HISTORY_RECORD_${index}`}>
					<FileCard number={index + 1} url={url} />
				</div>
			))}
		</div>
	);
}

function FileCard({ number, url }: { number: number; url: string }) {
	return (
		<div className="border rounded-[10px] p-4 flex flex-col gap-2">
			<p className="text-[14px] font-[600] text-black">Analisis N°{number}</p>
			<a
				className="text-[14px] font-[400] hover:text-blue-600 hover:underline"
				href={url}
				target="_blank"
			>
				Descargar Documento
			</a>
		</div>
	);
}

function FilesSkeleton() {
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
