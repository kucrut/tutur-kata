/**
 * @typedef {import('wp-types').WP_REST_API_Term} Term
 */

import { decode_entities } from '$lib/utils/simple-entity-decode';

/**
 * Process WP term data
 *
 * @param {Term} term WP term object.
 *
 * @return {Term} Processed WP term object.
 */
export function process_term( term ) {
	return {
		...term,
		description: decode_entities( term.description ),
		name: decode_entities( term.name ),
	};
}
