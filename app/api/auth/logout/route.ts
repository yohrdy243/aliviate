import { User } from "@/utils/types";
import { NextResponse } from "next/server";

export async function POST() {
	const res = NextResponse.json({ message: "Se Cerro la Sesion" });

	res.cookies.set("jwt", "", { path: "/", maxAge: 0 });
	res.cookies.set("name", "", { path: "/", maxAge: 0 });
	res.cookies.set("email", "", { path: "/", maxAge: 0 });
	res.cookies.set("rol", "", { path: "/", maxAge: 0 });

	return res;
}
