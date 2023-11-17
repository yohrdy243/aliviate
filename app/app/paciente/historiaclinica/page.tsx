import ClinicalHistory from "@/components/ClinicalHistory/ClinicalHistory";

export default function page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const { idClinicHistory, dni } = searchParams;

	if (!idClinicHistory || !dni)
		return <div className="text-center py-20">El paciente o su historia clinica indicada no existe</div>;

	return (
		<ClinicalHistory
			idClinicHistory={idClinicHistory.toString()}
			dni={dni.toString()}
		/>
	);
}
