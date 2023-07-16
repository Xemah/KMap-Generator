<script>
	import { variablesCount, terms, termsType, form } from '@/lib/stores.js';
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-col border border-gray-700 text-center">
		<div class="border-b border-gray-700 py-3 text-gray-400 text-md font-bold text-center uppercase tracking-wider">
			Variables
		</div>
		<div class="flex justify-center">
			<button
				class={
					'inline-flex items-center justify-center w-14 h-12 text-gray-400 text-xl font-bold border-r border-gray-700 hover:bg-white/10'
				}
				on:click={() => {
					if ($variablesCount > 2) {
						$terms = [];
						$variablesCount--;
					}
				}}
			>
				-
			</button>
			<div class="inline-flex flex-1 items-center justify-center h-12 flex-grow text-gray-400 text-lg font-bold text-center">
				{$variablesCount}
			</div>
			<button
				class={
					'inline-flex  items-center justify-center w-14 h-12 text-gray-400 text-xl font-bold border-l last:border-r-0 border-gray-700 hover:bg-white/10'
				}
				on:click={() => {
					if ($variablesCount < 6) {
						$terms = [];
						$variablesCount++;
					}
				}}
			>
				+
			</button>
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
					$termsType = 'MIN';
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
					$termsType = 'MAX';
				}}
			>
				POS
			</button>
		</div>
	</div>
	<div class="flex flex-col border border-gray-700 text-center">
		<div class="border-b border-gray-700 py-3 text-gray-400 text-md font-bold text-center uppercase tracking-wider">
			<div>
				{$termsType === 'MIN'
					? 'Min Terms'
					: 'Max Terms'
				}
			</div>
			<a
				href="#/" class="text-sm text-gray-600 hover:text-gray-500 font-bold tracking-normal"
				on:click|preventDefault={() => $termsType = $termsType === 'MIN' ? 'MAX' : 'MIN'}
			>
				Switch
			</a>
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