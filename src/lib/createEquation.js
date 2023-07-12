const createEquation = (groups, form) => {
	let equationArr = [];

	if (groups) {
		if (groups.length === 0) {
			return '0';
		}

		groups.forEach((group) => {
			let colEquationArr = [];
			let rowEquationArr = [];

			const colVars = Object.keys(group.elements[0].colVars);
			colVars.forEach((v) => {
				const val = group.elements[0].colVars[v];

				if (group.elements.every((el) => el.colVars[v] === val)) {
					if (form === 'SOP') {
						colEquationArr.push(v + (val === 0 ? '\'' : ''));
					} else {
						colEquationArr.push(v + (val === 1 ? '\'' : ''));
					}
				}
			});

			const rowVars = Object.keys(group.elements[0].rowVars);
			rowVars.forEach((v) => {
				const val = group.elements[0].rowVars[v];

				if (group.elements.every((el) => el.rowVars[v] === val)) {
					if (form === 'SOP') {
						rowEquationArr.push(v + (val === 0 ? '\'' : ''));
					} else {
						rowEquationArr.push(v + (val === 1 ? '\'' : ''));
					}
				}
			});

			const currentEquationArr = [
				...colEquationArr,
				...rowEquationArr,
			];

			if (currentEquationArr.length > 0) {
				if (form === 'SOP') {
					equationArr.push(currentEquationArr.join(' '));
				} else {
					equationArr.push(currentEquationArr.join(' + '));
				}
			}
		});
	}

	if (equationArr.length === 0) {
		return '1';
	}

	let equation = '';
	if (form === 'SOP') {
		equation = equationArr.map((eq) => '(' + eq + ')').join(' + ');
	} else {
		equation = equationArr.map((eq) => '(' + eq + ')').join(' • ');
	}

	return equation;
};

export default createEquation;