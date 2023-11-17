export function getRandomNumber(min: number, max: number): number {
	if (min > max) {
		throw new Error("El valor mínimo no puede ser mayor que el valor máximo.");
	}
	const result = Math.random() * (max - min) + min;
	return Number(result.toFixed(2));
}
