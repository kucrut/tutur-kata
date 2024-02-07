import { generate_doc_title } from '$lib/utils/seo';
import { get_media } from '@kucrut/wp-api-helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals, parent } ) {
	const title = generate_doc_title( locals.wp_info, {
		title: 'Gallery',
		type: 'archive',
	} );

	/** @type {import('$types').WP_Media[]} */
	let items = [];

	const { gallery_cat_ids } = await parent();

	if ( ! gallery_cat_ids.length ) {
		return { items, title };
	}

	/** @type {Partial<import('@kucrut/wp-api-helpers').Fetch_Media_Args>} */
	const fetch_args = {
		parent: [ 0 ],
		// per_page: 100,
	};

	if ( gallery_cat_ids ) {
		fetch_args.categories = gallery_cat_ids;
	}

	try {
		items = await get_media( locals.wp_api_url, locals.wp_api_auth, fetch_args );
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error( error );
	}

	return { items, title };
}
