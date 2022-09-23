/**
 * @typedef {import('wp-types').WP_REST_API_Post} Post
 */

import { highlight } from '$lib/utils/highlight';

/**
 * Process WP post data
 *
 * @param {Post} post WP post object.
 *
 * @return {Promise<Post>} Processed WP post object.
 */
export async function process_post_data( post ) {
	return {
		...post,
		content: {
			...post.content,
			rendered: await highlight( post.content.rendered ),
		},
	};
}
