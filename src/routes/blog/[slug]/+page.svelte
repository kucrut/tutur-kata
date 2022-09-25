<script>
	import Article from '$lib/components/article.svelte';
	import TermsList from '$lib/components/terms-list.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container">
	<Article post={data.post} terms={data.terms}>
		<svelte:fragment slot="before-content" let:terms>
			{#if terms?.length}
				{#each terms as post_terms}
					<TermsList taxonomy={post_terms.taxonomy} terms={post_terms.terms} />
				{/each}
			{/if}
		</svelte:fragment>
	</Article>
</div>
