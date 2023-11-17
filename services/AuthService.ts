import {
	LoginProps,
	TRegisterUserDoctor,
	TResponse,
	User,
} from "@/utils/types";

export async function loginService({
	credentials: { correo, contrasenia },
	type,
}: LoginProps): Promise<User | false> {
	const url = type === "admin" ? "/api/auth/admin" : "/api/auth/doctor";

	const response = await fetch(url!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ correo, contrasenia }),
		cache: "no-store",
	});

	if (response.status === 200) {
		const data: User = await response.json();
		return data;
	}
	return false;
}

export async function logoutService(): Promise<true | string> {
	const response = await fetch("/api/auth/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		cache: "no-store",
	});

	if (response.status === 200) {
		const data = await response.json();
		return data.message;
	}
	return "No se pudo cerrar sesión";
}

export async function registerDoctorService(
	values: TRegisterUserDoctor
): Promise<string> {
	const response = await fetch("https://api.aliviate.link/v1/medico/sign-up", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
		cache: "no-store",
	});

	const {
		error: { detail, hasError },
		data,
	}: TResponse<string> = await response.json();

	if (hasError) {
		console.log(detail);
		return detail;
	}
	if (data) {
		return "OK";
	}
	return "No se pudo registrar al doctor";
}
