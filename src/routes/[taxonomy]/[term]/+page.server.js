import { error } from '@sveltejs/kit';
import { generate_doc_title } from '$lib/utils/seo';
import { maybe_throw_wp_api_error } from '$lib/api/utils';
import { process_post_data } from '$lib/utils/post';
import { process_taxonomy_data } from '$lib/utils/taxonomy';
import { process_term_data } from '$lib/utils/term';
import { wp_fetch } from '$lib/api/wp-fetch.server';

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals, params } ) {
	try {
		const terms_response = await wp_fetch( `/wp/v2/${ params.taxonomy }?slug=${ params.term }` );

		if ( ! terms_response.ok ) {
			throw await terms_response.json();
		}

		/** @type {import('wp-types').WP_REST_API_Terms} */
		const terms = await terms_response.json();

		if ( ! terms.length ) {
			throw error( 404, 'Not found.' );
		}

		const [ term_raw ] = terms;
		const term = process_term_data( term_raw );

		const tax_response = await wp_fetch( `/wp/v2/taxonomies/${ term.taxonomy }` );
		/** @type {import('wp-types').WP_REST_API_Taxonomy} */
		const taxonomy_raw = await tax_response.json();
		const taxonomy = process_taxonomy_data( taxonomy_raw );

		const posts_response = await wp_fetch( `/wp/v2/posts?${ taxonomy.rest_base }=${ term.id }` );

		if ( ! posts_response.ok ) {
			throw await posts_response.json();
		}

		/** @type {import('wp-types').WP_REST_API_Posts} */
		const posts_raw = await posts_response.json();
		const posts = await Promise.all(
			posts_raw.map( async post => {
				return await process_post_data( post );
			} ),
		);

		return {
			posts,
			taxonomy,
			term,
			title: generate_doc_title( locals.wp_info, {
				taxonomy,
				description: term.description,
				title: term.name,
				type: 'term_archive',
			} ),
		};
	} catch ( err ) {
		maybe_throw_wp_api_error( err );
		throw err;
	}
}
