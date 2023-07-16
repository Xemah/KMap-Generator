<script>
	import { form, terms, termsType, variablesCount, hoveredKey, kMap } from '@/lib/stores';
	import createKMap from '@/lib/createKMap';
	import createGroups from '@/lib/createGroups';
	import createEquation from '@/lib/createEquation';

	let groups = [];
	let equation = '';

	$: {
		const variables = [...Array($variablesCount).keys()]
			.map((i) => String.fromCharCode(i + 65));

		$kMap = createKMap(variables, $form, $terms, $termsType);
		groups = createGroups($kMap, $form);
		equation = createEquation(groups, $form);

		groups = groups.map((group, i) => ({
			number: i + 1,
			color: 'hsla(' + 360 / (i + 1) + ', 50%, 50%, 0.25)',
			elements: group,
		}));
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class={
	'flex justify-center '
	+ ($variablesCount >= 5 ? 'scale-50 sm:scale-100' : '')
}>
	<div class="flex flex-col -ml-10">
		<div class="flex text-gray-600 text-md font-medium">
			<div class="relative w-12 h-12">
				<div class="absolute bottom-0 right-[1px] w-full h-[1px] bg-gray-700 rotate-45 origin-bottom-right"></div>
				<div class="absolute top-0 right-0">
					{$kMap.colVars.join('')}
				</div>
				<div class="absolute bottom-0 left-0">
					{$kMap.rowVars.join('')}
				</div>
			</div>
			{#each $kMap.colVarsCombinations as combination}
				<div class="flex items-end justify-center w-20 h-12 p-2 border-l border-transparent text-center">
					{combination.binary}
				</div>
			{/each}
		</div>
		<div class="flex">
			<div class="flex flex-col text-gray-600 text-md font-medium">
				{#each $kMap.rowVarsCombinations as combination}
					<div class="flex items-center justify-end w-12 h-20 p-3 border-t border-transparent text-center">
						{combination.binary}
					</div>
				{/each}
			</div>
			<div class="flex flex-col border border-gray-700">
				{#each $kMap.arr as row}
					<div class="flex border-b last:border-b-0 border-gray-700">
						{#each row as { key, term, value }}
							<div
								class={
									'relative flex items-center justify-center w-20 h-20 border-r last:border-r-0 border-gray-700 text-lg text-gray-200 font-bold select-none cursor-pointer isolate'
									+ ($hoveredKey === key ? ' bg-white/10' : '')
								}
								title={key}
								on:click={() => {
									if ($terms.includes(term)) {
										$terms = $terms.filter((t) => t !== term);
									} else {
										$terms = [...$terms, term];
									}
								}}
								on:mouseenter={() => $hoveredKey = key}
								on:mouseleave={() => $hoveredKey = null}
							>
								{#each groups.filter((group) => group.elements.some((el) => el.term === term)) as group}
									<div
										class="absolute inset-0 -z-10"
										style="background-color: {group.color};"
									></div>
								{/each}
								<span class="absolute bottom-1 left-2 text-white/50 text-sm font-semibold flex flex-col">
									{#each groups.filter((group) => group.elements.some((el) => el.term === term)) as group}
										<span>
											G{group.number}
										</span>
									{/each}
								</span>
								<span class="absolute bottom-1 right-2 text-white/50 text-sm font-semibold">
									{term}
								</span>
								{value}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<div class="flex flex-col mt-8 border border-gray-700 text-center">
	<div class="border-b border-gray-700 py-3 text-gray-400 text-md font-bold text-center uppercase tracking-wider">
		Equation
	</div>
	<div class="p-4 text-gray-300 text-xl">
		{equation ?? '-'}
	</div>
</div>