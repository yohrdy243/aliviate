"use client";
import { InputType } from "@/utils/types";
import { useField } from "formik";
import { ClassAttributes, InputHTMLAttributes, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export default function Input({
	type,
	name,
	placeholder,
	value,
	onChange,
	autocomplete,
}: InputType) {
	return (
		<div className="border border-[#9AAFC3] rounded-[10px] p-2 flex items-center">
			<input
				id={name}
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
				autoComplete={autocomplete === true ? "on" : "off"}
				style={{ outline: "none" }}
			/>
		</div>
	);
}

export function Select({
	label,
	items,
	name,
}: {
	label: string;
	items: { value: string | number; label: string }[];
	name: string;
}) {
	return (
		<div className="w-full ">
			<div className="flex w-full gap-4">
				<div className="flex items-center w-fit min-w-[30%]">
					{label && (
						<label className="text-left text-[13px] font-[400]">{label}</label>
					)}
				</div>
				<div className="flex flex-col justify-start w-full gap-1">
					<select className="bg-gray-50 border-[2px] border-[#00a3d7] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
						<option value="" selected>
							Seleccione una opción
						</option>
						{items.map(({ value, label }) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}


export function Password({
	name,
	placeholder,
	value,
	onChange,
	autocomplete,
}: InputType) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="border border-[#9AAFC3] rounded-[10px] p-2 flex items-center">
			<input
				id={name}
				type={showPassword ? "text" : "password"}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="w-full h-[40px] px-4 text-[14px] font-[400]"
				autoComplete={autocomplete ? "on" : "new-password"}
				style={{ outline: "none" }}
			/>
			<div
				className="text-2xl px-2 text-[#A8A8A8] "
				onClick={() => setShowPassword((currentState) => !currentState)}
			>
				{!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
			</div>
		</div>
	);
}

export function PasswordInput({ label, name, ...props }: TextInputProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [field, { error }] = useField({
		name,
		type: "text",
		...props,
	});

	return (
		<div>
			<div className="border border-[#00a3d7] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex justify-between w-full p-1 items-center">
				<input
					id={name}
					type={showPassword ? "text" : "password"}
					className="bg-gray-50 p-3 text-gray-900  border-0"
					style={{ outline: "none" }}
					placeholder={label}
					autoComplete={"new-password"}
					{...field}
				/>
				<div
					className="text-2xl px-2 text-[#A8A8A8] "
					onClick={() => setShowPassword((currentState) => !currentState)}
				>
					{!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
				</div>
			</div>
				{error && <span className="text-red-600 text-[12px] ">{error}</span>}
		</div>
	);
}

interface TextInputProps
	extends InputHTMLAttributes<HTMLInputElement>,
		ClassAttributes<HTMLInputElement> {
	label?: string;
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
			<div className="flex flex-col w-full">
				<div className="flex flex-col justify-start w-full gap-1">
					<input
						className="bg-gray-50 border border-[#00a3d7] p-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
						placeholder={label}
						{...field}
					/>
					{error && <span className="text-red-600 text-[12px] ">{error}</span>}
				</div>
			</div>
		</div>
	);
}
