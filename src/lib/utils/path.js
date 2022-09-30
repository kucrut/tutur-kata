/** @typedef {import('wp-types').WP_REST_API_Post} Post */

/**
 * Get blog path
 *
 * @return {string} Blog path.
 */
export function get_blog_path() {
	return '/blog';
}

/**
 * Get post link
 *
 * @param {Post} post Post object.
 * @return {string} Post link.
 */
export function get_link( post ) {
	return `${ get_blog_path() }/${ post.slug }`;
}
