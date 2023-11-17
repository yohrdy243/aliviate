import LaboratoryAnalisis from "@/components/LaboratoryAnalisis/LaboratoryAnalisis";
import LaboratoryAnalisisDynamicForm from "@/components/LaboratoryAnalisis/LaboratoryAnalisisHeader";

export default function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { idClinicHistory, dni } = searchParams;

	if (!idClinicHistory || !dni)
		return (
			<div className="text-center py-20">
				El paciente o su historia clinica indicada no existe
			</div>
		);

	return (
		<div>
			<LaboratoryAnalisis
				idClinicHistory={idClinicHistory.toString()}
				dni={dni.toString()}
				//idLaboratoryAnalisis={searchParams.idLaboratoryAnalisis?.toString()
			/>
		</div>
	);
}
