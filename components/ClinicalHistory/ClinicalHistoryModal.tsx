"use client";
import useModal from "@/utils/hooks/useModal";
import React, { Fragment, useEffect, useState } from "react";
import Modal from "../Layout/Modal";
import Input from "../Inputs/Inputs";
import { TClinicHistoryTable } from "@/models/TClinicHistory";
import ClinicalHistories from "./ClinicalHistories";
import { getClinicalHistories } from "@/services/ClinicHistoryService";
import Link from "next/link";

function Button({ onClick }: { onClick: () => void }) {
	return (
		<button
			className="w-full bg-[#00A3D7] text-[#fff] rounded-[10px] py-3 px-4 text-[14px] font-[600]"
			onClick={onClick}
		>
			NUEVA CONSULTA
		</button>
	);
}

export type TSearchParamns = {
	idClinicHistory: string;
	dni: string;
	idLaboratoryAnalisis: string;
	haveConsultations: string;
};
export default function ClinicHistoryModal() {
	const { visible, open, close } = useModal();
	const [dni, setDni] = useState<string>("");
	const [clinicalHistories, setClinicalHistories] = useState<
		TClinicHistoryTable[]
	>([]);
	const [dataSelected, setDataSelected] = useState<TSearchParamns>({
		idClinicHistory: "",
		dni: "",
		idLaboratoryAnalisis: "",
		haveConsultations: "",
	});

	useEffect(() => {
		if (dni.length === 8) {
			getClinicalHistories(dni).then((response) => {
				if (response === false) {
					setClinicalHistories([]);
				} else {
					setClinicalHistories(response);
				}
			});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dni]);

	if (!visible) return <Button onClick={open} />;

	return (
		<Fragment>
			<Modal
				isOpen={visible}
				handleClose={close}
				title={"Asociar a Historia Clinica"}
			>
				<div className="flex flex-col h-full justify-between">
					<div>
						<Input
							name="dni"
							type="number"
							value={dni}
							placeholder="Ingrese los 8 Digitos del DNI para buscar la historia clinica"
							onChange={(element) => {
								const value = element.target.value;
								setDni(value);
								value.length === 8 &&
									setDataSelected((prevState) => ({
										...prevState,
										dni: value,
									}));
							}}
						/>
						<div className="flex flex-col mt-6 flex-grow overflow-y-auto">
							{dni.length === 8 ? (
								<ClinicalHistories
									clinicalHistories={clinicalHistories}
									setSelected={setDataSelected}
								/>
							) : null}
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<Link href={`/app/nuevahistoriaclinica/`}>
							<button className="w-full bg-white text-[#00A3D7] border border-[#00A3D7] rounded-[10px] py-4 px-4 text-[14px] font-[600]">
								NUEVA HISTORIA CLINICA
							</button>
						</Link>
						{dataSelected.idClinicHistory !== "" ? (
							<Link
								href={`/app/paciente?dni${
									dataSelected.dni ? `=${dataSelected.dni}` : ""
								}&idClinicHistory${
									dataSelected.idClinicHistory
										? `=${dataSelected.idClinicHistory}`
										: ""
								}
								&idLaboratoryAnalisis${
									dataSelected.idLaboratoryAnalisis
										? `=${dataSelected.idLaboratoryAnalisis}`
										: ""
								}&haveConsultations=${dataSelected.haveConsultations}
								`}
							>
								<button className="w-full bg-[#00A3D7] text-[#fff] rounded-[10px] py-4 px-4 text-[14px] font-[600]">
									CONTINUAR
								</button>
							</Link>
						) : (
							<button className="w-full bg-gray-400 text-gray-100 rounded-[10px] py-4 px-4 text-[14px] font-[600] mb-4">
								CONTINUAR
							</button>
						)}
					</div>
				</div>
			</Modal>
			<Button onClick={open} />
		</Fragment>
	);
}
