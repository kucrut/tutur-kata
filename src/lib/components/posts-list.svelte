<script>
	/** @typedef {import('wp-types').WP_REST_API_Post} Post */

	import Time from './time.svelte';

	let cls = '';
	export { cls as class };

	/** @type {Post[]} */
	export let posts;

	/**
	 * Get post link
	 *
	 * @param {Post} post Post object.
	 * @return {string} Post link.
	 */
	export let get_link = post => `/${ post.slug }`;
</script>

<ul class={cls || null}>
	{#each posts as post}
		<li><Time datetime={post.date} /> <a href={get_link( post )}>{post.title.rendered}</a></li>
	{/each}
</ul>
