import Consultation from "@/components/Consultation/Consultation";
import { cookies } from "next/headers";
export default function page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { idClinicHistory, haveConsultations, dni } = searchParams;
	const name = cookies().get("name")!.value;

	if (!idClinicHistory || !dni)
		return (
			<div className="text-center py-20 w-full h-screen">
				El paciente o su historia clinica indicada no existe
			</div>
		);

	const newConsultation = haveConsultations === "true" ? true : false ?? false;

	return (
		<Consultation
			dni={dni.toString()}
			idClinicHistory={idClinicHistory.toString()}
			nombre={name}
			haveConsultations={newConsultation}
		/>
	);
}
