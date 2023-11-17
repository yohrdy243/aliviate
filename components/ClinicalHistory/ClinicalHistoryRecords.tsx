import useModal from "@/utils/hooks/useModal";
import React from "react";
import ClinicHistoryOffCanvas from "./ClinicalHistoryOffCanvas";

export default function ClinicalHistoryRecords({
	idClinicHistory,
}: {
	idClinicHistory: string;
}) {
	const { open, visible, close } = useModal();

	return (
		<>
			<button
				className="w-fit bg-[#7800D7] text-white rounded-[10px] py-3 px-4 text-[14px] font-[600]"
				type="button"
				onClick={open}
			>
				VER HISTORIAL DE MODIFICACIONES
			</button>
			<ClinicHistoryOffCanvas
				visible={visible}
				close={close}
				idClinicHistory={idClinicHistory}
			/>
		</>
	);
}
