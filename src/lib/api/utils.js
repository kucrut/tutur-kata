/**
 * @typedef {import('wp-types').WP_REST_API_Error} WP_REST_API_Error
 */

import { error } from '@sveltejs/kit';

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

/**
 * Throw error if the passed argument is a WP API Error
 *
 * @param {any} err Error object.
 */
export function maybe_throw_wp_api_error( err ) {
	/** @type {WP_REST_API_Error} */
	let wp_api_error;

	if ( is_wp_rest_api_error( err ) ) {
		wp_api_error = err;
		// @ts-expect-error TODO.
		throw error( wp_api_error.data.status, wp_api_error.message );
	}
}
