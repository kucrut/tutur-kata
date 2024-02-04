import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import { fetch_latest_posts } from '$lib/api/utils.server';
import { generate_doc_title } from '$lib/utils/seo';
import { get_api_auth, get_api_url } from '$lib/api/wp-fetch.server';
import { get_posts } from '@kucrut/wp-api-helpers';
import { process_post_data } from '$lib/utils/post';

/**
 * Get frontpage
 *
 * @return {Promise<import('$types').WP_Post>} Post object.
 */
async function get_frontpage() {
	if ( ! env.WP_FRONTPAGE_ID ) {
		// eslint-disable-next-line no-console
		console.error( 'WP_FRONTPAGE_ID is not set.' );
		error( 500 );
	}

	const frontpage_id = Number( env.WP_FRONTPAGE_ID );

	if ( isNaN( frontpage_id ) || frontpage_id < 1 ) {
		// eslint-disable-next-line no-console
		console.error( 'Invalid WP_FRONTPAGE_ID value.' );
		error( 500 );
	}

	try {
		const post = await get_posts( get_api_url(), get_api_auth(), 'pages', frontpage_id );
		return await process_post_data( post );
	} catch ( err ) {
		// eslint-disable-next-line no-console
		console.error( err );
		error( 500 );
	}
}

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } ) {
	return {
		latest_posts: await fetch_latest_posts(),
		post: await get_frontpage(),
		title: generate_doc_title( locals.wp_info, { type: 'frontpage' } ),
	};
}
