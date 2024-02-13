import { decode_entities } from '$lib/utils/simple-entity-decode';
import { highlight } from '$lib/utils/highlight';

/**
 * Process WP post data
 *
 * @param {import('@kucrut/wp-api-helpers').WP_Post} post WP post object.
 *
 * @return {Promise<import('@kucrut/wp-api-helpers').WP_Post>} Processed WP post object.
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
