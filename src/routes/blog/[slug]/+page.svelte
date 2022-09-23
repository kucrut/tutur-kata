<script>
	import Article from '$lib/components/article.svelte';
	import Seo from 'svelte-seo';
	import TermsList from '$lib/components/terms-list.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<Seo title={data.title} />

<div class="container">
	<Article post={data.post} terms={data.terms}>
		<svelte:fragment slot="after-content" let:terms>
			{#if terms?.length}
				{#each terms as post_terms}
					<TermsList taxonomy={post_terms.taxonomy} terms={post_terms.terms} />
				{/each}
			{/if}
		</svelte:fragment>
	</Article>
</div>
