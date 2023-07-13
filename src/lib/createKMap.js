import createCombinations from './createCombinations';

const createKMap = (variables, form, terms, termsType) => {
	let kMapArr = [];

	const variablesCount = variables.length;
	const colVars = variables.slice(0, Math.ceil(variablesCount / 2));
	const rowVars = variables.slice(colVars.length, colVars.length + Math.floor(variablesCount / 2));

	let rowVarsCombinations = createCombinations(rowVars, form);
	let colVarsCombinations = createCombinations(colVars, form);

	const numRows = rowVarsCombinations.length;
	const numCols = colVarsCombinations.length;

	let term = 0;

	for (let i = 0; i < numRows; i++) {
		kMapArr[i] = [];

		for (let j = 0; j < numCols; j++) {
			const key = colVarsCombinations[j].key
				+ (form === 'SOP' ? ' ' : ' + ')
				+ rowVarsCombinations[i].key;

			const binary = colVarsCombinations[j].binary
				+ rowVarsCombinations[i].binary;

			const vars = {
				...colVarsCombinations[j].vars,
				...rowVarsCombinations[i].vars,
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
				colVars: colVarsCombinations[j].vars,
				rowVars: rowVarsCombinations[i].vars,
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
		colVarsCombinations,
		rowVarsCombinations,
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