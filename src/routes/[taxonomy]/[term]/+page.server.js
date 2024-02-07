import { error } from '@sveltejs/kit';
import { generate_doc_title } from '$lib/utils/seo';
import { process_post_data } from '$lib/utils/post';
import { process_taxonomy_data } from '$lib/utils/taxonomy';
import { process_term_data } from '$lib/utils/term';
import { get_posts, get_taxonomy, get_terms } from '@kucrut/wp-api-helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load( { locals, params } ) {
	try {
		const terms = await get_terms( locals.wp_api_url, params.taxonomy, locals.wp_api_auth, { slug: [ params.term ] } );

		if ( ! terms.length ) {
			error( 404, 'Not found.' );
		}

		const [ term_raw ] = terms;
		const term = process_term_data( term_raw );

		const taxonomy_raw = await get_taxonomy( term.taxonomy, locals.wp_api_url, locals.wp_api_auth );
		const taxonomy = process_taxonomy_data( taxonomy_raw );

		const posts_raw = await get_posts( locals.wp_api_url, locals.wp_api_auth, 'posts', {
			[ taxonomy.rest_base ]: [ term.id ],
		} );
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
		// eslint-disable-next-line no-console
		console.error( 'Single term loader:', err );
		error( 404, 'Not found.' );
	}
}
