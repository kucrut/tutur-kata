/**
 * @typedef {import('$types').Favicon} Favicon
 * @typedef {import('$types').TileImage} TileImage
 * @typedef {import('$types').WP_REST_API_Media} WP_REST_API_Media
 * @typedef {import('wp-types').WP_REST_API_Post} Post
 * @typedef {import('wp-types').WP_REST_API_Term} Term
 * @typedef {import('wp-types').WP_REST_API_Taxonomy} Taxonomy
 * @typedef {(Favicon|TileImage)[]} Icons
 * @typedef {{taxonomy: Taxonomy, terms: Term[]}} Post_Terms
 */

import { decode_entities } from '$lib/utils/simple-entity-decode';
import { process_taxonomy } from '$lib/utils/taxonomy';
import { process_term } from '$lib/utils/term';
import { wp_fetch } from './wp-fetch.server';

/**
 * Generate favicons
 *
 * @param {number} site_icon_id Site icon attachment ID.
 * @return {Promise<Icons|null>} Array of favicons and tile images or null.
 */
export async function generate_favicons( site_icon_id ) {
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

/**
 * Fetch WordPress site info
 *
 * @return {Promise<import('$types').WP_Info>} Site info.
 */
export async function fetch_info() {
	const response = await wp_fetch( '/' );
	const { description, gmt_offset, home, name, site_icon, site_logo, timezone_string, url } = await response.json();

	return {
		gmt_offset,
		home,
		site_icon,
		site_logo,
		timezone_string,
		url,
		description: decode_entities( description ),
		name: decode_entities( name ),
	};
}

/**
 * Fetch post terms
 *
 * @param {Post} post Post object.
 *
 * @return {Promise<Post_Terms[]|null>} Array of favicons and tile images or null.
 */
export async function fetch_post_terms( post ) {
	const taxonomies = post._links[ 'wp:term' ];

	if ( ! ( Array.isArray( taxonomies ) && taxonomies.length ) ) {
		return null;
	}

	/** @type {Post_Terms[]} */
	const result = [];

	for ( const tax of taxonomies ) {
		try {
			const response = await wp_fetch( tax.href );
			/** @type {Term[]} */
			const terms = await response.json();

			if ( ! terms.length ) {
				continue;
			}

			const tax_response = await wp_fetch( terms[ 0 ]._links.about[ 0 ].href );
			/** @type {Taxonomy} */
			const taxonomy = await tax_response.json();

			result.push( {
				taxonomy: process_taxonomy( taxonomy ),
				terms: terms.map( process_term ),
			} );
		} catch ( error ) {
			// TODO: Log?
		}
	}

	return result;
}
