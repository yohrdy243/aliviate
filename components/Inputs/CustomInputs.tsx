"use client";
import {
	InputHTMLAttributes,
	ClassAttributes,
	useState,
	ReactNode,
} from "react";
import { FieldHookConfig, useField, useFormikContext } from "formik";
import { useLoading } from "@/utils/hooks/useLoading";
import { TPatientTable } from "@/models/TPatient";
import { getPatients } from "@/services/PatientService";
import Link from "next/link";

interface TextInputProps
	extends InputHTMLAttributes<HTMLInputElement>,
		ClassAttributes<HTMLInputElement> {
	label?: string;
	name: string;
}

interface SelectInputProps
	extends InputHTMLAttributes<HTMLSelectElement>,
		ClassAttributes<HTMLSelectElement> {
	items: { value: string | number; label: string }[];
	label?: string;
	name: string;
}

interface SelectInputAceptProps
	extends InputHTMLAttributes<HTMLSelectElement>,
		ClassAttributes<HTMLSelectElement> {
	name: string;
}

export function TextInput({ label, name, ...props }: TextInputProps) {
	const [field, { error }] = useField({
		name,
		type: "text",
		...props,
	});

	return (
		<div className="w-full">
			<div className="flex w-full gap-4">
				<div className="flex items-center w-fit min-w-[30%]">
					{label && (
						<label className="text-left text-[13px] font-[400]">{label}</label>
					)}
				</div>
				<div className="flex flex-col justify-start w-full gap-1">
					<input
						className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
						{...field}
					/>
					{error && <span className="text-red-600 text-[12px] ">{error}</span>}
				</div>
			</div>
		</div>
	);
}

export function SelectDiagnisticAccepted({
	name,
	initialValue,
	...props
}: SelectInputAceptProps & { initialValue: undefined | boolean }) {
	const [aceptado, setAceptado] = useState<"" | "true" | "false">("");

	const [field, { error }, { setValue }] = useField({
		name,
		value: initialValue === undefined ? "" : initialValue ? "true" : "false",
		...props,
	});

	return (
		<>
			<select
				className={`rounded-2xl px-4 py-1 text-white ${
					field.value === undefined
						? "bg-black"
						: field.value === true
						? "bg-[#A1DB85]"
						: "bg-[#FF0D4A]"
				}`}
				value={field.value === undefined ? "" : field.value ? "true" : "false"}
				onChange={({ target: { value } }) => {
					setAceptado(value as "" | "true" | "false");
					if (value !== "") {
						const isAcept = value === "true";
						setValue(isAcept);
					} else {
						setValue(undefined);
					}
				}}
			>
				<option value="">-</option>
				<option value="true">Conforme</option>
				<option value="false">Disconforme</option>
			</select>
			{error && <span className="text-red-600 text-[12px]">{error}</span>}
		</>
	);
}

