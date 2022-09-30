<script>
	import { get_link } from '$utils/post';
	import PostsList from '$lib/components/posts-list.svelte';
	import Seo from 'svelte-seo';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<div class="container">
	<div class="frontpage-intro">{@html data.post.content.rendered}</div>

	{#if data.latest_posts?.length}
		<h2>Latest Posts</h2>
		<PostsList {get_link} posts={data.latest_posts} />
	{/if}
</div>
