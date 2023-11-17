import Card from "../Layout/Card";
import MainLogo from "../Logo";

export default function AuthLayout({ children }: { children: React.ReactNode}) {
	return (
		<section className="w-screen h-screen">
			<div className="grid grid-cols-2 h-full">
				<div className="flex justify-center items-center bg-[#00A3D7]">
					<MainLogo />
				</div>
				<div className="flex flex-col justify-center items-center bg-[#F2F3F9]">
					<Card>
						{children}
					</Card>
				</div>
			</div>
		</section>
	);
}
