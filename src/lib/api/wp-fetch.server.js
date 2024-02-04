import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

/**
 * Generate REST URL
 *
 * @param {string} root REST root URL.
 * @param {string} path REST API path.
 * @return {string} Generated REST URL.
 */
export function generate_rest_url( root, path ) {
	if ( ! path.startsWith( '/' ) ) {
		return path;
	}

	let url = root.replace( /[/]+$/, '' );
	url += url.includes( '?' ) ? path.replace( '?', '&' ) : path;

	return url;
}

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

/**
 * Fetch data from WordPress
 *
 * @param {string}                 path    REST API path.
 * @param {RequestInit|undefined=} options Fetch options.
 *
 * @return {Promise<Response>} Response object.
 */
export async function wp_fetch( path, options = undefined ) {
	const resource = generate_rest_url( env.WP_API_ROOT_URL, path );
	const request = new Request( resource, options );

	// TODO: Add cookie & nonce if passed (highest priority).
	// TODO: Refresh nonce when needed if the URL is provided in the config.

	if ( env.WP_API_APP_AUTH ) {
		request.headers.append(
			'Authorization',
			`Basic ${ Buffer.from( `${ env.WP_API_APP_AUTH }` ).toString( 'base64' ) }`,
		);
	}

	const response = await fetch( request );

	if ( response.ok ) {
		return response;
	}

	// eslint-disable-next-line no-console
	console.error( { path, status: response.status, message: response.statusText } );

	error( 500, 'Internal error' );
}
