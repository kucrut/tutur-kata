import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import { generate_doc_title } from '$lib/utils/seo';
import { get_posts } from '$lib/api/utils.server';
import { get_post } from '@kucrut/wp-api-helpers';
import { process_post_data } from '$lib/utils/post';

/**
 * Get frontpage
 *
 * @param {string} url  WP API URL.
 * @param {string} auth WP API auth.
 *
 * @return {Promise<import('$types').WP_Post>} Post object.
 */
async function get_frontpage( url, auth ) {
	if ( ! env.WP_FRONTPAGE_ID ) {
		// eslint-disable-next-line no-console
		console.error( 'get_frontpage: WP_FRONTPAGE_ID is not set.' );
		error( 500 );
	}

	const frontpage_id = Number( env.WP_FRONTPAGE_ID );

	if ( isNaN( frontpage_id ) || frontpage_id < 1 ) {
		// eslint-disable-next-line no-console
		console.error( 'get_frontpage: Invalid WP_FRONTPAGE_ID value.' );
		error( 500, 'Internal error.' );
	}

	try {
		const post = await get_post( frontpage_id, url, auth, 'pages' );
		return await process_post_data( post );
	} catch ( err ) {
		// eslint-disable-next-line no-console
		console.error( 'get_frontpage:', err );
		error( 500, 'Internal error.' );
	}
}

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } ) {
	return {
		latest_posts: locals.wp_blog_post_type ? await get_posts( locals.wp_blog_post_type ) : undefined,
		post: await get_frontpage( locals.wp_api_url, locals.wp_api_auth ),
		title: generate_doc_title( locals.wp_info, { type: 'frontpage' } ),
	};
}
