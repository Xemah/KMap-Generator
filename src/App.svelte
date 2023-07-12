<script>
	import '@/app.css';

	import Options from '@/components/Options.svelte';
	import TruthTable from '@/components/TruthTable.svelte';
	import KMap from '@/components/KMap.svelte';
</script>

<div class="flex flex-col min-h-screen bg-black py-10">
	<header class="pb-8 text-3xl text-white font-bold text-center">
		<h1>K-Map Generator</h1>
	</header>
	<main>
		<div class="w-full max-w-[1500px] mx-auto px-4">
			<div class="grid grid-cols-12 gap-8">
				<div class="col-span-12 xl:col-span-2 xl:order-3">
					<Options />
				</div>
				<div class="col-span-12 xl:col-span-4 xl:order-1">
					<TruthTable />
				</div>
				<div class="col-span-12 xl:col-span-6 xl:order-2">
					<KMap />
				</div>
			</div>
		</div>
	</main>
</div>
