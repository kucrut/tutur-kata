import { get_latest_posts } from '$lib/api/utils.server';
import { generate_doc_title } from '$lib/utils/seo';

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } ) {
	const posts = await get_latest_posts();

	return {
		posts,
		title: generate_doc_title( locals.wp_info, {
			title: 'Blog',
			type: 'archive',
		} ),
	};
}
