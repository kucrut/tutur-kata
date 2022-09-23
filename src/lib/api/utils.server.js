/**
 * @typedef {import('$types').wp_fetch} wp_fetch
 * @typedef {import('$types').Favicon} Favicon
 * @typedef {import('$types').TileImage} TileImage
 * @typedef {import('$types').WP_REST_API_Media} WP_REST_API_Media
 * @typedef {(Favicon|TileImage)[]} Icons
 */

/**
 * Generate favicons
 *
 * @param {wp_fetch} wp_fetch     WP API fetcher.
 * @param {number}   site_icon_id Site icon attachment ID.
 * @return {Promise<Icons|null>} Array of favicons and tile images or null.
 */
export async function generate_favicons( wp_fetch, site_icon_id ) {
	if ( site_icon_id <= 0 ) {
		return null;
	}

	const response = await wp_fetch( `/wp/v2/media/${ site_icon_id }` );

	if ( ! response.ok ) {
		return null;
	}

	const key_prefix = 'site_icon-';
	/** @type {WP_REST_API_Media} */
	const attachment = await response.json();
	/** @type {Icons} */
	const icons = [];

	for ( const size of [ 32, 180, 192 ] ) {
		const key = key_prefix + size;

		if ( key in attachment.media_details.sizes ) {
			icons.push( {
				href: attachment.media_details.sizes[ key ].source_url,
				rel: size === 180 ? 'apple-touch-icon' : 'icon',
				sizes: `${ size }x${ size }`,
			} );
		}
	}

	const tile_key = key_prefix + '270';

	if ( tile_key in attachment.media_details.sizes ) {
		icons.push( {
			content: attachment.media_details.sizes[ tile_key ].source_url,
			name: 'msapplication-TileImage',
		} );
	}

	return icons;
}
