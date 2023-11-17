"use client";
import {
	DateInput,
	DateTimeInput,
	NoSpecifyInput,
	NumberInput,
	SelectInput,
	TextAreaInput,
	TextInput,
	ToggleInput,
} from "@/components/Inputs/CustomInputs";

import { TClinicHistory } from "@/models/TClinicHistory";
import { getClinicalHistoryById } from "@/services/ClinicHistoryService";
import { useLoading } from "@/utils/hooks/useLoading";
import { useEffect, useState } from "react";
import { ClinicHistoryForm } from "../Forms/ClinicHistoryForm";
import ClinicalHistoryRecords from "./ClinicalHistoryRecords";

export default function ClinicalHistory({
	idClinicHistory,
	dni,
}: {
	idClinicHistory: string;
	dni: string;
}) {
	const [clinicHistory, setClinicHistory] = useState<TClinicHistory | null>(
		null
	);

	const { loading, charging, endCharging } = useLoading(true);

	useEffect(() => {
		charging();
		getClinicalHistoryById(idClinicHistory).then((response) => {
			if (response === false) {
				setClinicHistory(null);
			} else {
				setClinicHistory(response);
			}
			endCharging();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idClinicHistory]);

	if (loading) {
		return (
			<div className="w-full h-screen flex justify-center items-center">
				<svg
					aria-hidden="true"
					className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
				<span className="sr-only">Loading...</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<h2 className="font-[600] text-[32px] my-10 text-center">
				FORMATO DE ATENCIÓN INTEGRAL DEL ADULTO
			</h2>
			<div className="flex w-full justify-end px-16">
				<ClinicalHistoryRecords idClinicHistory={idClinicHistory} />
			</div>

			<ClinicHistoryForm clinicHistory={clinicHistory} dni={dni}>
				<div className="px-16">
					<div className="flex justify-between pt-10 gap-96">
						<DateTimeInput label="Fecha y hora" name="fechaRegistro" />
						<TextInput label="N° H.C." name="id" />
					</div>
					<div className="w-full pt-10">
						<h2 className="font-[700]">DATOS GENERALES</h2>
						<div className="grid grid-cols-3 grid-rows-4 gap-4 pt-6">
							<div className="col-span-3 row-span-1 grid grid-cols-3 grid-rows-1 gap-6">
								<TextInput label="DNI" name="dni" />
								<TextInput label="Apellidos" name="apellidos" />
								<TextInput label="Nombres" name="nombres" />
							</div>

							<div className="col-span-3 row-span-1 grid grid-cols-3 grid-rows-1 gap-6">
								<SelectInput
									label="Grado de Instruccion"
									name="gradoInstitucion"
									items={[
										{ value: 0, label: "Ninguno" },
										{ value: 1, label: "Primaria" },
										{ value: 2, label: "Secundaria" },
										{ value: 3, label: "Superior" },
									]}
								/>
								<SelectInput
									label="Estado Civil"
									name="estadoCivil"
									items={[
										{ value: 1, label: "Soltero" },
										{ value: 2, label: "Casado" },
										{ value: 3, label: "Divorciado" },
										{ value: 4, label: "Viudo" },
									]}
								/>

								<div className="col-span-1 row-span-1 grid grid-cols-2 gap-6">
									<SelectInput
										label="Sexo"
										name="sexo"
										items={[
											{ value: 1, label: "Masculino" },
											{ value: 2, label: "Femenino" },
										]}
									/>
									<NumberInput label="Edad" name="edad" maxLength={2} />
								</div>
							</div>

							<div className="col-span-3 row-span-1 grid grid-cols-3 grid-rows-1 gap-6">
								<div className="col-span-2 row-span-1 grid grid-cols-2  gap-6">
									<TextInput label="Direccion" name="direccion" />
									<TextInput label="Ocupacion" name="ocupacion" />
								</div>
								<div className="col-span-1 row-span-1 grid grid-cols-2 gap-6">
									<DateInput
										label="Fecha de Nacimiento"
										name="fechaNacimiento"
									/>
									<SelectInput
										label="Grupo Sanguineo"
										name="grupoSanguineo"
										items={[
											{ value: "Apositivo", label: "A positivo (A +)	" },
											{ value: "Anegativo", label: "A negativo (A-)	" },
											{ value: "Bpositivo", label: "B positivo (B +)	" },
											{ value: "Bnegativo", label: "B negativo (B-)	" },
											{ value: "ABpositivo", label: "AB positivo (AB +)	" },
											{ value: "ABnegativo", label: "AB negativo (AB-)	" },
											{ value: "Opositivo", label: "O positivo (O +)	" },
											{ value: "Onegativo", label: "O negativo (O-)	" },
										]}
									/>
								</div>
							</div>

							<div className="col-span-3 row-span-1 grid grid-cols-3 gap-6">
								<div className="col-span-2 row-span-1 gap-6"></div>
							</div>
						</div>
					</div>
					<div className="w-full pt-10 border-b-2 border-b-black pb-6">
						<h2 className="font-[700]">ANTECEDENTES</h2>
						<div className="flex justify-center">
							<div className="grid grid-cols-3 grid-rows-1 gap-20 pt-6">
								<div className="col-span-1 flex flex-col">
									<div className="text-center pb-4">
										<p className="text-[14px] font-[700]">Personales</p>
									</div>
									<ToggleInput label="Tuberculosis" name="tuvoTuberculosis" />
									<ToggleInput
										label="Inf Transmision Sexual"
										name="tieneInfTransSex"
									/>
									<ToggleInput
										label="VIH - SIDA - Hepatitis"
										name="vihSidaHepatitis"
									/>
									<ToggleInput label="Diabetes" name="tieneDiabetes" />
									<ToggleInput label="HTA" name="tieneHta" />
									<ToggleInput label="Sobrepeso" name="tieneSobrepeso" />
									<ToggleInput label="Infarto Cardiaco" name="tieneInfarto" />
									<ToggleInput
										label="Dislipenia (Colesterol)"
										name="tieneDislipenia"
									/>
									<ToggleInput
										label="Enf. Renal Glaucoma"
										name="tieneInfRenalGlaucoma"
									/>
									<ToggleInput
										label="Depresion Esquizofrenia"
										name="tieneDepresionEsquizofrenia"
									/>
									<TextAreaInput label="Antecedentes" name="antecedentes" />
								</div>
								<div className="col-span-1 flex flex-col gap-2">
									<div className="text-center pb-4">
										<p className="text-[14px] font-[700]">Personales</p>
									</div>
									<ToggleInput
										label="Transfuciones de Sangre"
										name="tieneHospitaliacionTransfusiones"
									/>
									<ToggleInput
										label="Consumo de Tabaco"
										name="tieneConsumoTabaco"
									/>
									<ToggleInput
										label="Consumo de alcohol"
										name="tieneConsumoAlcohol"
									/>
									<ToggleInput
										label="Consumo de drogas"
										name="tieneConsumoDrogas"
									/>
									<ToggleInput
										label="Intervención Quirurgica"
										name="tieneInterQuirurjica"
									/>
									<ToggleInput label="Riesgo" name="tieneRiesgo" />
									<ToggleInput label="Violencia" name="tieneViolencia" />
									<NoSpecifyInput label="Discapacidad" name="dispacidad" />
									<TextInput label="Cancer" name="cancer" />
								</div>
								<div className="col-span-1 flex flex-col">
									<div className="text-center pb-4">
										<p className="text-[14px] font-[700]">Familiares</p>
									</div>
									<ToggleInput label="VIH - SIDA" name="tieneSid" />
									<ToggleInput label="ITS" name="tieneITS" />
									<ToggleInput label="Hepapitis" name="tieneHepatitis" />
									<ToggleInput label="DBM" name="tieneDbm" />
									<ToggleInput label="Depresión" name="tieneDepresion" />
									<ToggleInput label="Cáncer" name="tieneCancer" />
									<ToggleInput
										label="Prob.Psiquiatricos"
										name="tieneProbPsiquiatricos"
									/>
									<TextAreaInput label="Otros" name="otros" />
								</div>
							</div>
						</div>
					</div>
					<div className="w-full pt-10 border-b-2 border-b-black pb-6">
						<div className="grid grid-cols-3 grid-rows-5 gap-4">
							<div className="col-span-2 row-span-1">
								<NoSpecifyInput
									label="Reaccion alérgica a medicamentos"
									name="reaccionMedicamentos"
								/>
							</div>
							<div className="col-span-2 row-span-1">
								<NoSpecifyInput
									label="Medicamentos de uso frecuente"
									name="medicamenteFrecuente"
								/>
							</div>
							<div className="col-span-1 row-span-1 flex items-end gap-4">
								<NoSpecifyInput label="Menarquia" name="menarquia" />
							</div>
							<div className="col-span-1 row-span-1">
								<TextInput
									label="Edad Inicio Relacion Sexual"
									name="edadInicioRelacionSexual"
								/>
							</div>
							<div className="col-span-1 row-span-1">
								<TextInput
									label="Numero de Parejas Sexuales"
									name="numParejas"
								/>
							</div>
							<div className="col-span-1 row-span-1">
								<TextInput label="Hijos Vivos" name="hijosVivos" />
							</div>
							<div className="col-span-1 row-span-1">
								<ToggleInput
									label="RS Personas del Mismo Sexo"
									name="rsMismoSexo"
								/>
							</div>
							<div className="col-span-1 row-span-1">
								<ToggleInput
									label="Flujo Vaginal Patologico"
									name="flujoVagPatologico"
								/>
							</div>
							<div className="col-span-1 row-span-1">
								<ToggleInput label="Dismenorrea" name="dismenorrea" />
							</div>
							<div className="col-span-1 row-span-1">
								<ToggleInput label="Embarazo" name="tieneEmbarazo" />
							</div>
							<div className="col-span-1 row-span-1">
								<ToggleInput label="Parto" name="tieneParto" />
							</div>
							<div className="col-span-1 row-span-1">
								<ToggleInput label="Prematuro" name="tienePrematuro" />
							</div>
							<div className="col-span-1 row-span-1">
								<ToggleInput label="Tiene Aborto" name="tieneAborto" />
							</div>
							<div className="col-span-1 row-span-1">
								<NoSpecifyInput label="Gestacion" name="gestacion" />
							</div>
						</div>
					</div>
					<div className="w-full py-10 border-b-2 border-b-black pb-6">
						<div className="grid grid-cols-3 gap-16">
							<div className="col-span-1">
								<div>
									<p className="text-[14px] font-[700] py-4">Cada consulta</p>
									<ToggleInput
										label="Fiebre Ultimos 15 Dias"
										name="tieneFiebre15Dias"
									/>
									<ToggleInput
										label="Tos mas de 15 dias"
										name="tieneTos15Dias"
									/>
									<NoSpecifyInput
										label="Lesion Genital"
										name="lesionesGenitales"
									/>
								</div>
								<div>
									<p className="text-[14px] font-[700] py-4">Fisico</p>
									<div className="flex flex-col gap-2">
										<TextInput
											label="Indice masa corporal"
											name="indiceMasaCorporal"
										/>
									</div>
								</div>
								<div>
									<p className="text-[14px] font-[700] py-4">
										Presion Arterial
									</p>
									<div className="flex flex-col gap-2">
										<NumberInput
											label="Presion arterial superior"
											name="presionArterial.valorSuperior"
										/>
										<NumberInput
											label="Presion arterial inferior"
											name="presionArterial.valoreInferior"
										/>
									</div>
								</div>

								<div>
									<p className="text-[14px] font-[700] py-4">Vacunas</p>
									<ToggleInput
										label="Antitetánica (3 dosis)"
										name="tieneVacAntitetanica"
									/>
									<ToggleInput
										label="Antiamarílica"
										name="tieneVacAntiamerilica"
									/>
									<ToggleInput
										label="Antihepatitis B (3 dosis)"
										name="tieneVacAntihepatitisB"
									/>
								</div>
								<div>
									<p className="text-[14px] font-[700] py-4">Examen Bucal</p>
									<ToggleInput label="Encías" name="tieneEncias" />
									<ToggleInput label="Carie Bucal" name="tieneCaries" />
									<ToggleInput
										label="Edentulimo Parcial"
										name="tieneEdentulismoParcial"
									/>
									<ToggleInput
										label="Edentulimo Total"
										name="tieneEdentulismoTotal"
									/>
									<ToggleInput
										label="Urgente Tramiento Bucal"
										name="tieneUrgTratamientoBucal"
									/>
								</div>
							</div>
							<div className="col-span-1">
								<div>
									<p className="text-[14px] font-[700] py-4">Examen</p>
									<div className="flex flex-col gap-2">
										<ToggleInput
											label="Visual (> 40 años)"
											name="tieneExamVisual"
										/>
										<ToggleInput
											label="Colesterol (> 45 años)"
											name="tieneExamColesterol"
										/>
										<ToggleInput label="De glucosa" name="tieneExamGlucosa" />
										<ToggleInput label="De Mamas" name="tieneExamMamas" />
										<ToggleInput label="De Prostata" name="tieneExamProstata" />
										<ToggleInput
											label="Mamografía (>50 años, C/n a)"
											name="tieneExamMamografia"
										/>
										<ToggleInput
											label="Pélvico y PAP (C/año, C/3 a)"
											name="tieneExamPelvicoPap"
										/>
									</div>
								</div>
								<div>
									<p className="text-[14px] font-[700] py-4">Psicosocial</p>
									<ToggleInput label="Ansiedad" name="tieneAnsiedad" />
								</div>
								<div>
									<p className="text-[14px] font-[700] py-4">Psicosocial</p>
									<ToggleInput label="Actividad Fisica" name="tieneHabFisica" />
									<ToggleInput label="Uso de alcohol" name="tieneHabAlcohol" />
									<ToggleInput
										label="Uso de otras drogas"
										name="tieneHabDrogas"
									/>
								</div>
								<div>
									<p className="text-[14px] font-[700] py-4">Sexualidad</p>
									<ToggleInput
										label="Planificacion Familiar"
										name="tienePlanificacionSexual"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-center pt-6 py-10">
						<button
							className="w-full bg-[#00A3D7] text-[#fff] rounded-[10px] py-3 text-[14px] font-[600]"
							type="submit"
						>
							ACTUALIZAR HISTORIA CLINICA
						</button>
					</div>
				</div>
			</ClinicHistoryForm>
		</div>
	);
}
