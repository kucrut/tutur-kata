import { sequence } from '@sveltejs/kit/hooks';
import { make_wp_fetch } from './lib/api/make-wp-fetch.server';
import { WP_API_APP_AUTH, WP_API_ROOT_URL } from '$env/static/private';

export const handle = sequence( make_wp_fetch( { add_info: true, app_auth: WP_API_APP_AUTH, root: WP_API_ROOT_URL } ) );
