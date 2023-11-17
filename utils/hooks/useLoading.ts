import { useCallback, useState } from "react";

export function useLoading(initalState: boolean = false) {
	const [loading, setLoading] = useState<boolean>(initalState);
	const charging = useCallback(() => setLoading(true), []);
	const endCharging = useCallback(() => setLoading(false), []);

	return { loading, charging, endCharging };
}
