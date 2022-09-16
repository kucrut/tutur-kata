import { WP_FRONTPAGE_ID } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { is_wp_rest_api_error } from '$lib/api/utils';

function frontpage_error() {
	throw error( 500 );
	// TODO: Log.
}

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals } ) {
	if ( ! WP_FRONTPAGE_ID ) {
		frontpage_error();
	}

	const frontpage_id = Number( WP_FRONTPAGE_ID );

	if ( isNaN( frontpage_id ) || frontpage_id < 1 ) {
		frontpage_error();
	}

	const { wp_fetch } = locals;
	try {
		const response = await wp_fetch( `/wp/v2/pages/${ frontpage_id }` );

		if ( ! response.ok ) {
			throw await response.json();
		}

		/** @type {import('wp-types').WP_REST_API_Post} */
		const post = await response.json();

		return { post };
	} catch ( err ) {
		/** @type {import('wp-types').WP_REST_API_Error} */
		let wp_api_error;

		if ( is_wp_rest_api_error( err ) ) {
			wp_api_error = err;
			// @ts-expect-error TODO.
			throw error( wp_api_error.data.status, wp_api_error.message );
		}

		// TODO.
		throw err;
	}
}
