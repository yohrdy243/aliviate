"use client";
import ClinicHistoryModal from "@/components/ClinicalHistory/ClinicalHistoryModal";
import ConsultationTable from "@/components/Consultation/ConsultationTable";
import React, { useEffect, useState } from "react";

export default function Page() {
	const [dni, setDni] = React.useState<string>("");

	return (
		<>
			<div className="w-full">
				<section className="p-16">
					<div className="bg-[#FFF] flex flex-col rounded-[10px]">
						<div className="flex justify-between items-center p-4 w-full">
							<div className="flex gap-20 items-center pl-4">
								<div>
									<h3 className="text-[24px] font-[700]">Consultas</h3>
								</div>
								<div>
									<input
										type="text"
										className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
										placeholder="Busqueda por DNI"
										value={dni}
										onChange={(e) => setDni(e.target.value)}
									/>
								</div>
							</div>
							<div>
								<ClinicHistoryModal />
							</div>
						</div>
						<ConsultationTable
							dni={dni.length === 0 ? undefined : dni}
							type="all"
						/>
					</div>
				</section>
			</div>
		</>
	);
}
