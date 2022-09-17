/**
 * @typedef {import('wp-types').WP_REST_API_Post} Post
 */

import { error } from '@sveltejs/kit';
import { maybe_throw_wp_api_error } from '$lib/api/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals, params } ) {
	const { wp_fetch } = locals;

	try {
		const response = await wp_fetch( `/wp/v2/posts?slug=${ params.slug }` );

		if ( ! response.ok ) {
			throw await response.json();
		}

		/** @type {Post[]} */
		const data = await response.json();

		if ( ! data.length ) {
			throw error( 404, 'Not found.' );
		}

		return { post: data[ 0 ] };
	} catch ( err ) {
		maybe_throw_wp_api_error( err );
		throw err;
	}
}
