<script>
	import { onMount } from 'svelte';
	import { pushState } from '$app/navigation';
	import Image from '$lib/components/image.svelte';
	import Masonry from '$lib/components/masonry.svelte';
	import Seo from 'svelte-seo';
	import 'photoswipe/style.css';

	/** @type {import('./$types').PageData} */
	export let data;
	/** @type {import('svelte').SvelteComponent} */
	let gallery;

	$: has_image = data.items.some( item => item.mime_type.startsWith( 'image' ) );

	/**
	 * Show modal
	 *
	 * @param {CustomEvent} event Mouse event.
	 */
	function show_modal( event ) {
		event.preventDefault();

		pushState( '', {
			show_modal: true,
		} );
	}

	onMount( async () => {
		if ( ! has_image ) {
			return;
		}

		const { default: ps_lightbox } = await import( 'photoswipe/lightbox' );
		const lightbox = new ps_lightbox( {
			gallery: gallery.get_el(),
			children: 'a',
			pswpModule: () => import( 'photoswipe' ),
		} );

		lightbox.init();
	} );
</script>

<Seo title={data.title} />

<div class="container">
	<h1>Gallery</h1>

	{#if data.items.length}
		<Masonry bind:this={gallery}>
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
					<Image media={item} on:click={show_modal} />
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
