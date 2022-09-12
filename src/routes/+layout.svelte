<script>
	/** @type {import('./$types').LayoutData} */

	export let data;
</script>

<svelte:head>
	<title>{data.wp_info.name}</title>
</svelte:head>

<slot />
