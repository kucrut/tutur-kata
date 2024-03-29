import { decode_entities } from '$lib/utils/simple-entity-decode';

/**
 * Process WP taxonomy data
 *
 * @param {import('@kucrut/wp-api-helpers').WP_Taxonomy} taxonomy WP taxonomy object.
 *
 * @return {import('@kucrut/wp-api-helpers').WP_Taxonomy} Processed WP taxonomy object.
 */
export function process_taxonomy_data( taxonomy ) {
	return {
		...taxonomy,
		description: decode_entities( taxonomy.description ),
		name: decode_entities( taxonomy.name ),
	};
}
