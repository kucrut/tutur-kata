<script>
	import { page } from '$app/stores';
	import Seo from 'svelte-seo';
	import '../styles/index.postcss';

	/** @type {import('./$types').LayoutData} */
	export let data;
</script>

<Seo title={$page.data.title} />

<svelte:head>
	{#if data.favicons}
		{#each data.favicons as attributes}
			{@const  tag = 'rel' in attributes ? 'link' : 'meta' }
			<svelte:element this={tag} {...attributes} />
		{/each}
	{/if}
</svelte:head>

<header class="site-header">
	<nav class="container site-nav">
		<span class="site-branding">
			<a href="/">{data.wp_info.name}</a>
		</span>
	</nav>
</header>

<main>
	<slot />
</main>
