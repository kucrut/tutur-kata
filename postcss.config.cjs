/* eslint-disable @typescript-eslint/no-var-requires */

const jit_props = require( 'postcss-jit-props' );
const open_props = require( 'open-props' );
const preset_env = require( 'postcss-preset-env' );

module.exports = {
	plugins: [
		require( 'postcss-import' ),
		require( 'postcss-custom-media' ),
		require( 'postcss-nesting' ),
		require( 'autoprefixer' ),
		jit_props( open_props ),
		preset_env( { stage: 0 } ),
	],
};
