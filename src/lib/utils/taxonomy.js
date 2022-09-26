/**
 * @typedef {import('wp-types').WP_REST_API_Taxonomy} Taxonomy
 */

import { decode_entities } from '$lib/utils/simple-entity-decode';

/**
 * Process WP taxonomy data
 *
 * @param {Taxonomy} taxonomy WP taxonomy object.
 *
 * @return {Taxonomy} Processed WP taxonomy object.
 */
export function process_taxonomy_data( taxonomy ) {
	return {
		...taxonomy,
		description: decode_entities( taxonomy.description ),
		name: decode_entities( taxonomy.name ),
	};
}
