import { get_blog_posts } from '$lib/api/utils.server';
import { generate_doc_title } from '$lib/utils/seo';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } ) {
	if ( ! locals.wp_blog_post_type ) {
		redirect( 302, '/' );
	}

	const posts = await get_blog_posts( locals.wp_blog_post_type );

	return {
		posts,
		title: generate_doc_title( locals.wp_info, {
			title: 'Blog',
			type: 'archive',
		} ),
	};
}
