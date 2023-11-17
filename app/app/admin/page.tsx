import AdminPanel from "@/components/Admin/AdminPanel";
import { cookies } from "next/headers";

export default function Page() {
	const role = cookies().get("rol")!.value;
	const isAdmin = role === "1";

	if (!isAdmin) {
		return (
			<div className="h-full w-full flex justify-center items-center">
				<h1 className="text-[24px] font-[700]">
					No tienes permisos para acceder a esta página
				</h1>
			</div>
		);
	}
	return <AdminPanel />;
}
