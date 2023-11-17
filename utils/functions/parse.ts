export function parseDateStringToInputDatetime(inputString: string): string {
	const fechaOriginal = new Date(inputString);
	const year = fechaOriginal.getFullYear();
	const month = String(fechaOriginal.getMonth() + 1).padStart(2, "0");
	const day = String(fechaOriginal.getDate()).padStart(2, "0");
	const hours = String(fechaOriginal.getHours()).padStart(2, "0");
	const minutes = String(fechaOriginal.getMinutes()).padStart(2, "0");

	const fechaFormateada = `${year}-${month}-${day}T${hours}:${minutes}`;

	return fechaFormateada;
}

export function parseDateStringToInputDate(inputString: string): string {
	// Extrae la parte de la fecha sin la hora y los milisegundos
	const fechaSinHora: string = inputString.split("T")[0];

	return fechaSinHora;
}

export function convertirFecha(fechaString: string): string {
	const [anio, mes, dia] = fechaString.split("-").map(Number);
	const fecha = new Date(anio, mes - 1, dia, 0, 0, 0);
	return fecha.toISOString();
}
