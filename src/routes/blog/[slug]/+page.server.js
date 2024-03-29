import { error, redirect } from '@sveltejs/kit';
import { generate_doc_title } from '$lib/utils/seo';
import { get_post_terms } from '$lib/api/utils.server';
import { get_posts } from '@kucrut/wp-api-helpers';
import { process_post_data } from '$lib/utils/post';

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals, params } ) {
	if ( ! locals.wp_blog_post_type ) {
		redirect( 302, '/' );
	}

	try {
		const posts = await get_posts( locals.wp_api_url, locals.wp_api_auth, locals.wp_blog_post_type, 'view', {
			slug: [ params.slug ],
		} );

		if ( ! posts.length ) {
			error( 404, 'Not found.' );
		}

		const post = await process_post_data( posts[ 0 ] );

		return {
			post,
			terms: await get_post_terms( post ),
			title: generate_doc_title( locals.wp_info, {
				title: post.title.rendered,
				type: 'single',
				// TODO: Add description.
			} ),
		};
	} catch ( err ) {
		// eslint-disable-next-line no-console
		console.error( '/blog/[slug] server loader:', err );
		error( 404, 'Not found.' );
	}
}
