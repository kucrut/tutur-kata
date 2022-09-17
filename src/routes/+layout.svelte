<script>
	/** @type {import('./$types').LayoutData} */
	export let data;

	import '../app.css';
</script>

<svelte:head>
	{#if data.favicons}
		{#each data.favicons as attributes}
			{@const  tag = 'rel' in attributes ? 'link' : 'meta' }
			<svelte:element this={tag} {...attributes} />
		{/each}
	{/if}
</svelte:head>

<main>
	<slot />
</main>

<style>
	main:only-of-type {
		padding-block-start: unset;
	}
</style>
