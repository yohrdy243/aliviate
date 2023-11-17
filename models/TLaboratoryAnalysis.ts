export type TLaboratoryAnalysis = {
	id: string; //
	idHistoriaClinica: string; //
	colesterol: number; //
	trigliceridos: number; //
	colesterolHdl: number; //
	colesterolLdl: number; //
	colesterolVldl: number; //
	riesgo1: number; //
	riesgo2: number; //
	glucosa: number; //
	hematrocito: number; //
	hemoglobina: number; //
	tipoExamen: string; //
	muestra: string; //
};

// para crear un nuevo analisis de laboratorio
export type TLaboratoryAnalysisForm = {
	idHistoriaClinica: string;
	colesterol: number;
	trigliceridos: number;
	colesterolHdl: number;
	colesterolLdl: number;
	colesterolVldl: number;
	riesgo1: number;
	riesgo2: number;
	glucosa: number;
	hematrocito: number;
	hemoglobina: number;
	tipoExamen: string;
	muestra: string;
};

export type TLaboratoryAnalysisTable = {
	id: string;
	nombrePaciente: string;
	nombreMedico: string;
	analisisLaboratorio: string;
	idHistoriaClinica: string;
	fecha: string;
};

export type TLaboratoryAnalisisType = {
	id: string;
	nombre: string;
};

export type TLaboratoryAnalisisField = {
	id: number;
	idAnalisis: number;
	campo: string;
	campoJson: string;
	tipo: "float" | "string" | "boolean";
	requerido: boolean;
};

export type DynamicDataType<T extends TLaboratoryAnalisisField[]> = {
	[K in T[number]["campoJson"]]: T[number]["tipo"] extends "float"
		? number
		: T[number]["tipo"];
};

export type TLaboratoryAnalisisValue = {
	idHistoriaClinica: string;
	idAnalisisCampo: number;
	valor: string | number | boolean;
};

export type TLaboratoryAnalsisFile = {
	id: string;
	idHistoriaClinica: string;
	url: string;
};
