import { sequence } from '@sveltejs/kit/hooks';
import { make_wp_fetch } from './lib/api/hooks';

export const handle = sequence( make_wp_fetch( { add_info: true, root: 'http://wp.dz/index.php?rest_route=/' } ) );
