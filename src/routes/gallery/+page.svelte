<script>
	import { page } from '$app/stores';
	import { pushState } from '$app/navigation';
	import Image from '$lib/components/image.svelte';
	import Masonry from '$lib/components/masonry.svelte';
	import Popover from '$lib/components/popover.svelte';
	import Seo from 'svelte-seo';

	/** @type {import('./$types').PageData} */
	export let data;
	/** @type {import('$types').WP_Media|undefined} */
	let current_media;

	/**
	 * Show modal
	 *
	 * @param {import('$types').WP_Media} item Media item.
	 * @param {MouseEvent} event Mouse event.
	 */
	function show_modal( item, event ) {
		event.preventDefault();

		current_media = item;

		pushState( '', {
			show_modal: true,
		} );
	}
</script>

<Seo title={data.title} />

<div class="container">
	<h1>Gallery</h1>

	{#if data.items.length}
		<Masonry>
			{#each data.items as item}
				{#if item.mime_type.startsWith( 'video' )}
					<!-- svelte-ignore a11y-media-has-caption -->
					<figure>
						<video controls width="400px" src={item.source_url}>
							<a download href={item.source_url}>{item.title}</a>
						</video>
						<figcaption>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html item.caption.rendered}
						</figcaption>
					</figure>
				{:else if item.mime_type.startsWith( 'image' ) && item.media_details.sizes}
					<Image media={item} on:click={e => show_modal( item, e )} />
				{:else}
					<figure>
						<a download href={item.source_url}>{item.title.rendered}</a>
					</figure>
				{/if}
			{/each}
		</Masonry>
	{:else}
		<p>No media found.</p>
	{/if}
</div>

{#if $page.state.show_modal && current_media?.mime_type.startsWith( 'image' )}
	<Popover on:close={() => history.back()}>
		<figure>
			<img
				alt={current_media.alt_text}
				height={current_media.media_details.height}
				src={current_media.source_url}
				width={current_media.media_details.width}
			/>
			<!-- TODO: Caption? -->
		</figure>
	</Popover>
{/if}
