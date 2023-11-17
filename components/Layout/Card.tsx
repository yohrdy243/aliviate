export default function Card({ children }: { children: React.ReactNode }) {
	return <div className="rounded-[10px] bg-[#FFF] py-4 px-8">{children}</div>;
}