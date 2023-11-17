
import { User } from "@/utils/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { correo, contrasenia } = await request.json();

	const body = { correo: correo, contrasenia: contrasenia };

	const response = await fetch("https://api.aliviate.link/v1/medico/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	if (response.status === 200) {
		const { data }: { data: User } = await response.json();

		const res = NextResponse.json(data);

		res.cookies.set("jwt", data.jwt, { path: "/" });
		res.cookies.set("name", data.nombreCompleto, { path: "/" });
		res.cookies.set("email", data.correo, { path: "/" });
		res.cookies.set("rol", data.rol.toString(), { path: "/" });

		return res;
	}
	return new Response(
		JSON.stringify({ error: "No autorizado. Verifica tus credenciales" }),
		{
			status: 401,
			headers: { "Content-Type": "application/json" },
		}
	);
}