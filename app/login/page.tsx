"use client";
import AuthLayout from "@/components/Auth/AuthLayout";
import Input, { Password } from "@/components/Inputs/Inputs";
import { loginService } from "@/services/AuthService";
import { LoginProps } from "@/utils/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
	const [error, setError] = useState("");
	const [loginProps, setLoginProps] = useState<LoginProps>({
		credentials: {
			contrasenia: "",
			correo: "",
		},
		type: "doctor",
	});

	const router = useRouter();

	const handleLogin = async () => {
		try {
			const loginSuccessful = await loginService(loginProps);

			if (loginSuccessful !== false) {
				router.replace("/");
				router.refresh();
			} else {
				setError("Error de inicio de sesión");
			}
		} catch (error) {
			setError("Error de inicio de sesión");
			console.error("Error de inicio de sesión: ", error);
		}
	};

	return (
		<main>
			<AuthLayout>
				<h4 className="text-[24px] text-[#000] font-[700] mt-[2rem]">
					Bienvenido!
				</h4>
				<div className="flex gap-8 py-8">
					<div
						className="flex items-center "
						onClick={() =>
							setLoginProps((prevState) => ({ ...prevState, type: "doctor" }))
						}
					>
						<input
							id="radio-doctor"
							type="radio"
							name="radio-type-login"
							defaultChecked={true}
							className="w-4 h-4 text-[#00A3D7] bg-gray-100 border-gray-300"
						/>
						<label
							htmlFor="radio-doctor"
							className="ml-2 text-[#000] font-[600] text-[14px]"
						>
							Login como Medico
						</label>
					</div>
					<div
						className="flex items-center"
						onClick={() =>
							setLoginProps((prevState) => ({ ...prevState, type: "admin" }))
						}
					>
						<input
							id="radio-admin"
							type="radio"
							name="radio-type-login"
							value={"admin"}
							className="w-4 h-4 text-[#00A3D7] bg-gray-100 border-gray-300"
						/>
						<label
							htmlFor="radio-admin"
							className="ml-2 text-[#000] font-[600] text-[14px]"
						>
							Login como Admin
						</label>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<Input
						placeholder="Correo electrónico"
						type="email"
						value={loginProps.credentials.correo}
						onChange={(element) => {
							const value = element.target.value;
							setLoginProps((prevState) => ({
								...prevState,
								credentials: { ...prevState.credentials, correo: value },
							}));
						}}
						autocomplete
					/>
					<Password
						placeholder="Contraseña"
						value={loginProps.credentials.contrasenia}
						onChange={(element) => {
							const value = element.target.value;
							setLoginProps((prevState) => ({
								...prevState,
								credentials: { ...prevState.credentials, contrasenia: value },
							}));
						}}
						autocomplete
					/>
				</div>
				<div className="w-full mt-[30px] mb-[20px]">
					<button
						className="w-full bg-[#00A3D7] text-[#fff] rounded-[10px] py-3 text-[14px] font-[600]"
						onClick={handleLogin}
					>
						LOGIN
					</button>
				</div>
				<div>
					{error && (
						<p className="text-[#F00] text-[14px] font-[400] text-center mb-4">
							{error}
						</p>
					)}
				</div>
				<div className="flex justify-center gap-1 text-[14px] font-[400] ">
					<p>¿No tiene una cuenta?</p>
					<Link className="text-[#00A3D7]" href="/registrarse">
						Crear una Cuenta
					</Link>
				</div>
			</AuthLayout>
		</main>
	);
}
