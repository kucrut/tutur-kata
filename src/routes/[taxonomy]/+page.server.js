import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load( { params } ) {
	if ( ! params.term ) {
		throw redirect( 301, '/' );
	}
}
