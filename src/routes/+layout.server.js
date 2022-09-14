import { generate_favicons } from '$lib/api/utils';

/** @type {import('./$types').LayoutServerLoad} */
export async function load( { locals } ) {
	const { wp_fetch, wp_info } = locals;

	return {
		wp_info,
		favicons: generate_favicons( wp_fetch, wp_info.site_icon ),
	};
}
