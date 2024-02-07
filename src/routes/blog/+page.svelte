<script>
	import NothingFound from '$lib/components/nothing-found.svelte';
	import PostsList from '$lib/components/posts-list.svelte';
	import Seo from 'svelte-seo';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<div class="container">
	{#if data.posts?.length}
		<h1>Recent Posts</h1>
		<PostsList class="recent-posts" posts={data.posts} />
	{:else}
		<NothingFound />
	{/if}
</div>
