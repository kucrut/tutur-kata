<script>
	import { setContext } from 'svelte';
	import { get_blog_path } from '$lib/utils/path';
	import '../styles/index.postcss';

	/** @type {import('./$types').LayoutData} */
	export let data;

	setContext( 'wp_info', data.wp_info );
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

		<a href={get_blog_path()}>Blog</a>
	</nav>
</header>

<main>
	<slot />
</main>
