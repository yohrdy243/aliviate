import React from "react";
import OffCanvas from "../Layout/OffCanvas";

function TextField({ label, value }: { label: string; value: string }) {
	return (
		<div className="relative">
			<input
				type="text"
				className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-[#9AAFC3] appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
				value={value}
				disabled
			/>

			<label className="absolute text-sm text-[#9AAFC3] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
				{label}
			</label>
		</div>
	);
}
function TextInputField({ label, value }: { label: string; value: string }) {
	return (
		<div className="relative">
			<textarea
				className="block min-h-[200px] px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-[#9AAFC3] appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
				value={value}
				disabled
			/>
			<label className="absolute text-sm text-[#9AAFC3] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
				{label}
			</label>
		</div>
	);
}

export default function ConsultationOffCanvas({
	visible,
	close,
	id,
	diagnostic,
	diagnosticIA,
}: {
	visible: boolean;
	close: () => void;
	id: string;
	diagnostic: string;
	diagnosticIA: string;
}) {
	return (
		<OffCanvas
			title="Diagnostico de Consulta"
			isOpen={visible}
			handleClose={close}
		>
			<div className="flex flex-col gap-6">
				<TextField label="ID Consulta" value={id} />
				<TextInputField label="Diagnostico del Medico" value={diagnostic} />
				<TextInputField label="Diagnostico Aliviate" value={diagnosticIA} />
			</div>
		</OffCanvas>
	);
}
