<script>
	let cls = '';

	export { cls as class };
	export let content_class = '';
	/** @type {import('$types').WP_Post} */
	export let post;
	/** @type {Awaited<ReturnType<typeof import('@kucrut/wp-api-helpers').get_post_terms>>} */
	export let terms = null;
</script>

<article class={cls || null}>
	<slot name="before-title" {post} {terms} />

	<slot name="title" {post} {terms}>
		<h1>{post.title.rendered}</h1>
	</slot>

	<slot name="before-content" {post} {terms} />

	<slot name="content" {post} {terms}>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<div class={content_class || null}>{@html post.content.rendered}</div>
	</slot>

	<slot name="after-content" {post} {terms} />
</article>
