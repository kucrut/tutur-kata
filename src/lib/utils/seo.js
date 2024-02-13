/**
 * Generate document title
 *
 * @param {import('@kucrut/wp-api-helpers').WP_Info} wp_info WordPress site info.
 * @param {import('$types').WP_Page_Object} page_object Page type.
 * @param {string}         separator   Separator.
 *
 * @return {string} Document title.
 */
export function generate_doc_title( wp_info, page_object, separator = '·' ) {
	const { taxonomy, title, type } = page_object;

	if ( type === 'frontpage' ) {
		return title || wp_info.name;
	}

	let title_prefix = title;

	if ( type === 'term_archive' && taxonomy ) {
		title_prefix = taxonomy.hierarchical
			? `Posts filed under "${ title_prefix }"`
			: `Posts tagged with "${ title_prefix }"`;
	}

	return `${ title_prefix } ${ separator } ${ wp_info.name }`;
}
