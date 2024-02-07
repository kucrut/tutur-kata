<script>
	import { page } from '$app/stores';
	import Seo from 'svelte-seo';

	$: message = `${ $page.error?.message || 'Something terrible happened.' } (${ $page.status })`;
</script>

<Seo title="Error" />

<div class="container">
	<article>
		<h1>Oops</h1>
		<p>{message}</p>
	</article>
</div>
