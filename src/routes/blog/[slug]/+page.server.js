import { error } from '@sveltejs/kit';
import { fetch_post_terms } from '$lib/api/utils.server';
import { maybe_throw_wp_api_error } from '$lib/api/utils';
import { generate_doc_title } from '$lib/utils/seo';
import { process_post_data } from '$lib/utils/post';
import { wp_fetch } from '$lib/api/wp-fetch.server';

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals, params } ) {
	try {
		const response = await wp_fetch( `/wp/v2/posts?slug=${ params.slug }` );

		if ( ! response.ok ) {
			throw await response.json();
		}

		/** @type {import('wp-types').WP_REST_API_Posts} */
		const posts = await response.json();

		if ( ! posts.length ) {
			error( 404, 'Not found.' );
		}

		const [ post_raw ] = posts;
		const post = await process_post_data( post_raw );

		return {
			post,
			terms: await fetch_post_terms( post ),
			title: generate_doc_title( locals.wp_info, {
				title: post.title.rendered,
				type: 'single',
				// TODO: Add description.
			} ),
		};
	} catch ( err ) {
		maybe_throw_wp_api_error( err );
		throw err;
	}
}
