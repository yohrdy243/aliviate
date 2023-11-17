"use client";
import { ReactNode, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";

export default function OffCanvas({
	children,
	isOpen,
	handleClose,
	title,
}: {
	children: ReactNode;
	isOpen: boolean;
	handleClose: () => void;
	title: string;
}) {
	const offcanvasRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				offcanvasRef.current &&
				!offcanvasRef.current.contains(event.target as Node)
			) {
				handleClose();
			}
		};

		if (isOpen) {
			document.body.style.overflow = "hidden";
			window.addEventListener("mousedown", handleOutsideClick);
		} else {
			document.body.style.overflow = "";
			window.removeEventListener("mousedown", handleOutsideClick);
		}

		return () => {
			window.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [isOpen, handleClose]);

	if(!isOpen) return null;
	return (
		<div className="fixed z-30 w-screen h-screen inset-0 bg-black/20 backdrop-blur-sm bg-opacity-50 ">
			<div
				ref={offcanvasRef}
				className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto bg-white w-96"
			>
				<div className="flex justify-between items-center px-4 text-[16px] font-[600] text-black pb-4">
					<h2>{title}</h2>
					<div onClick={handleClose}>
						<RxCross2 />
					</div>
				</div>
				<div className="p-4">{children}</div>
			</div>
		</div>
	);
}
