import { error } from '@sveltejs/kit';
import { fetch_info } from '$lib/api/utils.server';
import { sequence } from '@sveltejs/kit/hooks';

/**
 * Add wp_info to locals
 *
 * @type {import('@sveltejs/kit').Handle}
 */
async function add_wp_info_to_locals( { event, resolve } ) {
	try {
		event.locals.wp_info = await fetch_info();
		return await resolve( event );
	} catch ( err ) {
		throw error( 500, err instanceof Error ? err : { message: 'Unknown error.' } );
	}
}

export const handle = sequence( add_wp_info_to_locals );
