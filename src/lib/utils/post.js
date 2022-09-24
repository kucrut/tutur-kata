/**
 * @typedef {import('wp-types').WP_REST_API_Post} Post
 */

import { highlight } from '$lib/utils/highlight';
import simple_entity_decode from '$lib/utils/simple-entity-decode';

/**
 * Process WP post data
 *
 * @param {Post} post WP post object.
 *
 * @return {Promise<Post>} Processed WP post object.
 */
export async function process_post_data( post ) {
	const { content, title } = post;

	return {
		...post,
		content: {
			...content,
			rendered: await highlight( content.rendered ),
		},
		title: {
			...title,
			rendered: simple_entity_decode( title.rendered ),
		},
	};
}
