import { env } from '$env/dynamic/private';

/**
 * Get WP API auth
 *
 * @return {string} WP API auth string.
 */
export function get_api_auth() {
	const auth = env.WP_API_APP_AUTH || '';

	if ( ! auth ) {
		return auth;
	}

	if ( env.WP_API_APP_AUTH_TYPE === 'jwt' ) {
		return `Bearer ${ auth }`;
	}

	return `Basic ${ Buffer.from( auth ).toString( 'base64' ) }`;
}

/**
 * Get WP API root URL
 *
 * @return {string} WP Rest API root URL.
 */
export function get_api_url() {
	return env.WP_API_ROOT_URL;
}
