import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import { Fragment } from "react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Fragment>
			<Navbar />
			<div className="mt-16">
				<Sidebar />
				<main>
					<div className="ml-72">{children}</div>
				</main>
			</div>
		</Fragment>
	);
}
