/**
 * @typedef {import('wp-types').WP_REST_API_Post} Post
 * @typedef {import('$types').wp_fetch} wp_fetch
 */

import { WP_FRONTPAGE_ID } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { generate_doc_title } from '$lib/utils/seo';
import { maybe_throw_wp_api_error } from '$lib/api/utils';
import { process_post_data } from '$lib/utils/post';

function frontpage_error() {
	throw error( 500 );
	// TODO: Log.
}

/**
 * Fetch frontpage
 *
 * @param {wp_fetch} wp_fetch WP fetch.
 * @param {number}   id       Frontpage ID.
 * @return {Promise<Post>} Post object.
 */
async function fetch_frontpage( wp_fetch, id ) {
	try {
		const response = await wp_fetch( `/wp/v2/pages/${ id }` );

		if ( ! response.ok ) {
			throw await response.json();
		}

		/** @type {Post} */
		const post = await response.json();

		return post;
	} catch ( err ) {
		maybe_throw_wp_api_error( err );
		throw err; // TODO.
	}
}

/**
 * Fetch latest posts
 *
 * @param {wp_fetch} wp_fetch WP fetch.
 * @return {Promise<Post[]>} Post object.
 */
async function fetch_latest_posts( wp_fetch ) {
	try {
		const response = await wp_fetch( '/wp/v2/posts?per_page=10' );

		if ( ! response.ok ) {
			throw await response.json();
		}

		/** @type {Post[]} */
		const posts = await response.json();

		return posts;
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

	const { wp_fetch } = locals;
	const post = await fetch_frontpage( wp_fetch, frontpage_id );
	const latest_posts = await fetch_latest_posts( wp_fetch );

	return {
		latest_posts,
		post: await process_post_data( post ),
		title: generate_doc_title( locals.wp_info, 'frontpage' ),
	};
}
