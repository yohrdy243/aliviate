type TConsultation = {
	id: string;
	idHistoriaClinica: string;
	idMedico: string;
	nombreMedico: string;
	fechaRegistro: string;

	descripcionEnfermedadPaciente: string;

	tiempoEnfermedad: number;
	apetito: string;
	sed: string;
	suenio: string;
	estadoAnimo: string;
	otroDetalle: string;
	orina: string;
	deposiciones: string;
	temperatura: number;
	pA: number;
	FC: number;
	FR: number;
	peso: number;
	talla: number;
	iMC: number;
	diagnostico: string;
	tratamiento: string;
	diagnosticoIA: {
		enfermedad: string;
		probabilidad: number;
		esAceptado: boolean;
	}[];
	tratamientoIA?: { tratamiento: string; probabilidad: number }[];
	examenesAuxiliares: string[];
	proximaCita: string;
	observaciones: string;
	nombreCompletoPaciente: string;

	signosSintomas: string;
	idPaciente: string;
};

type TConsultationForm = {
	id: string;
	idHistoriaClinica: string;
	idMedico: string;
	idPaciente: string;
	nombreCompletoPaciente: string;

	descripcionEnfermedadPaciente: string;
	tiempoEnfermedad: number;
	apetito: string;
	sed: string;
	suenio: string;
	estadoAnimo: string;
	otroDetalle: string;
	orina: string;
	deposiciones: string;
	temperatura: number;
	signosSintomas: string;
	diagnosticoIA: {
		enfermedad: string;
		probabilidad: number;
		esAceptado: boolean;
	}[];
	tratamientoIA: {
		tratamiento: string;
		probabilidad: number;
		esAceptado: boolean;
	}[];
	pA: number;
	FC: number;
	FR: number;
	peso: number;
	talla: number;
	iMC: number;
	diagnostico: string;
	tratamiento: string;
	examenesAuxiliares: string;
	proximaCita: string;
	observaciones: string;
};
