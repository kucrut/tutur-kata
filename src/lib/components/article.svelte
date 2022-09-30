<script>
	let cls = '';

	export { cls as class };
	export let content_class = '';
	/** @type {import('wp-types').WP_REST_API_Post} */
	export let post;
	/** @type {import('$lib/api/utils.server').Post_Terms[]|null} */
	export let terms = null;
</script>

<article class={cls || null}>
	<slot name="before-title" {post} {terms} />

	{#if $$slots.title}
		<slot name="title" {post} {terms} />
	{:else}
		<h1>{post.title.rendered}</h1>
	{/if}

	<slot name="before-content" {post} {terms} />

	<div class={content_class || null}>{@html post.content.rendered}</div>

	<slot name="after-content" {post} {terms} />
</article>
