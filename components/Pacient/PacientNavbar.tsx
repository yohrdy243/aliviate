import { getPatients } from "@/services/PatientService";
import React from "react";

export default async function PacientNavbar({ dni }: { dni: string }) {
	const result = await getPatients(dni);
	const name = result ? `${result[0].nombre} ${result[0].apellido}` : "";
	return (
		<div className="w-full flex py-4 px-8 bg-white">
			<p className="text-[20px] font-[500] text-[#00A3D7]">{`Paciente: `}</p>
			<p className="text-[20px] font-[800] text-black">{name}</p>
		</div>
	);
}

export function PacientNavbarSkeleton() {
	return (
		<div className="w-full flex py-4 px-8 gap-2 bg-white animate-pulse">
			<div className="h-4 w-28 bg-[#0095c4] rounded"></div>
			<div className="h-4 w-20 bg-[#0095c4] rounded"></div>
		</div>
	);
}
