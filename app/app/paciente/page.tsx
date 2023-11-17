"use client";
import PacientNavbar, {
	PacientNavbarSkeleton,
} from "@/components/Pacient/PacientNavbar";
import Link from "next/link";
import { Suspense } from "react";

function Option({ title, link }: { title: string; link: string }) {
	return (
		<div className="bg-white w-full flex justify-between items-center px-8 py-6">
			<div>
				<h3 className="font-[600]">{title}</h3>
			</div>
			<div className="flex gap-2">
				<Link href={link}>
					<svg
						width={20}
						height={20}
						viewBox="0 0 37 38"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
					>
						<rect width={37} height={38} fill="url(#pattern0)" />
						<defs>
							<pattern
								id="pattern0"
								patternContentUnits="objectBoundingBox"
								width={1}
								height={1}
							>
								<use
									xlinkHref="#image0_330_1199"
									transform="matrix(0.00653595 0 0 0.00636395 0 -0.00911593)"
								/>
							</pattern>
							<image
								id="image0_330_1199"
								width={153}
								height={160}
								xlinkHref="data:image/png;base64,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"
							/>
						</defs>
					</svg>
				</Link>
			</div>
		</div>
	);
}

export default function page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	return (
		<>
			<Suspense fallback={<PacientNavbarSkeleton />}>
				<PacientNavbar
					dni={searchParams.dni ? searchParams.dni.toString() : ""}
				/>
			</Suspense>
			<section className="flex flex-col px-10 py-10 gap-4">
				<Option
					title={"Historia Clinica"}
					link={`/app/paciente/historiaclinica?dni${
						searchParams.dni ? `=${searchParams.dni}` : ""
					}&idClinicHistory${
						searchParams.idClinicHistory
							? `=${searchParams.idClinicHistory}`
							: ""
					}
				&idLaboratoryAnalisis${
					searchParams.idLaboratoryAnalisis
						? `=${searchParams.idLaboratoryAnalisis}`
						: ""
				}&haveConsultations${
						searchParams.haveConsultations
							? `=${searchParams.haveConsultations.toString()}`
							: ""
					}
				`}
				/>
				<Option
					title={"Análisis de laboratorio"}
					link={`/app/paciente/analisislaboratorio?dni${
						searchParams.dni ? `=${searchParams.dni}` : ""
					}&idClinicHistory${
						searchParams.idClinicHistory
							? `=${searchParams.idClinicHistory}`
							: ""
					}
				&idLaboratoryAnalisis${
					searchParams.idLaboratoryAnalisis
						? `=${searchParams.idLaboratoryAnalisis}`
						: ""
				}&haveConsultations${
						searchParams.haveConsultations
							? `=${searchParams.haveConsultations.toString()}`
							: ""
					}
				`}
				/>
				<Option
					title={"Consulta"}
					link={`/app/paciente/consulta?dni${
						searchParams.dni ? `=${searchParams.dni}` : ""
					}&idClinicHistory${
						searchParams.idClinicHistory
							? `=${searchParams.idClinicHistory}`
							: ""
					}
				&idLaboratoryAnalisis${
					searchParams.idLaboratoryAnalisis
						? `=${searchParams.idLaboratoryAnalisis}`
						: ""
				}&haveConsultations${
						searchParams.haveConsultations
							? `=${searchParams.haveConsultations.toString()}`
							: ""
					}
				`}
				/>
			</section>
		</>
	);
}
