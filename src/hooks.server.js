/** @typedef {import('@sveltejs/kit').Handle} Handle */

import { fetch_info } from '$lib/api/utils.server';
import { sequence } from '@sveltejs/kit/hooks';

/** @type {Handle} */
async function add_info( { event, resolve } ) {
	event.locals.wp_info = await fetch_info();

	return await resolve( event );
}

export const handle = sequence( add_info );
