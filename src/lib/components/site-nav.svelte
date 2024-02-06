<script>
	import { get_blog_path } from '$lib/utils/path';
	import { page } from '$app/stores';

	const blog_path = get_blog_path();

	$: aria_current = ( /** @type {string} */ path ) => ( $page.url.pathname === path ? 'page' : null );
</script>

<nav class="container site-nav">
	<span class="site-branding">
		<a aria-current={aria_current( $page.url.pathname )} href="/">{$page.data.wp_info.name}</a>
	</span>

	<a aria-current={aria_current( blog_path )} href={blog_path}>Blog</a>
	<a aria-current={aria_current( '/gallery' )} href="/gallery">Gallery</a>
</nav>
