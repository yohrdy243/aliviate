export type TClinicHistoryTable = {
	id: string;
	fechaRegistro: string | Date;
	idPaciente: string;
	documentoIdentidadPaciente: number;
	nombreCompletoPaciente: string;
	idMedico: string;
	nombreCompletoMedico: string;
	idAnalisisClinico: string;
	idsConsultas: string;
};

export type TClinicHistory = {
	id: string;
	fechaRegistro: string;
	idMedico: string;
	idPaciente: string;
	estadoCivil: number;
	gradoInstitucion: number;
	ocupacion: string;
	direccion: string;
	idDistrito: number;
	tuvoTuberculosis: boolean;
	tieneInfTransSex: boolean;
	tieneDiabetes: boolean;
	tieneHta: boolean;
	tieneSobrepeso: boolean;
	tieneInfarto: boolean;
	tieneDislipenia: boolean;
	tieneInfRenalGlaucoma: boolean;
	tieneDepresionEsquizofrenia: boolean;
	antecedentes: string[];
	tieneHospitaliacionTransfusiones: boolean;
	dispacidad: string[];
	tieneConsumoTabaco: boolean;
	tieneConsumoAlcohol: boolean;
	tieneConsumoDrogas: boolean;
	tieneInterQuirurjica: boolean;
	cancer: string[];
	tieneRiesgo: boolean;
	tieneViolencia: boolean;
	tieneSid: boolean;
	tieneITS: boolean;
	tieneHepatitis: boolean;
	tieneDbm: boolean;
	tieneCancer: boolean;
	tieneDepresion: boolean;
	tieneProbPsiquiatricos: boolean;
	otros: string[];
	reaccionMedicamentos: string[];
	medicamenteFrecuente: string[];
	edadInicioRelacionSexual: number;
	numParejas: number;
	hijosVivos: number;
	rsMismoSexo: boolean;
	menarquia: {
		edad: number;
		aplica: boolean;
	};
	flujoVagPatologico: boolean;
	dismenorrea: boolean;
	tieneEmbarazo: boolean;
	tieneParto: boolean;
	tienePrematuro: boolean;
	tieneAborto: boolean;
	gestacion: {
		meses: number;
		tiene: boolean;
	};
	tieneFiebre15Dias: boolean;
	tieneTos15Dias: boolean;
	lesionesGenitales: string[];
	presionArterial: {
		valorSuperior: number;
		valoreInferior: number;
	};
	tieneVacAntitetanica: boolean;
	tieneVacAntiamerilica: boolean;
	tieneVacAntihepatitisB: boolean;
	tieneEncias: boolean;
	tieneCaries: boolean;
	tieneEdentulismoParcial: boolean;
	tieneEdentulismoTotal: boolean;
	tieneUrgTratamientoBucal: boolean;
	tieneAnsiedad: boolean;
	tieneExamVisual: boolean;
	tieneExamColesterol: boolean;
	tieneExamGlucosa: boolean;
	tieneExamMamas: boolean;
	tieneExamProstata: boolean;
	tieneExamPelvicoPap: boolean;
	tieneExamMamografia: boolean;
	tieneHabFisica: boolean;
	tieneHabAlcohol: boolean;
	tieneHabDrogas: boolean;
	tienePlanificacionSexual: boolean;
};

export type TClinicHistoryForm = {
	fechaRegistro: string;

	id: string;
	// Propiedades Adicionales del Paciente
	nombres: string; //
	apellidos: string; //
	sexo: number; //
	edad: number; //
	lugarNacimiento: string; //
	procedencia: string;
	fechaNacimiento: string; //
	grupoSanguineo: string; //
	dni: number;
	// Propiedades Adicionales del Paciente
	idMedico: string;
	idPaciente: string;
	estadoCivil: number; //
	gradoInstitucion: number; //
	ocupacion: string; //
	direccion: string; //
	idDistrito: number;
	tuvoTuberculosis: boolean; //
	tieneInfTransSex: boolean; //
	tieneDiabetes: boolean; //
	tieneHta: boolean; //
	tieneSobrepeso: boolean; //
	tieneInfarto: boolean; //
	tieneDislipenia: boolean; //
	tieneInfRenalGlaucoma: boolean; //
	tieneDepresionEsquizofrenia: boolean; //
	antecedentes: string; //
	tieneHospitaliacionTransfusiones: boolean; //
	dispacidad: string; //
	tieneConsumoTabaco: boolean; //
	tieneConsumoAlcohol: boolean; //
	tieneConsumoDrogas: boolean; //
	tieneInterQuirurjica: boolean; //
	cancer: string; //
	tieneRiesgo: boolean; //
	tieneViolencia: boolean; //
	tieneSid: boolean; //
	tieneITS: boolean; //
	tieneHepatitis: boolean; //
	tieneDbm: boolean; //
	tieneCancer: boolean; //
	tieneDepresion: boolean; //
	tieneProbPsiquiatricos: boolean; //
	otros: string; //
	reaccionMedicamentos: string; //
	medicamenteFrecuente: string; //
	edadInicioRelacionSexual: number; //
	numParejas: number; //
	hijosVivos: number; //
	rsMismoSexo: boolean; //
	menarquia: string; //
	flujoVagPatologico: boolean; //
	dismenorrea: boolean; //
	tieneEmbarazo: boolean; //
	tieneParto: boolean; //
	tienePrematuro: boolean; //
	tieneAborto: boolean; //
	gestacion: string; //
	tieneFiebre15Dias: boolean; //
	tieneTos15Dias: boolean; //
	lesionesGenitales: string; //
	presionArterial: {
		valorSuperior: number; //
		valoreInferior: number; //
	};
	tieneVacAntitetanica: boolean; //
	tieneVacAntiamerilica: boolean; //
	tieneVacAntihepatitisB: boolean; //
	tieneEncias: boolean; //
	tieneCaries: boolean; //
	tieneEdentulismoParcial: boolean; //
	tieneEdentulismoTotal: boolean; //
	tieneUrgTratamientoBucal: boolean; //
	tieneAnsiedad: boolean; //
	tieneExamVisual: boolean; //
	tieneExamColesterol: boolean; //
	tieneExamGlucosa: boolean; //
	tieneExamMamas: boolean; //
	tieneExamProstata: boolean; //
	tieneExamPelvicoPap: boolean; //
	tieneExamMamografia: boolean; //
	tieneHabFisica: boolean; //
	tieneHabAlcohol: boolean; //
	tieneHabDrogas: boolean; //
	tienePlanificacionSexual: boolean; //
};

export type TClinicHistoryModification = {
	id: string;
	idHistoriaClinica: string;
	nombreMedico: string;
	actualizadoEl: string;
};
