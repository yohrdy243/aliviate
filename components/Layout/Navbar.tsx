import React from "react";
import { NavLogo } from "../Logo";
import { LogoutButton } from "../Auth/LogoutButton";
import BackButton from "./BackButton";

export default function Navbar() {
	return (
		<nav className="fixed top-0 w-screen z-20 bg-[#FFF] h-16">
			<div className="flex justify-between items-center px-12 py-4">
				<div className="text-[10px] gap-10 flex items-center">
					<NavLogo />
					<BackButton />
				</div>
				<LogoutButton />
			</div>
		</nav>
	);
}
