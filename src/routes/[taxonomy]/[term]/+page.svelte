<script>
	import { get_blog_post_link } from '$lib/utils/path';
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
		<PostsList {get_blog_post_link} class="recent-posts" posts={data.posts} />
	{/if}
</div>
