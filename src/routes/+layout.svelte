<script>
	import '../app.postcss';

	/** @type {import('./$types').LayoutData} */
	export let data;
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
