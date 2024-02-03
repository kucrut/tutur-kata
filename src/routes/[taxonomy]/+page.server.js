import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load( { params } ) {
	if ( ! ( 'term' in params ) ) {
		redirect( 301, '/' );
	}
}
