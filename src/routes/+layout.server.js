/** @type {import('./$types').LayoutServerLoad} */
export async function load( { locals } ) {
	const { wp_info } = locals;

	return { wp_info };
}
