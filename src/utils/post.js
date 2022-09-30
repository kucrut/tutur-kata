/** @typedef {import('wp-types').WP_REST_API_Post} Post */

/**
 * Get post link
 *
 * @param {Post} post Post object.
 * @return {string} Post link.
 */
export function get_link( post ) {
	return `/blog/${ post.slug }`;
}
