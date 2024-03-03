import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';

export function load() {
	redirect( 303, env.PUBLIC_RESUME_URL || '/' );
}
