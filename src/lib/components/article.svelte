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

	<slot name="title" {post} {terms}>
		<h1>{post.title.rendered}</h1>
	</slot>

	<slot name="before-content" {post} {terms} />

	<slot name="content" {post} {terms}>
		<div class={content_class || null}>{@html post.content.rendered}</div>
	</slot>

	<slot name="after-content" {post} {terms} />
</article>
