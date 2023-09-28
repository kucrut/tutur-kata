/* eslint-disable @typescript-eslint/no-var-requires */

const autoprefixer = require( 'autoprefixer' );
const at_import = require( 'postcss-import' );
const global_data = require( '@csstools/postcss-global-data' );
const jit_props = require( 'postcss-jit-props' );
const open_props = require( 'open-props' );
const preset_env = require( 'postcss-preset-env' );

module.exports = {
	plugins: [
		at_import,
		global_data( {
			files: [ 'node_modules/open-props/media.min.css' ],
		} ),
		jit_props( open_props ),
		preset_env( { stage: 0 } ),
		autoprefixer,
	],
};
