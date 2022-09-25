import { WP_API_APP_AUTH, WP_API_ROOT_URL } from '$env/static/private';

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
 * Fetch data from WordPress
 *
 * @param {string}                 path    REST API path.
 * @param {RequestInit|undefined=} options Fetch options.
 *
 * @return {Promise<Response>} Response object.
 */
export async function wp_fetch( path, options = undefined ) {
	const resource = generate_rest_url( WP_API_ROOT_URL, path );
	const request = new Request( resource, options );

	// TODO: Add cookie & nonce if passed (highest priority).
	// TODO: Refresh nonce when needed if the URL is provided in the config.

	if ( WP_API_APP_AUTH ) {
		request.headers.append( 'Authorization', `Basic ${ Buffer.from( `${ WP_API_APP_AUTH }` ).toString( 'base64' ) }` );
	}

	return fetch( request );
}
