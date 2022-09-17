<script>
	import Time from './time.svelte';

	/** @type {import('wp-types').WP_REST_API_Post[]} */
	export let posts;
	export let title = '';
	export let title_tag = 'h2';

	// TODO: Link post title to single post page.
</script>

{#if title}
	<svelte:element this={title_tag}>{title}</svelte:element>
{/if}
<ul>
	{#each posts as post}
		<li><Time datetime={post.date} /> <span>{@html post.title.rendered}</span></li>
	{/each}
</ul>
