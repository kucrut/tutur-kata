import { env } from '$env/dynamic/public';

/**
 * Get datetime locale
 *
 * @return {string} Locale for datetime.
 */
export function get_datetime_locale() {
	return env.PUBLIC_DATETIME_LOCALE;
}
