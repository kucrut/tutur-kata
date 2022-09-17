<script>
	import PostsList from '$lib/components/posts-list.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<article>
	<h1>{data.post.title.rendered}</h1>
	<div>{@html data.post.content.rendered}</div>
</article>

{#if data.latest_posts?.length}
	<PostsList posts={data.latest_posts} title="Latest Posts" />
{/if}
