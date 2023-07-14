const createGroups = (kMap, form) => {
	const desiredValue = form === 'SOP' ? 1 : 0;

	const kMapArr = kMap.arr;
	const variablesCount = kMap.colVars.length + kMap.rowVars.length;

	const numRows = kMapArr.length;
	const numCols = kMapArr[0].length;

	if (variablesCount > 5) {
		return [];
	}

	let groups = [];

	if (variablesCount >= 2) {

		for (let i = 0; i < numRows; i++) {
			for (let j = 0; j < numCols; j++) {

				if (kMapArr[i][j].value !== desiredValue) {
					continue;
				}

				if (groups.some((g) => g.some((e) => e.element.term === kMapArr[i][j].term))) {
					continue;
				}

				let currentGroup = [];

				if (kMapArr[i].every((el) => el.value === desiredValue)) {
					kMapArr[i].forEach((el, k) => {
						currentGroup.push({ row: i, col: k, element: el });
					});

				} else {
					currentGroup.push({ row: i, col: j, element: kMapArr[i][j] });

					if (j + 1 < numCols && kMapArr[i][j + 1].value === desiredValue) {
						currentGroup.push({ row: i, col: j + 1, element: kMapArr[i][j + 1]});

						if (variablesCount >= 3) {
							if ([2, 3].every((n) => j + n < numCols && kMapArr[i][j + n].value === desiredValue)) {
								[2, 3].forEach((n) => currentGroup.push({ row: i, col: j + n, element: kMapArr[i][j + n] }));

								if (variablesCount >= 4) {
									if ([4, 5, 6, 7].every((n) => j + n < numCols && kMapArr[i][j + n].value === desiredValue)) {
										[4, 5, 6, 7].forEach((n) => {
											currentGroup.push({ row: i, col: j + n, element: kMapArr[i][j + n] });
										});
									}
								}
							}
						}
					}

					if (j - 1 >= 0 && kMapArr[i][j - 1].value === desiredValue) {
						currentGroup.push({ row: i, col: j - 1, element: kMapArr[i][j - 1]});

						if (variablesCount >= 3) {
							if ([2, 3].every((n) => j - n >= 0 && kMapArr[i][j - n].value === desiredValue)) {
								[2, 3].forEach((n) => {
									currentGroup.push({ row: i, col: j - n, element: kMapArr[i][j - n] });
								});

								if (variablesCount >= 4) {
									if ([4, 5, 6, 7].every((n) => j - n >= 0 && kMapArr[i][j - n].value === desiredValue)) {
										[4, 5, 6, 7].forEach((n) => {
											currentGroup.push({ row: i, col: j - n, element: kMapArr[i][j - n] });
										});
									}
								}
							}
						}
					}
				}

				const rowElements = [...currentGroup];

				if (rowElements.every((el) => kMapArr.every((row) => row[el.col].value === desiredValue))) {
					rowElements.forEach((el) => {
						kMapArr.forEach((row, k) => {
							currentGroup.push({ row: k, col: el.col, element: row[el.col] });
						});
					});

				} else {
					if (i + 1 < numRows && rowElements.every(({ col }) => kMapArr[i + 1][col].value === desiredValue)) {
						rowElements.forEach(({ col }) => {
							currentGroup.push({ row: i + 1, col: col, element: kMapArr[i + 1][col] });
						});

						if (variablesCount >= 3) {
							if ([2, 3].every((n) => i + n < numRows && rowElements.every(({ col }) => kMapArr[i + n][col].value === desiredValue))) {
								[2, 3].forEach((n) => {
									rowElements.forEach(({ col }) => {
										currentGroup.push({ row: i + n, col: col, element: kMapArr[i + n][col] });
									});
								});
							}
						}
					}

					if (i - 1 >= 0 && rowElements.every(({ col }) => kMapArr[i - 1][col].value === desiredValue)) {

						if (i === 2) {
							if (i - 2 >= 0 && rowElements.every(({ col }) => kMapArr[i - 2][col].value === desiredValue)) {
								rowElements.forEach(({ col }) => {
									[1, 2].forEach((n) => {
										currentGroup.push({ row: i - n, col: col, element: kMapArr[i - n][col] });
									});
								});
							}
						} else {
							rowElements.forEach(({ col }) => {
								currentGroup.push({ row: i - 1, col: col, element: kMapArr[i - 1][col] });
							});
						}

						if (variablesCount >= 3) {
							if ([2, 3].every((n) => i - n >= 0 && rowElements.every(({ col }) => kMapArr[i - n][col].value === desiredValue))) {
								rowElements.forEach(({ col }) => {
									[2, 3].forEach((n) => {
										currentGroup.push({ row: i - n, col: col, element: kMapArr[i - n][col] });
									});
								});
							}
						}
					}
				}

				let currentElements = [...currentGroup];
				if (variablesCount >= 3 && currentElements.some((el) => (el.col === 0 || el.col === numCols - 1))) {
					if (currentElements.every(({ row, col }) => kMapArr[row][numCols - 1 - col].value === desiredValue)) {
						currentElements.forEach(({ row, col }) => {
							currentGroup.push({ row: row, col: numCols - 1 - col, element: kMapArr[row][numCols - 1 - col]});
						});
					}
				}

				currentElements = [...currentGroup];
				if (variablesCount >= 3 && currentElements.some((el) => (el.row === 0 || el.row === numRows - 1))) {
					if (currentElements.every(({ row, col }) => kMapArr[numRows - 1 - row][col].value === desiredValue)) {
						currentElements.forEach(({ row, col }) => {
							currentGroup.push({ row: numRows - 1 - row, col: col, element: kMapArr[numRows - 1 - row][col] });
						});
					}
				}

				if (variablesCount >= 3 && currentElements.some((el) => (
					(el.col === 0 && el.row === 0)
					|| (el.col === 0 && el.row === numRows - 1)
					|| (el.col === numCols - 1 && el.row === 0)
					|| (el.col === numCols - 1 && el.row === numRows - 1)
				))) {
					if (currentElements.every(({ row, col }) => kMapArr[row][numCols - 1 - col].value === desiredValue)) {
						currentElements.forEach(({ row, col }) => {
							currentGroup.push({ row: row, col: numCols - 1 - col, element: kMapArr[row][numCols - 1 - col]});
						});
					}

					currentElements = [...currentGroup];
					if (currentElements.every(({ row, col }) => kMapArr[numRows - 1 - row][col].value === desiredValue)) {
						currentElements.forEach(({ row, col }) => {
							currentGroup.push({ row: numRows - 1 - row, col: col, element: kMapArr[numRows - 1 - row][col]});
						});
					}
				}

				groups.push(currentGroup);
			}
		}
	}

	const finalGroups = [];

	groups.forEach((group, i) => {
		finalGroups[i] = [];

		group.forEach(({ element }) => {
			if (!finalGroups[i].some((el) => el.term === element.term)) {
				finalGroups[i].push(element);
			}
		});

		finalGroups[i].sort((a, b) => a.term - b.term);
	});

	return finalGroups;
};

export default createGroups;