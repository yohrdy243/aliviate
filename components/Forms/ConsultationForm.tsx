"use client";
import { saveConsultation } from "@/services/ConsultationService";
import {
	convertirFecha,
	parseDateStringToInputDate,
} from "@/utils/functions/parse";
import { Form, Formik, FormikErrors, FormikProps } from "formik";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const emptyConsultationForm: TConsultationForm = {
	id: "",
	idHistoriaClinica: "",
	idMedico: "",
	idPaciente: "",
	descripcionEnfermedadPaciente: "",
	tiempoEnfermedad: 0,
	apetito: "",
	sed: "",
	suenio: "",
	estadoAnimo: "",
	otroDetalle: "",
	orina: "",
	deposiciones: "",
	temperatura: 0,
	signosSintomas: "",
	pA: 0,
	FC: 0,
	FR: 0,
	peso: 0,
	talla: 0,
	iMC: 0,
	diagnostico: "",
	tratamiento: "",
	diagnosticoIA: [],
	tratamientoIA: [],
	examenesAuxiliares: "",
	proximaCita: "",
	observaciones: "",
	nombreCompletoPaciente: "",
};

function formDataToConsultation(values: TConsultationForm, name: string) {
	console.log(values.diagnosticoIA);
	const data: TConsultation = {
		id: values.id,
		fechaRegistro: "",
		idHistoriaClinica: values.idHistoriaClinica,
		idMedico: values.idMedico,
		idPaciente: values.idPaciente,
		descripcionEnfermedadPaciente: values.descripcionEnfermedadPaciente,
		tiempoEnfermedad: parseFloat(values.tiempoEnfermedad.toString()),
		apetito: values.apetito,
		sed: values.sed,
		suenio: values.suenio,
		estadoAnimo: values.estadoAnimo,
		otroDetalle: values.otroDetalle,
		orina: values.orina,
		deposiciones: values.deposiciones,
		temperatura: parseFloat(values.temperatura.toString()),
		signosSintomas: values.descripcionEnfermedadPaciente,
		pA: parseFloat(values.pA.toString()),
		FC: parseFloat(values.FC.toString()),
		FR: parseFloat(values.FR.toString()),
		peso: parseFloat(values.peso.toString()),
		talla: parseFloat(values.talla.toString()),
		iMC: parseFloat(values.iMC.toString()),
		diagnostico: values.diagnostico,
		tratamiento: values.tratamiento,
		diagnosticoIA: values.diagnosticoIA,
		tratamientoIA: [],
		examenesAuxiliares: values.examenesAuxiliares.split(","),
		proximaCita: convertirFecha(values.proximaCita),
		observaciones: values.observaciones,
		nombreCompletoPaciente: values.nombreCompletoPaciente,
		nombreMedico: name,
	};

	return data;
}

