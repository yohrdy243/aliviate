import {
	TLaboratoryAnalisisField,
	TLaboratoryAnalisisValue,
} from "@/models/TLaboratoryAnalysis";
import {
	getAnalisisFields,
	saveAnalisisValues,
} from "@/services/LaboratoryAnalysisService";
import { Form, Formik, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { NumberInput, TextInput, ToggleInput } from "../Inputs/CustomInputs";
import { useLoading } from "@/utils/hooks/useLoading";
import Swal from "sweetalert2";

function RenderField({
	type,
	name,
	label,
}: {
	type: "float" | "string" | "boolean";
	label: string;
	name: string;
}) {
	switch (type) {
		case "float":
			return <NumberInput name={name} label={label} />;
		case "string":
			return <TextInput name={name} label={label} />;
		case "boolean":
			return <ToggleInput name={name} label={label} />;

		default:
			return null;
	}
}

function formDataToAnalisisValues(
	formData: any,
	idClinicHistory: string,
	analisisFields: TLaboratoryAnalisisField[]
): TLaboratoryAnalisisValue[] {
	const analisisValues: TLaboratoryAnalisisValue[] = [];

	Object.keys(formData).forEach((key) => {
		const value = formData[key];
		const analisisField = analisisFields.find(
			({ campoJson }) => campoJson === key
		);
		if (analisisField) {
			analisisValues.push({
				idHistoriaClinica: idClinicHistory,
				idAnalisisCampo: analisisField.id,
				valor: value,
			});
		}
	});

	return analisisValues;
}

function validate(values: any, analisisFields: TLaboratoryAnalisisField[]) {
	let errors: any = {};
	analisisFields.forEach(({ campoJson, requerido }) => {
		const value = values[campoJson as keyof typeof values];
		if (requerido) {
			if (value === undefined || value === null || value === "") {
				errors[campoJson] = "El valor es obligatorio";
			}
		}
	});
	return errors;
}

async function onSubmit(
	values: any,
	idClinicHistory: string,
	analisisFields: TLaboratoryAnalisisField[]
) {
	const data = formDataToAnalisisValues(
		values,
		idClinicHistory,
		analisisFields
	);
	const response = await saveAnalisisValues(data);
	if (response !== false) {
		Swal.fire({
			title: "Analisis guardado",
			icon: "success",
			confirmButtonText: "Aceptar",
		});
	} else {
		Swal.fire({
			title: "Error al guardar el analisis",
			icon: "error",
			confirmButtonText: "Aceptar",
		});
	}
}

export default function LaboratoryAnalisisDynamicForm({
	idAnalisisType,
	idClinicHistory,
	analisisValues,
}: {
	idAnalisisType: string;
	idClinicHistory: string;
	analisisValues: TLaboratoryAnalisisValue[];
}) {
	const formikRef = useRef<FormikProps<any>>(null);

	const [analisisFields, setAnalisisFields] = useState<
		TLaboratoryAnalisisField[]
	>([]);

	const { loading, charging, endCharging } = useLoading(true);

	useEffect(() => {
		charging();
		getAnalisisFields(idAnalisisType).then((analisisFields) => {
			if (analisisFields !== false) {
				setAnalisisFields(analisisFields);
			} else {
				setAnalisisFields([]);
			}
			endCharging();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idAnalisisType]);

	useEffect(() => {
		analisisFields.forEach(({ campoJson, id }) => {
			const value = analisisValues.find(
				({ idAnalisisCampo }) => id === idAnalisisCampo
			);

			if (value) {
				formikRef.current?.setFieldValue(campoJson, value.valor);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [analisisFields]);

	if (loading) {
		return (
			<div className="w-full flex justify-center items-center">
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
				</svg>
			</div>
		);
	}

	return (
		<Formik
			innerRef={formikRef}
			initialValues={{}}
			validate={(values) => validate(values, analisisFields)}
			onSubmit={(values) => onSubmit(values, idClinicHistory, analisisFields)}
		>
			<Form>
				<div className="grid grid-cols-2 gap-8 py-8 px-32">
					{analisisFields.map(({ campo, campoJson, tipo }, index: number) => (
						<div key={`FORM_ANALSIS_KEY_${index}`}>
							<RenderField type={tipo} name={campoJson} label={campo} />
						</div>
					))}
				</div>
				<div className="flex justify-center w-full">
					<button
						className="w-fit px-8 bg-[#7800D7] text-white rounded-[10px] py-3 text-[14px] font-[600]"
						type="submit"
					>
						GUARDAR ANALISIS
					</button>
				</div>
			</Form>
		</Formik>
	);
}
