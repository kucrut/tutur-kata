/** @typedef {import('@sveltejs/kit').Handle} Handle */

/**
 * Make wp_fetch function
 *
 * @param {Object}   config          Configuration object.
 * @param {boolean=} config.add_info Whether the site info object should always be added to event.locals as `wp_info`.
 * @param {string}   config.root     WordPress REST API URL.
 *
 * @return {Handle} Handle function.
 */
export function make_wp_fetch( config ) {
	const { add_info, root } = config;

	/** @type {import('$types').wp_fetch} */
	async function wp_fetch( path, options = undefined ) {
		const resource = path.startsWith( '/' ) ? root + path : path;

		// TODO: Add nonce if provided in the config.
		// TODO: Refresh nonce when needed if the URL is provided in the config.

		return fetch( resource, options );
	}

	/** @type {Handle} */
	return async function ( { event, resolve } ) {
		event.locals.wp_fetch = wp_fetch;

		if ( add_info ) {
			const response = await wp_fetch( '/' );
			const { authentication, description, gmt_offset, home, name, site_icon, site_logo, timezone_string, url } =
				await response.json();

			event.locals.wp_info = {
				authentication,
				description,
				gmt_offset,
				home,
				name,
				site_icon,
				site_logo,
				timezone_string,
				url,
			};
		}

		return await resolve( event );
	};
}
