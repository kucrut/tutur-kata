<script>
	import { get_link } from '$utils/post';
	import PostsList from '$lib/components/posts-list.svelte';
	import Seo from 'svelte-seo';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<div class="container">
	<h1>{data.term.name}</h1>

	{#if data.term.description}
		<p>{@html data.term.description}</p>
	{/if}

	{#if data.posts?.length}
		<PostsList {get_link} posts={data.posts} />
	{/if}
</div>
