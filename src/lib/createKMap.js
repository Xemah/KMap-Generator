import createCombinations from './createCombinations';

const createKMap = (variables, form, terms) => {
	let kMapArr = [];

	const variablesCount = variables.length;
	const colVars = variables.slice(0, Math.ceil(variablesCount / 2));
	const rowVars = variables.slice(colVars.length, colVars.length + Math.floor(variablesCount / 2));

	let rowVarsCombinations = createCombinations(rowVars, form);
	let colVarsCombinations = createCombinations(colVars, form);

	const numRows = rowVarsCombinations.length;
	const numCols = colVarsCombinations.length;

	let index = 0;

	for (let i = 0; i < numRows; i++) {
		kMapArr[i] = [];

		for (let j = 0; j < numCols; j++) {
			const key = colVarsCombinations[j].key
				+ (form === 'SOP' ? ' ' : ' + ')
				+ rowVarsCombinations[i].key;

			const term = colVarsCombinations[j].term + rowVarsCombinations[i].term;

			kMapArr[i][j] = {
				index,
				key,
				term,
				value: terms.includes(term) ? (form === 'SOP' ? 1 : 0) : (form === 'SOP' ? 0 : 1),
				colVars: colVarsCombinations[j].vars,
				rowVars: rowVarsCombinations[i].vars,
			};

			index++;
		}
	}

	rowVarsCombinations = fixPositions(rowVarsCombinations);
	colVarsCombinations = fixPositions(colVarsCombinations);

	kMapArr = kMapArr.map(fixPositions);
	kMapArr = fixPositions(kMapArr);

	const kMap = {
		rowVars,
		colVars,
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