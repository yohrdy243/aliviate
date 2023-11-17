"use client";
import ClinicalHistoryTable from "@/components/ClinicalHistory/ClinicalHistoryTable";
import ConsultationTable from "@/components/Consultation/ConsultationTable";
import LaboratoryAnalysisTable from "@/components/LaboratoryAnalisis/LaboratoryAnalisisTable";
import { useState } from "react";

function ArrowIcon() {
	return (
		<svg
			width="38"
			height="40"
			viewBox="0 0 38 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M18.9999 26.6665C20.9791 26.6665 22.6614 25.9373 24.0468 24.479C25.4322 23.0207 26.1249 21.2498 26.1249 19.1665C26.1249 17.0832 25.4322 15.3123 24.0468 13.854C22.6614 12.3957 20.9791 11.6665 18.9999 11.6665C17.0208 11.6665 15.3385 12.3957 13.953 13.854C12.5676 15.3123 11.8749 17.0832 11.8749 19.1665C11.8749 21.2498 12.5676 23.0207 13.953 24.479C15.3385 25.9373 17.0208 26.6665 18.9999 26.6665ZM18.9999 23.6665C17.8124 23.6665 16.803 23.229 15.9718 22.354C15.1405 21.479 14.7249 20.4165 14.7249 19.1665C14.7249 17.9165 15.1405 16.854 15.9718 15.979C16.803 15.104 17.8124 14.6665 18.9999 14.6665C20.1874 14.6665 21.1968 15.104 22.028 15.979C22.8593 16.854 23.2749 17.9165 23.2749 19.1665C23.2749 20.4165 22.8593 21.479 22.028 22.354C21.1968 23.229 20.1874 23.6665 18.9999 23.6665ZM18.9999 31.6665C15.1471 31.6665 11.6374 30.5346 8.47075 28.2707C5.30409 26.0068 3.00825 22.9721 1.58325 19.1665C3.00825 15.3609 5.30409 12.3262 8.47075 10.0623C11.6374 7.79845 15.1471 6.6665 18.9999 6.6665C22.8527 6.6665 26.3624 7.79845 29.5291 10.0623C32.6958 12.3262 34.9916 15.3609 36.4166 19.1665C34.9916 22.9721 32.6958 26.0068 29.5291 28.2707C26.3624 30.5346 22.8527 31.6665 18.9999 31.6665ZM18.9999 28.3332C21.9819 28.3332 24.7197 27.5068 27.2135 25.854C29.7072 24.2012 31.6138 21.9721 32.9333 19.1665C31.6138 16.3609 29.7072 14.1318 27.2135 12.479C24.7197 10.8262 21.9819 9.99984 18.9999 9.99984C16.018 9.99984 13.2801 10.8262 10.7864 12.479C8.29263 14.1318 6.38603 16.3609 5.06659 19.1665C6.38603 21.9721 8.29263 24.2012 10.7864 25.854C13.2801 27.5068 16.018 28.3332 18.9999 28.3332Z"
				fill="black"
			/>
		</svg>
	);
}

function CollapseHeader({
	title,
	openSection,
	sectionNumber,
	handleSectionClick,
}: {
	title: string;
	openSection: any;
	sectionNumber: number;
	handleSectionClick: (sectionNumber: number) => void;
}) {
	return (
		<button
			type="button"
			className={`flex items-center justify-between w-full p-5 font-medium text-left text-black border-gray-200 focus:ring-4 focus:ring-gray-200 bg-[#D9D9D9]`}
			data-accordion-target="#accordion-collapse-body-1"
			aria-expanded={openSection === sectionNumber ? "true" : "false"}
			aria-controls="accordion-collapse-body-1"
			onClick={() => handleSectionClick(sectionNumber)}
		>
			<span className="text-[24px] font-[700]">{title}</span>
			<ArrowIcon />
		</button>
	);
}

export default function AdminPanel() {
	const [openSection, setOpenSection] = useState<any>(1);

	const handleSectionClick = (sectionNumber: number) => {
		setOpenSection(sectionNumber === openSection ? null : sectionNumber);
	};

	return (
		<div className="py-10 px-10 w-full">
			<div className="px-8 py-10 bg-white">
				<div id="accordion-collapse" data-accordion="collapse" className="transition-all duration-500 ease-in-out">
					<h2 id="accordion-collapse-heading-1">
						<CollapseHeader
							title="Historia Clínica"
							openSection={openSection}
							sectionNumber={1}
							handleSectionClick={handleSectionClick}
						/>
					</h2>
					<div
						id="accordion-collapse-body-1"
						className={`${
							openSection === 1
								? "p-5 border border-b-0 border-gray-200"
								: "hidden"
						} p-4`}
						aria-labelledby="accordion-collapse-heading-1"
					>
						<ClinicalHistoryTable type="delete"/>
					</div>

					<h2 id="accordion-collapse-heading-2">
						<CollapseHeader
							title="Análisis de Laboratorio"
							openSection={openSection}
							sectionNumber={2}
							handleSectionClick={handleSectionClick}
						/>
					</h2>
					<div
						id="accordion-collapse-body-2"
						className={`${
							openSection === 2
								? "p-5 border border-b-0 border-gray-200"
								: "hidden"
						} p-4 w-full`}
						aria-labelledby="accordion-collapse-heading-2"
					>
						<LaboratoryAnalysisTable />
					</div>

					<h2 id="accordion-collapse-heading-3">
						<CollapseHeader
							title="Consulta"
							openSection={openSection}
							sectionNumber={3}
							handleSectionClick={handleSectionClick}
						/>
					</h2>
					<div
						id="accordion-collapse-body-3"
						className={`${
							openSection === 3
								? "p-5 border border-t-0 border-gray-200"
								: "hidden"
						} p-4`}
						aria-labelledby="accordion-collapse-heading-3"
					>
						<ConsultationTable type="delete"/>
					</div>
				</div>
			</div>
		</div>
	);
}
