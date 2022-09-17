<script>
	import Time from './time.svelte';

	/** @type {import('wp-types').WP_REST_API_Post[]} */
	export let posts;
	export let title = '';
	export let title_tag = 'h2';
</script>

{#if title}
	<svelte:element this={title_tag}>{title}</svelte:element>
{/if}
<ul>
	{#each posts as post}
		<li><Time datetime={post.date} /> <a href="/blog/{post.slug}">{@html post.title.rendered}</a></li>
	{/each}
</ul>
