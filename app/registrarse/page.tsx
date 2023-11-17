"use client";
import AuthLayout from "@/components/Auth/AuthLayout";
import { PasswordInput, TextInput } from "@/components/Inputs/Inputs";
import { registerDoctorService } from "@/services/AuthService";
import { TRegisterUserDoctor } from "@/utils/types";
import { Form, Formik, FormikErrors } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

function RenderSubmitButton({
	termsAndCondtions,
	privacyPolicy,
}: {
	termsAndCondtions: boolean;
	privacyPolicy: boolean;
}) {
	if (termsAndCondtions && privacyPolicy) {
		return (
			<button
				className="w-full bg-[#00A3D7] text-[#fff] rounded-[10px] py-3 text-[14px] font-[600]"
				type="submit"
			>
				REGISTRARSE
			</button>
		);
	}

	return (
		<button
			className="w-full bg-[#afb0b3] text-[#fff] rounded-[10px] py-3 text-[14px] font-[600]"
			type="button"
		>
			REGISTRARSE
		</button>
	);
}

export default function Page() {
	const router = useRouter();

	const [termsAndCondtions, setTermsAndCondtions] = useState<boolean>(false);
	const [privacyPolicy, setPrivacyPolicy] = useState<boolean>(false);

	return (
		<main>
			<AuthLayout>
				<div className="px-8 w-[50vh]">
					<h3 className="text-[24px] font-[700] text-center mt-[59px] mb-[38px]">
						Registro de Medico
					</h3>
					<Formik
						initialValues={{
							nombre: "",
							apellido: "",
							direccion: "",
							colegiatura: "",
							Especialidad: "",
							correo: "",
							contrasenia: "",
						}}
						validate={(values: TRegisterUserDoctor) => {
							let errors: FormikErrors<TRegisterUserDoctor> = {};
							if (!values.nombre || values.nombre === "") {
								errors.nombre = "Es Obligatorio";
							}
							if (!values.apellido || values.apellido === "") {
								errors.apellido = "Es Obligatorio";
							}
							if (!values.colegiatura || values.colegiatura === "") {
								errors.colegiatura = "Es Obligatorio";
							}
							if (!values.Especialidad || values.Especialidad === "") {
								errors.Especialidad = "Es Obligatorio";
							}
							if (!values.correo || values.correo === "") {
								errors.correo = "Es Obligatorio";
							}
							if (!values.contrasenia || values.contrasenia === "") {
								errors.contrasenia = "Es Obligatorio";
							}

							return errors;
						}}
						onSubmit={async (values: TRegisterUserDoctor) => {
							const response = await registerDoctorService(values);
							if (response === "OK") {
								Swal.fire({
									icon: "success",
									title: "Registro exitoso",
									showConfirmButton: false,
									timer: 1500,
								}).then(() => {
									router.push("/login");
								});
							} else {
								Swal.fire({
									icon: "error",
									title: "Error",
									text: response,
									showConfirmButton: true,
								});
							}
						}}
					>
						<Form>
							<div className="flex flex-col gap-[14px] mb-[44px]">
								<TextInput name="nombre" label="Nombre" type="text" />
								<TextInput name="apellido" label="Apellidos" type="text" />
								<TextInput name="direccion" label="Direccion" type="text" />
								<TextInput name="colegiatura" label="CMP" type="number" />
								<TextInput
									name="Especialidad"
									label="Especialidad"
									type="text"
								/>
							</div>
							<div className="flex flex-col gap-[14px] mb-[38px]">
								<TextInput
									name="correo"
									label="Correo electrónico"
									type="email"
								/>
								<PasswordInput name="contrasenia" label="Contraseña" />
							</div>
							<div className="flex items-center mb-4">
								<input
									value=""
									id="default-checkbox"
									type="checkbox"
									checked={privacyPolicy}
									onChange={() => setPrivacyPolicy(!privacyPolicy)}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
								/>
								<label
									htmlFor="default-checkbox"
									className="ms-2 text-sm font-medium text-black"
								>
									Acepto la{" "}
									<Link className="text-blue-600 underline" href="/politicas">
										Politica de Privacidad
									</Link>
								</label>
							</div>
							<div className="flex items-center">
								<input
									value=""
									id="checked-checkbox"
									type="checkbox"
									checked={termsAndCondtions}
									onChange={() => setTermsAndCondtions(!termsAndCondtions)}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
								/>
								<label
									htmlFor="checked-checkbox"
									className="ms-2 text-sm font-medium text-black"
								>
									Acepto los{" "}
									<Link
										className="text-blue-600 underline"
										href="/terminosycondiciones"
									>
										Términos y Condiciones
									</Link>
								</label>
							</div>
							<div className="w-full mt-[30px] mb-[20px]">
								<RenderSubmitButton {...{ termsAndCondtions, privacyPolicy }} />
							</div>
						</Form>
					</Formik>
				</div>
			</AuthLayout>
		</main>
	);
}
