<script>
	import simple_entity_decode from 'simple-entity-decode';
	import PostsList from '$lib/components/posts-list.svelte';
	import Seo from '$lib/components/seo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<article>
	<h1>{simple_entity_decode( data.post.title.rendered )}</h1>
	<div>{@html data.post.content.rendered}</div>
</article>

{#if data.latest_posts?.length}
	<PostsList posts={data.latest_posts} title="Latest Posts" />
{/if}
