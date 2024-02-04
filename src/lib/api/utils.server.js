import { get_api_auth, get_api_url } from './wp-fetch.server';
import { get_media, get_post_terms, get_posts } from '@kucrut/wp-api-helpers';
import { process_post_data } from '$lib/utils/post';
import { process_taxonomy_data } from '$lib/utils/taxonomy';
import { process_term_data } from '$lib/utils/term';

/** @typedef {(import('$types').Favicon|import('$types').TileImage)[]} Icons */

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
		console.error( 'generate_favicons():', error );
		return null;
	}
}

/**
 * Fetch post terms
 *
 * @param {import('$types').WP_Post} post Post object.
 *
 * @return {ReturnType<typeof get_post_terms>} Array of favicons and tile images or null.
 */
export async function get_post_terms_processed( post ) {
	const data = await get_post_terms( post, get_api_auth() );

	if ( ! data || ( Array.isArray( data ) && ! data.length ) ) {
		return data;
	}

	return data.map( ( { taxonomy, terms } ) => ( {
		taxonomy: process_taxonomy_data( taxonomy ),
		terms: terms.map( process_term_data ),
	} ) );
}

/**
 * Get latest posts
 *
 * @return {Promise<import('$types').WP_Post[]>} Array of post objects.
 */
export async function get_latest_posts() {
	try {
		const posts = await get_posts( get_api_url(), get_api_auth() );

		return await Promise.all(
			posts.map( async post => {
				return await process_post_data( post );
			} ),
		);
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error( 'get_latest_posts():', error );
		return [];
	}
}
