<script>
	import { page } from '$app/stores';

	/** @type {import('$types').NavItem[]} */
	export let items = [];

	$: aria_current = ( /** @type {string} */ path ) => ( $page.url.pathname === path ? 'page' : null );
</script>

<nav class="container site-nav">
	<span class="site-branding">
		<a aria-current={aria_current( $page.url.pathname )} href="/">{$page.data.wp_info.name}</a>
	</span>

	{#each items as item}
		<a aria-current={aria_current( item.path )} href={item.path}>{item.label}</a>
	{/each}
</nav>
