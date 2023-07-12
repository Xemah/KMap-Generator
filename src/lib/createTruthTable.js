import createCombinations from './createCombinations';

const createTruthTable = (variables, terms, form) => {
	const truthTable = [];

	const combinations = createCombinations(variables, form);

	combinations.forEach((combination) => {
		truthTable.push({
			key: combination.key,
			term: combination.term,
			vars: combination.vars,
			value: terms.includes(combination.term) ? (form === 'SOP' ? 1 : 0) : (form === 'SOP' ? 0 : 1),
		});
	});

	return truthTable;
};

export default createTruthTable;