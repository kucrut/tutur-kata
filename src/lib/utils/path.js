/**
 * Get post link
 *
 * @param {import('$types').WP_Post} post Post object.
 * @return {string} Post link.
 */
export function get_blog_post_link( post ) {
	return `/blog/${ post.slug }`;
}
