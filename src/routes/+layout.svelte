<script>
	import '../styles/index.postcss';

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

<header class="site-header">
	<nav class="container site-nav">
		<span class="site-branding">
			<a href="/">{data.wp_info.name}</a>
		</span>

		<a href="/blog">Blog</a>
	</nav>
</header>

<main>
	<slot />
</main>
