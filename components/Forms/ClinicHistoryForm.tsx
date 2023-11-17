"use client";
import { TClinicHistory, TClinicHistoryForm } from "@/models/TClinicHistory";
import {
	saveClinicalHistory,
	updateClinicalHistory,
} from "@/services/ClinicHistoryService";
import { getPatients } from "@/services/PatientService";
import { useLoading } from "@/utils/hooks/useLoading";
import {
	parseDateStringToInputDate,
	parseDateStringToInputDatetime,
} from "@/utils/functions/parse";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik, FormikErrors } from "formik";
import Swal from "sweetalert2";

const initialStateClinicHistory: TClinicHistoryForm = {
	fechaRegistro: "",
	// Propiedades Adicionales del Paciente
	id: "",
	nombres: "",
	apellidos: "",
	sexo: 0,
	edad: 0,
	lugarNacimiento: "",
	procedencia: "",
	fechaNacimiento: "",
	grupoSanguineo: "",
	dni: 0,
	// Propiedades Adicionales del Paciente

	idMedico: "7cAABnKy9238MUcmabnyR5",
	idPaciente: "",
	estadoCivil: 0,
	gradoInstitucion: 0,
	ocupacion: "",
	direccion: "",
	idDistrito: 1,
	tuvoTuberculosis: false,
	tieneInfTransSex: false,
	tieneDiabetes: false,
	tieneHta: false,
	tieneSobrepeso: false,
	tieneInfarto: false,
	tieneDislipenia: false,
	tieneInfRenalGlaucoma: false,
	tieneDepresionEsquizofrenia: false,
	antecedentes: "",
	tieneHospitaliacionTransfusiones: false,
	dispacidad: "",
	tieneConsumoTabaco: false,
	tieneConsumoAlcohol: false,
	tieneConsumoDrogas: false,
	tieneInterQuirurjica: false,
	cancer: "",
	tieneRiesgo: false,
	tieneViolencia: false,
	tieneSid: false,
	tieneITS: false,
	tieneHepatitis: false,
	tieneDbm: false,
	tieneCancer: false,
	tieneDepresion: false,
	tieneProbPsiquiatricos: false,
	otros: "",
	reaccionMedicamentos: "",
	medicamenteFrecuente: "",
	edadInicioRelacionSexual: 0,
	numParejas: 0,
	hijosVivos: 0,
	rsMismoSexo: false,
	menarquia: "",
	flujoVagPatologico: false,
	dismenorrea: false,
	tieneEmbarazo: false,
	tieneParto: false,
	tienePrematuro: false,
	tieneAborto: false,
	gestacion: "",
	tieneFiebre15Dias: false,
	tieneTos15Dias: false,
	lesionesGenitales: "",
	presionArterial: {
		valorSuperior: 0,
		valoreInferior: 0,
	},
	tieneVacAntitetanica: false,
	tieneVacAntiamerilica: false,
	tieneVacAntihepatitisB: false,
	tieneEncias: false,
	tieneCaries: false,
	tieneEdentulismoParcial: false,
	tieneEdentulismoTotal: false,
	tieneUrgTratamientoBucal: false,
	tieneAnsiedad: false,
	tieneExamVisual: false,
	tieneExamColesterol: false,
	tieneExamGlucosa: false,
	tieneExamMamas: false,
	tieneExamProstata: false,
	tieneExamPelvicoPap: false,
	tieneExamMamografia: false,
	tieneHabFisica: false,
	tieneHabAlcohol: false,
	tieneHabDrogas: false,
	tienePlanificacionSexual: false,
};

