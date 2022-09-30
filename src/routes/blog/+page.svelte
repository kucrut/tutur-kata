<script>
	import PostsList from '$lib/components/posts-list.svelte';
	import Seo from 'svelte-seo';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<div class="container">
	{#if data.posts?.length}
		<h1>Latest Posts</h1>
		<PostsList posts={data.posts} />
	{:else}
		<h1>Nothing found</h1>
		<p>There are no blog posts to show at this time. Stay tuned! 😉</p>
	{/if}
</div>
