/**
 * @typedef {import('wp-types').WP_REST_API_Post} Post
 */

import { error } from '@sveltejs/kit';
import { fetch_post_terms } from '$lib/api/utils.server';
import { maybe_throw_wp_api_error } from '$lib/api/utils';
import { generate_doc_title } from '$lib/utils/seo';
import { process_post_data } from '$lib/utils/post';

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals, params } ) {
	const { wp_fetch } = locals;

	try {
		const response = await wp_fetch( `/wp/v2/posts?slug=${ params.slug }` );

		if ( ! response.ok ) {
			throw await response.json();
		}

		/** @type {Post[]} */
		const posts = await response.json();

		if ( ! posts.length ) {
			throw error( 404, 'Not found.' );
		}

		const [ post ] = posts;
		const processed_post = await process_post_data( post );

		return {
			post: processed_post,
			terms: await fetch_post_terms( wp_fetch, processed_post ),
			title: generate_doc_title( locals.wp_info, 'blog_single', processed_post ),
		};
	} catch ( err ) {
		maybe_throw_wp_api_error( err );
		throw err;
	}
}
