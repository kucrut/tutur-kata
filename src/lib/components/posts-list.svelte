<script>
	import Time from './time.svelte';

	let cls = '';
	export { cls as class };

	/** @type {import('@kucrut/wp-api-helpers').WP_Post[]} */
	export let posts;
</script>

<ul class={cls || null}>
	{#each posts as post}
		<li><Time datetime={post.date.toString()} /> <a href="/blog/{post.slug}">{post.title.rendered}</a></li>
	{/each}
</ul>
