<script>
	import Seo from '$lib/components/seo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<article>
	<h1>{data.post.title.rendered}</h1>
	<div>{@html data.post.content.rendered}</div>
</article>
