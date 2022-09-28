<script>
	import PostsList from '$lib/components/posts-list.svelte';
	import Seo from 'svelte-seo';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<div class="container">
	{#if data.posts?.length}
		<PostsList posts={data.posts} title="Latest Posts" />
	{/if}
</div>
