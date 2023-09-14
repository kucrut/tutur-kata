<script>
	import { get_link } from '$lib/utils/path';
	import PostsList from '$lib/components/posts-list.svelte';
	import Seo from 'svelte-seo';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<div class="container">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<div class="frontpage-intro">{@html data.post.content.rendered}</div>

	{#if data.latest_posts?.length}
		<h2>Recent Posts</h2>
		<PostsList {get_link} class="recent-posts" posts={data.latest_posts} />
	{/if}
</div>
