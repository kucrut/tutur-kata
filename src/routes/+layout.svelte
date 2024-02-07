<script>
	import SiteNav from '$lib/components/site-nav.svelte';
	import '../styles/index.postcss';

	/** @type {import('./$types').LayoutData} */
	export let data;
</script>

<svelte:head>
	{#if data.favicons}
		{#each data.favicons as attributes}
			<svelte:element this={'rel' in attributes ? 'link' : 'meta'} {...attributes} />
		{/each}
	{/if}
</svelte:head>

<header class="site-header">
	<SiteNav items={data.nav_items} />
</header>

<main>
	<slot />
</main>
