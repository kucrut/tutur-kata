/**
 * @typedef {import('wp-types').WP_REST_API_Post} Post
 * @typedef {import('$types').WP_Page_Object} WP_Page_Object
 * @typedef {import('$types').WP_Info} WP_Info
 */

/**
 * Generate document title
 *
 * @param {WP_Info}        wp_info     WordPress site info.
 * @param {WP_Page_Object} page_object Page type.
 * @param {string}         separator   Separator.
 *
 * @return {string} Document title.
 */
export function generate_doc_title( wp_info, page_object, separator = '·' ) {
	if ( page_object.type === 'frontpage' ) {
		return page_object.title || wp_info.name;
	}

	return `${ page_object.title } ${ separator } ${ wp_info.name }`;
}
