import { getPredictionsDataToChart } from "@/services/PredictionService";
import { BarChart, BarList, Card, Subtitle, Title } from "@tremor/react";

export default async function BarGraphic() {
	const data = await getPredictionsDataToChart();

	return (
		<Card>
			<Title>Probabilidades acertadas (%) por Enfermedad</Title>
			<BarChart
				className="mt-6"
				data={data || []}
				index="name"
				categories={["Predicciones Correctas"]}
				colors={["cyan"]}
				yAxisWidth={48}
				showAnimation={true}
				layout="vertical"
			/>
		</Card>
	);
}

export function BarGraphicSkeleton() {
	return (
		<div
			role="status"
			className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6"
		>
			<div className="h-6 bg-gray-200 rounded-full w-[400px] mb-2.5" />
			<div className="flex justify-end">
				<div className="w-48 h-4 bg-gray-200 rounded-full" />
			</div>
			<div className="flex items-baseline mt-4">
				<div className="w-full bg-gray-200 rounded-t-lg h-72" />
				<div className="w-full h-56 ms-6 bg-gray-200 rounded-t-lg" />
				<div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6" />
				<div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg" />
				<div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6" />
				<div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6" />
				<div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6" />
			</div>
			<span className="sr-only">Loading...</span>
		</div>
	);
}
