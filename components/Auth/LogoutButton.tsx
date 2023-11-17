"use client"
import { logoutService } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { GrLogout } from "react-icons/gr";

export function LogoutButton() {
	const router = useRouter();
	const handleLogin = async () => {
		try {
			const logoutSuccessful = await logoutService();

			router.push("/login");
		} catch (error) {
			console.error("Error de inicio de sesión: ", error);
		}
	};
	return (
		<div className="text-2xl" onClick={handleLogin}>
			<GrLogout />
		</div>
	);
}
