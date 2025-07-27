export function convertTimeframe(value, direction) {
	const data = [
		{ title: "1m", value: "1" },
		{ title: "3m", value: "3" },
		{ title: "5m", value: "5" },
		{ title: "15m", value: "15" },
		{ title: "30m", value: "30" },
		{ title: "1h", value: "60" },
		{ title: "4h", value: "240" },
		{ title: "1d", value: "D" },
	];

	if (direction == "toTitle") {
		return data.find((item) => String(item.value) == String(value)).title;
	} else if (direction == "toValue") {
		return data.find((item) => String(item.title) == String(value)).value;
	} else return null;
}
