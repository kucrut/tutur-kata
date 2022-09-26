<script>
	import { get_taxonomy_icon } from '$lib/utils/icons';
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
					{@const  icon = get_taxonomy_icon( post_terms.taxonomy ) }
					<TermsList
						class="terms-list has-icon--before has-icon:{icon}"
						taxonomy={post_terms.taxonomy}
						terms={post_terms.terms}
					>
						<a slot="item" let:taxonomy let:term href="/{taxonomy.rest_base}/{term.slug}">{term.name}</a>
					</TermsList>
				{/each}
			{/if}
		</svelte:fragment>
	</Article>
</div>
