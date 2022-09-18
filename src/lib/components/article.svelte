<script>
	import simple_entity_decode from '$lib/utils/simple-entity-decode';

	let cls = '';

	export { cls as class };
	export let content_class = '';
	export let link_title = false;
	/** @type {import('wp-types').WP_REST_API_Post} */
	export let post;
	export let show_title = true;
	export let title_class = '';
	export let title_tag = 'h1';
</script>

<article class={cls || null}>
	<slot name="before-title" {link_title} {post} {show_title} {title_tag} />

	{#if show_title}
		<svelte:element this={title_tag} class={title_class || null}>
			{#if link_title}
				<a href="/blog/{post.slug}">{simple_entity_decode( post.title.rendered )}</a>
			{:else}
				{simple_entity_decode( post.title.rendered )}
			{/if}
		</svelte:element>
	{/if}

	<slot name="before-content" {link_title} {post} {show_title} {title_tag} />

	<div class={content_class || null}>{@html post.content.rendered}</div>

	<slot name="after-content" {link_title} {post} {show_title} {title_tag} />
</article>
