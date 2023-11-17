
export type TPatientTable = {
	id: string;
	nombre: string;
	apellido: string;
	fechaNacimiento: string | Date;
	genero: number;
	documentoIdentidad: number;
	fechaRegistro: string | Date;
	grupoSanguineo: string;
	rhSanguineo: string;
	telefono: string;
};

