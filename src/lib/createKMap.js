import createCombinations from './createCombinations';

const createKMap = (variables, form, terms, termsType) => {
	let kMapArr = [];

	const variablesCount = variables.length;
	const rowVars = variables.slice(0, Math.floor(variablesCount / 2));
	const colVars = variables.slice(rowVars.length, rowVars.length + Math.ceil(variablesCount / 2));

	let rowVarsCombinations = createCombinations(rowVars, form);
	let colVarsCombinations = createCombinations(colVars, form);

	const numRows = rowVarsCombinations.length;
	const numCols = colVarsCombinations.length;

	let term = 0;

	for (let i = 0; i < numRows; i++) {
		kMapArr[i] = [];

		for (let j = 0; j < numCols; j++) {
			const key = rowVarsCombinations[i].key
				+ (form === 'SOP' ? ' ' : ' + ')
				+ colVarsCombinations[j].key;

			const binary = rowVarsCombinations[i].binary
				+ colVarsCombinations[j].binary;

			const vars = {
				...rowVarsCombinations[i].vars,
				...colVarsCombinations[j].vars,
			};

			const value = terms.includes(term)
				? (termsType === 'MIN' ? 1 : 0)
				: (termsType === 'MIN' ? 0 : 1);

			kMapArr[i][j] = {
				term,
				key,
				binary,
				value,
				vars,
				rowVars: rowVarsCombinations[i].vars,
				colVars: colVarsCombinations[j].vars,
			};

			term++;
		}
	}

	rowVarsCombinations = fixPositions(rowVarsCombinations);
	colVarsCombinations = fixPositions(colVarsCombinations);

	kMapArr = kMapArr.map(fixPositions);
	kMapArr = fixPositions(kMapArr);

	const kMap = {
		variables,
		colVars,
		rowVars,
		rowVarsCombinations,
		colVarsCombinations,
		arr: kMapArr,
	};

	return kMap;
};

const fixPositions = (arr) => {
	if (arr.length >= 4) {
		[arr[2], arr[3]] = [arr[3], arr[2]];

		if (arr.length >= 5) {
			[arr[4], arr[6]] = [arr[6], arr[4]];
			[arr[5], arr[7]] = [arr[7], arr[5]];
			[arr[6], arr[7]] = [arr[7], arr[6]];
		}
	}

	return arr;
};

export default createKMap;