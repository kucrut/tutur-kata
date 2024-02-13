<script>
	let cls = '';

	export { cls as class };
	/** @type {import('@kucrut/wp-api-helpers').WP_Taxonomy} */
	export let taxonomy;
	/** @type {import('@kucrut/wp-api-helpers').WP_Term[]} */
	export let terms;
</script>

<slot name="before-list" {taxonomy} {terms} />

<ul
	aria-label={taxonomy.name}
	class={cls || null}
	data-hierarchical={taxonomy.hierarchical}
	data-taxonomy={taxonomy.slug}
>
	{#each terms as term}
		<li><slot name="item" {taxonomy} {term}>{term.name}</slot></li>
	{/each}
</ul>

<slot name="after-list" {taxonomy} {terms} />
