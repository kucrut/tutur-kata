import { env } from '$env/dynamic/private';
import { generate_favicons } from '$lib/api/utils.server';

/** @type {import('./$types').LayoutServerLoad} */
export async function load( { locals } ) {
	const { wp_info } = locals;

	const gallery_cat_ids = ( env.WP_GALLERY_CATEGORY_IDS || '' )
		.split( ',' )
		.map( id => Number( id ) )
		.filter( id => ! isNaN( id ) && typeof id === 'number' && id > 0 );

	/** @type {import('$types').NavItem[]} */
	const nav_items = [];

	if ( locals.wp_blog_post_type ) {
		nav_items.push( { label: 'Blog', path: '/blog' } );
	}

	if ( gallery_cat_ids.length ) {
		nav_items.push( { label: 'Gallery', path: '/gallery' } );
	}

	return {
		gallery_cat_ids,
		nav_items,
		wp_info,
		favicons: await generate_favicons( wp_info.site_icon ),
	};
}
