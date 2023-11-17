import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Aliviate",
	description: "Diagnóstico Inmunológico Predictivo",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body className={`${inter.className} bg-[#F2F3F9] `}>{children}</body>
		</html>
	);
}
