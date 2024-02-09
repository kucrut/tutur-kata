<script>
	import { beforeUpdate, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { pushState } from '$app/navigation';
	import ps_lightbox from 'photoswipe/lightbox';
	import Image from '$lib/components/image.svelte';
	import Masonry from '$lib/components/masonry.svelte';
	import Seo from 'svelte-seo';
	import 'photoswipe/style.css';

	/** @type {import('./$types').PageData} */
	export let data;
	/** @type {import('svelte').SvelteComponent} */
	let gallery;
	/** @type {ps_lightbox} */
	let lightbox;

	$: has_image = data.items.some( item => item.mime_type.startsWith( 'image' ) );

	onMount( async () => {
		if ( ! has_image ) {
			return;
		}

		lightbox = new ps_lightbox( {
			gallery: gallery.get_el(),
			children: 'a[data-pswp-width]',
			pswpModule: () => import( 'photoswipe' ),
		} );

		lightbox.on( 'beforeOpen', () => {
			pushState( '', { show_modal: true } );
		} );
		lightbox.on( 'close', () => {
			pushState( '', { show_modal: false } );
		} );

		lightbox.init();
	} );

	beforeUpdate( () => {
		if ( ! $page.state.show_modal && lightbox?.pswp ) {
			lightbox.pswp.close();
		}
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
					<Image media={item} />
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
