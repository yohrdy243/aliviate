"use client";
import { ConsultationForm } from "../Forms/ConsultationForm";
import {
	DateInput,
	NumberInput,
	SelectDiagnisticAccepted,
	TextAreaInput,
	TextInput,
} from "../Inputs/CustomInputs";

import { useFormikContext } from "formik";
import { getPredictions } from "@/services/PredictionService";
import { useEffect, useState } from "react";
import { getConsultationsByClinicHistory } from "@/services/ConsultationService";
import { useLoading } from "@/utils/hooks/useLoading";

export default function Consultation({
	dni,
	idClinicHistory,
	haveConsultations,
	nombre,
}: {
	dni: string;
	idClinicHistory: string;
	nombre: string;
	haveConsultations: boolean;
}) {
	const { loading, charging, endCharging } = useLoading(true);
	const [consultation, setConsultation] = useState<TConsultation[]>([]);
	const [consultationSelected, setConsultationSelected] =
		useState<TConsultation | null>(null);

	useEffect(() => {
		if (haveConsultations === true) {
			charging();
			getConsultationsByClinicHistory(idClinicHistory).then((reponse) => {
				if (reponse === false) {
					setConsultation([]);
				} else {
					setConsultation(reponse);
				}
				endCharging();
			});
		} else {
			endCharging();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dni, idClinicHistory]);

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
		<div>
			<div className="flex flex-col my-10 pt-10 px-16  justify-start w-full gap-1">
				<label className="text-left text-sm font-[400]">
					Seleccionar Consulta
				</label>
				<select
					className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					defaultValue={""}
					onChange={({ target: { value } }) => {
						if (value === "") {
							setConsultationSelected(null);
						} else {
							setConsultationSelected(consultation![parseInt(value)]);
						}
					}}
				>
					<option value={""}>Nuevo Analisis de Laboratorio</option>
					{consultation.map(({ id }, index) => (
						<option key={`${id}`} value={index}>
							{`Consulta N° ${index + 1}`}
						</option>
					))}
				</select>
			</div>
			<div className="flex justify-center items-center pb-10">
				<h2 className="font-[600] text-[32px] uppercase">
					FORMATO CONSULTA ADULTO
				</h2>
			</div>
			<ConsultationForm
				idClinicHistory={idClinicHistory}
				consultationSelected={consultationSelected}
				hasConsultations={haveConsultations}
				dni={dni}
				name={nombre}
			>
				<div className="grid grid-cols-2 px-16 gap-8 pb-10">
					<div className="col-span-1">
						<div className="flex flex-col gap-2">
							<TextInput
								label="Nombre Completo"
								name="nombreCompletoPaciente"
							/>
							<TextAreaInput
								label="Descripcion Enfermedad Paciente"
								name="descripcionEnfermedadPaciente"
							/>
							<NumberInput label="Tiempo Enfermedad" name="tiempoEnfermedad" />
							<TextInput label="Apetito" name="apetito" />
							<TextInput label="Sed" name="sed" />
							<TextInput label="Sueño" name="suenio" />
							<TextInput label="Estado de Animo" name="estadoAnimo" />
							<TextInput label="Otro detalle" name="otroDetalle" />
							<TextInput label="Orina" name="orina" />
							<TextInput label="Deposiciones" name="deposiciones" />
							<NumberInput label="Temperatura" name="temperatura" />

							<div className="flex justify-end py-4">
								<GenerateDiagnisticButton />
							</div>
						</div>
						<div>
							<div>
								<h2 className="font-[700] text-[14px] py-4">
									DIAGNOSTICO ASISTIDO
								</h2>
								<RenderPrediction />
							</div>
						</div>
					</div>
					<div className="col-span-1">
						<div className="grid grid-cols-2 gap-4">
							<NumberInput label="PA" name="pA" />
							<NumberInput label="FC" name="FC" />
							<NumberInput label="FR" name="FR" />
							<NumberInput label="Peso" name="peso" />
							<NumberInput label="Talla" name="talla" />
							<NumberInput label="IMC" name="iMC" />
						</div>
						<div className="flex flex-col gap-4 py-8">
							<TextAreaInput label="Diagnostico" name="diagnostico" />
							<TextAreaInput label="Tratamiento" name="tratamiento" />
							<TextAreaInput
								label="Examenes Auxiliares"
								name="examenesAuxiliares"
							/>
							<div className="flex py-5 flex-col gap-4">
								<DateInput label="Proxima cita" name="proximaCita" />
								<div className="flex gap-8">
									<p className="text-sm">Atendido por:</p>
									<p className="text-sm">{nombre}</p>
								</div>
							</div>
							<TextAreaInput label="Observaciones" name="observaciones" />
						</div>
					</div>
				</div>
			</ConsultationForm>
		</div>
	);
}

function GenerateDiagnisticButton() {
	const { setFieldValue, values } = useFormikContext<TConsultationForm>();

	if (
		values.nombreCompletoPaciente != "" &&
		values.descripcionEnfermedadPaciente != "" &&
		values.tiempoEnfermedad > 0 &&
		values.apetito != "" &&
		values.sed != "" &&
		values.suenio != "" &&
		values.estadoAnimo != "" &&
		values.orina != "" &&
		values.deposiciones != "" &&
		values.temperatura > 0 &&
		values.pA > 0 &&
		values.FC > 0 &&
		values.FR > 0 &&
		values.peso > 0 &&
		values.talla > 0 &&
		values.iMC > 0
	) {
		return (
			<button
				className="w-full bg-[#7800D7] text-white rounded-[10px] py-3 text-[14px] font-[600]"
				type="button"
				onClick={async () => {
					const response = await getPredictions({
						idHistoriaClinica: values.idHistoriaClinica,
						nombreCompletoPaciente: values.nombreCompletoPaciente,
						descripcionEnfermedadPaciente: values.descripcionEnfermedadPaciente,
						tiempoEnfermedad: values.tiempoEnfermedad,
						apetito: values.apetito,
						sed: values.sed,
						suenio: values.suenio,
						estadoAnimo: values.estadoAnimo,
						orina: values.orina,
						deposiciones: values.deposiciones,
						temperatura: values.temperatura,
						signosSintomas: values.descripcionEnfermedadPaciente,
						pA: values.pA,
						FC: values.FC,
						FR: values.FR,
						peso: values.peso,
						talla: values.talla,
						iMC: values.iMC,
					});

					if (response !== false) {
						const diagonosticIA = response;
						setFieldValue("diagnosticoIA", diagonosticIA);
					}
				}}
			>
				GENERAR DIAGNOSTICO ALIVIATE
			</button>
		);
	}

	return (
		<button
			className="w-full bg-[#afb0b3] text-[#FFF] rounded-[10px] py-3 text-[14px] font-[600]"
			type="button"
		>
			GENERAR DIAGNOSTICO ALIVIATE
		</button>
	);
}

function RenderPrediction() {
	const { values, setFieldValue } = useFormikContext<TConsultationForm>();

	return (
		<div className="flex flex-col gap-2">
			{values.diagnosticoIA.map((diagnostico, index) => (
				<div
					className="bg-[#D4D4D4] px-8 py-2 flex justify-between items-center"
					key={`diagnistic_${index}`}
				>
					<p className="font-[600]">{diagnostico.enfermedad}</p>
					<div className="flex gap-6">
						<p className="font-[600]">{diagnostico.probabilidad * 100}%</p>
						<SelectDiagnisticAccepted
							name={`diagnosticoIA[${index}].esAceptado`}
							initialValue={diagnostico.esAceptado}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