function formDataToClinicHistory({
	idPaciente,
	idMedico,
	estadoCivil,
	gradoInstitucion,
	ocupacion,
	direccion,
	idDistrito,
	tuvoTuberculosis,
	tieneInfTransSex,
	tieneDiabetes,
	tieneHta,
	tieneSobrepeso,
	tieneInfarto,
	tieneDislipenia,
	tieneInfRenalGlaucoma,
	tieneDepresionEsquizofrenia,
	antecedentes,
	dispacidad,
	tieneConsumoTabaco,
	tieneConsumoAlcohol,
	tieneConsumoDrogas,
	tieneInterQuirurjica,
	cancer,
	tieneRiesgo,
	tieneViolencia,
	tieneSid,
	tieneITS,
	tieneHepatitis,
	tieneDbm,
	tieneCancer,
	tieneDepresion,
	tieneProbPsiquiatricos,
	otros,
	reaccionMedicamentos,
	medicamenteFrecuente,
	edadInicioRelacionSexual,
	numParejas,
	hijosVivos,
	rsMismoSexo,
	menarquia,
	flujoVagPatologico,
	dismenorrea,
	tieneEmbarazo,
	tieneParto,
	tienePrematuro,
	tieneAborto,
	gestacion,
	tieneFiebre15Dias,
	tieneTos15Dias,
	lesionesGenitales,
	presionArterial,
	tieneVacAntitetanica,
	tieneVacAntiamerilica,
	tieneVacAntihepatitisB,
	tieneEncias,
	tieneCaries,
	tieneEdentulismoParcial,
	tieneEdentulismoTotal,
	tieneUrgTratamientoBucal,
	tieneAnsiedad,
	tieneExamVisual,
	tieneExamColesterol,
	tieneExamGlucosa,
	tieneExamMamas,
	tieneExamProstata,
	tieneExamPelvicoPap,
	tieneExamMamografia,
	tieneHabFisica,
	tieneHabAlcohol,
	tieneHabDrogas,
	tieneHospitaliacionTransfusiones,
	tienePlanificacionSexual,
}: TClinicHistoryForm): TClinicHistory {
	let menarquiaData = { edad: 0, aplica: false };
	let gestacionData = { meses: 0, tiene: false };

	if (menarquia !== "") {
		menarquiaData = { edad: parseInt(menarquia), aplica: true };
	}
	if (gestacion !== "") {
		gestacionData = { meses: parseInt(gestacion), tiene: true };
	}

	let clinicHistory: TClinicHistory = {
		fechaRegistro: "",
		id: "",
		idMedico: idMedico,
		idPaciente,
		estadoCivil: parseInt(estadoCivil.toString()),
		gradoInstitucion: parseInt(gradoInstitucion.toString()),
		ocupacion,
		direccion,
		idDistrito,
		tuvoTuberculosis,
		tieneInfTransSex,
		tieneDiabetes,
		tieneHta,
		tieneSobrepeso,
		tieneInfarto,
		tieneDislipenia,
		tieneInfRenalGlaucoma,
		tieneDepresionEsquizofrenia,
		antecedentes: antecedentes.split(","),
		tieneConsumoTabaco,
		tieneConsumoAlcohol,
		tieneConsumoDrogas,
		tieneInterQuirurjica,
		cancer: cancer.split(","),
		tieneRiesgo,
		tieneViolencia,
		tieneSid,
		tieneITS,
		tieneHepatitis,
		tieneDbm,
		tieneCancer,
		tieneDepresion,
		tieneProbPsiquiatricos,
		otros: otros.split(","),
		reaccionMedicamentos: reaccionMedicamentos.split(","),
		medicamenteFrecuente: medicamenteFrecuente.split(","),
		edadInicioRelacionSexual: parseInt(edadInicioRelacionSexual.toString()),
		numParejas: parseInt(numParejas.toString()),
		hijosVivos: parseInt(hijosVivos.toString()),
		rsMismoSexo,
		menarquia: menarquiaData,
		flujoVagPatologico,
		dismenorrea,
		tieneEmbarazo,
		tieneParto,
		tienePrematuro,
		tieneAborto,
		gestacion: gestacionData,
		tieneFiebre15Dias,
		tieneTos15Dias,
		lesionesGenitales: lesionesGenitales.split(","),
		presionArterial,
		tieneVacAntitetanica,
		tieneVacAntiamerilica,
		tieneVacAntihepatitisB,
		tieneEncias,
		tieneCaries,
		tieneEdentulismoParcial,
		tieneEdentulismoTotal,
		tieneUrgTratamientoBucal,
		tieneAnsiedad,
		tieneExamVisual,
		tieneExamColesterol,
		tieneExamGlucosa,
		tieneExamMamas,
		tieneExamProstata,
		tieneExamPelvicoPap,
		tieneExamMamografia,
		tieneHabFisica,
		tieneHabAlcohol,
		tieneHabDrogas,
		tienePlanificacionSexual,
		tieneHospitaliacionTransfusiones,
		dispacidad: dispacidad.split(","),
	};

	return clinicHistory;
}

