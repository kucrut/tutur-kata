/**
 * Get icon
 *
 * @param {import('$types').WP_Taxonomy} taxonomy Taxonomy object.
 * @return {string} Icon name.
 */
export function get_taxonomy_icon( taxonomy ) {
	if ( taxonomy.rest_base === 'categories' ) {
		return 'folders';
	}

	return 'tags';
}
