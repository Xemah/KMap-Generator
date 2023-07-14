import createCombinations from './createCombinations';

const createTruthTable = (kMap, form) => {
	if (!kMap) {
		return [];
	}

	const truthTable = [];
	const combinations = createCombinations(kMap.variables, form);

	combinations.forEach((combination) => {
		const element = kMap.arr.flat().find((el) => el.binary === combination.binary);
		truthTable.push(element);
	});

	return truthTable;
};

export default createTruthTable;