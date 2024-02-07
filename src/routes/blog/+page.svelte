<script>
	import NoPosts from '$lib/components/no-posts.svelte';
	import PostsList from '$lib/components/posts-list.svelte';
	import Seo from 'svelte-seo';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<div class="container">
	<h1>Blog</h1>
	{#if data.posts?.length}
		<PostsList class="recent-posts" posts={data.posts} />
	{:else}
		<NoPosts />
	{/if}
</div>
