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
		console.log("New page");
	}, [dependency]);
};

export default useScrollToTop;
