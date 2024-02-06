<script>
	import { get_blog_path } from '$lib/utils/path';
	import { page } from '$app/stores';
</script>

<nav class="container site-nav">
	<span class="site-branding">
		<a href="/">{$page.data.wp_info.name}</a>
	</span>

	<a href={get_blog_path()}>Blog</a>
	<a href="/gallery">Gallery</a>
</nav>
