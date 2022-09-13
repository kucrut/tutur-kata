import { sequence } from '@sveltejs/kit/hooks';
import { make_wp_fetch } from './lib/api/make-wp-fetch';
import { WP_API_APP_AUTH } from '$env/static/private';
import { PUBLIC_WP_API_ROOT_URL } from '$env/static/public';

export const handle = sequence(
	make_wp_fetch( { add_info: true, app_auth: WP_API_APP_AUTH, root: PUBLIC_WP_API_ROOT_URL } ),
);
