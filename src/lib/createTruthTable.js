import createCombinations from './createCombinations';

const createTruthTable = (kMap, form) => {
	if (!kMap) {
		return [];
	}

	const truthTable = [];
	const combinations = createCombinations(kMap.variables, form);

	combinations.forEach((combination) => {
		let element = null;

		kMap.arr.forEach((row) => {
			if (element) return;

			row.forEach((el) => {
				if (el.binary === combination.binary) {
					element = el;
					return;
				}
			});
		});

		truthTable.push(element);
	});

	return truthTable;
};

export default createTruthTable;