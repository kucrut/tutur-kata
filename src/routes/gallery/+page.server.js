import { env } from '$env/dynamic/private';
import { generate_doc_title } from '$lib/utils/seo';
import { get_media } from '@kucrut/wp-api-helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } ) {
	/** @type {import('$types').WP_Media[]} */
	let items = [];

	/** @type {Partial<import('@kucrut/wp-api-helpers').Fetch_Media_Args>} */
	const fetch_args = { parent: [ 0 ] };
	const categories = ( env.WP_GALLERY_CATEGORY_IDS || '' )
		.split( ',' )
		.map( id => Number( id ) )
		.filter( id => ! isNaN( id ) && typeof id === 'number' && id > 0 );

	if ( categories ) {
		fetch_args.categories = categories;
	}

	try {
		items = await get_media( locals.wp_api_url, locals.wp_api_auth, fetch_args );
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.error( error );
	}

	return {
		items,
		title: generate_doc_title( locals.wp_info, {
			title: 'Gallery',
			type: 'archive',
		} ),
	};
}
