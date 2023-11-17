import { useCallback, useState } from "react";

export default function useModal() {
	const [visible, setVisible] = useState<boolean>(false);

	const open = useCallback(() => setVisible(true), []);
	const close = useCallback(() => setVisible(false), []);

	return { visible, open, close };
}
