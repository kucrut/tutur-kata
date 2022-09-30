import { PUBLIC_DATETIME_LOCALE } from '$env/static/public';

/**
 * Get datetime locale
 *
 * @return {string} Locale for datetime.
 */
export function get_datetime_locale() {
	return PUBLIC_DATETIME_LOCALE;
}
