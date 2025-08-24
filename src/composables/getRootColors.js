export default function getRootColor() {
	const root = document.documentElement;
	const colors = {
		primary: getComputedStyle(root).getPropertyValue("--primary-color").trim(),
		secondary: getComputedStyle(root).getPropertyValue("--secondary-color").trim(),
		text: getComputedStyle(root).getPropertyValue("--text-color").trim(),
		title: getComputedStyle(root).getPropertyValue("--title-color").trim(),
		bg: getComputedStyle(root).getPropertyValue("--bg-color").trim(),
		neutral: getComputedStyle(root).getPropertyValue("--neutral-color").trim(),
		accent: getComputedStyle(root).getPropertyValue("--accent-color").trim(),
		value: getComputedStyle(root).getPropertyValue("--value-color").trim(),
		block: getComputedStyle(root).getPropertyValue("--block-color").trim(),
		borderBlock: getComputedStyle(root).getPropertyValue("--border-block").trim(),
		border: getComputedStyle(root).getPropertyValue("--border-color").trim(),
		btnGradient: getComputedStyle(root).getPropertyValue("--btn-gradient").trim(),
	};

	return colors;
}
