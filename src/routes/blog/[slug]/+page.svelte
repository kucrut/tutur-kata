<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<article>
	<h1>{data.post.title.rendered}</h1>
	<div>{@html data.post.content.rendered}</div>
</article>
