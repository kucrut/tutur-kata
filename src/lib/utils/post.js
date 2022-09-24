/**
 * @typedef {import('wp-types').WP_REST_API_Post} Post
 */

import { decode_entities } from '$lib/utils/simple-entity-decode';
import { highlight } from '$lib/utils/highlight';

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
			rendered: decode_entities( title.rendered ),
		},
	};
}