export function ClinicHistoryForm({
	children,
	clinicHistory,
	dni,
	type = "edit",
}: {
	children: React.ReactNode;
	clinicHistory: TClinicHistory | null;
	dni: string;
	type?: "new" | "edit";
}) {
	const router = useRouter();
	const [initialState, setInitialState] = useState<TClinicHistoryForm | null>(
		null
	);
	const { loading, charging, endCharging } = useLoading(
		type === "edit" ? true : false
	);

	useEffect(() => {
		if (type === "edit") {
			getPatients(dni).then((response) => {
				charging();
				if (response !== false) {
					if (clinicHistory !== null) {
						setInitialState({
							fechaRegistro: parseDateStringToInputDatetime(
								clinicHistory.fechaRegistro
							),
							id: clinicHistory.id,
							idMedico: clinicHistory.idMedico,
							nombres: response[0].nombre,
							apellidos: response[0].apellido,
							sexo: response[0].genero,
							edad: 0,
							lugarNacimiento: "",
							procedencia: "",
							fechaNacimiento: parseDateStringToInputDate(
								response[0].fechaNacimiento.toString()
							),
							grupoSanguineo: response[0].grupoSanguineo,
							dni: parseInt(dni),
							idPaciente: clinicHistory.idPaciente,
							estadoCivil: clinicHistory.estadoCivil,
							gradoInstitucion: clinicHistory.gradoInstitucion,
							ocupacion: clinicHistory.ocupacion,
							direccion: clinicHistory.direccion,
							idDistrito: clinicHistory.idDistrito,
							tuvoTuberculosis: clinicHistory.tuvoTuberculosis,
							tieneInfTransSex: clinicHistory.tieneInfTransSex,
							tieneDiabetes: clinicHistory.tieneDiabetes,
							tieneHta: clinicHistory.tieneHta,
							tieneSobrepeso: clinicHistory.tieneSobrepeso,
							tieneInfarto: clinicHistory.tieneInfarto,
							tieneDislipenia: clinicHistory.tieneDislipenia,
							tieneInfRenalGlaucoma: clinicHistory.tieneInfRenalGlaucoma,
							tieneDepresionEsquizofrenia:
								clinicHistory.tieneDepresionEsquizofrenia,
							antecedentes: clinicHistory.antecedentes.join(","),
							tieneHospitaliacionTransfusiones:
								clinicHistory.tieneHospitaliacionTransfusiones,
							dispacidad: clinicHistory.dispacidad.join(","),
							tieneConsumoTabaco: clinicHistory.tieneConsumoTabaco,
							tieneConsumoAlcohol: clinicHistory.tieneConsumoAlcohol,
							tieneConsumoDrogas: clinicHistory.tieneConsumoDrogas,
							tieneInterQuirurjica: clinicHistory.tieneInterQuirurjica,
							tieneRiesgo: clinicHistory.tieneRiesgo,
							tieneViolencia: clinicHistory.tieneViolencia,
							cancer: clinicHistory.cancer.join(","),
							tieneSid: clinicHistory.tieneSid,
							tieneITS: clinicHistory.tieneITS,
							tieneHepatitis: clinicHistory.tieneHepatitis,
							tieneDbm: clinicHistory.tieneDbm,
							tieneCancer: clinicHistory.tieneCancer,
							tieneDepresion: clinicHistory.tieneDepresion,
							tieneProbPsiquiatricos: clinicHistory.tieneProbPsiquiatricos,
							otros: clinicHistory.otros.join(","),
							reaccionMedicamentos:
								clinicHistory.reaccionMedicamentos.join(","),
							medicamenteFrecuente:
								clinicHistory.medicamenteFrecuente.join(","),
							edadInicioRelacionSexual: clinicHistory.edadInicioRelacionSexual,
							numParejas: clinicHistory.numParejas,
							hijosVivos: clinicHistory.hijosVivos,
							rsMismoSexo: clinicHistory.rsMismoSexo,
							menarquia: clinicHistory.menarquia.aplica
								? clinicHistory.menarquia.edad.toString()
								: "",
							flujoVagPatologico: clinicHistory.flujoVagPatologico,
							dismenorrea: clinicHistory.dismenorrea,
							tieneEmbarazo: clinicHistory.tieneEmbarazo,
							tieneParto: clinicHistory.tieneParto,
							tienePrematuro: clinicHistory.tienePrematuro,
							tieneAborto: clinicHistory.tieneAborto,
							gestacion: clinicHistory.gestacion.tiene
								? clinicHistory.gestacion.meses.toString()
								: "",
							tieneFiebre15Dias: clinicHistory.tieneFiebre15Dias,
							tieneTos15Dias: clinicHistory.tieneTos15Dias,
							lesionesGenitales: clinicHistory.lesionesGenitales.join(","),
							presionArterial: {
								valorSuperior: clinicHistory.presionArterial.valorSuperior,
								valoreInferior: clinicHistory.presionArterial.valoreInferior,
							},
							tieneVacAntitetanica: clinicHistory.tieneVacAntitetanica,
							tieneVacAntiamerilica: clinicHistory.tieneVacAntiamerilica,
							tieneVacAntihepatitisB: clinicHistory.tieneVacAntihepatitisB,
							tieneEncias: clinicHistory.tieneEncias,
							tieneCaries: clinicHistory.tieneCaries,
							tieneEdentulismoParcial: clinicHistory.tieneEdentulismoParcial,
							tieneEdentulismoTotal: clinicHistory.tieneEdentulismoTotal,
							tieneUrgTratamientoBucal: clinicHistory.tieneUrgTratamientoBucal,
							tieneExamVisual: clinicHistory.tieneExamVisual,
							tieneExamColesterol: clinicHistory.tieneExamColesterol,
							tieneExamGlucosa: clinicHistory.tieneExamGlucosa,
							tieneExamMamas: clinicHistory.tieneExamMamas,
							tieneExamProstata: clinicHistory.tieneExamProstata,
							tieneExamPelvicoPap: clinicHistory.tieneExamPelvicoPap,
							tieneExamMamografia: clinicHistory.tieneExamMamografia,
							tieneAnsiedad: clinicHistory.tieneAnsiedad,
							tieneHabFisica: clinicHistory.tieneHabFisica,
							tieneHabAlcohol: clinicHistory.tieneHabAlcohol,
							tieneHabDrogas: clinicHistory.tieneHabDrogas,
							tienePlanificacionSexual: clinicHistory.tienePlanificacionSexual,
						});
					}
				}
				endCharging();
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dni]);

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
		<Formik
			initialValues={
				clinicHistory === null ? initialStateClinicHistory : initialState!
			}
			validate={(values: TClinicHistoryForm) => {
				let errors: FormikErrors<TClinicHistoryForm> = {};

				if (!values.nombres) {
					errors.nombres = "Es obligatorio";
				}

				if (!values.apellidos) {
					errors.apellidos = "Es obligatorio";
				}
				if (!values.fechaNacimiento || values.fechaNacimiento === "") {
					errors.fechaNacimiento = "Es obligatorio";
				}

				if (type === "edit") {
					if (!values.id) {
						errors.id = "Es obligatorio";
					}
				}
				if (!values.sexo) {
					errors.sexo = "Es obligatorio";
				}
				if (!values.edad) {
					errors.edad = "Es obligatorio";
				}

				if (!values.grupoSanguineo) {
					errors.grupoSanguineo = "Es obligatorio";
				}
				if (!values.dni) {
					errors.dni = "Es obligatorio";
				}
				console.log(errors);
				return errors;
			}}
			onSubmit={async (values: TClinicHistoryForm) => {
				if (type !== "edit") {
					const data = formDataToClinicHistory(values);
					const dataResponse = await saveClinicalHistory(data);

					if (typeof dataResponse === "string") {
						Swal.fire({
							position: "center",
							icon: "success",
							title: "Se guardo correctamente",
							showConfirmButton: false,
							timer: 2000,
						}).then(() => {
							const url = `app/paciente?${values.dni}`;
							router.push(`/app/paciente?dni=${values.dni}&idClinicHistory=${dataResponse}
						&haveConsultations=false`);
						});
					} else {
						Swal.fire({
							position: "center",
							icon: "error",
							title: "Hubo un error",
							showConfirmButton: false,
							timer: 2000,
						});
					}
				} else {
					let data = formDataToClinicHistory(values);
					data.id = clinicHistory!.id;
					data.fechaRegistro = clinicHistory!.fechaRegistro;

					const dataResponse = await updateClinicalHistory(data);

					if (typeof dataResponse === "string") {
						Swal.fire({
							position: "center",
							icon: "success",
							title: "Se actualizó correctamente",
							showConfirmButton: false,
							timer: 2000,
						}).then(() => {
							router.refresh();
						});
					} else {
						Swal.fire({
							position: "center",
							icon: "error",
							title: "Hubo un error",
							showConfirmButton: false,
							timer: 2000,
						});
					}
				}
			}}
		>
			<Form>{children}</Form>
		</Formik>
	);
}