export function ConsultationForm({
	idClinicHistory,
	dni,
	consultationSelected,
	hasConsultations,
	children,
	name,
}: {
	idClinicHistory: string;
	dni: string;
	consultationSelected: TConsultation | null;
	hasConsultations: boolean;
	children: React.ReactNode;
	name: string;
}) {
	const router = useRouter();

	const formikRef = useRef<FormikProps<TConsultationForm>>(null);
	const [hasMounted, setHasMounted] = useState<boolean>(false);

	useEffect(() => {
		if (hasMounted) {
			if (hasConsultations) {
				if (formikRef.current) {
					const { setFieldValue, values, setValues } = formikRef.current;
					if (consultationSelected !== null) {
						console.log(consultationSelected);
						setFieldValue("id", consultationSelected.id);
						setFieldValue(
							"idHistoriaClinica",
							consultationSelected.idHistoriaClinica
						);
						setFieldValue("idMedico", consultationSelected.idMedico);
						setFieldValue("idPaciente", consultationSelected.idPaciente);
						setFieldValue(
							"descripcionEnfermedadPaciente",
							consultationSelected.descripcionEnfermedadPaciente
						);
						setFieldValue(
							"nombreCompletoPaciente",
							consultationSelected.nombreCompletoPaciente
						);
						setFieldValue(
							"tiempoEnfermedad",
							consultationSelected.tiempoEnfermedad
						);
						setFieldValue("apetito", consultationSelected.apetito);
						setFieldValue("sed", consultationSelected.sed);
						setFieldValue("suenio", consultationSelected.suenio);
						setFieldValue("estadoAnimo", consultationSelected.estadoAnimo);
						setFieldValue("otroDetalle", consultationSelected.otroDetalle);
						setFieldValue("orina", consultationSelected.orina);
						setFieldValue("deposiciones", consultationSelected.deposiciones);
						setFieldValue("temperatura", consultationSelected.temperatura);
						setFieldValue(
							"signosSintomas",
							consultationSelected.signosSintomas
						);
						setFieldValue("pA", consultationSelected.pA);
						setFieldValue("FC", consultationSelected.FC);
						setFieldValue("FR", consultationSelected.FR);
						setFieldValue("peso", consultationSelected.peso);
						setFieldValue("talla", consultationSelected.talla);
						setFieldValue("iMC", consultationSelected.iMC);
						setFieldValue("diagnostico", consultationSelected.diagnostico);
						setFieldValue("tratamiento", consultationSelected.tratamiento);
						setFieldValue(
							"examenesAuxiliares",
							consultationSelected.examenesAuxiliares
						);

						setFieldValue(
							"proximaCita",
							parseDateStringToInputDate(consultationSelected.proximaCita)
						);
						setFieldValue("observaciones", consultationSelected.observaciones);
						setFieldValue("diagnosticoIA", consultationSelected.diagnosticoIA);

						consultationSelected.tratamientoIA &&
							consultationSelected.tratamientoIA.forEach(
								({ tratamiento, probabilidad }, index) => {
									setFieldValue(
										`tratamientoIA[${index}].tratamiento`,
										tratamiento
									);
									setFieldValue(
										`tratamientoIA[${index}].probabilidad`,
										probabilidad
									);
								}
							);
					} else {
						setFieldValue("id", emptyConsultationForm.id);
						setFieldValue(
							"idHistoriaClinica",
							emptyConsultationForm.idHistoriaClinica
						);
						setFieldValue("idMedico", emptyConsultationForm.idMedico);
						setFieldValue("idPaciente", emptyConsultationForm.idPaciente);
						setFieldValue(
							"descripcionEnfermedadPaciente",
							emptyConsultationForm.descripcionEnfermedadPaciente
						);
						setFieldValue(
							"tiempoEnfermedad",
							emptyConsultationForm.tiempoEnfermedad
						);
						setFieldValue("apetito", emptyConsultationForm.apetito);
						setFieldValue("sed", emptyConsultationForm.sed);
						setFieldValue("suenio", emptyConsultationForm.suenio);
						setFieldValue("estadoAnimo", emptyConsultationForm.estadoAnimo);
						setFieldValue("otroDetalle", emptyConsultationForm.otroDetalle);
						setFieldValue("orina", emptyConsultationForm.orina);
						setFieldValue("deposiciones", emptyConsultationForm.deposiciones);
						setFieldValue("temperatura", emptyConsultationForm.temperatura);
						setFieldValue(
							"signosSintomas",
							emptyConsultationForm.signosSintomas
						);
						setFieldValue("pA", emptyConsultationForm.pA);
						setFieldValue("FC", emptyConsultationForm.FC);
						setFieldValue("FR", emptyConsultationForm.FR);
						setFieldValue("peso", emptyConsultationForm.peso);
						setFieldValue("talla", emptyConsultationForm.talla);
						setFieldValue("iMC", emptyConsultationForm.iMC);
						setFieldValue("diagnostico", emptyConsultationForm.diagnostico);
						setFieldValue("tratamiento", emptyConsultationForm.tratamiento);
						setFieldValue(
							"examenesAuxiliares",
							emptyConsultationForm.examenesAuxiliares
						);

						setFieldValue(
							"proximaCita",
							parseDateStringToInputDate(emptyConsultationForm.proximaCita)
						);
						setFieldValue("observaciones", emptyConsultationForm.observaciones);
						setFieldValue(`diagnosticoIA`, []);
						setFieldValue(`tratamientoIA`, []);
					}
				}
			}
		}
		setHasMounted(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [consultationSelected]);

	return (
		<Formik
			innerRef={formikRef}
			initialValues={{
				...emptyConsultationForm,
				idHistoriaClinica: idClinicHistory,
				idPaciente: dni,
				idMedico: "7cAABnKy9238MUcmabnyR5",
			}}
			validate={(values: TConsultationForm) => {
				let errors: FormikErrors<any> = {};

				if (
					!values.descripcionEnfermedadPaciente ||
					values.descripcionEnfermedadPaciente === ""
				) {
					errors.descripcionEnfermedadPaciente = "Es obligatorio";
				}
				if (!values.tiempoEnfermedad || values.tiempoEnfermedad <= 0) {
					errors.tiempoEnfermedad = "Es obligatorio";
				}
				if (!values.apetito || values.apetito === "") {
					errors.apetito = "Es obligatorio";
				}
				if (!values.sed || values.sed === "") {
					errors.sed = "Es obligatorio";
				}
				if (!values.suenio || values.suenio === "") {
					errors.suenio = "Es obligatorio";
				}
				if (!values.estadoAnimo || values.estadoAnimo === "") {
					errors.estadoAnimo = "Es obligatorio";
				}
				if (!values.orina || values.orina === "") {
					errors.orina = "Es obligatorio";
				}
				if (!values.deposiciones || values.deposiciones === "") {
					errors.deposiciones = "Es obligatorio";
				}
				if (!values.temperatura || values.temperatura <= 0) {
					errors.temperatura = "Es obligatorio";
				}
				if (!values.pA || values.pA <= 0) {
					errors.pA = "Es obligatorio";
				}
				if (!values.FC || values.FC <= 0) {
					errors.FC = "Es obligatorio";
				}
				if (!values.FR || values.FR <= 0) {
					errors.FR = "Es obligatorio";
				}
				if (!values.peso || values.peso <= 0) {
					errors.peso = "Es obligatorio";
				}
				if (!values.talla || values.talla <= 0) {
					errors.talla = "Es obligatorio";
				}
				if (!values.iMC || values.iMC <= 0) {
					errors.iMC = "Es obligatorio";
				}
				if (!values.diagnostico || values.diagnostico === "") {
					errors.diagnostico = "Es obligatorio";
				}

				if (!values.tratamiento || values.tratamiento === "") {
					errors.tratamiento = "Es obligatorio";
				}

				if (!values.diagnosticoIA || values.diagnosticoIA.length === 0) {
					errors.diagnosticoIA = "Es obligatorio";
				} else {
					values.diagnosticoIA.forEach((item) => {
						if (item.esAceptado === undefined) {
							errors.diagnosticoIA = `Es obligatorio`;
						}
					});
				}

				if (!values.proximaCita || values.proximaCita === "") {
					errors.proximaCita = "Es obligatorio";
				}
				if (
					!values.nombreCompletoPaciente ||
					values.nombreCompletoPaciente === ""
				) {
					errors.nombreCompletoPaciente = "Es obligatorio";
				}

				if (!values.observaciones || values.observaciones === "") {
					errors.observaciones = "Es obligatorio";
				}

				return errors;
			}}
			onSubmit={async (values) => {
				const data = formDataToConsultation(values, name);

				const response = await saveConsultation(data);

				if (response !== false) {
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Se guardo correctamente",
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
			}}
		>
			{({ isValid, values }) => {
				const hasId = values.id !== "";
				return (
					<Form>
						{children}

						{!hasId && (
							<div>
								{isValid ? (
									<div className="py-4 flex justify-center items-center px-16">
										<button className="w-full bg-[#00A3D7] text-white rounded-[10px] py-3 text-[14px] font-[600]">
											INGRESAR CONSULTA
										</button>
									</div>
								) : (
									<div className="py-4 flex justify-center items-center px-16">
										<button
											className="w-full bg-[#afb0b3] text-[#FFF] rounded-[10px] py-3 text-[14px] font-[600]"
											type="button"
										>
											INGRESAR CONSULTA
										</button>
									</div>
								)}
							</div>
						)}
					</Form>
				);
			}}
		</Formik>
	);
}
