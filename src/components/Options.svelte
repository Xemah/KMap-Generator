<script>
	import { variablesCount, terms, form } from '@/lib/stores.js';

	const possibleVariablesCount = [2, 3, 4, 5];
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-col border border-gray-700 text-center">
		<div class="border-b border-gray-700 py-3 text-gray-400 text-md font-bold text-center uppercase tracking-wider">
			Variables
		</div>
		<div class="flex justify-center">
			{#each possibleVariablesCount as n}
				<button
					class={
						'inline-flex flex-1 items-center justify-center h-12 text-lg font-bold border-r last:border-r-0 border-gray-700 hover:bg-white/10'
						+ ($variablesCount === n ? ' text-gray-200' : ' text-gray-400')
					}
					on:click={() => {
						$terms = [];
						$variablesCount = n;
					}}
				>
					{n}
				</button>
			{/each}
		</div>
	</div>
	<div class="flex flex-col border border-gray-700 text-center">
		<div class="border-b border-gray-700 py-3 text-gray-400 text-md font-bold text-center uppercase tracking-wider">
			Form
		</div>
		<div class="flex justify-center">
			<button
				class={
					'inline-flex flex-1 items-center justify-center h-12 text-lg font-bold border-r last:border-r-0 border-gray-700 hover:bg-white/10'
					+ ($form === 'SOP' ? ' text-gray-200' : ' text-gray-400')
				}
				on:click={() => {
					$terms = [];
					$form = 'SOP';
				}}
			>
				SOP
			</button>
			<button
				class={
					'inline-flex flex-1 items-center justify-center h-12 text-lg font-bold border-r last:border-r-0 border-gray-700 hover:bg-white/10'
					+ ($form === 'POS' ? ' text-gray-200' : ' text-gray-400')
				}
				on:click={() => {
					$terms = [];
					$form = 'POS';
				}}
			>
				POS
			</button>
		</div>
	</div>
	<div class="flex flex-col border border-gray-700 text-center">
		<div class="border-b border-gray-700 py-3 text-gray-400 text-md font-bold text-center uppercase tracking-wider">
			{#if ($form === 'SOP')}
				Min Terms
			{:else}
				Max Terms
			{/if}
		</div>
		<div class="flex justify-center">
			<input
				type="text"
				class="w-full bg-transparent border-none outline-none px-4 py-3 text-white"
				value={$terms.join(',')}
				on:input={({ target }) => {
					$terms = target.value.split(/,\s*/).filter(Boolean).map(Number);
				}}
			/>
		</div>
	</div>
	<div class="flex">
		<button
			class="inline-flex flex-1 items-center justify-center h-12 text-lg font-medium border border-gray-700 hover:bg-white/10 text-gray-200"
			on:click={() => $terms = []}
		>
			Reset Values
		</button>
	</div>
</div>