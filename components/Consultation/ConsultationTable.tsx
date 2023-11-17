"use client";
import { getConsultations } from "@/services/ConsultationService";
import useModal from "@/utils/hooks/useModal";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import Medical from "../Icons/Medical";
import ConsultationOffCanvas from "./ConsultationOffCanvas";

const columns: { title: string; key: string; isDate?: boolean }[] = [
	{
		title: "Paciente",
		key: "nombreCompletoPaciente",
	},
	{
		title: "Atendido por", // the endpoint don't return this field
		key: "nombreMedico", // in this case we can use the idMedico to get the name of the doctor
	},
	{
		title: "Motivo de Consulta",
		key: "descripcionEnfermedadPaciente",
	},
	{
		title: "ID Historia Clinica",
		key: "idHistoriaClinica",
	},
	{
		title: "Fecha",
		key: "fechaRegistro",
		isDate: true,
	},
];

export default function ConsultationTable({
	dni,
	type = "all",
}: {
	dni?: string;
	type?: "all" | "delete";
}) {
	const { visible, open, close } = useModal();
	const [consultations, setConsultations] = useState<TConsultation[]>([]);
	const [consultationSelected, setConsultationSelected] = useState<
		TConsultation | undefined
	>();
	useEffect(() => {
		if (dni !== undefined) {
			if (dni.length === 8) {
				getConsultations(dni).then((response) => {
					if (response !== false) {
						setConsultations(response);
					}
				});
			}
		} else {
			getConsultations().then((response) => {
				if (response !== false) {
					setConsultations(response);
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dni]);

	function closeAndClear() {
		close();
		setConsultationSelected(undefined);
	}

	function setAndOpen(consultation: TConsultation) {
		setConsultationSelected(consultation);
		open();
	}
	return (
		<>
			<table className="table-auto mt-4 w-full">
				<thead className="bg-[#BDD3FF] px-8">
					<tr>
						{columns.map(({ title }, index) => (
							<th
								className={`py-4 text-[13px] font-[700] text-left ${
									index === 0 && "pl-16"
								}`}
								key={`COLUMN_${title}_${index}`}
							>
								{title}
							</th>
						))}
						<th className="py-4 text-[13px] font-[600] text-left">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{consultations.map((consultation, rowIndex) => (
						<tr className="border-b" key={`CONSULTAS_${rowIndex}`}>
							{columns.map(({ key, isDate }, columnIndex) => {
								const value =
									consultation[key as keyof typeof consultation]?.toString() ||
									"";

								return (
									<td
										className={`${
											columnIndex === 0 && "pl-16"
										} py-4 text-[13px] font-[400]`}
										key={`${consultation.id}_${key}_${columnIndex}`}
									>
										{isDate
											? new Date(value).toLocaleDateString("es-PE", {
													day: "2-digit",
													month: "long",
													year: "numeric",
											  })
											: value}
									</td>
								);
							})}

							{type === "all" ? (
								<td className="flex py-4 gap-3 text-[25px] items-center">
									<div onClick={() => setAndOpen(consultation)}>
										<AiOutlineEye />
									</div>
									<Medical />
								</td>
							) : (
								type === "delete" && <BsFillTrash3Fill />
							)}
						</tr>
					))}
				</tbody>
			</table>
			<ConsultationOffCanvas
				id={consultationSelected?.id || ""}
				diagnostic={consultationSelected?.diagnostico || ""}
				diagnosticIA={
					consultationSelected?.diagnosticoIA
						.map(
							(disgnostic) =>
								`${disgnostic.enfermedad} (${
									disgnostic.probabilidad * 100
								}%) \n`
						)
						.toString()
						.replace(",", "") || ""
				}
				visible={visible}
				close={closeAndClear}
			/>
		</>
	);
}
