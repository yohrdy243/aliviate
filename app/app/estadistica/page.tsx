"use client";
import BarGraphic, { BarGraphicSkeleton } from "@/components/Charts/BarGraphic";
import { Suspense } from "react";

export default function page() {
	return (
		<div className="w-full">
			<div className="grid grid-cols-4 gap-4 p-6">
				<div className="col-span-3">
					<Suspense fallback={<BarGraphicSkeleton />}>
						<BarGraphic />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
