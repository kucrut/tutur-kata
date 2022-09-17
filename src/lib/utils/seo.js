/**
 * @typedef {import('wp-types').WP_REST_API_Post} Post
 * @typedef {import('$types').PageType} PageType
 * @typedef {import('$types').WP_Info} WP_Info
 */

import simple_entity_decode from '$lib/utils/simple-entity-decode';

/**
 * Generate document title
 *
 * @param {WP_Info}   wp_info   WordPress site info.
 * @param {PageType}  page_type Page type.
 * @param {Post|null} data      Post object.
 * @param {string}    separator Separator.
 * @return {string} Document title.
 */
export function generate_doc_title( wp_info, page_type, data = null, separator = '·' ) {
	if ( page_type === 'frontpage' ) {
		return wp_info.name;
	}

	if ( data === null ) {
		throw Error( 'Invalid data.' );
	}

	return simple_entity_decode( `${ data.title.rendered } ${ separator } ${ wp_info.name }` );
}