export function SelectInput({
	label,
	items,
	name,
	...props
}: SelectInputProps) {
	const [field, { error }] = useField({
		name,
		...props,
	});
	const type = typeof items[0].value === "number" ? 0 : "";
	return (
		<div className="w-full ">
			<div className="flex w-full gap-4">
				<div className="flex items-center w-fit min-w-[30%]">
					{label && (
						<label className="text-left text-[13px] font-[400]">{label}</label>
					)}
				</div>
				<div className="flex flex-col justify-start w-full gap-1">
					<select
						className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						{...props}
						{...field}
					>
						<option value={type} selected>
							Seleccione una opción
						</option>
						{items.map(({ value, label }) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
					{error && <span className="text-red-600 text-[12px]">{error}</span>}
				</div>
			</div>
		</div>
	);
}

export function SelectPacientInput() {
	const { setFieldValue, values } = useFormikContext();
	const [step, setStep] = useState<boolean>(false);
	const [patiens, setPatiens] = useState<TPatientTable[]>([]);
	const { loading, charging, endCharging } = useLoading();
	const [dni, setDni] = useState<string>("");
	const [error, setError] = useState<ReactNode | null>(null);

	async function handleSearchPatients() {
		if (dni.length !== 8) {
			setError(
				<span className="text-red-600 text-[12px]">
					El DNI tiene que tener 8 digitos
				</span>
			);
		} else {
			setError(null);
			charging();
			const result = await getPatients(dni);

			if (result === false) {
				setError(
					<span className="text-red-600 text-[12px]">
						Ocurrio un error al buscar el paciente
					</span>
				);
			} else {
				if (result === null || result.length === 0) {
					setError(
						<span className="text-red-600 text-[12px]">
							No se encontro ningun paciente con ese DNI
							<Link href="/nuevo/paciente">
								<span className="text-blue-600"> Crear paciente</span>
							</Link>
						</span>
					);
				} else {
					setPatiens(result);
					endCharging();
					setStep(true);
				}
			}
		}
	}

	function handleSelect({
		target: { value },
	}: React.ChangeEvent<HTMLSelectElement>) {
		if (value !== "") {
			const {
				nombre,
				apellido,
				documentoIdentidad,
				genero,
				fechaNacimiento,
				grupoSanguineo,
				rhSanguineo,
				id,
			} = patiens[parseInt(value)];
			setFieldValue("nombres", nombre);
			setFieldValue("apellidos", apellido);
			setFieldValue("dni", documentoIdentidad);
			setFieldValue("sexo", genero);
			setFieldValue("fechaNacimiento", fechaNacimiento);
			setFieldValue("grupoSanguineo", `${grupoSanguineo}${rhSanguineo}`);
			setFieldValue("idPaciente", id);
		} else {
			setError(
				<span className="text-red-600 text-[12px]">Seleccione una opcion</span>
			);
		}
	}

	return (
		<div className="w-full ">
			<div className="flex w-full gap-4">
				<div className="flex items-center w-fit min-w-[30%]">
					<label className="text-left text-[13px] font-[400]">DNI</label>
				</div>
				<div className="flex flex-col justify-start w-full gap-1">
					{!step ? (
						<div className="flex gap-4">
							<input
								className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
								value={dni}
								onChange={(e) => setDni(e.target.value)}
								maxLength={8}
							/>
							<button
								className="w-fit bg-white text-[#00A3D7] border border-[#00A3D7] hover:bg-[#00A3D7] hover:text-white rounded-[10px] py-1 px-4 text-[14px] font-[600]"
								type="button"
								onClick={handleSearchPatients}
							>
								Buscar
							</button>
						</div>
					) : !loading ? (
						<select
							className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1"
							onChange={handleSelect}
						>
							<option value="" selected>
								Seleccione una opción
							</option>

							{patiens.map(
								({ nombre, apellido, documentoIdentidad, id }, index) => (
									<option key={id} value={index}>
										{`${nombre} ${apellido} - DNI:${documentoIdentidad}`}
									</option>
								)
							)}
						</select>
					) : (
						<div className="flex items-center justify-center w-full h-full">
							<div className="w-10 h-10 border-4 border-[#00a3d7] rounded-full animate-spin"></div>
						</div>
					)}
					{error}
				</div>
			</div>
		</div>
	);
}

export function NumberInput({
	maxLength,
	label,
	name,
	...props
}: TextInputProps) {
	const [field, { error }] = useField({
		name,
		...props,
		type: "number",
	});

	return (
		<div className="w-full ">
			<div className="flex w-full gap-4">
				<div className="flex items-center w-fit min-w-[30%]">
					{label && (
						<label className="text-left text-[13px] font-[400]">{label}</label>
					)}
				</div>
				<div className="flex flex-col justify-start w-full gap-1">
					<input
						className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
						type="number"
						{...field}
					/>
					{error && <span className="text-red-600 text-[12px]">{error}</span>}
				</div>
			</div>
		</div>
	);
}

export function DateInput({ label, name, ...props }: TextInputProps) {
	const [field, { error }] = useField({
		name,
		...props,
		type: "date",
	});

	return (
		<div className="w-full ">
			<div className="flex w-full gap-4">
				<div className="flex items-center w-fit min-w-[30%]">
					{label && (
						<label className="text-left text-[13px] font-[400]">{label}</label>
					)}
				</div>
				<div className="flex flex-col justify-start w-full gap-1">
					<input
						className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
						type="date"
						{...props}
						{...field}
					/>
					{error && <span className="text-red-600 text-[12px]">{error}</span>}
				</div>
			</div>
		</div>
	);
}

export function DateTimeInput({ label, name, ...props }: TextInputProps) {
	const [field, { error }] = useField({
		name,
		...props,
		type: "datetime-local",
	});

	return (
		<div className="w-full ">
			<div className="flex w-full gap-4">
				<div className="flex items-center w-fit min-w-[30%]">
					{label && (
						<label className="text-left text-[13px] font-[400]">{label}</label>
					)}
				</div>
				<div className="flex flex-col justify-start w-full gap-1">
					<input
						className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
						type="datetime-local"
						{...field}
					/>
					{error && <span className="text-red-600 text-[12px]">{error}</span>}
				</div>
			</div>
		</div>
	);
}

export function TextAreaInput({
	maxLength,
	label,
	name,
	...props
}: TextInputProps) {
	const [field, { error }] = useField({
		name,
		type: "text",
		...props,
	});

	return (
		<div className="w-full ">
			<div className="flex w-full gap-4">
				<div className="flex items-center w-fit min-w-[30%]">
					{label && (
						<label className="text-left text-[13px] font-[400]">{label}</label>
					)}
				</div>
				<div className="flex flex-col justify-start w-full gap-1">
					<textarea
						className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
						{...field}
						maxLength={maxLength}
					/>
					{error && <span className="text-red-600 text-[12px]">{error}</span>}
				</div>
			</div>
		</div>
	);
}

export function TextArea() {
	return (
		<textarea className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1" />
	);
}

export function ToggleInput({
	label,
	...props
}: {
	label?: string;
} & InputHTMLAttributes<HTMLInputElement> &
	ClassAttributes<HTMLInputElement> &
	FieldHookConfig<boolean>) {
	const [field, { error }] = useField({ ...props, type: "checkbox" });
	return (
		<div className="w-full py-2">
			<label className="relative inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					className="sr-only peer"
					{...props}
					checked={field.value} // Utiliza field.value como el estado del checkbox
					onChange={field.onChange}
				/>
				<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00a3d7] border-[#00a3d7]  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-[#00a3d7] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#00a3d7] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a3d7]"></div>
				{label && (
					<span className="ml-6 text-[13px] font-[400]  text-gray-900">
						{label}
					</span>
				)}
			</label>
		</div>
	);
}

export function NoSpecifyInput({
	maxLength,
	label,
	name,
	...props
}: TextInputProps) {
	const [{ value }, { error }, { setValue }] = useField({
		name,
		type: "text",
		...props,
	});

	const [isFalse, setIsFalse] = useState(
		() => value === "" || value === undefined
	);
	return (
		<div className="flex w-full gap-4">
			<div className="flex items-center w-fit">
				{label && (
					<label className="text-left text-[13px] font-[400]">{label}</label>
				)}
			</div>
			<div className="flex flex-col w-full">
				<div className="flex gap-4">
					<p className="text-[13px] font-[400]">NO</p>
					<p className="text-[13px] font-[400]">SI (Especifique)</p>
				</div>
				<div className="flex gap-4 items-center">
					<input
						onClick={() => {
							setIsFalse(true);
							setValue("");
						}}
						type="radio"
						checked={isFalse}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 p-1"
					/>
					<input
						type="text"
						value={!isFalse ? value : ""}
						onChange={(e) => {
							setValue(e.target.value);
							if (e.target.value === "") {
								setIsFalse(true);
							} else {
								setIsFalse(false);
							}
						}}
						className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
					/>
				</div>
			</div>
		</div>
	);
}
