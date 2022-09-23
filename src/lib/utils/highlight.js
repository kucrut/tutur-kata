import { rehype } from 'rehype';
import rehype_hl from 'rehype-highlight';

/**
 * Highlight HTML string with highlight.js
 *
 * @param {string} str HTML string.
 *
 * @return {Promise<string>} HTML string with highlight.js classes.
 */
export async function highlight( str ) {
	const result = await rehype().data( 'settings', { fragment: true } ).use( rehype_hl ).process( str );

	return String( result.value );
}
