<script>
	import NothingFound from '$lib/components/nothing-found.svelte';
	import PostsList from '$lib/components/posts-list.svelte';
	import Seo from 'svelte-seo';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<div class="container">
	<h1>{data.term.name}</h1>

	{#if data.term.description}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p>{@html data.term.description}</p>
	{/if}

	{#if data.posts?.length}
		<PostsList class="recent-posts" posts={data.posts} />
	{:else}
		<NothingFound />
	{/if}
</div>
