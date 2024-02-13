import { decode_entities } from '$lib/utils/simple-entity-decode';

/**
 * Process WP term data
 *
 * @param {import('@kucrut/wp-api-helpers').WP_Term} term WP term object.
 *
 * @return {import('@kucrut/wp-api-helpers').WP_Term} Processed WP term object.
 */
export function process_term_data( term ) {
	return {
		...term,
		description: decode_entities( term.description ),
		name: decode_entities( term.name ),
	};
}
