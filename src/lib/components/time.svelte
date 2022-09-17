<script>
	/** @type {string} */
	export let datetime;
	// TODO: Get timezone from wp_info.timezone_string.
	/** @type {string|undefined} */
	export let time_zone;

	const date = new Date( Date.parse( datetime ) );
	const display = new Intl.DateTimeFormat( undefined, {
		day: 'numeric',
		month: '2-digit',
		year: 'numeric',
		timeZone: time_zone,
	} ).format( date );
</script>

<time {datetime}>{display}</time>
