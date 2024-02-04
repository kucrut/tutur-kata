<script>
	import Time from './time.svelte';

	let cls = '';
	export { cls as class };

	/** @type {import('$types').WP_Post[]} */
	export let posts;

	/**
	 * Get post link
	 *
	 * @param {import('$types').WP_Post} post Post object.
	 * @return {string} Post link.
	 */
	export let get_link = post => `/${ post.slug }`;
</script>

<ul class={cls || null}>
	{#each posts as post}
		<li><Time datetime={post.date.toString()} /> <a href={get_link( post )}>{post.title.rendered}</a></li>
	{/each}
</ul>
