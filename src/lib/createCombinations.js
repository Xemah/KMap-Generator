const createCombinations = (variables, form) => {
	const variablesCount = variables.length;
	const combinationsCount = Math.pow(2, variablesCount);

	const combinations = [];

	for (let i = 0; i < combinationsCount; i++) {
		const vars = {};

		for (let j = 0; j < variablesCount; j++) {
			vars[variables[j]] = Math.floor(i / Math.pow(2, variablesCount - 1 - j)) % 2;
		}

		const key = Object.entries(vars)
			.map(([v, val]) => v + (val === 0 ? '\'' : ''))
			.join(form === 'SOP' ? ' ' : ' + ');

		const term = Object.values(vars)
			.join('');

		combinations.push({
			key,
			term,
			vars,
		});
	}

	return combinations;
};

export default createCombinations;