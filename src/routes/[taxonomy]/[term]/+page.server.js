import { error } from '@sveltejs/kit';
import { maybe_throw_wp_api_error } from '$lib/api/utils';
import { wp_fetch } from '$lib/api/wp-fetch.server';
import { process_term } from '$lib/utils/term';
import { generate_doc_title } from '$lib/utils/seo';
import { process_post_data } from '$lib/utils/post';
import { process_taxonomy } from '$lib/utils/taxonomy';

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals, params } ) {
	try {
		const response = await wp_fetch( `/wp/v2/${ params.taxonomy }?slug=${ params.term }` );
		const terms = await response.json();

		if ( ! response.ok ) {
			throw terms;
		}

		if ( ! terms.length ) {
			throw error( 404, 'Not found.' );
		}

		const [ term ] = terms;
		const processed_term = process_term( term );

		const tax_response = await wp_fetch( `/wp/v2/taxonomies/${ term.taxonomy }` );
		const taxonomy = await tax_response.json();
		const processed_taxonomy = process_taxonomy( taxonomy );

		const posts_response = await wp_fetch( `/wp/v2/posts?${ params.taxonomy }=${ term.id }` );

		if ( ! posts_response.ok ) {
			throw await posts_response.json();
		}

		/** @type {import('wp-types').WP_REST_API_Post[]} */
		const posts = await posts_response.json();
		const processed_posts = await Promise.all(
			posts.map( async post => {
				return await process_post_data( post );
			} ),
		);

		return {
			posts: processed_posts,
			taxonomy: processed_taxonomy,
			term: processed_term,
			title: generate_doc_title( locals.wp_info, {
				description: processed_term.description,
				taxonomy: processed_taxonomy,
				title: processed_term.name,
				type: 'term_archive',
			} ),
		};
	} catch ( err ) {
		maybe_throw_wp_api_error( err );
		throw err;
	}
}
