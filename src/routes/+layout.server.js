import { env } from '$env/dynamic/private';
import { generate_favicons } from '$lib/api/utils.server';

/** @type {import('./$types').LayoutServerLoad} */
export async function load( { locals } ) {
	const { wp_info } = locals;

	const gallery_cat_ids = ( env.WP_GALLERY_CATEGORY_IDS || '' )
		.split( ',' )
		.map( id => Number( id ) )
		.filter( id => ! isNaN( id ) && typeof id === 'number' && id > 0 );

	return {
		gallery_cat_ids,
		wp_info,
		favicons: await generate_favicons( wp_info.site_icon ),
	};
}
