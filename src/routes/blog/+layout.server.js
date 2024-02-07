import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load( { locals } ) {
	if ( ! locals.wp_blog_post_type ) {
		redirect( 302, '/' );
	}
}
