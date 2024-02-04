/**
 * @typedef {import('$types').Favicon} Favicon
 * @typedef {import('$types').TileImage} TileImage
 * @typedef {import('wp-types').WP_REST_API_Post} Post
 * @typedef {import('wp-types').WP_REST_API_Term} Term
 * @typedef {import('wp-types').WP_REST_API_Taxonomy} Taxonomy
 * @typedef {(Favicon|TileImage)[]} Icons
 * @typedef {{taxonomy: Taxonomy, terms: Term[]}} Post_Terms
 */

import { get_media } from '@kucrut/wp-api-helpers';
import { process_post_data } from '$lib/utils/post';
import { maybe_throw_wp_api_error } from './utils';
import { process_taxonomy_data } from '$lib/utils/taxonomy';
import { process_term_data } from '$lib/utils/term';
import { get_api_auth, get_api_url, wp_fetch } from './wp-fetch.server';

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

	try {
		const attachment = await get_media( get_api_url(), get_api_auth(), site_icon_id );

		if ( ! attachment?.media_details?.sizes ) {
			return null;
		}

		/** @type {Icons} */
		const icons = [];
		const key_prefix = 'site_icon-';

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
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error( error );
		return null;
	}
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
				taxonomy: process_taxonomy_data( taxonomy ),
				terms: terms.map( process_term_data ),
			} );
		} catch ( error ) {
			// TODO: Log?
		}
	}

	return result;
}

/**
 * Fetch latest posts
 *
 * @return {Promise<Post[]>} Post object.
 */
export async function fetch_latest_posts() {
	try {
		const response = await wp_fetch( '/wp/v2/posts' );

		if ( ! response.ok ) {
			throw await response.json();
		}

		/** @type {Post[]} */
		const posts_raw = await response.json();

		return await Promise.all(
			posts_raw.map( async post => {
				return await process_post_data( post );
			} ),
		);
	} catch ( err ) {
		maybe_throw_wp_api_error( err );
		throw err; // TODO.
	}
}
