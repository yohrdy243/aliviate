"use client";

import { useRouter, usePathname } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function BackButton() {
	const { back } = useRouter();
	const path = usePathname();
	const isOnApp = path === "/app";

	return (
		<div
			onClick={() => !isOnApp && back()}
			className={`${!isOnApp ? "text-black" : "text-gray-400"} text-xl`}
		>
			<AiOutlineArrowLeft />
		</div>
	);
}
