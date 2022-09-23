<script>
	import simple_entity_decode from '$lib/utils/simple-entity-decode';

	let cls = '';

	export { cls as class };
	/** @type {import('wp-types').WP_REST_API_Taxonomy} */
	export let taxonomy;
	/** @type {import('wp-types').WP_REST_API_Term[]} */
	export let terms;

	// TODO: Accept item_component prop.
</script>

<slot name="before-list" {taxonomy} {terms} />

<ul
	aria-label={simple_entity_decode( taxonomy.name )}
	class="terms-list {cls}"
	data-hierarchical={taxonomy.hierarchical}
	data-taxonomy={taxonomy.slug}
>
	{#each terms as term}
		<li>{simple_entity_decode( term.name )}</li>
	{/each}
</ul>

<slot name="after-list" {taxonomy} {terms} />
