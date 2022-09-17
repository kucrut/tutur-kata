/* eslint-disable no-bitwise */

/**
 * Borrowed from https://github.com/humanmade/simple-entity-decode/blob/master/index.js
 *
 * Somehow importing it from node_modules doesn't work 🤷🏽
 * We should probably issue a PR to Ray Ray.
 *
 * License: MIT
 */

const ENTITY_REGEX = /&(?:#(?:([0-9]+)|x([a-fA-F0-9]+))|(amp|apos|quot|lt|gt));/g;
const NAMED_ENTITIES = {
	amp: '&',
	apos: "'",
	quot: '"',
	lt: '<',
	gt: '>',
};

/**
 * Decode numeric entities in text.
 *
 * Decodes numeric (decimal and hexadecimal) entities into their Unicode
 * representation as a string.
 *
 * This is a much more lightweight decoder than is needed for generic HTML
 * handling, as we control the server-side representation.
 *
 * @param {string} text Text to decode.
 * @return {string} Text with decoded entities.
 */
export default function decode_entities( text ) {
	return text.replace( ENTITY_REGEX, ( _, decimal, hex, named ) => {
		if ( named ) {
			// @ts-expect-error TODO (It should be fine though).
			return NAMED_ENTITIES[ named ];
		}

		const codePoint = decimal ? parseInt( decimal, 10 ) : parseInt( hex, 16 );
		return code_point_to_symbol( codePoint );
	} );
}

/**
 * Convert a code point to the Unicode symbol it represents.
 *
 * From https://github.com/mathiasbynens/he
 *
 * @param {number} codePoint Unicode code point for a symbol.
 * @return {string} Symbol represented by the code point.
 */
export function code_point_to_symbol( codePoint ) {
	let output = '';
	if ( ( codePoint >= 0xd800 && codePoint <= 0xdfff ) || codePoint > 0x10ffff ) {
		// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
		// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
		// REPLACEMENT CHARACTER.”
		return '\uFFFD';
	}
	if ( codePoint > 0xffff ) {
		codePoint -= 0x10000;
		output += String.fromCharCode( ( ( codePoint >>> 10 ) & 0x3ff ) | 0xd800 );
		codePoint = ( 0xdc00 | codePoint ) & 0x3ff;
	}
	output += String.fromCharCode( codePoint );
	return output;
}
