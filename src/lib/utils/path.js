/** @typedef {import('wp-types').WP_REST_API_Post} Post */

import { env } from '$env/dynamic/public';

/**
 * Get blog path
 *
 * @return {string} Blog path.
 */
export function get_blog_path() {
	return env.PUBLIC_BLOG_PATH;
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
