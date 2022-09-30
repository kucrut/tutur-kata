<script>
	// TODO: Show date in browser's timezone?

	import { get_datetime_locale } from '$lib/utils/locale';
	import { page } from '$app/stores';

	/** @type {string} */
	export let datetime;

	const date = new Date( Date.parse( datetime ) );
	const display = new Intl.DateTimeFormat( get_datetime_locale(), {
		day: 'numeric',
		month: '2-digit',
		year: 'numeric',
		timeZone: $page.data.wp_info.timezone_string,
	} ).format( date );
</script>

<time {datetime}>{display}</time>
