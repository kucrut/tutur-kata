/**
 * Formate date
 *
 * @param {string}           date_string Date string.
 * @param {string|undefined} time_zone   Time zone.
 * @return {string} Formatted date.
 */
export function format_date( date_string, time_zone = undefined ) {
	const date = new Date( Date.parse( date_string ) );
	const formatted = new Intl.DateTimeFormat( undefined, {
		day: 'numeric',
		month: '2-digit',
		year: 'numeric',
		timeZone: time_zone,
	} ).format( date );

	return formatted;
}
