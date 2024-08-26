import { useEffect } from "react";

const useScrollToTop = (dependency: string | number) => {
	useEffect(() => {
		setTimeout(() => {
			window.scroll({
				top: 0,
				left: 0,
				behavior: "smooth",
			});
		}, 0);
	}, [dependency]);
};

export default useScrollToTop;
