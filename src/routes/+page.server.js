/** @typedef {import('wp-types').WP_REST_API_Post} Post */

import { error } from '@sveltejs/kit';
import { fetch_latest_posts } from '$lib/api/utils.server';
import { generate_doc_title } from '$lib/utils/seo';
import { maybe_throw_wp_api_error } from '$lib/api/utils';
import { process_post_data } from '$lib/utils/post';
import { wp_fetch } from '$lib/api/wp-fetch.server';
import { WP_FRONTPAGE_ID } from '$env/static/private';

function frontpage_error() {
	error( 500 );
	// TODO: Log.
}

/**
 * Fetch frontpage
 *
 * @param {number} id Frontpage ID.
 *
 * @return {Promise<Post>} Post object.
 */
async function fetch_frontpage( id ) {
	try {
		const response = await wp_fetch( `/wp/v2/pages/${ id }` );

		if ( ! response.ok ) {
			throw await response.json();
		}

		/** @type {Post} */
		const post_raw = await response.json();

		return await process_post_data( post_raw );
	} catch ( err ) {
		maybe_throw_wp_api_error( err );
		throw err; // TODO.
	}
}

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } ) {
	if ( ! WP_FRONTPAGE_ID ) {
		frontpage_error();
	}

	const frontpage_id = Number( WP_FRONTPAGE_ID );

	if ( isNaN( frontpage_id ) || frontpage_id < 1 ) {
		frontpage_error();
	}

	const post = await fetch_frontpage( frontpage_id );
	const latest_posts = await fetch_latest_posts();

	return {
		latest_posts,
		post: await process_post_data( post ),
		title: generate_doc_title( locals.wp_info, { type: 'frontpage' } ),
	};
}
