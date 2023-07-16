const createGroups = (kMap, form) => {
	const desiredValue = form === 'SOP' ? 1 : 0;

	const kMapArr = kMap.arr;
	const variablesCount = kMap.colVars.length + kMap.rowVars.length;

	const numRows = kMapArr.length;
	const numCols = kMapArr[0].length;

	let groups = [];

	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j < numCols; j++) {
			let currentGroup = [];

			if (kMapArr[i][j].value !== desiredValue) {
				continue;
			}

			if (groups.some((g) => g.some((e) => e.element.term === kMapArr[i][j].term))) {
				continue;
			}

			colsLoop:
			for (let k = numCols; k >= 1; k /= 2) {
				for (let l = 0; l < k; l++) {
					const nextsCount = k - l;
					const prevsCount = k - nextsCount + 1;

					if (
						[...Array(nextsCount).keys()].every((n) =>
							kMapArr[i][j + n] && kMapArr[i][j + n]?.value === desiredValue)
						&& [...Array(prevsCount).keys()].every((n) =>
							kMapArr[i][j - n] && kMapArr[i][j - n]?.value === desiredValue)
					) {
						[...Array(nextsCount).keys()].forEach((n) =>
							currentGroup.push({ row: i, col: j + n, element: kMapArr[i][j + n] }));
						[...Array(prevsCount).keys()].forEach((n) =>
							currentGroup.push({ row: i, col: j - n, element: kMapArr[i][j - n] }));
						break colsLoop;
					}
				}
			}

			const rowElements = [...currentGroup];

			rowsLoop:
			for (let k = numRows; k >= 1; k /= 2) {
				for (let l = 0; l < k; l++) {
					const nextsCount = k - l;
					const prevsCount = k - nextsCount + 1;

					if (
						[...Array(nextsCount).keys()].every((n) =>
							rowElements.every(({ col }) => kMapArr[i + n]?.[col].value === desiredValue))
						&& [...Array(prevsCount).keys()].every((n) =>
							rowElements.every(({ col }) => kMapArr[i - n]?.[col].value === desiredValue))
					) {
						[...Array(nextsCount).keys()].forEach((n) =>
							rowElements.forEach(({ col }) =>
								currentGroup.push({ row: i + n, col: col, element: kMapArr[i + n][col] })));
						[...Array(prevsCount).keys()].forEach((n) =>
							rowElements.forEach(({ col }) =>
								currentGroup.push({ row: i - n, col: col, element: kMapArr[i - n][col] })));
						break rowsLoop;
					}
				}
			}

			let currentElements = [...currentGroup];
			if (currentElements.some((el) => (el.col === 0 || el.col === numCols - 1))) {
				if (currentElements.every(({ row, col }) => kMapArr[row][numCols - 1 - col].value === desiredValue)) {
					currentElements.forEach(({ row, col }) =>
						currentGroup.push({ row: row, col: numCols - 1 - col, element: kMapArr[row][numCols - 1 - col] }));
				}
			}

			currentElements = [...currentGroup];
			if (currentElements.some((el) => (el.row === 0 || el.row === numRows - 1))) {
				if (currentElements.every(({ row, col }) => kMapArr[numRows - 1 - row][col].value === desiredValue)) {
					currentElements.forEach(({ row, col }) =>
						currentGroup.push({ row: numRows - 1 - row, col: col, element: kMapArr[numRows - 1 - row][col] }));
				}
			}

			groups.push(currentGroup);
		}
	}

	const finalGroups = [];

	groups.forEach((group, i) => {
		finalGroups[i] = [];

		group.sort((a, b) => a.element.term - b.col.term);

		group.forEach(({ element }) => {
			if (!finalGroups[i].some((el) => el.term === element.term)) {
				finalGroups[i].push(element);
			}
		});
	});

	return finalGroups;
};

export default createGroups;