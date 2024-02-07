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
	<SiteNav with_gallery={data.gallery_cat_ids.length > 0} />
</header>

<main>
	<slot />
</main>
