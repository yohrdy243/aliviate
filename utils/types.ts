export type InputType = {
	type?:
		| "button"
		| "checkbox"
		| "color"
		| "date"
		| "datetime-local"
		| "email"
		| "file"
		| "hidden"
		| "image"
		| "month"
		| "number"
		| "password"
		| "radio"
		| "range"
		| "reset"
		| "search"
		| "submit"
		| "tel"
		| "text"
		| "time"
		| "url"
		| "week";
	name?: string;
	placeholder?: string;
	value?: string;
	autocomplete?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type LoginProps = {
	type: "admin" | "doctor";
	credentials: Credentials;
};

export type Credentials = {
	correo: string;
	contrasenia: string;
};

export type User = {
	jwt: string;
	nombreCompleto: string;
	correo: string;
	rol: number;
};

export type TRegisterUserDoctor = {
	nombre: string;
	apellido: string;
	colegiatura: string;
	correo: string;
	contrasenia: string;
	direccion: string;
	Especialidad: string;
};

export const TypesUser = {
	1: "Administrador",
	2: "Doctor",
};

export type ErrorResponse = {
	hasError: boolean;
	detail: string;
};

export type TResponse<T> = {
	error: ErrorResponse;
	data: T;
};
