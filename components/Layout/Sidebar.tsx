import image from "../../public/images/doctorImage.png";
import { cookies, headers } from "next/headers";
import Image from "next/image";
import { Item } from "./SidebarItem";

export default function Sidebar() {
	const typeUser = cookies().get("rol")!.value;
	const name = cookies().get("name")!.value;

	return (
		<div className="fixed w-72 z-10 h-screen bg-[#FFF]">
			<div className="flex flex-col p-4">
				<div className="flex justify-center items-center gap-4 pb-8 pt-4">
					<div className="bg-[#D9D9D9] w-[80px] h-[80px] rounded-full">
						<Image
							className="rounded-full"
							src={image.src}
							alt="doctor"
							width={100}
							height={80}
						/>
					</div>
					<div>
						<p className="text-[14px] font-[500]">
							{typeUser === "2" ? "Dr." : null}
							{name}
						</p>
						<p className="text-[12px] font-[400] italic">
							{typeUser === "1" ? "Administrador" : "Medico"}
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					{typeUser === "1" ? (
						<Item title="Sobrevista" path="/app/admin" />
					) : null}
					{typeUser === "2" ? <Item title="Diagnósticos" path="/app" /> : null}
					<Item title="Estadistica" path="/app/estadistica" />
				</div>
			</div>
		</div>
	);
}
