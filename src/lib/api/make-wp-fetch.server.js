/** @typedef {import('@sveltejs/kit').Handle} Handle */

import { decode_entities } from '$lib/utils/simple-entity-decode';

/**
 * Generate REST URL
 *
 * @param {string} root REST root URL.
 * @param {string} path REST API path.
 * @return {string} Generated REST URL.
 */
function generate_rest_url( root, path ) {
	if ( ! path.startsWith( '/' ) ) {
		return path;
	}

	let url = root.replace( /[/]+$/, '' );
	url += url.includes( '?' ) ? path.replace( '?', '&' ) : path;

	return url;
}

/**
 * Make wp_fetch function
 *
 * @param {Object}   config          Configuration object.
 * @param {boolean=} config.add_info Whether the site info object should always be added to event.locals as `wp_info`.
 * @param {string=}  config.app_auth A pair of `user:password` where password is an application password for authenticated requests.
 * @param {string}   config.root     WordPress REST API root URL.
 *
 * @return {Handle} Handle function.
 */
export function make_wp_fetch( config ) {
	const { add_info, app_auth, root } = config;

	/** @type {import('$types').wp_fetch} */
	async function wp_fetch( path, options = undefined ) {
		const resource = generate_rest_url( root, path );
		const request = new Request( resource, options );

		// TODO: Add cookie & nonce if passed (highest priority).
		// TODO: Refresh nonce when needed if the URL is provided in the config.

		if ( app_auth ) {
			request.headers.append( 'Authorization', `Basic ${ Buffer.from( `${ app_auth }` ).toString( 'base64' ) }` );
		}

		return fetch( request );
	}

	/**
	 * Get WordPress site info
	 *
	 * @return {Promise<import('$types').WP_Info>} Site info.
	 */
	async function get_info() {
		const response = await wp_fetch( '/' );
		const { description, gmt_offset, home, name, site_icon, site_logo, timezone_string, url } = await response.json();

		return {
			gmt_offset,
			home,
			site_icon,
			site_logo,
			timezone_string,
			url,
			description: decode_entities( description ),
			name: decode_entities( name ),
		};
	}

	/** @type {Handle} */
	return async function ( { event, resolve } ) {
		event.locals.wp_fetch = wp_fetch;

		if ( add_info ) {
			event.locals.wp_info = await get_info();
		}

		return await resolve( event );
	};
}
