<script>
	import Time from './time.svelte';

	/** @type {import('wp-types').WP_REST_API_Posts} */
	export let posts;
</script>

<ul>
	{#each posts as post}
		<li><Time datetime={post.date} /> <a href="/blog/{post.slug}">{post.title.rendered}</a></li>
	{/each}
</ul>
