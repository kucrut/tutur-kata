/** @typedef {import('wp-types').WP_REST_API_Error} WP_REST_API_Error */

/**
 * Check if passed object is a WP_REST_API_Error
 *
 * @param {any} obj Anything to check.
 * @return {obj is WP_REST_API_Error} Is it?
 */
export function is_wp_rest_api_error( obj ) {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'data' in obj &&
		typeof obj.data === 'object' &&
		obj.data !== null &&
		'status' in obj.data &&
		typeof obj.data.status === 'number'
	);
}
