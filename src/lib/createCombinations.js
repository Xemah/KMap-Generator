const createCombinations = (variables, form) => {
	const variablesCount = variables.length;
	const combinationsCount = Math.pow(2, variablesCount);

	const combinations = [];

	for (let i = 0; i < combinationsCount; i++) {
		const binary = i.toString(2).padStart(variablesCount, '0');

		const vars = {};
		for (let j = 0; j < binary.length; j++) {
			vars[variables[j]] = parseInt(binary[j]);
		}

		const key = Object.entries(vars)
			.map(([v, val]) => v + (val === 0 ? '\'' : ''))
			.join(form === 'SOP' ? ' ' : ' + ');

		combinations.push({
			key,
			binary,
			vars,
		});
	}

	return combinations;
};

export default createCombinations;