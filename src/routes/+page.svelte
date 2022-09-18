<script>
	import simple_entity_decode from '$lib/utils/simple-entity-decode';
	import PostsList from '$lib/components/posts-list.svelte';
	import Seo from 'svelte-seo';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<div class="container">
	<article>
		<h1>{simple_entity_decode( data.wp_info.name )}</h1>
		<div>{@html data.post.content.rendered}</div>
	</article>

	{#if data.latest_posts?.length}
		<PostsList posts={data.latest_posts} title="Latest Posts" />
	{/if}
</div>
