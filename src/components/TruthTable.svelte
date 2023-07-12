<script>
	import { variablesCount, hoveredTerm, terms, form } from '@/lib/stores';
	import createTruthTable from '@/lib/createTruthTable';

	let truthTable = [];

	$: {
		$form;

		const variables = ['A', 'B', 'C', 'D', 'E'].slice(0, $variablesCount);
		truthTable = createTruthTable(variables, $terms, $form);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="border border-gray-700">
	<div class="border-b border-gray-700 py-3 text-gray-400 text-md font-bold text-center uppercase tracking-wider">
		Truth Table
	</div>
	<div class="flex border-b border-gray-700 text-gray-300 text-lg font-bold text-center">
		{#each Object.keys(truthTable[0].vars) as variable}
			<div class="flex-1 py-2 border-r last:border-r-0 border-gray-700">
				{variable}
			</div>
		{/each}
		<div class="flex-1 py-2 border-r last:border-r-0 border-gray-700">
			Y
		</div>
	</div>
	{#each truthTable as { key, term, vars, value }}
		<div
			class={
				'flex border-b last:border-b-0 border-gray-700 text-gray-400 text-lg font-regular text-center select-none cursor-pointer'
				+ ($hoveredTerm === term ? ' bg-white/10' : '')
			}
			title={key}
			on:click={() => {
				if ($terms.includes(term)) {
					$terms = $terms.filter((t) => t !== term);
				} else {
					$terms = [...$terms, term];
				}
			}}
			on:mouseenter={() => $hoveredTerm = term}
			on:mouseleave={() => $hoveredTerm = null}
		>
			{#each Object.values(vars) as value}
				<div class="flex-1 py-2 border-r last:border-r-0 border-gray-700">
					{value}
				</div>
			{/each}
			<div class="flex-1 py-2 border-r last:border-r-0 border-gray-700 text-gray-200 font-medium">
				{value}
			</div>
		</div>
	{/each}
</div>
