<script>
	import Article from '$lib/components/article.svelte';
	import PostsList from '$lib/components/posts-list.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container">
	<Article post={data.post} show_title={false} />

	{#if data.latest_posts?.length}
		<PostsList posts={data.latest_posts} title="Latest Posts" />
	{/if}
</div>
