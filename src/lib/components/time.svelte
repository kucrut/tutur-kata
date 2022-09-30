<script>
	import { getContext } from 'svelte';

	/** @type {string} */
	export let datetime;

	/** @type {import('$types').WP_Info} */
	const wp_info = getContext( 'wp_info' );

	const date = new Date( Date.parse( datetime ) );
	const display = new Intl.DateTimeFormat( undefined, {
		day: 'numeric',
		month: '2-digit',
		year: 'numeric',
		timeZone: wp_info.timezone_string,
	} ).format( date );
</script>

<time {datetime}>{display}</time>
