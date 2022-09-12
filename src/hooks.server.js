import { sequence } from '@sveltejs/kit/hooks';
import { make_wp_fetch } from './lib/api/make-wp-fetch';
import { PUBLIC_WP_API_ROOT_URL } from '$env/static/public';

export const handle = sequence( make_wp_fetch( { add_info: true, root: PUBLIC_WP_API_ROOT_URL } ) );
