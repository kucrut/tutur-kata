import { decode_entities } from '$lib/utils/simple-entity-decode';
import { env } from '$env/dynamic/private';
import { get_api_auth, get_api_url } from '$lib/api/utils.server';
import { get_info } from '@kucrut/wp-api-helpers';
import { sequence } from '@sveltejs/kit/hooks';

/**
 * Add wp_info to locals
 *
 * @type {import('@sveltejs/kit').Handle}
 */
async function add_wp_info_to_locals( { event, resolve } ) {
	event.locals.wp_api_auth = get_api_auth();
	event.locals.wp_api_url = get_api_url();
	event.locals.wp_blog_post_type = env.WP_BLOG_POST_TYPE || undefined;

	const wp_info = await get_info( event.locals.wp_api_url, event.locals.wp_api_auth );

	event.locals.wp_info = {
		...wp_info,
		description: decode_entities( wp_info.description ),
		name: decode_entities( wp_info.name ),
	};

	return await resolve( event );
}

export const handle = sequence( add_wp_info_to_locals );
