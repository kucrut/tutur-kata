<script>
	/** @type {import('$types').WP_Media} */
	export let media;

	/** @type {number|null} */
	let height = null;
	/** @type {string|null} */
	let sizes = null;
	/** @type {string|null} */
	let src = null;
	/** @type {string|null} */
	let srcset = null;
	/** @type {number|null} */
	let width = null;

	$: {
		if ( media.media_details?.sizes?.large ) {
			height = media.media_details.sizes.large.height;
			width = media.media_details.sizes.large.width;
			sizes = `(max-width: ${ width }px) 100vw, ${ width }px`;
			src = media.media_details.sizes.large.source_url;
			srcset = Object.values( media.media_details.sizes )
				.map( size => `${ size.source_url } ${ size.width }w` )
				.join( ',' );
		} else {
			src = media.source_url;
		}
	}
</script>

<figure>
	<a href={media.source_url} on:click>
		<img {height} {sizes} {srcset} {src} {width} alt={media.alt_text} decoding="async" />
	</a>
	<figcaption>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html media.caption.rendered}
	</figcaption>
</figure>
