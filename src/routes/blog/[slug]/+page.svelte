<script>
	import simple_entity_decode from 'simple-entity-decode';
	import Seo from 'svelte-seo';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<article>
	<h1>{simple_entity_decode( data.post.title.rendered )}</h1>
	<div>{@html data.post.content.rendered}</div>
</article>
